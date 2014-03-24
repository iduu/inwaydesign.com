$(function(){

  if ( document && document.documentElement && document.documentElement.className )
  {
    if ( ("" + document.documentElement.className).indexOf("lt-ie9") != -1 ) {

      $(".ie_column_fix").each(function(){

        var $t     = $(this).show();
        var $child = $t.children();
        var column = parseInt( $t.attr("data-column") ) || 5

        for ( var i = 0; i < $child.length; i += column ) {
          $child.eq(i).addClass("mgl0 clearleft");
        }

      });

    }
  }

  if ( 'ontouchstart' in document.documentElement ) {
    $("body").addClass("touch")
  }


  $("[data-toggle]").click(function () {
    var $this   = $(this)

    var lastHint = $this.text();
    var delay    = parseInt( $this.attr("data-delay"), 10 );
    $this.text( $this.attr("data-toggle") );
    $this.attr("data-toggle", lastHint);

    var $target = $( "#" + $this.attr("data-target") );

    if ( $target.is(":hidden") ) {

      $target.addClass("play").children().each(function (i) {
        $(this).attr("style", "-webkit-animation-delay:" + i * delay + "ms;"
                + "-moz-animation-delay:" + i * delay + "ms;"
                + "-o-animation-delay:" + i * delay + "ms;"
                + "animation-delay:" + i * delay + "ms;");
      });
    } else {
      $target.removeClass("play").children().each(function (i) {
        $(this).attr("style", "");
      });
    }
    return false;
  });


  $("[data-src]").on("click touchend", function (){

    var $this    = $(this);
    var src      = $this.attr("data-src");
    var width    = $this.attr("data-width");
    var height   = $this.attr("data-height");
    var maxWidth = parseFloat($this.attr("data-maxWidth"));

    var tmpl = "<div class='overlay'><div class='overlay_bg'><iframe width='" + width + "' height='" + height + "' src='" + src + "' frameborder=0 allowfullscreen></iframe></div></div>";

    var overlay = $( tmpl ).appendTo("body").on("click touchend", ".overlay_bg", function(){
      $(".overlay").remove();
      return false
    });

    var frame = overlay.find("iframe");
    maxWidth *= overlay.width()

    if ( maxWidth < width ) {
      height = Math.round( maxWidth / width * height );
      width  = maxWidth;
      frame.attr("width", width).attr("height", height);
    }
    frame.css({
      "margin-left" : -width/2,
      "margin-top" : -height/2
    });
    return false;
  });

  $(".member_list").on("click", "li", function( evt ){
    $(".member_list .selected").removeClass("selected");
    var index = $(evt.currentTarget).addClass("selected").index();
    $(".member").hide().eq(index).show();
  });

});
