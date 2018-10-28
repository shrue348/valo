'use strict';


function number_format(number, decimals, dec_point, separator ) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof separator === 'undefined') ? ',' : separator ,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Р¤РёРєСЃРёРј Р±Р°Рі РІ IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}



// гл счетчик
$(function(){
  if(document.querySelector('[data-js="counter-days"]') && location.href == '/') {
    var counterDays = new Counter(document.querySelector('[data-js="counter-days"]')),
        counterHours = new Counter(document.querySelector('[data-js="counter-hours"]')),
        counterMinutes = new Counter(document.querySelector('[data-js="counter-minutes"]')),
        counterSeconds = new Counter(document.querySelector('[data-js="counter-seconds"]')),

    count = 0;

    var newDate = new Date(9,19,2018) //месяц день год для счетчика

    function Counter(el) {
      var current = el.querySelector('[data-js="current"]'),
          next = el.querySelector('[data-js="next"]'),
          count,
          timeout;

      function update(value) {
        // if(count === value) { return; }
        count = value;
        next.innerHTML = count;
        el.classList.add('is-changing');
        window.clearTimeout(timeout);
        timeout = window.setTimeout(function() {
          current.innerHTML = next.innerHTML;
          el.classList.remove('is-changing');
        }, 210);
      }
      
      return {
        update: update
      };
    }

    function increment() {
      count ++;
      if(count > 99) {
        count = 0;
      }

      var nowDate = Date.now(),
          resultTime = new Date(newDate - nowDate)

      resultTime.setHours(resultTime.getHours()-3)

      var days = resultTime.getDay();
      var hours = resultTime.getHours();
      var minutes = resultTime.getMinutes();
      var seconds = resultTime.getSeconds();

      if (days < 10) days = '0' + days
      if (hours < 10) hours = '0' + hours
      if (minutes < 10) minutes = '0' + minutes
      if (seconds < 10) seconds = '0' + seconds

      counterDays.update(days);
      counterHours.update(hours);
      counterMinutes.update(minutes);
      counterSeconds.update(seconds);
      
      setTimeout(increment, 60000);
    }

    increment()
  }
})

$(function() { 
  $('select.select').selectbox();
});  



// ждем загрузки картинок
$(window).load(function(){
  $('.header').addClass('loaded')
})


//плавный скролл к якорю
$(function(){ 
  $("a.scrollto").on('click touchend', function () {
    var elementClick = $(this).attr("href")
    var destination = $(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1200);
    return false;
  });
});


// маска формы
$(function(){
  $('[name=phone]').mask("+7 (999) 999-9999");
})


// переключалка гл меню
$(function(){
  $('.menu__toggle, .menu__toggle-inside').on('click', function(){
    $('.menu__wrap').toggleClass('menu__wrap-active')
    $('.menu').toggleClass('menu-active')
  })
})


// переключалка поиска
$(function(){
  $('.menu_hor__icon-search-toggle1').on('click', function(){
    $('.menu_icons_search-1').slideToggle()
  })

  $('.menu_hor__icon-search-toggle2').on('click', function(){
    $('.menu_icons_search-2').slideToggle()
  })
})

//вебкамера
$(function(){
  $('.photo_webcam__start').on('click', function(){
    $(this).next().show()
    $(this).remove()
  })
})


// анимации текста
$(function(){
  $('.header_title, .header_subtitle, .header_desc, .header_i, .header_counter').viewportChecker({ // хедер
    classToAdd: 'in',
    offset: 0,
    invertBottomOffset: true,
  });
  $('.animated').viewportChecker({
    classToAdd: 'in',
    offset: 100, //высота появления от низа экрана
    invertBottomOffset: true,
  });
})


// слайдеры
$(function(){
  $('.header_slider').slick({
    arrows: false,
    fade: true
  })

  $('.staff_slider_left').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.staff_slider_right',
    prevArrow: '<button type="button" class="staff_arrow staff_arrow-left"></button>',
    nextArrow: '<button type="button" class="staff_arrow staff_arrow-right"></button>',
    infinite: true
  });

  $('.staff_slider_right').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.staff_slider_left',
    arrows: false,
    focusOnSelect: true,
    infinite: true
  });

  $('.blog_list').slick({
    centerMode: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0',
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1600,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1023,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  })

  $('.photo_list').slick({
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,
    prevArrow: '<button type="button" class="photo_arrow photo_arrow-left"></button>',
    nextArrow: '<button type="button" class="photo_arrow photo_arrow-right"></button>',
  })

  $('.func_carousel').lunbo({
      num: 5,
      maxWidth: 500,
      maxHeight: 300,
      distance: 150,
      scale: 0.85,
      animationTime: 300,
      showTime: 4000
  });
})




