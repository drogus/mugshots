// handy trick, if we can't use $ beaceuse jQuery.noConflict
// was used, jQuery is passed as argument in document ready
// so we can name it $
jQuery(function($) {
  $.lightBoxFu.initialize({imagesPath: '/images/', stylesheetsPath: '/stylesheets/'});
  //enable lightbox
  $('#mugshots li a').lightBox(); 
    
  // add upload progress to our form
  $('form.progress').uploadProgress({
    start:function(){
      // after starting upload open lightBoxFu with our bar as html
      $.lightBoxFu.open({
        html: '<div id="uploading"><span id="received"></span><span id="size"></span><br/><div id="progress" class="bar"><div id="progressbar">&nbsp;</div></div><span id="percent"></span></div>',
        width: "250px",
        closeOnClick: false
      });
      jQuery('#received').html("Upload starting.");
      jQuery('#percent').html("0%");
    },
    uploading: function(upload) {
      // update upload info on each /progress response
      jQuery('#received').html("Uploading: "+parseInt(upload.received/1024)+"/");
      jQuery('#size').html(parseInt(upload.size/1024)+" kB");
      jQuery('#percent').html(upload.percents+"%");
    },
    interval: 2000,
    /* if we are using images it's good to preload them, safari has problems with
       downloading anything after hitting submit button. these are images for lightBoxFu
       and progress bar */
    preloadImages: ["/images/overlay.png", "/images/ajax-loader.gif"]
  });
  
  $('.multi-file').each(function() {
    // change name of element before applying MultiFile
    // so array of files can be send to server with mugshot[uploaded_data][]
    $(this).attr('name', $(this).attr('name') + '[]');
  }).MultiFile();
});