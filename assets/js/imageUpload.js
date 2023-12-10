/*
=============================================
이미지 첨부 & 썸네일 업로드 임시구현
=============================================
*/

(function () {
  // 임시: 이미지 업로드 시 썸네일 보이게 처리한 script
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

  // 임시: 썸네일 업로드 구현
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
})();