jQuery.noConflict();
jQuery(document).ready(function(){
  jQuery('.navbutton').click(function() {
    jQuery('body').toggleClass('show-nav');
  });
  var states = [
	'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
	'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
	'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
	'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
	'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
	'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
	'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
	'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
	'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];
  jQuery(function() {
    jQuery("#autocomplete").autocomplete({
      source:[states]
    }); 
  });
  jQuery(function() {
    jQuery("#autocomplete1").autocomplete({
      source:[states]
    }); 
  });
  jQuery(function() {
    jQuery("#autocomplete2").autocomplete({
      source:[states]
    }); 
  });
  jQuery('#tokenfield').tokenfield({
    autocomplete: {
      source: ['Diving','Driving','Dating','Dancing','Cricket'],
      delay: 100
    },
    showAutocompleteOnFocus: true
  })
});