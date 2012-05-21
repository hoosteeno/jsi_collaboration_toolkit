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

  // add a deep link to the URL when any tab nav is clicked
  jq('.ui-tabs-nav li a').click(function(){
    var deep_link = '';
    jq(this).parents('.tab').each(function() {
      deep_link = jq(this).attr('id') + '/' + deep_link;
    });
    window.location.hash = '#' + deep_link + jq(this).attr('href').substring(1) + '/';
  });

  // show the appropriate tabs when the URL changes 
  jq(window).hashchange(function(){
    go_to_deep_link();
  });

});


