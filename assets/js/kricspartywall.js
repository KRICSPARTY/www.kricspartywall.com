(function () {
    var $document, $window;
    var $header, $navbar, $footer, $main, $scrollToTop, $navbarTogglerButton;

    function initVariables() {
        $document = $(document);
        $window = $(window);
        $header = $('header');
        $navbar = $('header > nav.navbar');
        $footer = $('footer');
        $main = $('main');
        $scrollToTop = $('#ScrollToTop');
        $navbarTogglerButton = $('.hamburger-button');
    }

    // Enable tooltip application wide...
    function EnableTooltipsApplicationWide() {
        // Enable tooltip globally...
        $('[data-toggle="tooltip"]').tooltip();

        // Debugging - Enable ONLY for DEBUGGING...
        //$('[data-toggle="tooltip"]').on('show.bs.tooltip', function () {
        //    console.log('Showing Tooltip : ' + $(this).attr('data-original-title'));
        //})
    }

    // Functionality to add "Scroll to Top" button when a page is scrolled.
    function ScrollToTop() {
        $window.scroll(function () {
            if ($(this).scrollTop() != 0) {
                $scrollToTop.fadeIn();
                //$header.fadeTo(1, 0.85);
            }
            else {
                $scrollToTop.fadeOut().tooltip('hide');
                //$header.fadeTo(1, 1);
            }
        });

        $scrollToTop.click(function (e) {
            e.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });
    }

    function StickyMenu() {
        $window.scroll(function () {
            var heightToUseForEffect = 30;

            if ($("#shuffleTextId").length > 0) {  // for homepage
                heightToUseForEffect = $('section.video-wrapper').height() - 50;

                if ($(this).scrollTop() >= heightToUseForEffect) {
                    $navbar.css({ 'position': 'fixed', 'top': 0, 'bottom': 'auto' });
                }
                else {
                    $navbar.css({ 'position': 'absolute', 'bottom': 0, 'top': 'auto' });
                }
            }
            else {
                if ($(this).scrollTop() >= heightToUseForEffect) {
                    $navbar.addClass("fixed-top", 1000, "easeIn").addClass("shrinked", 1000, "easeIn");
                }
                else {
                    $navbar.removeClass("fixed-top", 1000, "easeIn").removeClass("shrinked", 1000, "easeIn");
                }
            }
        });
    }

    // Align ".navbar .navbar-toggler" vertically middle based on the main navbar size.
    function VerticalAlignNavbarTogglerButton() {
        if ($navbarTogglerButton && !$navbarTogglerButton.hasClass('expanded')) {
            $navbarTogglerButton.css('top', (($navbarTogglerButton.parent().parent().height() - $navbarTogglerButton.outerHeight()) / 2) + 'px');
        }
    }

    // Register 'Hamburger-Button' click functionality
    function RegisterNavbarTogglerButtonClick() {
        $(".hamburger-button").click(function () {
            $(this).toggleClass("expanded");
        });
    }

    function RegisterWowJs() {
        new WOW().init();
    }

    function initApplicationScripts() {
        StickyMenu();
        EnableTooltipsApplicationWide();
        ScrollToTop();
        VerticalAlignNavbarTogglerButton();
        RegisterNavbarTogglerButtonClick();
        //RegisterWowJs();
        //slicklist.initialize();
    }

    $(function () {
        //initVariables();  // Todo: Need to test as it is observed that on MS Edge this is called after on 'load' which gives inappropriate behavior...
    });
    
    $(window)
        .on('load', function () {
            initVariables();
            initApplicationScripts();
        })
        .on('resize', function () {
            VerticalAlignNavbarTogglerButton();
        });
}());
