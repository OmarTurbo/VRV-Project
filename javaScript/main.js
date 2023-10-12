$(document).ready(()=>{ 
    $('.loading .spinner').fadeOut(1500,()=>{
        $('.loading').fadeOut(500)
    })
})

// changing Navbar

let changingPart = $('.hero').offset().top; // The length from the top to the section
// changing the navbar color smoothly
$(window).scroll(() => {
    let wScroll = $(window).scrollTop();
    if (wScroll > changingPart) {
        $('nav').css('backgroundColor', '#2f2f2fcc');
        $('nav a').css('color', '#fff')
        $('nav').css('padding', '0 200px');
    } else {
        $('nav').css('backgroundColor', 'transparent');
        $('nav a').css('color', '#fff')
        $('nav').css('padding', '0')
    };
})
