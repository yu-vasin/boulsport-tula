// default.js

var fminit=80;
var short_menu_on=0;
var news_shown = new Array();

function short_menu(){
	if(short_menu_on){
		short_menu_on=0;
		$('#shortmenu').css('display','none');
		$('#xmenu').attr("src","/imgs/menu.png");
	} else {
		short_menu_on=1;
		$('#shortmenu').css('display','block');
		$('#xmenu').attr("src","/imgs/nomenu.png");
	}
	return false;
}

(function($){ 
	$.fn.visible = function(partial){
		var $t= $(this),$w = $(window);
		if($t.offset()){
			var viewTop = $w.scrollTop(), 
				viewBottom = viewTop + $w.height(), 
				_top = $t.offset().top, 
				_bottom = _top + $t.height(), 
				compareTop = partial === true ? _bottom : _top, 
				compareBottom = partial === true ? _top : _bottom; 
			return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
		}
	};
})(jQuery);

function show_album(items){
	if(!items){
		$("#gallery").replaceWith('<div class="clear"></div>');
		return;
	}
	var photos = new Array(); photos = items.split(",");
	var out = '<ul id="imageGallery">';
	for (i=0;i<photos.length;i++){
		out = out + '<li data-thumb="/images/750x500_'+photos[i]+'" data-src="/images/750x500_'+photos[i]+'"><img src="/images/750x500_'+photos[i]+'" /></li>';
	}
	out= out + '</ul>';
	$("#gallery").html(out);
}

function show_news(page){
	if(!news_shown.length || news_shown[news_shown.length-1]!=page){
		news_shown[news_shown.length]=page;
		$.ajax({
			type: "GET", url: page, 
			cache: false, success: function(html){
				$("#nextnews").first().replaceWith(html);
			}
		});
	} 
}

$(function(){
	
	$(window).bind('scroll resize', function(e){
		//var elem1 = $('#shortmenu');
		//var elem2 = $('#top');
		//if($(window).width()>980){fminit=80;}
		//if($(window).width()>1219){fminit=94;}
		
		//console.log($(window).width());
		//console.log(elem2.offset().top,$(this).scrollTop());
		//if($(window).width()>980){
		//	if(elem1.offset().top-$(this).scrollTop()<=0 && elem1.offset().top>=fminit && $(this).scrollTop()){
		//		elem1.css('position', 'fixed');
		//		elem1.css('top', '0px');
		//		if (!elem1.hasClass('fixed')){elem1.addClass('fixed');}
		//	} else {
		//		elem1.css('position', 'relative');
		//		elem1.removeClass('fixed');
		//	}
		//} 
		
		//if($(window).width()>980){ // 823 (pixel2xl)pc mode was 768 (ipad)
		//	$('#shortmenu').css('display','block');
		//	$('#shortmenu ul li').hover(
		//		function() {
		//			$(this).addClass("active");
		//			$(this).find('.submc').show(); //slideDown('fast');
		//		},
		//		function() {
		//			$(this).removeClass("active");        
		//			$(this).find('.submc').hide(); // slideUp('fast');
		//		}
		//	);
		//} else {
		//	if(short_menu_on){$('#shortmenu').css('display','block');}
		//	else{$('#shortmenu').css('display','none');}
		//}
		
		//infinite list
		var nn = $('#nextnews');
		
		if($('#nextnews').visible(1)){
			var page = $('#nextnews').attr('rel');
			if(page) {show_news(page);}  
		}
	
	})
})


$(document).ready(function(){
	$("#promo").lightSlider({
			loop:true,
			autoWidth:false,slideMargin:0,pauseOnHover:true,
			easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
			item:1,
			auto:true,speed:1000,pause:5000,
			keyPress:true
		});	
		
	if($(window).width()>980){
		$('#shortmenu ul li').hover(
			function() {
				$(this).addClass("active");
				$(this).find('.submc').show(); //slideDown('fast');
			},
			function() {
				$(this).removeClass("active");        
				$(this).find('.submc').hide(); // slideUp('fast');
			}
		);
	}
	if($("#anounce").prop("class")){
		$("#anounce").lightSlider({
			slideMargin:0, pager:false, pauseOnHover:true, pause:5000,speed:2000,auto:true,loop:true,keyPress:true, controls:false, item:1
		});
	}

	if($("#partners").prop("class")){
		$("#partners").lightSlider({
		pager:false, pauseOnHover:true, pause:5000, controls:false,speed:2000,auto:true,loop:true,item:6,keyPress:true,responsive : [
			{ breakpoint:1200, settings: {item:6,slideMove:1,slideMargin:16,}},
			{ breakpoint:980,  settings: {item:5,slideMove:1,slideMargin:16,}},
			{ breakpoint:770,  settings: {item:4,slideMove:1,slideMargin:16,}},
			{ breakpoint:480,  settings: {item:2,slideMove:1,slideMargin:16}} ]
		});
	}
	
	if($("#gallery")){
		$('#imageGallery').lightSlider({
			gallery:true,
			item:1,
			loop:true,
			thumbItem:5,
			slideMargin:0,
			enableDrag: false,
			currentPagerPosition:'left'          
		});
	}
		
});