// включаем слайдеры на мобильной
function sliders(){
  if (screen.width >= 1024) {
    $('.length__list.slick-initialized').slick('unslick');
    $('.invest_grid__row-1.slick-initialized, .invest_grid__row-2.slick-initialized, .invest_grid__row-3.slick-initialized').slick('unslick');
  } else {
    $('.length__list').not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      focusOnSelect: true,
      infinite: true,
      prevArrow: '<button type="button" class="length_arrow length_arrow-left"></button>',
      nextArrow: '<button type="button" class="length_arrow length_arrow-right"></button>'
    })
    $('.func_icons').not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      focusOnSelect: true,
      infinite: true,
      prevArrow: '<button type="button" class="func_icons_arrow func_icons_arrow-left"></button>',
      nextArrow: '<button type="button" class="func_icons_arrow func_icons_arrow-right"></button>'
    })    
    $('.invest_grid__row-1, .invest_grid__row-2, .invest_grid__row-3').not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      focusOnSelect: true,
      infinite: true,
      prevArrow: '<button type="button" class="invest_arrow invest_arrow-left"></button>',
      nextArrow: '<button type="button" class="invest_arrow invest_arrow-right"></button>'
    })
  }




  if (screen.width >= 1200) {
    $('.func_icons.slick-initialized').slick('unslick');
  } else {
    $('.func_carousel-slick>ul').not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      focusOnSelect: true,
      infinite: true,
      prevArrow: '<button type="button" class="func_arrow-slick func_arrow-slick-left"></button>',
      nextArrow: '<button type="button" class="func_arrow-slick func_arrow-slick-right"></button>'
    })
  }

  //ставим ширину слайдера как у слайда
  var w = $('.photo .photo_list').find('img').width()
  $('.photo .wide .wide__in:first-child').css({'flex': '0 0 '+w+"px"})
}
$(function(){ 
  sliders() 
  $(window).on('resize', function(){
     sliders()
  });
})



// переключалка банков
jQuery.fn.swap = function(b) {
  b = jQuery(b)[0];
  var a = this[0],
      a2 = a.cloneNode(true),
      b2 = b.cloneNode(true),
      stack = this;

  $(b).parent().removeClass('active')
  $(a).parent().removeClass('active')

  setTimeout(function(){
    a.parentNode.replaceChild(b2, a);
    b.parentNode.replaceChild(a2, b);

    $(a2).parent().addClass('active') //большая
    $(b2).parent().addClass('active') //текущая
  }, 200)

  stack[0] = a2;
  return this.pushStack( stack );
};
$(function(){
  $('.buy_cards_item ').on('click', function(){
    $(this).children().swap('.buy_cards_big .buy_cards_item__in');
  })
})



//карта
$(function(){
  if ( location.href == '/' ){
    ymaps.ready(init);

    function init() {
      var myMap = new ymaps.Map("map", {
          center: [55.76, 37.64],
          zoom: 14
      },{
          searchControlProvider: 'yandex#search'
      }),

      myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [55.76, 37.64]
        },
        properties: {
            iconContent: 'VALO',
            hintContent: 'Апарт-комплекс по-фински'
        }

      },{
        preset: 'islands#blackStretchyIcon',
        draggable: false
      });

      myMap.geoObjects.add(myGeoObject);
    }
  }
    
})



// узнать больше 
$(function(){
  let counter = 2

  $('.lvl__more').on('click', function(){
    $.get('_europe.html', function(data) {
      var elementClick = '.lvl__more'
      var destination = $(elementClick).offset().top;
      setTimeout(function(){
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1600);
      }, 300)
        
      $("#lvl").css({
          height: $("#lvl_inside").height()
      });
      $(data).appendTo('#lvl_inside')
      $("#lvl").css({
          height: $("#lvl_inside").height()
      });

      counter += 3

      setTimeout(function(){ //чтобы анимация была после скролла
        $('.animated').viewportChecker({
          classToAdd: 'in',
          offset: 100,
          invertBottomOffset: true,
        })
      },700)
    });
  })
})


//fancubox
$(function() {
  $(".fancybox").fancybox();
});


// Открываем страницы из select как в faq
$(function(){
  $('.left_menu_in-select').on('change', function(){
    location.href = $(this).val()
  })
})