jQuery.noConflict();
jQuery(document).ready(function(){
  jQuery('.navbutton').click(function() {
    jQuery('body').toggleClass('show-nav');
  });
});