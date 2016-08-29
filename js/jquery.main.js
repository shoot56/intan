$(document).ready(function(){
	$('<div class="FixMobile"></div>').appendTo('body');
	setTimeout(function(){
		$('.text-slider-list').bxSlider({
			pager: false,
			auto: true
		});
	}, 100);
	$('.how-work-list').bxSlider({
		pagerCustom: '#bx-pager'
	});
	$('.doctor-list-slider').slick({
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
			  breakpoint: 991,
			  settings: {
			    slidesToShow: 2,
			    slidesToScroll: 2
			  }
			},
			{
			  breakpoint: 750,
			  settings: {
			    slidesToShow: 1,
			    slidesToScroll: 1
			  }
			}
		]
	});
	// select
	$(".custom-select select").dropdown();
	// popup
	$('body').popup({
		"opener":".write-popup-opener",
		"popup_holder":"#write-popup",
		"popup":".popup",
		"close_btn":".close"
	});
	// active input
	$('.input-holder input').focus(function(){
		$(this).closest('.input-holder').addClass('parent-focus');
	}).blur(function(){
		$(this).closest('.input-holder').removeClass('parent-focus');
	});
	// load more address list in tablet and mobile device
	$('.load-more').click(function(e){
		  e.preventDefault();
		  seeMore('.address-list', 2);
	});
	// nav opener
	$(".nav-opener").click(function(e) {
		e.preventDefault();
		$('#header').addClass('nav-active');
	});
	$(".nav-close").click(function(e) {
		e.preventDefault();
		$('#header').removeClass('nav-active');
	});
	navScroll();
	yMapInitNvr();
	yMapInitKrd();
	// scroll animate
	if($('.FixMobile').is(':visible')){
		new WOW().init();
	}
	
});



seeMore = function(target, count){
    $(target).find('.hidden').each(function(e){
        if ( e > count ) return;
        $(this).removeClass('hidden');
    });
    if ( !$(target).find('.hidden').length ) $('.load-more').hide();
};

$.fn.popup = function(o){
	var o = $.extend({
		"opener":".call-back a",
		"popup_holder":"#call-popup",
		"popup":".popup",
		"close_btn":".btn-close",
		"close":function(){},
		"beforeOpen": function(popup) {
			$(popup).css({
				'left': 0,
				'top': 0
			}).hide();
		}
	},o);
	return this.each(function(){
		var container=$(this),
			opener=$(o.opener,container),
			popup_holder=$(o.popup_holder,container),
			popup=$(o.popup,popup_holder),
			close=$(o.close_btn,popup),
			bg=$('.bg',popup_holder);
			popup.css('margin',0);
			opener.click(function(e){
				o.beforeOpen.apply(this,[popup_holder]);
				popup_holder.fadeIn(400);
				alignPopup();
				bgResize();
				e.preventDefault();
			});
		function alignPopup(){
			var deviceAgent = navigator.userAgent.toLowerCase();
			var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/i);
			if(agentID){
				if(popup.outerHeight()>window.innerHeight){
					popup.css({'top':$(window).scrollTop(),'left': ((window.innerWidth - popup.outerWidth())/2) + $(window).scrollLeft()});
					return false;
				}
				popup.css({
					'top': ((window.innerHeight-popup.outerHeight())/2) + $(window).scrollTop(),
					'left': ((window.innerWidth - popup.outerWidth())/2) + $(window).scrollLeft()
				});
			}else{
				if(popup.outerHeight()>$(window).outerHeight()){
					popup.css({'top':$(window).scrollTop(),'left': (($(window).width() - popup.outerWidth())/2) + $(window).scrollLeft()});
					return false;
				}
				popup.css({
					'top': (($(window).height()-popup.outerHeight())/2) + $(window).scrollTop(),
					'left': (($(window).width() - popup.outerWidth())/2) + $(window).scrollLeft()
				});
			}
		}
		function bgResize(){
			var _w=$(window).width(),
				_h=$(document).height();
			bg.css({"height":_h,"width":_w+$(window).scrollLeft()});
		}
		$(window).resize(function(){
			if(popup_holder.is(":visible")){
				bgResize();
				alignPopup();
			}
		});
		if(popup_holder.is(":visible")){
				bgResize();
				alignPopup();
		}
		close.add(bg).click(function(e){
			var closeEl=this;
			popup_holder.fadeOut(400,function(){
				o.close.apply(closeEl,[popup_holder]);
				$('.video-popup iframe').attr('src','');
			});
			e.preventDefault();
		});
		$('body').keydown(function(e){
			if(e.keyCode=='27'){
				popup_holder.fadeOut(400);
			}
		})
	});
};

