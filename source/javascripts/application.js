jQuery(function(){

  // this is inside to avoid clobbering $ for other jQuery scripts
  var jq = jQuery.noConflict();

  jq('#chapters, #sections, #subsections').tabs();

  // show deep link from URL
  var deep_link_nodes = window.location.hash.substring(1).split('/');
  if (deep_link_nodes != null) {
     
    if (deep_link_nodes[0] != null) {
      jq(chapters).tabs('select', deep_link_nodes[0]);
    }
    if (deep_link_nodes[1] != null) {
      jq(sections).tabs('select', deep_link_nodes[1]);
    }
    if (deep_link_nodes[2] != null) {
      jq(subsections).tabs('select', deep_link_nodes[2]);
    }
  }

  // add deep link to URL
  jq('.ui-tabs-nav li a').click(function(){
    if (jq(this).closest('#subsections').size() > 0) {
      var chapter = jq(this).closest('div[id^="chapter"]').attr('id');
      var section = jq(this).closest('div[id^="section"]').attr('id');
      window.location.hash = '#'+chapter+'/'+section+'/'+jq(this).attr('href').substring(1);
    }
    else if (jq(this).closest('#sections').size() > 0) {
      var chapter = jq(this).closest('div[id^="chapter"]').attr('id');
      window.location.hash = '#'+chapter+'/'+jq(this).attr('href').substring(1);
    }
    else {
      window.location.hash = jq(this).attr('href');
    }
  });

  // jq('#sections .ui-tabs-panel').each(function(i){
  //   var lastinarray = jq("#sections .ui-tabs-panel").size() - 1;
  //   var current = i + 1;

  //   // if "i" is not last in array
  //   if (i != lastinarray) {
  //     // next equals current plus one
  //     next = current + 1;
  //     jq(this).append("<a href='#section"+next+"' class='next-section section-link' rel='" + next + "'>Next Page &#187;</a>");
  //   }

  //   // if "i" is not first in array
  //   if (i != 0) {
  //       prev = current - 1;
  //       jq(this).append("<a href='#section"+prev+"' class='prev-section section-link' rel='" + prev + "'>&#171; Prev Page</a>");
  //   }

  // });

  // jq('.next-section, .prev-section').click(function() {
  //   jq(sections).tabs('select', jq(this).attr("href"));
  //    return false;
  // });


});


