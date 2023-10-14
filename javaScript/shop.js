


// changing Navbar

let changingPart = $('.products').offset(); // The length from the top to the section
// changing the navbar color smoothly
console.log(changingPart)
$(window).scroll(() => {
    let wScroll = $(window).scrollTop();
    if (wScroll > changingPart) {
        $('nav').css('backgroundColor', '#0000009a');
        $('nav a').css('color', '#fff')
    } else {
        $('nav').css('backgroundColor', 'transparent');
        $('nav a').css('color', '#fff')
    };
})