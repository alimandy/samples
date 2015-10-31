$(function () {
	//  scroll
	$(window).scroll(function(){
		scrollTrigger(275);
	});

	//initial style change....may be a better css only solution
	$('.circle h4').each(function(i,e){
	    $(this).css({'padding-top':(150/2)-(getHeight($(this))/2)});
	});
	//-----
	$('.parallax').each(function(){
		var start = $(this).offset().top - $(window).height();
		start = (start<0?0:start);
		$(this).parallax({
			"coeff":-0.25,
			"start":start
		});
	});

	$('.black-burger').on('click',function () {
		$(this).parents('ul').first().toggleClass('open');
	});

  $('.menu-wrap a').click(function(e){
      e.preventDefault();
      if ($(this).data()){
          var section = '#' + $(this).attr('data-scrollto');
          $(this).parents('ul').first().toggleClass('open');

          var topOffset;
          if($('.dne-mobile-menu').is(':visible')){
            topOffset = 304;
          } else {
            topOffset = 78;
          }
          console.log(topOffset);
          $("html, body").animate({ scrollTop: $(section).offset().top - topOffset }, 1000);
      }
  });
  $(window).resize(function(){
    if($('.dne-mobile-menu').find('.black-burger').is(':hidden')){
      $('.scroll-nav nav').show();
    }else{
      $('.scroll-nav nav').hide();
    }
  });

	$('.circle,.block').on('click', function (e) {
	    if ($(this).hasClass('active')) {
	        setInactive(this,{'left':e.pageX - $(this).offset().left,'top':e.pageY - $(this).offset().top});
	    } else {
	        if($('.circle.active').length){
	            setInactive($('.circle.active'),{'left':75,'top':75});
	        }
	        setActive(this,{'left':e.pageX - $(this).offset().left,'top':e.pageY - $(this).offset().top});
	    }
	});
	$('.staff').on('click', function (e) {
	    //open/close
	    if($(this).hasClass('open')){
			$(this).removeClass('open');
			$(this).stop().animate({'height':'60px'},function () {
				$(this).attr('style', function(i, style){
				    return style.replace(/height[^;]+;?/g, '');
				});
			});
			$(this).children().first().removeClass('arrow-up arrow-down').addClass('arrow-down');
	    }else{
			$(this).removeClass('open').addClass('open');
	    	$(this).stop().animate({'height':getHeight($(this),true)});
			$(this).children().first().removeClass('arrow-up arrow-down').addClass('arrow-up');
	    }
	});
});

function setActive(element,pos){

    	var selector = "div[data-info='" + $(element).data('info') + "']";
    	$(selector).each(function (i,e) {
    		$(e).addClass('active');
    		if($(e).hasClass('block')){
    			$(e).find('.arrow-up,.arrow-down').removeClass('arrow-down arrow-up').addClass('arrow-up');
    		}
	        if($(e).hasClass('circle')){
		        $(e).stop().animate({
		            'color': '#fff'
		        },800);
		        $(e).find('.fill').css({'left':pos.left,'top':pos.top}).stop().animate({
		            'width': '300px',
		                'height': '300px',
		                'left': parseInt(pos.left) - 150,
		                'top': parseInt(pos.top) - 150
		        }, 600, function () {
		            $(this).parent().css({
		                'background': '#92c251'
		            });
		        });
		    }
    	});
        //copy -- cross
        var infoElements = $('.' +  $(element).data('info'));
        infoElements.each(function (i,e) {
	        if($(e).length){
	        	var element = $(e);
		        $(e).stop().animate({'height':getHeight($(e)) + 'px','padding-top':'10px','padding-bottom':'10px'},{
		        		'queue':false,
		        		'complete':function(){
				        	element.css({'height':'auto'});
				        }
		        	});
		    }
        });
}
function setInactive(element,pos){
    	var selector = "div[data-info='" + $(element).data('info') + "']";
    	$(selector).each(function (i,e) {
    		$(e).removeClass('active');
    		if($(e).hasClass('block')){
    			$(e).find('.arrow-up,.arrow-down').removeClass('arrow-down arrow-up').addClass('arrow-down');
    		}
	        if($(e).hasClass('circle')){
		        $(e).css({
		            'background': '#fff'
		        });
		        $(e).stop().animate({
		            'color': '#92c251'
		        },600);
		        $(e).find('.fill').stop().animate({
		            'width': '0px',
		                'height': '0px',
		                'left': parseInt(pos.left),
		                'top': parseInt(pos.top)
		        }, 600);
		    }
    	});
        //copy
        var infoElements = $('.' +  $(element).data('info'));
        infoElements.each(function (i,e) {
	        if($(e).length){
		        $(e).css({'height':getHeight($(e)) + 'px'}).stop().animate({'height':'0px','padding-top':'0px','padding-bottom':'0px'},{'queue':false});
		    }
        });
}
//gets the height of element if if it or its parents are hidden
function getHeight(element,full){
	if($(element).height() > 0 && !full){
		return $(element).height();
	}else{
		var clone = $(element).clone().insertAfter(element);
		var height = /*clone.css({
			'position':'fixed',
			'display':'block',
			'visibility':'hidden'
		}).height() + */clone.css({
					//'position':'fixed',
					'display':'block',
					'visibility':'hidden',
					'height':'auto'
				}).get(0).scrollHeight;
		if(!height){
			var parents = $(clone).parents().not('body, html');
			//check for hidden parents
			if(parents.is(':hidden')){
				clone.addClass('clone-in-super-clone-super');
				var superClone,parent;
				//clone and show outer most hidden parent
				for (var i = parents.length - 1; i >= 0; i--) {
					if($(parents[i]).is(':hidden')){
						superClone = $(parents[i]).clone();
						parent = $(parents[i]);
						break;
					}
				}
				var parentCloneElement = superClone.insertAfter(parent).find('.clone-in-super-clone-super');
				parentCloneElement.show().parents().each(function (i,e) {
					$(e).show();
				});
				height = /*parentCloneElement.css({
					'position':'fixed',
					'display':'block',
					'visibility':'hidden'
				}).height() + */parentCloneElement.css({
					//'position':'fixed',
					'display':'block',
					'visibility':'hidden',
					'margin':'0px',
					'padding':'0px'
				}).get(0).scrollHeight;
				superClone.remove();
			}
		}
		clone.remove();
		return height;
	}
}
function getWidth(element){
	if($(element).width() > 0){
		console.log('height read as:' + $(element).height());
		return $(element).width();
	}else{
		var clone = $(element).clone().insertAfter(element);
		var width = clone.css({
			//'position':'fixed',
			'display':'block',
			'visibility':'hidden'
		}).width() + clone.get(0).scrollWidth;
		// if(!height){
		// 	$(clone).appendTo('body');
		// 	height = clone.height() + clone.get(0).scrollHeight;
		// 	console.log('parent is hidden');
		// }
		console.log('height calculated as:' + height);
		clone.remove();
		return width;
	}
}
