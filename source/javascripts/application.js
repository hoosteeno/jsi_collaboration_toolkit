jQuery(function(){

  // this is inside to avoid clobbering $ for other jQuery scripts
  var jq = jQuery.noConflict();

  var tabbish = jq('.tabs');
  tabbish.tabs({event: 'change'});

  // show tabs specified in URL
  var go_to_deep_link = function() {

    // break URL into nodes
    var nodes = window.location.hash.substring(1).split('/');

    // jquery-ui tab select divs with ids specified in nodes
    for (var i = 0; i < nodes.length; i++) {
      jq(tabbish).tabs('select', nodes[i]);
    }

    // select first child tabs of the last tab specified in nodes
    children = jq('#'+nodes[nodes.length-1]).find('.tabs');
    children.each(function() {
      first_tab = jq(this).find('.tab').first();
      jq(tabbish).tabs('select', first_tab.attr('id'));
    });

  };

  // do this first
  go_to_deep_link()

  // add a deep link to the URL on click
  jq('.ui-tabs-nav li a').click(function(){
    var nodes = '';
    jq(this).parents('.tab').each(function() {
      nodes = jq(this).attr('id') + '/' + nodes;
    });
    window.location.hash = '#' + nodes + jq(this).attr('href').substring(1);
  });

  // show the appropriate tabs when the URL changes (as in the click handler above)
  jq(window).hashchange(function(){
    go_to_deep_link();
  });
});