function navScroll(){
	var _top= $(window).height()-0;
	var block = $('.section-slide');
	var _t;
	$(window).scroll(function(){
		var _delta = -0;
		var _sections = [];
		var wS = $(window).scrollTop();
		block.each(function(){
			_sections.push($(this).offset().top+_delta);
		});
		$.each(_sections, function(i, val){
			if (i>0){
				if (i==_sections.length-1){
					if (wS>=val){
						$('#nav li').removeClass('active');
						$('#nav li').eq(i).addClass('active');
					}
				} else {
					if ((wS>=val)&&(wS<_sections[i+1])){
						$('#nav li').removeClass('active');
						$('#nav li').eq(i).addClass('active');
					}
				}
			} else {
				if ((wS>= _top)&&(wS<_sections[i+1])){
					$('#nav li').removeClass('active');
					$('#nav li').eq(i).addClass('active');
				}
			}
		});
	});
	$('.main-nav a').click(function(e){
		$('html, body').animate({scrollTop:block.eq($(this).parent().index()).offset().top}, 600);
		e.preventDefault();
		$('#header').removeClass('nav-active');
	});
}
yMapInitKrd = function(){
	if(!$('#map_krd').size())return;
   ymaps.ready(init);
   var myMap;

   function init(){
       myMap = new ymaps.Map("map_krd", {
           center: [45.0411651, 38.9517059],
           zoom: 12,
           controls: []
       });
       myMap.behaviors.disable('scrollZoom');
       myMap.controls.add('zoomControl', { left: 5, top: 5 });
       myMap.controls.add('typeSelector');
       var myPlacemark = new ymaps.Placemark([45.0384744, 38.9105], {
           balloonContent: 'Восточно-Кругликовская, д. 46/11; <br>261-60-04'
       }, {
            iconLayout: 'default#image',
            iconImageHref: 'images/map-marker.png',
            iconImageSize: [42, 51],
            iconImageOffset: [-21, -25]
        });
        var myPlacemark1 = new ymaps.Placemark([45.0595422, 39.027488], {
            balloonContent: 'Восточно-Кругликовская, д. 46/11; <br>261-60-04'
        }, {
             iconLayout: 'default#image',
             iconImageHref: 'images/map-marker.png',
             iconImageSize: [42, 51],
             iconImageOffset: [-21, -25]
         });
        myMap.geoObjects.add(myPlacemark);
        myMap.geoObjects.add(myPlacemark1);
   }
};
yMapInitNvr = function(){
	if(!$('#map_nvr').size())return;
   ymaps.ready(init);
   var myMap;

   function init(){
       myMap = new ymaps.Map("map_nvr", {
           center: [44.67934, 37.780805],
           zoom: 14,
           controls: []
       });
       myMap.behaviors.disable('scrollZoom');
       myMap.controls.add('zoomControl', { left: 5, top: 5 });
       myMap.controls.add('typeSelector');
       var myPlacemark = new ymaps.Placemark([44.67934, 37.780805], {
           balloonContent: 'пр. Дзержинского, д.198<br> 79-21-20'
       }, {
            iconLayout: 'default#image',
            iconImageHref: 'images/map-marker.png',
            iconImageSize: [42, 51],
            iconImageOffset: [-21, -25]
        });
        myMap.geoObjects.add(myPlacemark);
   }
};