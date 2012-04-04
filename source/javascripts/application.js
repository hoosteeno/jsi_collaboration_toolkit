/* Application JS: */


jQuery(document).ready(function(){

  jQuery('#chapters, #sections').tabs();

  // Exposes deep links
  var deep_link = window.location.hash.substring(1).split('/');
  if (deep_link != null) {
   if (deep_link[0] != null) {
     jQuery(chapters).tabs('select', deep_link[0]);
   }
   if (deep_link[1] != null) {
     jQuery(sections).tabs('select', deep_link[1]);
   }
  }

  // This sets hashtag on URL
  jQuery('.ui-tabs-nav li a').click(function(){
    if (jQuery(this).closest('#sections').size() > 0) {
      var chapter = jQuery(this).closest('div[id^="chapter"]').attr('id');
      window.location.hash = '#'+chapter+'/'+jQuery(this).attr('href').substring(1);
    }
    else {
      window.location.hash = jQuery(this).attr('href');
    }
  });

  // jQuery('#sections .ui-tabs-panel').each(function(i){
  //   var lastinarray = jQuery("#sections .ui-tabs-panel").size() - 1;
  //   var current = i + 1;

  //   // if "i" is not last in array
  //   if (i != lastinarray) {
  //     // next equals current plus one
  //     next = current + 1;
  //     jQuery(this).append("<a href='#section"+next+"' class='next-section section-link' rel='" + next + "'>Next Page &#187;</a>");
  //   }

  //   // if "i" is not first in array
  //   if (i != 0) {
  //       prev = current - 1;
  //       jQuery(this).append("<a href='#section"+prev+"' class='prev-section section-link' rel='" + prev + "'>&#171; Prev Page</a>");
  //   }

  // });

  // jQuery('.next-section, .prev-section').click(function() {
  //   jQuery(sections).tabs('select', jQuery(this).attr("href"));
  //    return false;
  // });


});