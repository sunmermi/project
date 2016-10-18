//base.js

// button event
(function(global, $){
  'use strict';
  // 버튼 이벤트 함수
  // 매개변수 (버튼선택, 이벤트종류, 보일콘텐츠, 추가기능)
  function btnEvent( btn, event_type, show_con, addFn ){
    // 버튼선택
    var $this_btn = $(btn);
    // 버튼 이벤트가 실행될때 함수실행
    $this_btn.on(event_type, function( event ){
      //보여질 콘텐츠
      var $show_con = $(show_con);
      // 슬라이드 투글
      $show_con.slideToggle(400, function(){
        if($this_btn.hasClass('close_btn')){
          $show_con.attr('style', '');
          $this_btn.removeClass('close_btn');
        }else{
          $show_con.show();
          $this_btn.addClass('close_btn');
        }
      });
      
      // 만약 추가기능이 있다면 추가기능 함수 실행 : 없으면 실행 안됨
      if( addFn ){ addFn($this_btn); }
    });
  }

  btnEvent( '.view_btn', "click", ".view_story_list" );
  btnEvent( '.magazine_num_btn', "click", ".magazine_num_list" );
  // 모바일버전 메뉴버튼 : GNB show, hide / BGM버튼 show, hide / menu, close
  btnEvent( '.navi_btn > button', "click", ".gnb_wrap", addFunction );

  function addFunction($this_btn) {
    var $show_con2 = $('.bgm_btn');
    $show_con2.slideToggle(400, function(){
        if($this_btn.hasClass('close_btn')){
          $show_con2.show();
          $this_btn.text('close');
        }else{
          $show_con2.attr('style', '');
          $this_btn.text('menu');
        }
    });
  }

  //모바일 버전 : 더보기 버튼
  function moreBtn() {
    $('.more_btn').on('click', function(){ 
      $('.m-stories-content2').fadeIn(600).addClass('more');
      $('.more_btn').addClass('click');
    });
  }
  moreBtn();

  //탑버튼 부드러운 스크롤
  $('.back_top').on('click',function(){
    $('html, body').animate({'scrollTop': '0px' }, 500 );
  });

})(this, this.jQuery);


// BGM 컨트롤
(function(global, $) {
  'use strict';
  // 음원 로드
  var bgm = new Audio();
  bgm.setAttribute('src', './media/bgm.m4a');
  //로드되면 배경음악 실행
  bgm.oncanplay = function() {
    bgm.play();
  };
  // ecs키 누르면 배경음악 정지
  $(document).on('keydown', function(e) {
    if(e.keyCode === 27) {
      bgm.pause();
    }
  });
  // BGM play stop 버튼 
  $('.play_btn').on('click', function () {
    bgm.play();
  });
  $('.stop_btn').on('click', function () {
    bgm.pause();
  });

}(this, this.jQuery));

// text effect
(function(global, $){
  'use strict';
  var
    $main_logo = $(".main_logo"),
    $logo_sub = $(".logo_sub"),
    $gnb_navi_li = $('.gnb_navi a');

  $main_logo.shuffleLetters();
  $logo_sub.shuffleLetters();
  $gnb_navi_li.shuffleLetters();

})(this, this.jQuery);

//img carousel
(function(global, $){
  'use strict';
  var $gallery_view = $('.large-right-con');
  var $slide_gallery = $('.slide_img_btn');
  var $slide_btns = $slide_gallery.find('a');
  var count = ['one', 'two', 'three'];
  var class_name = 'gallery-';

  //썸네네일 이미지 버튼 클릭
  $.each($slide_btns, function(index, el){
    var $btn = $slide_btns.eq(index);
    $btn.on('click', function(e) {
      e.preventDefault();
      clearInterval(imgSlide);
      removeClasses();
      $btn.parent().siblings().find('.btn_on').removeClass('btn_on');
      $btn.addClass('btn_on');
      $gallery_view.addClass(class_name + count[index]);
    });
  });

  function removeClasses() {
    for ( var i=0, l=count.length; i<l; i++ ) {
      $gallery_view.removeClass(class_name + count[i]);
    }
  }
  
  // 이미지 썸네일 + 배경 이미지 자동 캐러셀
  var imgIndex = 0;
  var imgSlide = setInterval(function(){
    imgIndex++; 
    $gallery_view.removeClass(class_name + count[imgIndex-1]);
    $slide_btns.parent().siblings().find('.btn_on').removeClass('btn_on');
    if(imgIndex > count.length-1){imgIndex = 0;}
    $gallery_view.addClass(class_name + count[imgIndex]);
    $slide_btns.eq(imgIndex).addClass('btn_on');
  },3000);

}(this, this.jQuery));


