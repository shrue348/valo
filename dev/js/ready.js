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

// back to top

$(function(){
  $("#backToTop").addClass('hide'); //Back to top
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#backToTop').removeClass('hide');
    } else {
      $('#backToTop').addClass('hide');
    }
  })
})

// back to top

$(function(){
  $('.call_btns_item-up').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 700);
    return false;
  });
})

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

  $('.managers_list').slick({
    slidesToShow: 4,
    slidesToScroll: 1,

    prevArrow: '<button type="button" class="staff_arrow staff_arrow-left"></button>',
    nextArrow: '<button type="button" class="staff_arrow staff_arrow-right"></button>',
    infinite: true
  });

  $('.func_carousel').lunbo({
      num: 5,
      maxWidth: 500,
      maxHeight: 300,
      distance: 150,
      scale: 0.85,
      animationTime: 300,
      showTime: 4000
  });

  $('.news_list').slick({
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    // arrows: false,
    centerPadding: '0px',
    prevArrow: '<button type="button" class="staff_arrow-inside staff_arrow-inside-left"></button>',
    nextArrow: '<button type="button" class="staff_arrow-inside staff_arrow-inside-right"></button>',
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0',
          slidesToShow: 3
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


  $('.news_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: '<button type="button" class="staff_arrow-inside staff_arrow-inside-left"></button>',
    nextArrow: '<button type="button" class="staff_arrow-inside staff_arrow-inside-right"></button>',
  })  



  $('.location_gal__list').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: true,
    prevArrow: '<button type="button" class="staff_arrow-inside staff_arrow-inside-white staff_arrow-inside-left"></button>',
    nextArrow: '<button type="button" class="staff_arrow-inside staff_arrow-inside-white staff_arrow-inside-right"></button>',
  })

  

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

  // building slider

  if (screen.width > 480) {

    if (window.isMobile) {
      console.log('tack')

      $('.building_slider.slick-initialized').slick('unslick');
      $('.building_slider-inside.slick-initialized').slick('unslick');
    }

    $('.building_slider:not(.slick-initialized)').slick({
      slidesPerRow: 3,
      rows: 2,
      swipeToSlide: true,
      arrows: true,
      prevArrow: '<button type="button" class="staff_arrow staff_arrow-left"></button>',
      nextArrow: '<button type="button" class="staff_arrow staff_arrow-right"></button>',
      responsive: [
        {
          breakpoint: 980,
          settings: {
            slidesPerRow: 2,
            rows: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            rows: 1
          }
        }
      ]
    });

    $('.building_slider-inside:not(.slick-initialized)').slick({
      slidesPerRow: 3,
      rows: 2,
      swipeToSlide: true,
      arrows: true,
      prevArrow: '<button type="button" class="staff_arrow-inside staff_arrow-inside-left"></button>',
      nextArrow: '<button type="button" class="staff_arrow-inside staff_arrow-inside-right"></button>',
      responsive: [
        {
          breakpoint: 980,
          settings: {
            slidesPerRow: 2,
            rows: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            rows: 1
          }
        }
      ]
    })  

    window.isMobile = false

  } else {

    if (!window.isMobile){
      console.log('tick')

      $('.building_slider.slick-initialized').slick('unslick');
      $('.building_slider-inside.slick-initialized').slick('unslick');
    }

    $('.building_slider:not(.slick-initialized)').slick({
      //centerMode: true,
      slidesPerRow: 1,
      rows: 1,
      swipeToSlide: true,
      arrows: true,
      prevArrow: '<button type="button" class="staff_arrow staff_arrow-left"></button>',
      nextArrow: '<button type="button" class="staff_arrow staff_arrow-right"></button>',
  
    });

    $('.building_slider-inside:not(.slick-initialized)').slick({
      //centerMode: true,
      slidesPerRow: 1,
      rows: 1,
      swipeToSlide: true,
      arrows: true,
      prevArrow: '<button type="button" class="staff_arrow-inside staff_arrow-inside-left"></button>',
      nextArrow: '<button type="button" class="staff_arrow-inside staff_arrow-inside-right"></button>',

    })  

    window.isMobile = true

  }


  //ставим ширину слайдера как у слайда
  var w = $('.photo .photo_list').find('img').width()
  $('.photo .wide .wide__in:first-child').css({'flex': '0 0 '+w+"px"})
}
$(function(){ 
  if (screen.width > 480) window.isMobile = false
  else window.isMobile = true

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

// узнать больше 

$(function(){
  let counter = 2

  $('.lvl__more').on('click', function(){
    var data = '<div class="lvl_item wide"><div class="wide__in"><div class="lvl_item__img"><div class="gdlr-core-pbf-background-wrap"><div class="gdlr-core-parallax gdlr-core-js" data-parallax-speed="0" style="background-image: url(img/lvl_1.jpg);"></div></div></div></div><div class="wide__in"><div class="lvl_item__info animated fade fade-right"><img src="img/lvl_icon_1.png" alt="БАССЕЙН и SPA" class="lvl_item__ico"><div class="lvl_item__title">Бассейн и SPA</div><div class="lvl_item__desc">Собственный бассейн и SPA-комплекс в апарт-отеле − огромное преимущество при прохождении сертификации. Эти услуги позволят гостям комплекса хорошо проводить время в отеле, заняться здоровьем, внешностью и расслабиться в перерывах между работой, деловыми мероприятиями, осмотром достопримечательностей города и т. д. И главное  − жителям VALO никуда не придется ехать. Достаточно просто спуститься на первый этаж собственного апарт-комплекса, где их ждут просторный бассейн и разнообразные SPA-услуги.</div></div></div></div><div class="lvl_item wide"><div class="wide__in"><div class="lvl_item__img"><div class="gdlr-core-pbf-background-wrap"><div class="gdlr-core-parallax gdlr-core-js" data-parallax-speed="0" style="background-image: url(img/lvl_2.jpg);"></div></div></div></div><div class="wide__in"><div class="lvl_item__info animated fade fade-left"><img src="img/lvl_icon_2.png" alt="Фитнес" class="lvl_item__ico"><div class="lvl_item__title">Фитнес</div><div class="lvl_item__desc">Спорт и фитнес − неотъемлемая часть жизни в большом городе. В путешествиях туристы  обращают внимание на наличие спортзала при отеле или в апартаментах − это уже стало стандартом, а не роскошью. Фитнес-клуб VALO позволит гостям комплекса постоянно поддерживать себя в форме и заниматься по удобному для себя графику. Залы будут оборудованы современными разнообразными тренажерами на любой вкус, а профессиональные тренеры помогут разработать программу спортивных занятий в зависимости от пожеланий клиента. </div></div></div></div><div class="lvl_item wide"><div class="wide__in"><div class="lvl_item__img"><div class="gdlr-core-pbf-background-wrap"><div class="gdlr-core-parallax gdlr-core-js" data-parallax-speed="0" style="background-image: url(img/lvl_3.jpg);"></div></div></div></div><div class="wide__in"><div class="lvl_item__info animated fade fade-right"><img src="img/lvl_icon_3.png" alt="Клининг" class="lvl_item__ico"><div class="lvl_item__title">Клининг</div><div class="lvl_item__desc">Служба клининга актуальна для тех, у кого нет времени или желания заниматься домашними делами. Профессиональная уборка позволяет поддерживать апартаменты в чистоте. У вас будут работать опытные специалисты, превосходно разбирающиеся во всех тонкостях своего дела. При этом они используют только качественное оборудование и экологичные моющие средства. Наша служба безопасности гарантирует квалификацию и надежность каждого сотрудника.</div></div></div></div>'
    var elementClick = '.lvl__more'
    var destination = $(elementClick).offset().top;
    setTimeout(function(){
      jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1600);
    }, 300)
      
    $("#lvl").css({ height: $("#lvl_inside").height()});
    $('.lvl_items-hidden').slideToggle()
    $(this).slideToggle()
    $("#lvl").css({ height: $("#lvl_inside").height()});

    counter += 3

    setTimeout(function(){ //чтобы анимация была после скролла
      $('.animated').viewportChecker({
        classToAdd: 'in',
        offset: 100,
        invertBottomOffset: true,
      })
    },700)
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

// не закрывать фильтр при клике на чекбоксы

$(function(){
  $(document).on('click', '.filter .dropdown .dropdown_data', function (e) {
    e.stopPropagation();
  });
})

// включаем второй каталог при ресайзе меньше 1200 

$(function () {
  function setCat () {
    $('.app_list').addClass('loading'); 

    setTimeout(() => { 
      $('.app_list').removeClass('app_list-list').addClass('app_list-grid')
    }, 100); 

    setTimeout(() => { 
      $('.app_list').removeClass('loading')
    }, 300); 

    $(this).prev().removeClass('active'); 
    $(this).addClass('active')
  }

  if (window.innerWidth <= 1023 && $('.app_list').hasClass('app_list-list')) {
    setCat()
  }

  window.onresize = function() {
    if (window.innerWidth <= 1023 && $('.app_list').hasClass('app_list-list')) {
      setCat()
    }
  }
})



// ui range slider

$(function(){

  // slider 1

  var snapSlider = document.getElementById('slider-range1');

  if (snapSlider) {
    noUiSlider.create(snapSlider, {
      start: [0, 100],
      connect: true,
      tooltips: false,
      format: {
        from: function ( value ) {
          return number_format(value, 0, ',', ' ');
        },
        to: function ( value ) {
          return number_format(value, 0, ',', ' ');
        }
      },
      range: {
        'min': 0,
        'max': 100
      }
    });

    var snapValues = [
      $('#slider-snap-value-lower1 input'),
      $('#slider-snap-value-upper1 input')
    ];

    snapSlider.noUiSlider.on('update', function (values, handle) {
      snapValues[handle].val(values[handle])
    });

    $('#slider-snap-value-lower1 input').on('change', function(){
      snapSlider.noUiSlider.set([ $('#slider-snap-value-lower1 input').val(), null]);
    });
    $('#slider-snap-value-upper1 input').on('change', function(){
      snapSlider.noUiSlider.set([null, $('#slider-snap-value-upper1 input').val()]);
    });
  }
    
  // slider 2

  var snapSlider2 = document.getElementById('slider-range2');

  if (snapSlider2) {
    noUiSlider.create(snapSlider2, {
      start: [2500000, 6500000],
      connect: true,
      step: 100000,
      tooltips: false,
      format: {
        from: function ( value ) {
          return number_format(value, 0, ',', '');
        },
        to: function ( value ) {
          return number_format(value, 0, ',', '');
        }
      },
      range: {
        'min': 2500000,
        'max': 6500000
      }
    });

    var snapValues2 = [
      $('#slider-snap-value-lower2 input'),
      $('#slider-snap-value-upper2 input')
    ];

    snapSlider2.noUiSlider.on('update', function (values, handle) {
      snapValues2[handle].val(values[handle])
    });

    $('#slider-snap-value-lower2 input').on('change', function(){
      snapSlider2.noUiSlider.set([ $('#slider-snap-value-lower2 input').val(), null]);
    });
    $('#slider-snap-value-upper2 input').on('change', function(){
      snapSlider2.noUiSlider.set([null, $('#slider-snap-value-upper2 input').val()]);
    });
  }
});


// app_cart slider

$(function(){
  $('.app_card__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,
    prevArrow: '<button type="button" class="app_card_arrow app_card_arrow-left"></button>',
    nextArrow: '<button type="button" class="app_card_arrow app_card_arrow-right"></button>',
  })  
});



$(function(){
  $('#calendar').datepicker({
    language: "ru", 
    calendarWeeks: false, 
    todayHighlight: true
  });
});

// //карта

$(function(){
  // if ( location.href == '/' ){
    ymaps.ready(init);

    function init() {
      var myMap = new ymaps.Map("map", {
          center: [55.76, 37.64],
          zoom: 14
      },{
          searchControlProvider: 'yandex#search'
      }),

      myGeoObject = new ymaps.GeoObject({
        geometry: {type: "Point",
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
  // }
    
});


// карта в локации

$(function(){
  // if ( location.href == '/' ){

    var map = document.getElementById('location_map')

    if (map) ymaps.ready(init);

    function init() {
      var myMap = new ymaps.Map("location_map", {
          center: [55.76, 37.64],
          zoom: 14
      },{
          searchControlProvider: 'yandex#search'
      }),

      Valo = new ymaps.GeoObject({
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


      myMap.geoObjects.add(Valo);
    }
  // }
    
});




// слайдеры в отделке

$(function(){
  $('.tab-pane').not('.active').find('.building_slider-inside').slick('unslick')

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = $(e.target).attr('href') // activated tab
    $(target).find('.building_slider-inside').not('.slick-slider').slick({
      slidesPerRow: 3,
      rows: 2,
      swipeToSlide: true,
      arrows: true,
      prevArrow: '<button type="button" class="staff_arrow-inside staff_arrow-inside-left"></button>',
      nextArrow: '<button type="button" class="staff_arrow-inside staff_arrow-inside-right"></button>',
      responsive: [
        {
          breakpoint: 980,
          settings: {
            slidesPerRow: 2,
            rows: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            rows: 1
          }
        }
      ]
    })
  })
})

$(function(){
  $('#otdelka_before_after').beforeafter({
    message: ''
  });
})























