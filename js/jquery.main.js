$(document).ready(function(){
	$('.text-slider-list').bxSlider({
		pager: false,
		auto: true
	});
	$('.how-work-list').bxSlider({
		pagerCustom: '#bx-pager'
	});
	// $('.doctor-list').bxSlider({
	// 	minSlides: 3,
	// 	maxSlides: 3,
	// 	slideWidth: 240,
	// 	slideMargin: 10
	// });
	$('.doctor-list-slider').slick({
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
			  breakpoint: 1024,
			  settings: {
			    slidesToShow: 3,
			    slidesToScroll: 3,
			    infinite: true,
			    dots: true
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
			    slidesToShow: 2,
			    slidesToScroll: 2
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
			    slidesToShow: 1,
			    slidesToScroll: 1
			  }
			}
		]
	});
	// select
	$(".custom-select select").dropdown();
});