// scroll 발생시 생기는 동작들
(function(global, $){
  'use strict';

  $(window).scroll(function(){
    //스크롤이 발생하면 탑버튼 생성
    $('.back_top').css('display', 'block');
    // console.log($(window).scrollTop());
    //만약 스크롤이 맨위에 있다면 == 0과 같다면
    if( $(window).scrollTop() === 0 ){
      // console.log('scroll top');
      // 탑버튼은 숨기고
      $('.back_top').css('display', 'none');
      // 스토리지 더보기 버튼 
      $('.m-stories-content2').removeClass('more');
      $('.more_btn').removeClass('click');
    }
    
  });


})(this, this.jQuery);




//그리드시스템 보기 토글 단축 버튼 SHIFT + G
(function(global){
  'use strict';
  var body = document.body;
  var containers = document.querySelectorAll('.grid-container');
  document.onkeydown = function(event) {
    if( event === true || event.keyCode === 71 && event.shiftKey) {
      Array.prototype.forEach.call(containers, function(container) {
        container.classList.toggle('show-grid');
      });
    }
  };
})(this);

//parallax.js
(function(global, $, SM){
  'use strict';

  //ScrollMagic
  //객체생성
  var ctrl = new SM.Controller({
    // 'addIndicators': true
  });

  //씬
  var slide_img_btn_scene = new SM.Scene({
  'triggerElement': '.slide_img_btn',
  'triggerHook' : 0.95,
  'reverse': false
  });

  slide_img_btn_scene
    .setClassToggle('.slide_img_btn', 'fade-in-transform')
    .addTo( ctrl );

  var chicken_wrap_scene = new SM.Scene({
  'triggerElement': '.chicken_wrap',
  'triggerHook' : 0.9,
  'reverse': false
  });

  chicken_wrap_scene
    .setClassToggle('.chicken_wrap', 'fade-in-transform')
    .addTo( ctrl )
    .on("enter", function (event) {
      // console.log("Scene entered.");
      $('.chicken_wrap .chicken_head').shuffleLetters();
      $('.chicken_wrap .chicken_sub_head').shuffleLetters();
    });

  var stories_wrap_scene = new SM.Scene({
    'triggerElement': '.stories_wrap > h3',
    'triggerHook' : 0.7,
    'offset' : -150,
    'reverse': false
  });
  stories_wrap_scene
    .addTo( ctrl )
    .on('enter', function(event){ 
      $('.stories_head').shuffleLetters();
    });



var inquire_wrap = new TimelineMax();
    inquire_wrap
      .fromTo('.inquire_wrap', 0.2, {
        'autoAlpha': 0,
        'y': '50%'
      },
      {
        'autoAlpha': 1,
        'y': '0%'
      }, 0.1);

  var inquire_wrap_scene = new SM.Scene({
    'triggerElement': '.inquire_wrap',
    'triggerHook' : 0.95,
    'offset' : -300,
    'reverse': false
  });
  inquire_wrap_scene
    .setTween(inquire_wrap)
    .addTo( ctrl );



  var article_content = $('.m-stories-content1 > article');
  var article_content_2 = $('.m-stories-content2 > article');
  
  article_content.each(function( idx ){

    var article = new TimelineMax();
    article
      .fromTo(article_content[idx], (idx+1)/3, {
        'autoAlpha': 0,
        'scale': 0
      },
      {
        'autoAlpha': 1,
        'scale': 1
      }, 0.5);

    var article_content_scene = new SM.Scene({
      'triggerElement': article_content[idx],
      'triggerHook' : 0.8,
      'offset' : -400,
      'reverse': false
    });

    article_content_scene
      // .addIndicators({'name':'갸갸', 'indent': 200})
      .setTween(article)
      .addTo( ctrl );

      var article2 = new TimelineMax();
      article2
        .fromTo(article_content_2[idx], (idx+1)/3, {
          'autoAlpha': 0,
          'scale': 0
        },
        {
          'autoAlpha': 1,
          'scale': 1
        }, 0.5);

    var article_content_scene_2 = new SM.Scene({
      'triggerElement': article_content_2[idx],
      'triggerHook' : 0.8,
      'offset' : -700,
      'reverse': false
    });

    article_content_scene_2
      // .addIndicators({'name':'냐냐', 'indent': 100})
      .setTween(article2)
      .addTo( ctrl );

  });
 

})(this, this.jQuery, this.ScrollMagic);