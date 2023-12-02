(function () {
  // 텍스트에어리어: 자동 높이 조절
  $('textarea[data-autoresize]').each(function () {
    var offset = this.offsetHeight - this.clientHeight;

    var resizeTextarea = function (el) {
      $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
    };

    $(this).on('keyup input', function () { resizeTextarea(this); }).removeAttr('data-autoresize');
  })

  // 셀렉트: 선택하면 글씨 색 바뀌는 효과
  $('select[data-customselect]').change(function () {
    if ($(this).val()) {
      $(this).css('color', '#000');
    }
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

  // FIXME: 임시로 만든 이미지 업로드 시 썸네일 보이게 처리한 script
  var uploadFiles = [];

  $(".js-upload-inp").change(function (e) {
    var files = e.target.files;
    var parentDiv = e.target.parentNode.parentNode.getAttribute('id');

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var size = uploadFiles.push(file);

      //업로드 목록에 추가    
      preview(parentDiv, file, size - 1);
      //미리보기 만들기  
    }
  });

  function preview(parentElement, file, idx) {
    var reader = new FileReader();
    reader.onload = (function (f, idx) {
      return function (e) {
        var div = `<div class="attach-list">
                      <div class="square-card">
                        <img src="${e.target.result}" title="${escape(f.name)}"" alt="" class="thumbnail-img">
                      </div>

                      <button type="button" class="del-btn" data-idx="${idx}">
                        <span class="txt-hidden">삭제</span>
                      </button>
                    </div>`;

        $(`#${parentElement}`).append(div);
      };
    })(file, idx);
    reader.readAsDataURL(file);
  }

  $(".attach-list-grp").on("click", ".del-btn", function (e) {
    var $target = $(e.target);
    var idx = $target.attr('data-idx');

    uploadFiles[idx].upload = 'disable';
    $target.parent().remove();
  });

  // 탭 버튼 효과
  $('button[data-tabs-content]').on('click', function (e) {
    var content = $(this).attr('data-tabs-content');

    $('button[data-tabs-content]').removeClass('active');
    $(this).addClass('active');

    $('.tabs-content').removeClass('show');
    $(`#${content}`).addClass('show');
  })
})();