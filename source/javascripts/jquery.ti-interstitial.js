
  var off_site_link;

$(document).ready(function(){
  function centerPopup(y_position){
    //request data for centering
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $("#oah_popup_wrapper").height();
    var popupWidth = $("#oah_popup_wrapper").width();

    //centering
    $("#oah_popup_wrapper").css({
      "position": "absolute",
      "top": y_position - 250,
      "left": windowWidth/2-popupWidth/2,
      "border": "1px black solid",
      "background-color": "white",
      "text-align": "right",
      "padding": "5px",
      "z-index": 1001
    });

    $("#oah_popup").css({
      "background-color": "white",
      "margin": "5px",
      "padding": "5px",
      "font-size": "1.10em",
      "line-height": "1.40em",
      "text-align": "left"
    });
  }

  $("#close_oah").click(function () {
     $("#oah_popup_wrapper").hide();
     return false;
  });

  $("#oah_popup").click(function () {
     $("#oah_popup_wrapper").hide();
  });

  $(".offsite").click(function (e) {
    // source may be blank periodically ...
    var mouse_y_location = e.pageY;
    off_site_link = $(this).attr('href');
    var source = $(this).attr('title');
    centerPopup(mouse_y_location);
    $("#oah_popup").html("You are being redirected to a non-governmental website. Click the button below to continue; otherwise, click 'Close Window' to return to your page.<br/><a href='" + off_site_link + "' target='_blank'><img src='/ash/oah/images/oah_sys_images/btn_click-to-continue.gif' style='display: block; margin-top: 10px; margin-left: auto; margin-right: auto;'/></a>");
    $("#oah_popup_wrapper").show();
    return false;
  });
});