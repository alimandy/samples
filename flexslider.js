/* Author: Ali M Faqih - flexslider
*/
$(window).load(function() {
    var numTopPhotos = $("#slideshow .slides li").length;
    var randPhoto = Math.floor(Math.random()*numTopPhotos);
    $('#slideshow .flexslider').flexslider({
        animation: "fade",
        controlsContainer: ".flex-container",
        startAt: randPhoto,
        slideshowSpeed: 10000,
        pauseOnHover: true
    });
     $('.home_block .flexslider').flexslider({
        animation: "fade",
        slideshow: false,
        directionNav: false
    });
    /* Hide nav elements if only one photo */
    if (numTopPhotos == 1) {
        $('#about_photo ul.flex-direction-nav').hide();
        $('#about_photo ol.flex-control-nav').hide();
    }
     
});

function viewport() {
   var e = window, a = 'inner';
   if (!('innerWidth' in window )) {
       a = 'client';
       e = document.documentElement || document.body;
   }
   return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

var bodyWidth = 0;

var mobileView = true;
var smTabletView = false;
var lgTabletView = false;
var desktopView = false;

var alMenu = undefined;
var menuButton = undefined;
var searchButton = undefined;
var searchInput = undefined;

$(document).ready(function(){
    
    bodyWidth = viewport().width;
    alMenu = $("#top_nav ul");
    menuButton = $("#menu_btn");
    searchButton = $("#search_btn");
    searchInput = $("#search_site");
    ltIE8 = ($(".lt-ie8").length > 0);
    
    $("#minor_emergency #close_minor").click(function(){
        $("#minor_emergency div").fadeOut();
        $("#minor_emergency").slideUp();
    });
    
    $("#search_site #q").blur(function(){
        if ($(this).val() == "") {
            $(this).val("Search");
        }
    });
    $("#search_site #q").focus(function(){
        if ($(this).val() == "Search") {
            $(this).val("");
        }
    });
    
    menuButton.click(function() {
        if (alMenu.is(":visible")) {
            alMenu.slideUp();
        } else {
            if (searchInput.is(":visible")) {
                searchInput.slideUp();
            }
            alMenu.slideDown();
        }
    });
    searchButton.click(function() {
        if (searchInput.is(":visible")) {
            searchInput.slideUp();
        } else {
            if (alMenu.is(":visible")) {
                alMenu.slideUp();
            }
            searchInput.slideDown();
        }
    });
    
    /* double curly bracket link shortcode in photo caption */
    $( ".photo_caption" ).each(function() {
        var oldHtml = $(this).html();
        var newHtml = oldHtml.replace(/\{\{\s*(https*\:\/\/[^\}\,]+)\s*\}\}/g, "<a href=\"$1\">$1</a>");
        var newHtml = newHtml.replace(/\{\{\s*(https*\:\/\/[^\}\,]+)\s*\,{1}\s*([^\}]*)\s*\}\}/g, "<a href=\"$1\">$2</a>");
        $(this).html(newHtml);
    });
    
    bodyWidth = viewport().width;
    if (bodyWidth <= 940) {
        $("#top_mark img").attr("src", "img/single-line-wordmark.png");
    }
    $("#top_mark img").show(); // reveal now so that the large wordmark doesn't flash on the screen
});

$(window).resize(function(){
    bodyWidth = viewport().width;
    if (bodyWidth <= 940) {
        if (desktopView) { // if transitioning down from desktop view
            desktopView = false;
            smTabletView = false;
            lgTabletView = true;
            mobile = false;
            $("#top_mark img").attr("src", "img/single-line-wordmark.png"); // change to the wordmark
        }
        if (bodyWidth >= 720) { 
            if (!lgTabletView) { // if transitioning to large tablet view
                //console.log("transition to lg tablet");
                lgTabletView = true;
                desktopView = false;
                smTabletView = false;
            }
        } else { // < 720
            if (!smTabletView && !mobileView) { // is sub-large tablet view
                lgTabletView = false;
                desktopView = false;
            }
            if (bodyWidth < 600) { 
                if (!mobileView) { // go down to mobile version
                    lgTabletView = false;
                    desktopView = false;
                    smTabletView = false;
                    mobileView = true;
                    alMenu.hide();
                }
            } else {
                if (!smTabletView) { // go to lg tablet view
                    lgTabletView = false;
                    desktopView = false;
                    smTabletView = true;
                    mobileView = false;
                    alMenu.show();
                }
            }
        }
    } else if (!desktopView) { // go to desktop view
        desktopView = true;
        lgTabletView = false;
        smTabletView = false;
        mobileView = false;
        alMenu.show();
        $("#top_mark img").attr("src", "img/weathervane.png");
    }
});
