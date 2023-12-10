/*
=============================================
기타 ui/ux 효과
=============================================
*/

(function () {
  // 탭 버튼 효과
  $('[data-tabs-contt]').on('click', function (e) {
    var content = $(this).attr('data-tabs-contt');

    $('[data-tabs-contt]').removeClass('active');
    $(this).addClass('active');

    $('.tabs-contt').removeClass('show');
    $(`#${content}`).addClass('show');

    if ($(this).parent().attr('data-tabs-type') == 'mall') {
      var scrollValue = $('.detail-page-top').outerHeight() + $('.dp-ttl-wrap').outerHeight();

      $('.l-contt-top').animate({
        scrollTop: scrollValue
      }, 500);
    } else {
      $('.l-contt-top').animate({
        scrollTop: '0'
      }, 500);
    }
  })

  // 아코디언 효과
  $('.accordion-card-item').on('click', function (e) {
    if (e.target.getAttribute('class') == 'accordion-card-top') {
      $(this).toggleClass('active');
    }
  })
})();