$(document).ready(() => {
    $('.loading .spinner').fadeOut(500, () => {
        $('.loading').fadeOut(500)
    })
})



// changing Navbar
var prevScrollpos = window.scrollY;
window.onscroll = function () {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
        $('nav').css('backgroundColor', '#00000050');
        $('nav a').css('color', '#fff')
    } else {
        document.getElementById("navbar").style.top = "-180px";
        $('nav').css('backgroundColor', 'transparent');
        $('nav a').css('color', '#fff')
        prevScrollpos = 0;
    }

    prevScrollpos = currentScrollPos;
}

// variable 
var VIDEO_PLAYING_STATE = {
    "PLAYING": "PLAYING",
    "PAUSE": "PAUSE"
}
var videoPlayStatus = VIDEO_PLAYING_STATE.PAUSE
var timeout = null
var waiting = 3000
var swiper = new Swiper(
    '.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
});

// HTML5 vdo object
var options = {};
var player = videojs('my-player', options);
player.on('ended', function () {
    next()
})

// swiper object
swiper.on('slideChangeTransitionEnd', function () {
    var index = swiper.activeIndex
    var currentSlide = $(swiper.slides[index])
    var currentSlideType = currentSlide.data('slide-type')

    // incase user click next before video ended
    if (videoPlayStatus === VIDEO_PLAYING_STATE.PLAYING) {
        player.pause()
    }

    
    clearTimeout(timeout)

    switch (currentSlideType) {
        case 'img':
            runNext()
            break;
        case 'vdo':
            player.currentTime(0)
            player.play()
            videoPlayStatus = VIDEO_PLAYING_STATE.PLAYING
            break;
        default:
            throw new Error('invalid slide type');
    }
})

// global function
function prev() {
    swiper.slidePrev();
}

function next() {
    swiper.slideNext();
}

function runNext() {
    timeout = setTimeout(function () {
        next()
    }, waiting)
}

runNext()
