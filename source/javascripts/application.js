/* Application JS: */


jQuery(document).ready(function(){

  var tabs = jQuery('#tabs').tabs();

  jQuery(".ui-tabs-panel").each(function(i){

    var totalSize = jQuery(".ui-tabs-panel").size() - 1;

    if (i != totalSize) {
        next = i + 2;
        jQuery(this).append("<a href='#' class='next-tab mover' rel='" + next + "'>Next Page &#187;</a>");
    }

    if (i != 0) {
        prev = i;
        jQuery(this).append("<a href='#' class='prev-tab mover' rel='" + prev + "'>&#171; Prev Page</a>");
    }
  
  });

  jQuery('.next-tab, .prev-tab').click(function() { 
           tabs.tabs('select', jQuery(this).attr("rel"));
           return false;
       });
});