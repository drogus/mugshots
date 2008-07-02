
jQuery(function($) {
  $.lightBoxFu.initialize({imagesPath: '/images/', stylesheetsPath: '/stylesheets/'});
  $('#mugshots li a').lightBox(); 
          
  $('.multi-file').livequery(function () { 
    var el = $(this);
    el.attr('name', el.attr('name')+'[]').removeClass('multi-file').MultiFile(); 
  });

  /* create upload form with multifile instead of new mugshot link */
  var form = $('<form method="post" enctype="multipart/form-data" class="progress ajax" action="/mugshots"/>');
  form.append('<p><label for="mugshot_uploaded_data">Upload mugshot: </label></p>');
  $('<input type="file" class="multi-file" id="mugshot_uploaded_data" size="30" name="mugshot[uploaded_data]"/>')
      .appendTo(form).wrap($('<p>'));
  form.append('<p><input type="submit" value="Create" name="commit"/></p>');
  /* append hidden field with auth token if it's needed */
  if (typeof(AUTH_TOKEN) != "undefined") {
    form.append('<input type="hidden" value="'+AUTH_TOKEN+'" name="authenticity_token"/>'); 
  }
  $('#new_mugshot_link').replaceWith(form);
  
  $('form.ajax').livequery(function() {
    $(this).ajaxForm({iframe: true, success: function (responseText, responseStatus, form) {
      var url = $(form).attr('action');
      $.ajax({
          url: url,
          dataType: "script",
          beforeSend: function(xhr) {xhr.setRequestHeader("Accept", "text/javascript");},
          complete: function() { $('#mugshots li a').lightBox(); }
      });
    }});
  });
      
  // add upload progress to forms
  $('form.progress').add(form).uploadProgress({
    start:function(){
      // after starting upload show progress bar in lightboxfu
      $.lightBoxFu.open({
        html: '<div id="uploading"><span id="received"></span><span id="size"></span><br/><div id="progress" class="bar"><div id="progressbar">&nbsp;</div></div><span id="percent"></span></div>',
        width: "250px",
        closeOnClick: false
      });
      $('#received').html("Upload starting.");
      $('#percent').html("0%");
    },
    uploading: function(upload) {
      // update upload info on each /progress response
      $('#received').html("Uploading: "+parseInt(upload.received/1024)+"/");
      $('#size').html(parseInt(upload.size/1024)+" kB");
      $('#percent').html(upload.percents+"%");
    },
    complete: function() {
      // after upload finished unblock UI
      $.lightBoxFu.close();
      $('.file').prev().trigger('click');
    },
    error: function() {
      // show error
      $.lightBoxFu.open({
        html: "There was an error while uploading files.",
        width: "250" 
      });
      // lightbox with error after 2 seconds
      window.setTimeout($.lightBoxFu.close, 2000);
    },
    interval: 2000
  });
});