$(document).ready(function () {

  //loader
  var loader = function(){
    $("#loader").fadeOut(800, function(){
        $(this).remove();
    });
  };
  if (localStorage.getItem('firstTime') == '1') {
    $(document).ready(function () {setTimeout(loader, 100);});
  } else {
    $(window).on("load", function(){
        setTimeout(loader, 2000);
    });
    localStorage.setItem('firstTime', '1');
  }

  //menu-mobile
  var closeMobileMenu = function(){
    $('.menu-mobile').removeClass('open');
    $('.overlay.full').addClass('hide');
  };
  $(document).click(function(event){
    if($(event.target).closest('.menu-mobile').length === 0 && $(event.target).closest('.menu-mobile-toggle').length === 0 ) {
      closeMobileMenu();
    }
  });
  $('.menu-mobile-toggle').click(function() {
    if ($('.menu-mobile').hasClass('open')) {
      closeMobileMenu();
    }else{
      $('.menu-mobile').addClass('open');
      $('.overlay.full').removeClass('hide');
    }
  });
  $('.menu-mobile .close').click(function() {
    $('.menu-mobile').removeClass('open');
    $('.overlay.full').addClass('hide');
  });
  $('.menu-mobile a').click(function() {
    closeMobileMenu();
  });

  //set desktop/mobile class
  if ($(window).width() > 900 ) {
    $('body').addClass('desktop');
  }

  //events on scrolling
  var checkScroll = function(){
    if ($(window).scrollTop() > 49){
      $('nav').addClass('black');
      $('footer').slideDown(); 
    }else{
      $('nav').removeClass('black');
      $('footer').slideUp();
    }
  };
  checkScroll();
  $(window).scroll(function(){
    checkScroll();
  });

  //nav links scroll
  $('.nav-links a').click(function(e) {
    e.preventDefault();
    var section = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(section).offset().top-$('nav').height()
    });
  });

  //typewritter effect
  var TxtType = function(el, toRotate, period, leng) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.leng = leng;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    var currentLenguage = this.leng;
    var undeletedText = fullTxt.substring(0,13);
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
    var that = this;
    var delta = 120 - Math.random() * 100;
    if (this.isDeleting) { delta /= 2; }
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === undeletedText) {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  var typewriter = function(leng){
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period, leng);
      }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
  };

  //portfolio slider
  if(window.innerWidth < 600){
    $('#portfolio>.grid').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      dots: true,
      arrows: false,
      pauseOnHover: false,
      speed: 300
    });
  }

  //faqs
  $('#faqs .question').on('click',function(){
    if($(this).hasClass('active')){
      $(this).removeClass('active');
      $(this).parent().find('.answer').slideUp('fast');
    }else{
      $('#faqs .question').removeClass('active');
      $('#faqs .answer').slideUp();
      $(this).addClass('active');
      $(this).parent().find('.answer').slideDown('fast');
    }
  });

  //triger click on enter keydown
  $(document).on('keydown', '.question:focus', function(e){
    if (e.which == 13) { //Enter
      $(this).click();
    }
  });

  //lenguage selection
  var currentLenguage;
  var setLenguage = function(){
    localStorage.setItem('lenguage', currentLenguage);
  };

  var setSpanish = function(){
    $(".language").attr({
      src:'./assets/icons/us_flag.jpg',
      alt:'english',
      id:'english'
    });
    $(".en").addClass("hide");
    $(".sp").removeClass("hide");

    if ($('body').hasClass('bike-tour-page')){
      $(".input_val_name").attr('placeholder','Nombre');
      $(".input_val_email").attr('placeholder','Email');
      $(".input_val_message").attr('placeholder','Tu mensaje');
    }
    currentLenguage = "spanish";
    setLenguage();
  };

  var setEnglish = function(){
    $(".language").attr({
      src:'./assets/icons/sp_flag.jpg',
      alt:'spanish',
      id:'spanish'
    });
    $(".sp").addClass("hide");
    $(".en").removeClass("hide");

    if ($('body').hasClass('bike-tour-page')){
      $(".input_val_name").attr('placeholder','Your name');
      $(".input_val_email").attr('placeholder','Your email');
      $(".input_val_message").attr('placeholder','Your message...');
    }
    currentLenguage = "english";
    setLenguage();
  };

  var checkLanguage = function(){
    currentLenguage = localStorage.getItem('lenguage');
    if (currentLenguage === null) {
      currentLenguage = "english";
      setLenguage();
      setEnglish();
      setTimeout(function() { 
        typewriter('en');
      }, 3000);
    }else{
      if(currentLenguage === "spanish"){
        setSpanish();
        setTimeout(function() { 
          typewriter('sp');
        }, 3000);
      } else if (currentLenguage === "english") {
        setEnglish();
        setTimeout(function() { 
          typewriter('en');
        }, 3000);
      }
    }
  };

  var changeLeng = function(){ 
    if (this.id === "english") {
      setEnglish();
    } else {
      setSpanish();
    }
  };

  checkLanguage();
  $(".language").on("click",changeLeng);

});