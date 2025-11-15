(function ($) {
    'use strict';

    $(document).on('ready', function () {
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
        //  Testimonial Slider
        // -----------------------------
        $('.testimonial-slider').owlCarousel({
            loop:true,
            margin:20,
            dots:true,
            autoplay:true,
            autoplayTimeout:20000,
            responsive:{
                0:{
                    items:1
                },
                400:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:2
                }
            }
        });
        // -----------------------------
        //  Story Slider
        // -----------------------------
        $('.about-slider').owlCarousel({
            loop:true,
            margin:20,
            dots:true,
            autoplay:true,
            items : 1
        });
        // -----------------------------
        //  Quote Slider
        // -----------------------------
        $('.quote-slider').owlCarousel({
            loop:true,
            autoplay:true,
            items : 1
        });
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
        //  Client Slider
        // -----------------------------
        $('.client-slider').owlCarousel({
            loop:true,
            autoplay:true,
            margin: 50,
            responsive:{
                0:{
                    items:1,
                    dots:false
                },
                400:{
                    items:2,
                    dots:false
                },
                600:{
                    items:2,
                    dots:false
                },
                1000:{
                    items:4
                }
            }
        });
        // -----------------------------
        //  Video Replace
        // -----------------------------
        $('.video-box i').click(function() {
            var video = '<iframe allowfullscreen src="' + $(this).attr('data-video') + '"></iframe>';
            $(this).replaceWith(video);
        });
        // -----------------------------
        //  Count Down JS
        // -----------------------------
        $('#simple-timer').syotimer({
            year: 2018,
            month: 5,
            day: 9,
            hour: 20,
            minute: 30
        });
        // -----------------------------
        //  Google Map
        // -----------------------------

        function initialize() {
            var styleArray = [];

            var myLatLng = {lat: 52.188933, lng: 33.083869};

            var mapOptions = {
                zoom: 7,
                scrollwheel: false,
                center: new google.maps.LatLng(52.188933, 33.083869),
                styles: styleArray
            };

            var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
            
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Nexa'
            });
        }
        var mapId = $('#googleMap');
        if (mapId.length) {
            google.maps.event.addDomListener(window, 'load', initialize);
        }

        // -----------------------------
        //  Extra customization
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