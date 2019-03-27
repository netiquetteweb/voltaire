jQuery(document).ready(function(){
  jQuery.noConflict();
    jQuery('.navbutton').click(function() {
      jQuery('body').addClass('show-nav');
       return false;
    });
});