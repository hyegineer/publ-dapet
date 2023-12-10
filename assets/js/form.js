/*
=============================================
입력 양식에 있는 요소들 효과 구현
=============================================
*/

(function () {
  // 텍스트에어리어: textarea-create-wrap 요소 안에 있는 것들은 값 있으면 전송버튼 활성화하기
  $('.textarea-create-wrap textarea[data-js-autoresize]').on('input', function () {
    if ($(this).siblings('.send-btn')) {
      if ($(this).val()) {
        $(this).siblings('.send-btn').removeClass('before');
      } else {
        $(this).siblings('.send-btn').addClass('before');
      }
    }
  })

  // 텍스트에어리어: 자동 높이 조절
  $('textarea[data-js-autoresize]').each(function () {
    var offset = this.offsetHeight - this.clientHeight;

    var resizeTextarea = function (el) {
      $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
    };

    $(this).on('keyup input', function () { resizeTextarea(this); }).removeAttr('data-js-autoresize');
  })

  // 텍스트에어리어: 기존 글자수 체크
  $('textarea[data-js-counttextarea]').each(function () {
    let content = $(this).val();

    if (content.length == 0 || content == '') {
      $('[data-js-count]').text('0');
    } else {
      $('[data-js-count]').text(content.length);
    }
  })

  // 텍스트에어리어: 입력할 때 글자수 체크
  $('textarea[data-js-counttextarea]').keyup(function (e) {
    let content = $(this).val();
    let maxlength = $(this).attr('maxlength');

    // 글자수 세기
    if (content.length == 0 || content == '') {
      $('[data-js-count]').text('0');
    } else {
      $('[data-js-count]').text(content.length);
    }

    // 글자수 제한
    if (content.length > maxlength) {
      // 200자 부터는 타이핑 되지 않도록
      $(this).val($(this).val().substring(0, maxlength));
      // 200자 넘으면 알림창 뜨도록
      alert(`글자수는 ${maxlength}자까지 입력 가능합니다.`);
    };
  });

  // 셀렉트: 선택하면 글씨 색 바뀌는 효과
  $('select[data-js-select]').change(function () {
    if ($(this).val()) {
      $(this).css('color', '#000');
    }
  })
})();