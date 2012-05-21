startList = function() {
  $('.ie6 #nav > ul > li').mouseover(function(){
    $(this).toggleClass("hover");
  }).mouseout(function(){
    $(this).toggleClass("hover");
  });
};

$(document).ready(function() {
  $('#slide-show').rotator();
  $(".carousel").jCarouselLite({
    btnNext: ".right",
    btnPrev: ".left",
    start: 0,
    visible: 6,
    scroll: 6,
    circular: false
  });
  startList();
});