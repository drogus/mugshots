/*
 * lightboxFu
 *
 * Copyright (c) 2008 Piotr Sarnacki (drogomir.com)
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($) {
  $.extend($, {lightBoxFu: {}});
  $.extend($.lightBoxFu, {
    initialize: function (o) {
      if($('#lightboxfu').length == 0) {
	  	options = {stylesheetsPath: '/stylesheets/', imagesPath: '/images/'};
	  	jQuery.extend(options, o);
        html = '<div id="lightboxfu"><div id="lOverlay"><div id="lWindow"><div id="lInner"></div></div></div></div>';
		html += '<link href="'+options.stylesheetsPath+'lightbox-fu.css" media="screen" rel="Stylesheet" type="text/css" />';
		if ($.browser.msie && $.browser.version == '6.0') {
			html += '<link rel="stylesheet" type="text/css" href="'+options.stylesheetsPath+'lightbox-fu-ie6.css" />';
			$('body').css('background', 'url('+options.imagesPath+'blank.gif) fixed');
		} else if($.browser.msie && $.browser.version == '7.0') {
			html += '<link rel="stylesheet" type="text/css" href="'+options.stylesheetsPath+'lightbox-fu-ie7.css" />';
		}
        $('body').append(html);
		if(!$.browser.msie) {
			$('#lOverlay').css('background', 'url('+options.imagesPath+'overlay.png) fixed');
		}
      }
    },
    open: function(options) {
      options = options || {};
      $('#lInner').html(options.html);
      $('#lightboxfu').show();
      var width = options.width || '250';
      $('#lInner').css({'width': width});
      
      if(options.closeOnClick != false) {
        $('#lOverlay').one('click', $.lightBoxFu.close);
      }
    },
    close: function() {
      $('#lightboxfu').hide();
    }
  });
  
  $.extend($.fn, {
	  lightBoxFu: function(options){
		  return this.each(function() {
        $(this).click(function() {
			$.lightBoxFu.open(options);
          return false;
        });
      });
  }});
})(jQuery);

