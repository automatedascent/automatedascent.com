'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // -----------------------------
    //  Glassmorphism Nav on Scroll
    // -----------------------------
    var mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        });
    }

    // -----------------------------
    //  Scroll-triggered Animations
    // -----------------------------
    var animatedElements = document.querySelectorAll('.feature-content, .service-block, .image-content');

    if (animatedElements.length > 0) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // -----------------------------
    //  Testimonial Slider (Swiper)
    // -----------------------------
    var sliderEl = document.querySelector('.testimonial-slider');
    if (sliderEl) {
        new Swiper('.testimonial-slider', {
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
    //  On Click Smooth Scroll
    // -----------------------------
    document.querySelectorAll('.scrollTo').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // -----------------------------
    //  Video Replace
    // -----------------------------
    document.querySelectorAll('.video-box i').forEach(function (el) {
        el.addEventListener('click', function () {
            var videoUrl = this.getAttribute('data-video');
            try {
                var parsed = new URL(videoUrl);
                if (parsed.protocol !== 'https:') return;
                if (['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com'].indexOf(parsed.hostname) === -1) return;
            } catch (e) { return; }
            var iframe = document.createElement('iframe');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('src', videoUrl);
            this.parentNode.replaceChild(iframe, this);
        });
    });
});
