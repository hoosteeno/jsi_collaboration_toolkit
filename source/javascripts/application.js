/* Application JS: */


jQuery(document).ready(function(){

  jQuery('#tabs, #subtabs').tabs();

  // var subtabs = jQuery('#subtabs').tabs({ fx: { opacity: 'toggle' } });

  // jQuery("#subtabs .ui-tabs-panel").each(function(i){
  //   console.log(i+"straight up i");

  //   var totalSize = jQuery("#subtabs .ui-tabs-panel").size() - 1;
  //   console.log(totalSize+"total size");

  //   if (i != totalSize) {
  //       next = i + 1;
  //       console.log(next+"next");
  //       jQuery(this).append("<a href='#' class='next-tab mover' rel='" + next + "'>Next Page &#187;</a>");
  //   }

  //   if (i != 0) {
  //       prev = i - 1;
  //       console.log(prev+"prev");
  //       jQuery(this).append("<a href='#' class='prev-tab mover' rel='" + prev + "'>&#171; Prev Page</a>");
  //   }
  
  // });

  // jQuery('.next-tab, .prev-tab').click(function() { 
  //   subtabs.tabs('select', jQuery(this).attr("rel"));
  //   console.log(subtabs);
  //   return false;
  // });

});