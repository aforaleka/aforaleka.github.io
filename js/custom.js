$(document).ready(function () {

    "use strict";

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // section nav
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    (function() {
        [].slice.call( document.querySelectorAll( '.tabs' ) ).forEach( function( el ) {
            new CBPFWTabs( el );
        });
    })();

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    /* Parallax init  */
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    if(jQuery.browser.mobile) {

        $('.timer1').countTo({
            from: 0,
            to: 8679,
            speed: 1,
            refreshInterval: 8679
        });

        $('.timer2').countTo({
            from: 0,
            to: 340,
            speed: 1,
            refreshInterval: 340
        });

        $('.timer3').countTo({
            from: 0,
            to: 100,
            speed: 1,
            refreshInterval: 100
        });

        $('.timer4').countTo({
            from: 0,
            to: 3456,
            speed: 1,
            refreshInterval: 3456
        });
        
    } else {

        window.scrollReveal = new scrollReveal();

        $('#text-separator-timers').waypoint(function() {
            "use strict";

            $('.timer1').countTo({
                from: 0,
                to: 8679,
                speed: 4000,
                refreshInterval: 100
            });

            $('.timer2').countTo({
                from: 0,
                to: 340,
                speed: 2500,
                refreshInterval: 50
            });

            $('.timer3').countTo({
                from: 0,
                to: 100,
                speed: 2000,
                refreshInterval: 10
            });

            $('.timer4').countTo({
                from: 0,
                to: 3456,
                speed: 4000,
                refreshInterval: 10,
            });

        }, { offset: 500 });

    }

    if(!(jQuery.browser.mobile) && $(window).width() > 768){
        $(window).stellar({
            responsive: true,
            horizontalOffset: 0,
            horizontalScrolling:false
        });
    }

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    /* Intro Height  */
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    function introHeight() {
        var wh = $(window).height();
        $('#intro').css({height: wh});
    }

    introHeight();
    $(window).bind('resize',function () {
        introHeight();
    });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    /* Isotope */
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    
    var $container = $('.gallery').imagesLoaded( function() {
        $container.isotope({
            // options
        });
    });

    $('#filters').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });
    });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    /* Portfolio click for mobile  */
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    $('.gallery-inner img').bind('touchstart', function() {
        $(this).addClass('.gallery-inner .captionWrapper');
    });

    $('.gallery-inner  img').bind('touchend', function() {
        $(this).removeClass('.gallery-inner .captionWrapper');
    });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    // portfolio filter
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

        $(".filterAll").click(function(){
            $(".activeFilter h3 span").text(function(){
                return 'all';
            });
        });

        $(".filterCode").click(function(){
            $(".activeFilter h3 span").text(function(){
                return 'code';
            });
        });

        $(".filterDesign").click(function(){
            $(".activeFilter h3 span").text(function(){
                return 'design';
            });
        });

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    /* smoothscroll */
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    smoothScroll.init({
        speed: 1000,
        offset: 60
    });

});

