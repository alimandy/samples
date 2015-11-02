var globeAccordion = {
	init : function(){
		$('.section .open').find('.mast-head-contents').show();
	},
	accordionToggle : function(section) {
		var target = $(section).find('li');
		$(target).click(function(){
			// close all open tabs
			$(this).closest('.section-list')
				.find('li').removeClass('open')
				.end().find('.mast-head-open').attr('class', 'mast-head')
				.end().find('.mast-head span').attr('class', 'accord-arrow')
				.end().find('.mast-head-contents').hide();

			// open clicked tab
			$(this).addClass('open');
			$(this).find('.mast-head').attr('class', 'mast-head-open')
				.end().find('.mast-head-open span').attr('class', 'accord-arrow-open');
			$('.open').find('.mast-head-contents').show();

      if ($(this).offset().top < $(document).scrollTop() + 66 ){
        $('html, body').animate({scrollTop: $(this).offset().top - 66}, 0);
      }
		});
	}
};

$(function() {
	//  scroll
	$(window).scroll(function(){
		scrollTrigger(275);
	});

	function sectionToggle(){ tabs.tabToggle('#sections', '#sections .tab-container', this); }
	function audienceToggle(){ tabs.tabToggle('#audience', '#audience .tab-container', this); }
	function advertisingToggle(){ tabs.tabToggle('#ad-ops', '#ad-ops .tab-container', this); }

	$(document).on('click', '#sections .tab-container', sectionToggle);
	$(document).on('click', '#audience .tab-container', audienceToggle);
	$(document).on('click', '#ad-ops .tab-container', advertisingToggle);

	//  tabs
	tabs.sectionLoad(['#sections', '#audience', '#ad-ops']);
	// accordion
	globeAccordion.init();
	globeAccordion.accordionToggle('#sections');
}); // END
