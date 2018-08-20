
(function($){
	"use strict";

	// Detect Mobile Device
	var gdlr_core_mobile = false;
	if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/Windows Phone/i) ){ 
		gdlr_core_mobile = true; 
	}else{ 
		gdlr_core_mobile = false; 
	}


	// Detect Screen
	var gdlr_core_display = 'desktop';
	if( typeof(window.matchMedia) == 'function' ){
		$(window).on('resize themename-set-display gdlr-core-element-resize', function(){
			if( window.matchMedia('(max-width: 419px)').matches ){
				gdlr_core_display = 'mobile-portrait';
			}else if( window.matchMedia('(max-width: 767px)').matches ){
				gdlr_core_display = 'mobile-landscape'
			}else if( window.matchMedia('(max-width: 959px)').matches ){
				gdlr_core_display = 'tablet'
			}else{
				gdlr_core_display = 'desktop';
			}
		});
		$(window).trigger('themename-set-display');
	}else{
		$(window).on('resize themename-set-display gdlr-core-element-resize', function(){
			if( $(window).innerWidth() <= 419 ){
				gdlr_core_display = 'mobile-portrait';
			}else if( $(window).innerWidth() <= 767 ){
				gdlr_core_display = 'mobile-landscape'
			}else if( $(window).innerWidth() <= 959 ){
				gdlr_core_display = 'tablet'
			}else{
				gdlr_core_display = 'desktop';
			}
		});
		$(window).trigger('themename-set-display');
	}
	
	// parallax background
	$.fn.gdlr_core_parallax_background = function( filter_elem ){

		if( typeof(filter_elem) == 'undefined' ){
			var elem = $(this).find('.gdlr-core-parallax');
		}else{
			var elem = filter_elem.filter('.gdlr-core-parallax');
		}	
		
		elem.each(function(){ 
			new gdlr_core_parallax($(this)); 
		});

		return $(this);
	}
	
	var gdlr_core_parallax = function(t){
		
		this.wrapper_bg = t;
		this.wrapper = t.parent(); // background-wrap
		
		this.parallax_speed = parseFloat(t.attr('data-parallax-speed'));

		this.init();
	}
	gdlr_core_parallax.prototype = {
		
		init: function(){
			
			var t = this;

			// scroll event
			if( t.parallax_speed != 0 ){
				t.set_extra_height();
				t.set_background_position(t);
				$(window).on('load resize gdlr-core-element-resize', function(){ 
					t.set_extra_height($(this)); 
					t.set_background_position(t);
				});

				$(window).on('scroll', function(){ 
					t.set_background_position(t);
				});
			}
		
			
		}, // init
		
		set_extra_height: function(){
			
			var t = this;
			
			var new_height = t.wrapper.outerHeight();
			if( gdlr_core_display == 'mobile-landscape' || gdlr_core_display == 'mobile-portrait' ){
				t.wrapper_bg.css({'transform': ''});
			}else{
				if( t.parallax_speed > 0){
					new_height += (($(window).height() - t.wrapper.outerHeight()) * t.parallax_speed);
				}else if( t.parallax_speed < 0){
					new_height += (($(window).height() + t.wrapper.outerHeight()) * Math.abs(t.parallax_speed));
				}
			}
			t.wrapper_bg.css({height: new_height});
			
		}, // set_extra_height
		
		set_background_position: function( t ){

			if( gdlr_core_display == 'mobile-landscape' || gdlr_core_display == 'mobile-portrait' ) return;
			
			var wrapper_top = t.wrapper.offset().top;
			var scroll_pos = $(window).scrollTop();

			if( scroll_pos + $(window).height() > wrapper_top && 
				scroll_pos < wrapper_top + t.wrapper.outerHeight() ){
				
				if( t.parallax_speed > 0 ){
					t.wrapper_bg.css({'transform': 'translate(0px, ' + (($(window).scrollTop() - wrapper_top) * t.parallax_speed) + 'px)'});
				}else if( t.parallax_speed < 0 ){
					t.wrapper_bg.css({'transform': 'translate(0px, ' + (($(window).scrollTop() + $(window).height() - wrapper_top) * t.parallax_speed) + 'px)'});
				}
			}
		}
	}; // gdlr_core_parallax
	
})(jQuery);


$(document).ready(function(){
	$('body').each(function(){
		var gdlr_core_js = $(this).find('.gdlr-core-js');
		$(this).gdlr_core_parallax_background( gdlr_core_js );
	});
});