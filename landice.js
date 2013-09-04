(function ($) {	 
$.fn.ChangeSubmitButtonValue = function(valueToChangeTo) {
	$(this).val(valueToChangeTo)
};
})(jQuery);

(function ($) {	 
$.fn.SecondToLast = function(valueToChangeTo) {
	$(this).find("li.last").prev().addClass("secondToLast");
};
})(jQuery);

(function ($) {	 
$.fn.Placeholder = function() {
	var input = $(this);
	var inputDefault = $(this).attr("value");
	input.focus(function(){	
		if ($(this).val() === inputDefault) {
			$(this).val("");
			$(this).addClass("focused")
		}
	});	
	input.blur(function(){
		var inputValue = $(this).val();
		if (inputValue === "") {
			$(this).val(inputDefault);
			$(this).removeClass("focused")
		}
		else if (inputValue === " ") {
			$(this).val(inputDefault);
			$(this).removeClass("focused")
		}
	});
};
})(jQuery);

jQuery(document).ready(function($){

	$(".block-menu-mobile-menu-bottom ul").SecondToLast();
	
	$(".optionThumbs .views-row a").click(function(){
		$("html, body").animate({scrollTop: $('[name="' + $(this).attr('href').substr(1) + '"]').offset().top}, 500);
		return false;
	});
	$("#backToTopButton").click(function(){
		$("html, body").animate({scrollTop:0}, 500);
	});
	
	function mobileCarousel(argument){
		if (argument <= 600) {
			$(".page-node-1 .mainCarousel ul").carouFredSel({	
					width: '100%',
					items: 1,
					auto : {
						pauseOnHover: true
					},
					scroll: {
						items: 1,
						duration: 1000,
						timeoutDuration: 10000
					},
					swipe: {
						onTouch: true
					},
					prev: '#mainCarousel_prev',
					next: '#mainCarousel_next',
					pagination: '#mainCarousel_pag',
					responsive: true
			});		
		}
		else {
			$(".page-node-1 .mainCarousel ul").carouFredSel({	
					width: '100%',
					items: {
						visible: 3,
						start: -1
					},
					auto: {
						pauseOnHover: true
					},
					scroll: {
						items: 1,
						duration: 1000,
						timeoutDuration: 10000
					},
					swipe: {
						onTouch: true
					},
					prev: '#mainCarousel_prev',
					next: '#mainCarousel_next',
					pagination: {
						container: '#mainCarousel_pag',
						deviation: 1
					}		
			});
		}
	}
	
	
	var windowWidth = $(window).width();
	mobileCarousel(windowWidth);
	
	function equalHeights(group) {
		var tallest = 0;
		group.each(function() {
			var thisHeight = $(this).children().height();
			if(thisHeight > tallest) {
				tallest = thisHeight;
			}
		});
		group.height(tallest);	
	}

	equalHeights($(".block-views-market-landing-page-block .view-market-landing-page .views-row"));	
	equalHeights($(".view-call-out-module .view-content .views-row"));	

	$('#edit-field-dealer-type-tid option:contains("- Any -")').text("Dealer Type");
	
	$("#simplenews-block-form-15 .form-submit").ChangeSubmitButtonValue("");
	$(".page-search  .form-submit").ChangeSubmitButtonValue("");
	$("#simplenews-block-form-15 .form-text").ChangeSubmitButtonValue("Email Address");
	$(".node-type-blog #edit-submit").ChangeSubmitButtonValue("Submit");
	$("#zone-branding-wrapper #search-block-form--2 .form-text").ChangeSubmitButtonValue("Search");
	$("#zone-branding-wrapper #search-block-form--2 .form-text").Placeholder();
	$("#simplenews-block-form-15 .form-text").Placeholder();
	
	/* Dealer Locator */
	if ($(".page-dealer-locator #edit-distance-postal-code").val() == ""){	
		$(".page-dealer-locator #edit-distance-postal-code").ChangeSubmitButtonValue("Zip Code");
		$(".page-dealer-locator #edit-distance-postal-code").Placeholder();
		$(".pane-new-dealer-map-panel-pane-1").html("");
		$(".pane-new-dealer-map-panel-pane-1").css({marginTop: "100px"});
	}
	$(".page-dealer-locator #edit-distance-search-distance").ChangeSubmitButtonValue("Distance");
	$(".page-dealer-locator #edit-distance-search-distance").Placeholder();
	
	$("#edit-submit-new-dealer-map").click(function(){
		if ($("#edit-distance-search-distance").val() == "Distance") {
			$("#edit-distance-search-distance").val("30");
		}
		if ($(".page-dealer-locator #edit-distance-postal-code").val() == "Zip Code"){	
			$(".page-dealer-locator #edit-distance-postal-code").val("");
		}
	});
	if ($(".distanceBlock").html() == "") {
		$(".distanceBlock").parent().hide();
	}

	$('#views-exposed-form-new-dealer-map-panel-pane-1').submit(function() {
	
	if($("#edit-distance-postal-code").val() == "")
	{
	$('#edit-distance-postal-code').css('border-color', 'red !important');
		return false;
	}
	else
	{
		$('.pane-new-dealer-map-panel-pane-1').show();
		return true;
	}

	});
	
	/*END Dealer Locator */
	
	$(".block-subnav-minipanel .view-header").click(function(){
		if (windowWidth < 600) {
			$(this).toggleClass("active");
			$(this).next().children().slideToggle();
		}
	});

	$("#block-search-form .element-invisible").click(function() {
        if (!$("#block-search-form").hasClass("active")) {     
			$("#block-search-form").animate({width:200}, 500, function(){
					$("#block-search-form").addClass("active");					
			});
        }
        else {
			$("#block-search-form").removeClass("active");
			$("#block-search-form").animate({width:13}, 500);
        }
    });
	
	$(".nav_share_wrapper").hover(function(){
		$(this).toggleClass("active");
	});
	
	$(".node-type-product-control-panel fieldset.horizontal-tabs-pane").each(function(){
		var $this = $(this);
		var firstFieldItem = $this.find(".field-items").first();
		firstFieldItem.children(".field-item").addClass("controlPanelRow");
		$this.find(".field-item").first().addClass("firstItem");
		firstFieldItem.children(".field-item:last-child").addClass("lastItem");
	});
	
	$(".node-type-product-construction  .view-product-construction .views-row").each(function(){
		var $this = $(this);
		var firstFieldItem = $this.find(".field-items").first();
		firstFieldItem.children(".field-item").addClass("constructionPanelRow");
		$this.find(".field-item").first().addClass("firstItem");
		firstFieldItem.children(".field-item:last-child").addClass("lastItem");
	});
	
	
	$(".view-faqs p").hide();
	
	$(".faq-question").click(function() {
		var allFaqPara = $(this).parent().find("p");
		$(this).parent().toggleClass("active");
		if(allFaqPara.is(":hidden") == true) {
			allFaqPara.slideDown("normal");
		 }		  
		 else allFaqPara.slideUp("normal");
	});
	
	$(".international .content .dealers").each(function(){
		$(this).css({height: $(this).height()});
	});
	$(".international .content .dealers").hide();
	$(".international .content .views-row .internationalHeader").click(function() {
		var allInternational = $(this).next();
		$(this).parent().parent().parent().toggleClass("active");
		allInternational.slideToggle()
	});
	
	$(".view-product-construction.view-display-id-attachment_1 li").first().addClass("active");
	$(".view-product-construction.view-display-id-attachment_1 li").click(function(){
		$(".view-product-construction.view-display-id-attachment_1 li").removeClass("active");
		$(this).addClass("active");
		$index = $(this).index();
		$(".view.view-product-construction .video-module-list li").hide();
		$(".view.view-product-construction .video-module-list li:eq("+$index+")").show();
	});
	
	$(".not-logged-in #messages").click(function(){
		$(this).hide();
	});
	 
	  var switched = false;
	  var updateTables = function() {
		if (($(window).width() < 900) && !switched ){
		  switched = true;
		  $("table.responsive").each(function(i, element) {
			splitTable($(element));
		  });
		  return true;
		}
		else if (switched && ($(window).width() > 900)) {
		  switched = false;
		  $("table.responsive").each(function(i, element) {
			unsplitTable($(element));
		  });
		}
	  };   
		
	function splitTable(original)	{
		original.wrap("<div class='table-wrapper' />");		
		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("responsive");		
		original.closest(".table-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");
	}
	
	function unsplitTable(original) {
    original.closest(".table-wrapper").find(".pinned").remove();
    original.unwrap();
    original.unwrap();
	}
	
	$(window).load(function () {
		$(".not-logged-in #messages").delay(3000).fadeOut("slow");
		updateTables();
	});
	
	$(window).resize(function() {
		windowWidth = $(window).width();
		mobileCarousel(windowWidth);
		equalHeights($(".block-views-market-landing-page-block .view-market-landing-page .views-row"));
		equalHeights($(".view-call-out-module .view-content .views-row"));	
		updateTables();		
	});
	
	
	var $topValue = $("#zone-branding-wrapper").css("top");
	$("#mobileMenuButton").click(function(){
		var $this = $(this);
		if (!$this.hasClass("active") && !$("#zone-branding-wrapper").hasClass("animating")){
			$("#zone-branding-wrapper").addClass("animating").animate({top: 0}, 500, function(){
				$this.addClass("active");
				$("#zone-branding-wrapper").removeClass("animating");
			});
		}
		else {
			$("#zone-branding-wrapper").addClass("animating").animate({top: $topValue}, 500, function(){
				$this.removeClass("active");
				$("#zone-branding-wrapper").removeClass("animating");
			});
		}
	});
	
	
	 /* $("#views-exposed-form-new-dealer-map-panel-pane-1").validate({ 
	    rules: { 
	      distance[postal_code]: "required",    // simple rule, converted to {required: true} 
       }, 
	  }); */
 
	
}); //end document
