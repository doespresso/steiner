console.log("init");
paceOptions = {
    ajax:true,
    restartOnRequestAfter:true,
    restartOnPushState: true
};
odometerOptions = {
  auto: true, // Don't automatically initialize everything with class 'odometer'
  selector: '.odometer', // Change the selector used to automatically find things to be animated
  duration: 5000, // Change how long the javascript expects the CSS animation to take
  theme: 'minimal', // Specify the theme (if you have more than one theme css file on the page)
//  animation: 'count' // Count is a simpler animation method which just increments the value,
                     // use it when you're looking for something more subtle.
};
//yepnope.injectCss(['/dev/component/switchery/switchery.css']);
yepnope.injectCss(['/assets/js/vendor/mmenu/src/css/jquery.mmenu.all.css']);
//yepnope.injectCss(['/assets/js/vendor/magnific-popup/magnific-popup.css']);
yepnope.injectCss(['/dev/component/odometer/themes/odometer-theme-minimal.css']);
yepnope([
    {
        load:{
            'pace':'/assets/js/vendor/pace/pace.min.js',
            'jquery':'/assets/js/vendor/jquery/jquery.min.js',
            'underscore':'/assets/js/vendor/underscore/underscore.min.js',
//            'backbone':'/assets/js/vendor/backbone/backbone.min.js',
//            'marionette':'/assets/js/vendor/backbone/marionette.min.js',
            'bootstrap':'/assets/js/vendor/bootstrap/bootstrap.min.js',
            'swiper':'/assets/js/vendor/swiper/swiper.min.js',
            'swiper_progress':'/assets/js/vendor/swiper/idangerous.swiper.progress.min.js',
//            'odometer':'/dev/component/odometer/odometer.min.js',
            'espy':'/dev/component/espy/dist/jquery.espy.min.js',
//            'social_snap':'/assets/js/app/social-snap.js',
//            'switchery':'/assets/js/vendor/switchery/switchery.min.js',
            'mmenu':'/assets/js/vendor/mmenu/src/js/jquery.mmenu.min.all.js',
            'imagelightbox':'/assets/js/vendor/ImageLightbox/imagelightbox.min.js',
//            'lightbox':'/assets/js/vendor/magnific-popup/jquery.magnific-popup.min.js',
//            'calc':'/assets/js/app/calc.js',
        },
        callback:{

            //////////////////////////LB/////////////////////
            'imagelightbox':function (url, result, key) {

                var activityIndicatorOn = function () {
                        $('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
                    },
                    activityIndicatorOff = function () {
                        $('#imagelightbox-loading').remove();
                    },

                    overlayOn = function () {
                        $('<div id="imagelightbox-overlay"></div>').appendTo('body');
                    },
                    overlayOff = function () {
                        $('#imagelightbox-overlay').remove();
                    },

                    closeButtonOn = function (instance) {
                        $('<a href="#" id="imagelightbox-close">Close</a>').appendTo('body').on('click', function () {
                            $(this).remove();
                            instance.quitImageLightbox();
                            return false;
                        });
                    },
                    closeButtonOff = function () {
                        $('#imagelightbox-close').remove();
                    },

                    captionOn = function () {
                        var description = $('a[href="' + $('#imagelightbox').attr('src') + '"]').attr('title');
                        if (description.length > 0)
                            $('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
                    },
                    captionOff = function () {
                        $('#imagelightbox-caption').remove();
                    },

                    navigationOn = function (instance, selector) {
                        var images = $(selector);
                        if (images.length) {
                            var nav = $('<div id="imagelightbox-nav"></div>');
                            for (var i = 0; i < images.length; i++)
                                nav.append('<a href="#"></a>');

                            nav.appendTo('body');
                            nav.on('click touchend', function () {
                                return false;
                            });

                            var navItems = nav.find('a');
                            navItems.on('click touchend', function () {
                                var $this = $(this);
                                if (images.eq($this.index()).attr('href') != $('#imagelightbox').attr('src'))
                                    instance.switchImageLightbox($this.index());

                                navItems.removeClass('active');
                                navItems.eq($this.index()).addClass('active');

                                return false;
                            })
                                .on('touchend', function () {
                                    return false;
                                });
                        }
                    },
                    navigationUpdate = function (selector) {
                        var items = $('#imagelightbox-nav a');
                        items.removeClass('active');
                        items.eq($(selector).filter('[href="' + $('#imagelightbox').attr('src') + '"]').index(selector)).addClass('active');
                    },
                    navigationOff = function () {
                        $('#imagelightbox-nav').remove();
                    };

                $('a[data-imagelightbox="a"]').imageLightbox(
                    {
                        onStart: 	 function() { overlayOn(); },
                        onLoadStart:function () {
                            captionOff();
                            activityIndicatorOn();
                        },
                        onLoadEnd:function () {
                            activityIndicatorOff(); captionOn();
                        },
                        onEnd:function () {
                            activityIndicatorOff(); captionOff(); overlayOff();
                        }
                    });
            },
            //////////////////////////LB/////////////////////

            'pace':function (url, result, key) {
                console.log("pace");
            },
            'jquery':function (url, result, key) {
                console.log("jquery loaded");
                $(document).ready(function(){


//social

//social

                    console.log("ready");
                    $(".show-callback").on("click",function(e){
                        e.preventDefault();
                        $("#callback-panel").fadeToggle(300);
                    });
                    $("#callback-form #my_tel").on("focus",function(){
                        console.log("focus");
                        $(this).removeClass("animated bounce");
                    });
                    $("#callback-form").on("submit",function(e){
                        e.preventDefault();
                        var form = $(this);
                        var ftel = form.find("#my_tel");
                        var tel = ftel.val();
                        if (tel.length<9) {
                            console.log(tel,"wrong");
                            ftel.addClass("animated bounce");
                        } else {
                        $.ajax({
                          type: "POST",
                          data: form.serialize(),
//                          dataType: "html",
                          url: form.attr("action"),
                          beforeSend: function() {
                              $("#callback-panel .overlay").fadeIn();
                          },
                          success: function(response) {
                              $("#callback-panel .overlay").fadeOut();
                              console.log("sent");
                              console.log(response);
                              if (response==''){
                                  $("#callback-panel #result").html("Спасибо!<br/>Мы перезвоним Вам на номер <b>"+tel+"</b>.");
                                  $("#callback-panel").addClass("done").delay(3000).fadeOut(2000,function(){
                                      $(this).removeClass("done");
                                      $("#callback-form #my_tel").val("");
                                  });
                              }
                          },
                        });
                    }
                    });
                });
            },
            'social_snap':function (url, result, key){
                $("footer").socialsnap();
            },
            'bootstrap':function (url, result, key) {
                console.log("bootstrap");
            },
            'espy':function (url, result, key) {
                console.log("elspy");
                $("section.spy").espy(function(entered, state){
                    if (entered){
//                        setTimeout(function(){
                                $(this).find(".show-me").addClass("show-on bounce");
//                                $(this).css("background-color","red");
//                            },1000);
                        console.log("section----enter",$(this).attr("id"));
                    }
                },{
                    offset:-200
                });

            },



//            'switchery':function (url, result, key) {
//                console.log("switch");
//                var swelem = document.querySelector('#switcher1');
//                var switcher = new Switchery(swelem);
//            },
//            'lightbox':function (url, result, key) {
//                console.log("lightbox");
//                $('.gallery').magnificPopup({
//                    delegate:'a',
//                    type:'image',
//                    gallery:{
//                        enabled:true,
//                        preload:[0, 2],
//                        navigateByImgClick:true,
//                        arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
//                        tPrev:'назад', // title for left button
//                        tNext:'вперед', // title for right button
//                        tCounter:'<span>%curr% из %total%</span>' // markup of counter
//                    },
//                    image:{
//                        titleSrc:'title'
//                    },
//                    mainClass:'mfp-fade',
//                    removalDelay:300,
//                });
//            },

            'mmenu':function (url, result, key) {
                console.log("menu");
                $('#mmenu').mmenu({
                    moveBackground:false,
                    position:"left",
                    zposition:"front",
                    searchfield:false,
                    isMenu:true,
                    counters:false,
//                    classes: "mm-firm",
//                    slidingSubmenus: false
//                    labels:{
//                        fixed:true,
//                        collapse:true
//                    },
//                    onClick:{setSelected:true,preventDefault:true}
                },
                    {
                       selectedClass  : "Selected",
                       labelClass     : "Label",
                       panelClass     : "Panel",
                    }
                ).on(
                      "opened.mm",
                      function()
                      {
                         $("#show-mmenu").addClass("opened");
                      })
                    .on(
                                          "closed.mm",
                                          function()
                                          {
                                             $("#show-mmenu").removeClass("opened");
                                          });
            },
            'swiper_progress':function () {
                "use strict";
                var Hd_swiper = new Swiper('#scroll-slider', {
//                    slidesPerView:'auto',
                    progress:true,
                    resizeReInit:true,
                    autoResize:true,
                    watchActiveIndex:true,
                    speed:2000,
                    loop:false,
                    mode:'horizontal',
//                    calculateHeight:true,
                    mousewheelControl:false,
                    keyboardControl:true,
//                    paginationClickable:true,
//                    pagination:'#scroll-swiper-pagination',
                    autoplay:5000,


                    onFirstInit:function(swiper){
                        console.log("swiper hd first init");
//                        $("#presentation").addClass("animated fadeInUp");
                    },

//                    onProgressChange: function(swiper){
//                      for (var i = 0; i < swiper.slides.length; i++){
//                        var slide = swiper.slides[i];
//                        var progress = slide.progress;
//                        var translate, boxShadow;
//                        if (progress>0) {
//                          translate = progress*swiper.width;
////                          var boxShadowOpacity = 0;
//                        }
//                        else {
//                          translate=0;
////                          var boxShadowOpacity = 1  - Math.min(Math.abs(progress),1);
//                        }
////                        slide.style.boxShadow='0px 0px 30px rgba(0,0,0,'+boxShadowOpacity+')';
//                        swiper.setTransform(slide,'translate3d('+(translate)+'px,0,0)');
//                      }
//                    },
//                    onTouchStart:function(swiper){
//                      for (var i = 0; i < swiper.slides.length; i++){
//                        swiper.setTransition(swiper.slides[i], 0);
//                      }
//                    },
//                    onSetWrapperTransition: function(swiper) {
//                      for (var i = 0; i < swiper.slides.length; i++){
//                        swiper.setTransition(swiper.slides[i], swiper.params.speed);
//                      }
//                    },


                    onProgressChange: function(swiper){
                        console.log("start p");
                            for (var i = 0; i < swiper.slides.length; i++){
                              var slide = swiper.slides[i];
                              var progress = slide.progress;
                              var translate = progress*swiper.width;
                              var opacity = 1 - Math.min(Math.abs(progress),1);
                              slide.style.opacity = opacity;
                              swiper.setTransform(slide,'translate3d('+translate+'px,0,0)');
                            }
                          },
                          onTouchStart:function(swiper){
                              console.log("start c");
                            for (var i = 0; i < swiper.slides.length; i++){
                              swiper.setTransition(swiper.slides[i], 0);
                            }
                          },
                          onSetWrapperTransition: function(swiper) {
                            for (var i = 0; i < swiper.slides.length; i++){
                              swiper.setTransition(swiper.slides[i], swiper.params.speed);
                            }
                          },

                    onSlideChangeStart: function(){
                      $("#tab-wrapper .active").removeClass('active')
                      $("#tab-wrapper .selector").eq(Hd_swiper.activeIndex).addClass('active')
                    }

                });



                                // Set Z-Indexes
//                for (var i = 0; i < Hd_swiper.slides.length; i++){
//                    Hd_swiper.slides[i].style.zIndex = i;
//                }

                $("#tab-wrapper .selector").on('touchstart mousedown',function(e){
                    e.preventDefault()
                    $("#tab-wrapper .active").removeClass('active')
                    $(this).addClass('active')
                    Hd_swiper.swipeTo( $(this).attr("attr-goto") )
                  });

                $("#tab-wrapper .selector").click(function(e){
                    e.preventDefault()
                  })

                $('#scroll-slider').on("mouseenter",function(){
                    console.log("slider me");
                    Hd_swiper.stopAutoplay();
                });

                $('#scroll-slider').on("mouseleave",function(){
                    console.log("slider ml");
                    Hd_swiper.startAutoplay();
                });


                $(window).resize(function() {
                    Hd_swiper.resizeFix();
                });

                /////////////////////////


                var Fh_swiper = new Swiper('#foto-home-slider', {
                    slidesPerView:'auto',
//                    progress:true,
                    watchActiveIndex:true,
                    speed:1000,
                    loop:true,
//                    mode:'vertical',
                    calculateHeight:true,
                    mousewheelControl:false,
                    keyboardControl:true,
//                    paginationClickable:true,
//                    pagination:'#scroll-swiper-pagination',
                    autoplay:3000,

//                    onProgressChange: function(swiper){
//                        console.log("start p");
//                            for (var i = 0; i < swiper.slides.length; i++){
//                              var slide = swiper.slides[i];
//                              var progress = slide.progress;
//                              var translate = progress*swiper.width;
//                              var opacity = 1 - Math.min(Math.abs(progress),1);
//                              slide.style.opacity = opacity;
//                              swiper.setTransform(slide,'translate3d('+translate+'px,0,0)');
//                            }
//                          },
//                          onTouchStart:function(swiper){
//                              console.log("start c");
//                            for (var i = 0; i < swiper.slides.length; i++){
//                              swiper.setTransition(swiper.slides[i], 0);
//                            }
//                          },
//                          onSetWrapperTransition: function(swiper) {
//                            for (var i = 0; i < swiper.slides.length; i++){
//                              swiper.setTransition(swiper.slides[i], swiper.params.speed);
//                            }
//                          }


                });


                /////////////////////////


//                var Adv_swiper = new Swiper('#advantages-slider', {
//                    slidesPerView:'auto',
//                    watchActiveIndex:true,
//                    speed:2000,
//                    loop:true,
//                    mode:'horizontal',
//                    calculateHeight:true,
//                    mousewheelControl:false,
//                    keyboardControl:true,
//                    paginationClickable:true,
//                    pagination:'#advantages-swiper-pagination',
//                    autoplay:7000,
//                });


//                    $(s_next).on('click', function (e) {
//                        e.preventDefault()
//                        swipers[index].swipePrev()
//                    });
//                    $(s_prev).on('click', function (e) {
//                        e.preventDefault()
//                        swipers[index].swipeNext()
//                    });


            },
        }
    },

]


);