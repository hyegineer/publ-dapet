(function () {
  // 텍스트에어리어: 자동 높이 조절
  $('textarea[data-autoresize]').each(function () {
    var offset = this.offsetHeight - this.clientHeight;

    var resizeTextarea = function (el) {
      $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
    };

    $(this).on('keyup input', function () { resizeTextarea(this); }).removeAttr('data-autoresize');
  })

  // 텍스트에어리어: 글자수 체크
  $('.js-txtarea').keyup(function (e) {
    let content = $(this).val();

    // 글자수 세기
    if (content.length == 0 || content == '') {
      $('.js-txtarea-count').text('0');
    } else {
      $('.js-txtarea-count').text(content.length);
    }

    // 글자수 제한
    if (content.length > 200) {
      // 200자 부터는 타이핑 되지 않도록
      $(this).val($(this).val().substring(0, 200));
      // 200자 넘으면 알림창 뜨도록
      alert('글자수는 200자까지 입력 가능합니다.');
    };
  });
})();