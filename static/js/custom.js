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
        // -----------------------------
        //  Video Replace
        // -----------------------------
        $('.video-box i').click(function() {
            var videoUrl = $(this).attr('data-video');
            try {
                var parsed = new URL(videoUrl);
                if (parsed.protocol !== 'https:') return;
                if (!['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com'].includes(parsed.hostname)) return;
            } catch (e) { return; }
            var iframe = document.createElement('iframe');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('src', videoUrl);
            $(this).replaceWith(iframe);
        });

        // -----------------------------
        //  Contact Form
        // -----------------------------

        // Rate limiting: Track last submission time
        var lastSubmissionTime = 0;
        var submissionCooldown = 60000; // 60 seconds between submissions

        // Simple input sanitization function
        function sanitizeInput(input) {
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(input));
            return div.innerHTML;
        }

        $('#contact').submit(function(event) {
            event.preventDefault();

            // Rate limiting check
            var currentTime = Date.now();
            if (currentTime - lastSubmissionTime < submissionCooldown) {
                var remainingTime = Math.ceil((submissionCooldown - (currentTime - lastSubmissionTime)) / 1000);
                alert('Please wait ' + remainingTime + ' seconds before submitting again.');
                return false;
            }

            // Honeypot check - if filled, it's likely a bot
            if ($('#honeypot').val() !== '') {
                console.log('Spam detected');
                $('#contact').remove();
                $('#contact-error').fadeIn();
                return false;
            }

            // Get and sanitize form values
            var name = sanitizeInput($('#name').val().trim());
            var email = sanitizeInput($('#email').val().trim());
            var message = sanitizeInput($('#message').val().trim());

            // Additional validation
            if (name.length < 2 || name.length > 100) {
                alert('Name must be between 2 and 100 characters');
                return false;
            }

            if (email.length > 255) {
                alert('Email address is too long');
                return false;
            }

            if (message.length < 10 || message.length > 5000) {
                alert('Message must be between 10 and 5000 characters');
                return false;
            }

            // Disable submit button to prevent double submission
            var submitBtn = $('#submit-btn');
            submitBtn.prop('disabled', true);
            submitBtn.text('Sending...');

            $.ajax({
                method: "POST",
                url: "https://app.99inbound.com/api/e/74bnVMQv",
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                timeout: 30000, // 30 second timeout
                success: function (data) {
                    lastSubmissionTime = Date.now();
                    $('#contact').remove();
                    $('#contact-success').fadeIn();
                },
                error: function (xhr, status, error) {
                    console.error('Form submission error:', status, error);
                    submitBtn.prop('disabled', false);
                    submitBtn.text('Submit');
                    $('#contact').remove();
                    $('#contact-error').fadeIn();
                }
            });
        });
    });

})(jQuery);