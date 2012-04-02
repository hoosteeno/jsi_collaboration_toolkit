jQuery.fn.rotator = function(options) {

  var el = this;

  if ( !jQuery.ui ){
    alert("jquery-ui must be loaded for rotator to work");
    return false;
  } else if ( !jQuery.ui.tabs ){
    alert("jquery-ui-tabs must be loaded for rotator to work");
    return false;
  }

  settings = jQuery.extend({
    // control options
    previous_button: false,
    next_button:     false,
    youtube_detect:  true,
    interval:        8000,

    // jquery.ui.tabs setting defaults
    tabs: {
      selected:      0,
      fx:            { opacity: 'toggle' }
    }
  }, options);

  $( el ).tabs( settings['tabs'] );

  var last_tab_index = $(el).tabs('length') -1;

  if ( settings.youtube_detect ){

    if( $( el ).find( "object").length ){
      // youtube content found, do not enable rotation
    } else {
      // no youtube content found, enable rotations for every 8000ms
      $( el ).tabs('rotate', settings.interval, false );
    }

  } else {
    $( el ).tabs('rotate', settings.interval, false );
  }

  // attach event to back button to go back one pane and turn off animations
  if ( settings.previous_button ) {
    $( settings.previous_button ).click(function() {
      var tabs = $(el);

      var current_tab = tabs.tabs( "option", "selected" );
      current_tab--;
      if (current_tab <= -1) current_tab = last_tab_index;

      tabs.tabs('select', current_tab);
      tabs.tabs('rotate', 0, false );
      return false;
    });
  }

  // attach event to next button to go forward one pane and turn off animations
  if ( settings.next_button ) {
    $( settings.next_button ).click(function() {
      var tabs = $(el);

      var current_tab = tabs.tabs( "option", "selected" );
      current_tab++;
      if ( current_tab > last_tab_index ) current_tab = 0;

      tabs.tabs('select', current_tab);
      tabs.tabs('rotate', 0, false );
      return false;
    });
  }

  // disable rotation if any panels are clicked
  $( el ).find("div").click(function(){
    $(el).tabs('rotate', 0, false );
  });

}