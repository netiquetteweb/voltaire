jQuery.noConflict();
jQuery(document).ready(function(){
  jQuery('.navbutton').click(function() {
    jQuery('body').toggleClass('show-nav');
  });
  jQuery('#tokenfield').tokenfield({
    autocomplete: {
      source: ['Diving','Driving','Dating','Dancing','Cricket'],
      delay: 100
    },
    showAutocompleteOnFocus: true
  })
});