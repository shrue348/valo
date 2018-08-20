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



// маска для формы
$(function(){
  $('[name=phone]').mask("+7 (999) 999-9999");
})



// переключалка гл меню
$(function(){
  $('.menu__toggle').on('click', function(){
    $('.menu__wrap').toggleClass('menu__wrap-active')
    $('.menu').toggleClass('menu-active')
  })

  //  $('.m_menu__close').on('click', function(){
  //   $('.m_menu').removeClass('active')
  //   $('.m_menu__toggle').removeClass('active')
  // })
})


$(function(){
  $('.photo_webcam__start').on('click', function(){
    $(this).remove()
  })
})


// анимации текста
$(function(){
  $('.header_title, .header_subtitle, .header_desc, .header_i, .header_counter').viewportChecker({ // для хедера
    classToAdd: 'in',
    offset: 0,
    invertBottomOffset: true,
  });
  $('.animated').viewportChecker({
    classToAdd: 'in',
    offset: 250,
    invertBottomOffset: true,
  });
})


// слайдеры
$(function(){
  $('.header_slider').slick({
    arrows: false
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
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    centerPadding: '0px'
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