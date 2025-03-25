$(window).on("scroll", function() {
  let section3Offset = $("#section3").offset().top; // 섹션3 위치
  let section4Offset = $("#section4").offset().top; // 섹션4 위치
  let scrollPos = $(window).scrollTop(); // 현재 스크롤 위치

  // 섹션3을 지나면 배경색 변경
  if (scrollPos >= section3Offset - 100 && scrollPos < section4Offset - 100) {
      $("#header .mobile_gnb").addClass("scrolled"); // 배경색 변경
  } else {
      $("#header .mobile_gnb").removeClass("scrolled"); // 다시 투명
  }
});


// gnb 페이지이동
$(window).on("load", function(){ // ⭐ 페이지가 완전히 로드된 후 실행
    let offsetPadding = 100; // 스크롤 여백(px 단위)

 // ⭐ 버튼 클릭 시 해당 섹션으로 스크롤 이동 + 스타일 변경
    function scrollToSection(target, targetButton) {
        let targetOffset = $(target).offset();
        if (targetOffset) {
            $("html, body").animate({
                scrollTop: targetOffset.top - offsetPadding
            }, 800);
            activateButton(targetButton); // 버튼 스타일 변경
        } else {
            console.log("Error: target not found", target);
        }
    }

    // ⭐ "exhibiiton" 버튼 클릭 시
    $(".gnb li:first-child").click(function(){
        scrollToSection("#section2", this);
    });
    // ⭐ "visit" 버튼 클릭 시
    $(".gnb li:nth-child(2)").click(function(){
        var target = $("#section3");
        var offset = target.offset().top - -20;  // 50px 만큼 더 아래로 이동
        $("html, body").animate({ scrollTop: offset }, 600);  // 부드러운 스크롤 애니메이션
    });
        // ⭐ "branches" 버튼 클릭 시
        $(".gnb li:nth-child(3)").click(function(){
            var target = $("#section5");
            var offset = target.offset().top - -35;  // 50px 만큼 더 아래로 이동
            $("html, body").animate({ scrollTop: offset }, 600);  // 부드러운 스크롤 애니메이션
        });
})


// 모바일 gnb이동
$(document).ready(function () {
  // GNB 클릭 시 스크롤 이동 + 메뉴 닫기
  $(".scroll-link").click(function (e) {
      e.preventDefault();
      var target = $(this).data("target");

      if ($("#" + target).length) {
          $("html, body").animate({
              scrollTop: $("#" + target).offset().top
          }, 800, function () {
              closeMenu(); // 스크롤 완료 후 메뉴 닫기
          });
      } else {
          closeMenu(); // 대상 섹션이 없어도 메뉴 닫기
      }
  });

  // 메뉴 열기
  $(".m_btn").click(function () {
      $("#m_menu_wrap").css({
          'margin-left': '0vw',
          'transition': 'margin-left 0.5s'
      }).addClass('open');

      $(".m_btn img").hide(); // 햄버거 버튼 숨김
      $(".close_btn img").show(); // X 버튼 보이기
  });

  // 메뉴 닫기 버튼 클릭
  $(".close_btn").click(function () {
      closeMenu();
  });

  // 메뉴 닫기 함수
  function closeMenu() {
      $("#m_menu_wrap").css({
          'margin-left': '100vw',
          'transition': 'margin-left 0.5s'
      }).removeClass('open');

      $(".m_btn img").show(); // 햄버거 버튼 다시 보이기
      $(".close_btn img").hide(); // X 버튼 숨기기
  }
});




// 스크롤 겹치기
gsap.registerPlugin(ScrollTrigger);

const panels = document.querySelectorAll(".panel");

panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: "top top",
    end: "bottom top",
    pin: true,
    pinSpacing: false,
    scrub: 1, // 부드러운 전환 효과
  });
});



// 탭버튼 pc
$(document).ready(function(){
  let offsetPadding = 100; // 스크롤 여백(px 단위)

  // 버튼 활성화 함수
  function activateButton(targetButton) {
      $("#visit .visit_tap div").css("color", "#3F3F3F"); // 모든 버튼 초기화
      $(targetButton).css("color", "#cbcbcb"); // 선택한 버튼만 활성화
  }

      // ⭐ [1] 페이지 로드 시 "Book Tickets" 버튼을 기본 활성화
      $("#visit .visit_tap div:first-child").addClass("active");

  // 버튼 클릭 시 섹션 이동 & 버튼 색상 변경
  function scrollToSection(target, targetButton) {
      $("html, body").animate({
          scrollTop: $(target).offset().top - offsetPadding
      }, 800);
      
      activateButton(targetButton); // 버튼 색상 변경
  }

  // "Book Tickets" 버튼 클릭 시
  $("#visit .visit_tap div:first-child p").click(function(){
      scrollToSection("#visit .book_tickets", this);
  });

  // "FAQ" 버튼 클릭 시
  $("#visit .visit_tap div:nth-child(2) p").click(function(){
      scrollToSection("#visit .faq", this);
  });

  // 📌 스크롤 감지하여 버튼 색상 변경
  $(window).on("scroll", function(){
      let scrollPos = $(window).scrollTop(); // 현재 스크롤 위치
      let bookTop = $("#visit .book_tickets").offset().top - offsetPadding - 10;
      let faqTop = $("#visit .faq").offset().top - offsetPadding - 200;

      if (scrollPos >= bookTop && scrollPos < faqTop) {
          activateButton("#visit .visit_tap div:first-child"); // Book Tickets 버튼 활성화
      } else if (scrollPos >= faqTop) {
          activateButton("#visit .visit_tap div:nth-child(2)"); // FAQ 버튼 활성화
      }
  });
});



$(document).ready(function(){
    // 처음에 'Book Tickets' 버튼을 활성화 상태로 설정
    $("#m_visit .m_visit_tap .tap_item").first().addClass("active");
  
    // #m_visit 내의 .tap_item 버튼을 클릭했을 때
    $("#m_visit .m_visit_tap .tap_item").click(function(){
      // 모든 버튼에서 active 클래스를 제거
      $("#m_visit .m_visit_tap .tap_item").removeClass("active");
  
      // 클릭된 버튼에 active 클래스 추가
      $(this).addClass("active");
  
      // 클릭된 버튼에 설정된 data-target을 가져와서 그 섹션으로 스크롤
      const target = $(this).data("target");
      
      // 스크롤 위치를 해당 섹션으로 부드럽게 이동 (50px 위로 올려서)
      $('html, body').animate({
        scrollTop: $("#m_visit ." + target).offset().top - 50
      }, 500); // 500ms 동안 부드럽게 이동
    });
  });



  $(document).ready(function () {
    $(".anser").hide(); // 🔹 모든 답변을 처음부터 숨김

    $(".question").click(function () {
        const $this = $(this);

        // 토글 답변 영역
        $this.next(".anser").slideToggle()
            .parent().siblings().find(".anser").slideUp();

        // 이미지 회전 토글 및 색상 변경
        $this.find('img').toggleClass('turn');
    });
});



// Intersection Observer 설정
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate'); // 화면에 보이면 애니메이션 시작
        observer.unobserve(entry.target); // 한 번만 실행되도록 관찰 종료
      }
    });
  }, {
    threshold: 0.5 // 요소가 화면의 50% 이상 보일 때 트리거
  });
  
  // .line-text 요소들에 대해 관찰 시작
  document.querySelectorAll('.line-text').forEach(text => {
    observer.observe(text);
  });


  AOS.init({
    duration: 1000, // 애니메이션 지속 시간 (ms)
    once: true, // 한번만 실행되도록 설정
    easing: 'ease-out',
  });
