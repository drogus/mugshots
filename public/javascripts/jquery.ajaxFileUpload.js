/*
 * jquery.ajaxFileUpload
 *
 * Copyright (c) 2008 Piotr Sarnacki (drogomir.com)
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 */

 (function($) {  
  $.extend($, {ajaxFileUpload: {}});
  $.extend($.ajaxFileUpload, {
    createIFrame: function () {
      if($("#uploadFrame").length == 0) {
        iframe = $('<iframe name="uploadFrame" id="uploadFrame">');
        iframe.css("display", "none");
        iframe.appendTo($("body"));
        
      }
    }
  });
  
  $.extend($.fn, {
    ajaxFileUpload: function (object){
      return this.each(function () {
        element = $(this);
        element.attr('target', 'uploadFrame');
        $.ajaxFileUpload.createIFrame();
        element.bind('submit', function() {
          $("#uploadFrame").bind('load', function() { object.uploadFinished(element[0]); });
        });
      });
    }
  });
  
})(jQuery);
