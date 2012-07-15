jQuery(function(){

  // this is inside to avoid clobbering $ for other jQuery scripts
  var jq = jQuery.noConflict();

  var tabbish = jq('.tabs');
  tabbish.tabs({event: 'change'});

  // show tabs specified in URL
  var go_to_deep_link = function() {

    // break URL into nodes
    var nodes = window.location.hash.substring(1).replace(/\/$/, '').split('/');

    // jquery-ui tab select divs with ids specified in nodes
    for (var i = 0; i < nodes.length; i++) {
      jq(tabbish).tabs('select', nodes[i]);
    }

    // select first child tabs of the last tab specified in nodes
    last_node = nodes[nodes.length-1];

    if (last_node != '' && last_node != null) {

      function get_children(scope) {
        var $kid = jq(scope).find('.tabs').first();

        children.push($kid);
        if ($kid.length > 0) {
          get_children($kid);
        }
      }

      var children = [];

      get_children(jq('#'+last_node));

      jq(children).each(function() {
        child = this;
        first_tab = child.find('.tab').first();
        jq(tabbish).tabs('select', first_tab.attr('id'));
      });
    }

  };

  // the very first pageload may have a deep link
  go_to_deep_link()

  // show the appropriate tabs when the URL changes 
  jq(window).hashchange(function(){
    go_to_deep_link();
  });

  // scroll to top and change the hash when a nav link or next/prev is clicked
  jq('.ui-tabs-nav li a, .next_prev a').click(function(){
    jq.scrollTo('#chapters', 300);
    console.log('#' + jq(this).attr('target') + '/');
    window.location.hash = '#' + jq(this).attr('target') + '/';
    return false;
  });

});


