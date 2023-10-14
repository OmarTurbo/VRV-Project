$(document).ready(() => {
    $('.loading .spinner').fadeOut(1500, () => {
        $('.loading').fadeOut(500)
    })
})



// changing Navbar

let changingPart = $('.hero').offset(); // The length from the top to the section
// changing the navbar color smoothly
$(window).scroll(() => {
    let wScroll = $(window).scrollTop();
    if (wScroll > 50) {
        $('nav').css('backgroundColor', '#0000009a');
        $('nav a').css('color', '#fff')
    } else {
        $('nav').css('backgroundColor', 'transparent');
        $('nav a').css('color', '#fff')
    };
})

