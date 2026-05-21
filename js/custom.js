(function ($) {
    'use strict';

    $(document).ready(function () {
        // -----------------------------
        //  Glassmorphism Nav on Scroll
        // -----------------------------
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 50) {
                $('.main-nav').addClass('scrolled');
            } else {
                $('.main-nav').removeClass('scrolled');
            }
        });

        // -----------------------------
        //  Scroll-triggered Animations
        // -----------------------------
        function checkVisibility() {
            $('.feature-content, .service-block, .image-content').each(function() {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();

                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('fade-in-visible');
                }
            });
        }

        $(window).on('scroll resize', checkVisibility);
        checkVisibility();

        // -----------------------------
        //  Testimonial Slider (Swiper)
        // -----------------------------
        if ($('.testimonial-slider').length > 0) {
            var testimonialSwiper = new Swiper('.testimonial-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                grabCursor: true,
                touchRatio: 1,
                touchAngle: 45,
                autoplay: {
                    delay: 10000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: false,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    }
                }
            });
        }
        // -----------------------------
        //  On Click Smooth scrool
        // -----------------------------
         $('.scrollTo').on('click', function(e) {
             e.preventDefault();
             var target = $(this).attr('href');
             $('html, body').animate({
               scrollTop: ($(target).offset().top)
             }, 500);
          });
    });

})(jQuery);