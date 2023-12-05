(function () {
  // 텍스트에어리어: textarea-create-wrap 요소 안에 있는 것들은 값 있으면 전송버튼 활성화하기
  $('.textarea-create-wrap textarea[data-autoresize]').on('input', function () {
    if ($(this).siblings('.send-btn')) {
      if ($(this).val()) {
        $(this).siblings('.send-btn').removeClass('before');
      } else {
        $(this).siblings('.send-btn').addClass('before');
      }
    }
  })

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

  // 텍스트에어리어: 기존 글자수 체크
  $('.js-txtarea').each(function () {
    let content = $(this).val();

    if (content.length == 0 || content == '') {
      $('.js-txtarea-count').text('0');
    } else {
      $('.js-txtarea-count').text(content.length);
    }
  })

  // 텍스트에어리어: 입력할 때 글자수 체크
  $('.js-txtarea').keyup(function (e) {
    let content = $(this).val();
    let maxlength = $(this).attr('maxlength');

    // 글자수 세기
    if (content.length == 0 || content == '') {
      $('.js-txtarea-count').text('0');
    } else {
      $('.js-txtarea-count').text(content.length);
    }

    // 글자수 제한
    if (content.length > maxlength) {
      // 200자 부터는 타이핑 되지 않도록
      $(this).val($(this).val().substring(0, maxlength));
      // 200자 넘으면 알림창 뜨도록
      alert(`글자수는 ${maxlength}자까지 입력 가능합니다.`);
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

  // FIXME: 썸네일 업로드 임시 구현
  $("#thumbnail").on("change", function (e) {
    var file = e.target.files[0];
    if (isImageFile(file)) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#img-thumbnail").attr("src", e.target.result);

        if ($('#img-thumbnail').hasClass('img-ico-pet')) {
          $("#img-thumbnail").removeClass("img-ico-pet");
        }

        if ($('#img-thumbnail').hasClass('img-ico-people')) {
          $("#img-thumbnail").removeClass("img-ico-people");
        }
      }
      reader.readAsDataURL(file);
    } else {
      alert("이미지 파일만 첨부 가능합니다.");
      $("#thumbnail").val("");

      if ($('#img-thumbnail').attr('data-type') == 'people') {
        $("#img-thumbnail").addClass("img-ico-people");
        $("#img-thumbnail").attr("src", "assets/images/ico/ico-nothing-img-gray-dark.svg");
      }

      if ($('#img-thumbnail').attr('data-type') == 'pet') {
        $("#img-thumbnail").addClass("img-ico-pet");
        $("#img-thumbnail").attr("src", "assets/images/ico/ico-pet-gray.svg");
      }
    }
  });
  // 확장자 확인
  function isImageFile(file) {
    // 파일명에서 확장자를 가져옴
    var ext = file.name.split(".").pop().toLowerCase();
    return ($.inArray(ext, ["jpg", "jpeg", "gif", "png"]) === -1) ? false : true;
  }

  // FIXME: 아코디언
  $('.accordion-card-item').on('click', function (e) {
    if (e.target.getAttribute('class') == 'accordion-card-top') {
      $(this).toggleClass('active');
    }
  })
})();
function openModal(id) {
  $('#' + id).addClass('active');
  $('#' + id).children('.custom-modal').scrollTop(0);
}
function closeModal(id) {
  $('#' + id).removeClass('active');
}
function allCloseModal() {
  $('.modal-wrapper').removeClass('active');
}