


// changing Navbar
var prevScrollpos = window.scrollY;
window.onscroll = function () {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
        $('nav').css('backgroundColor', '#0000009a');
        $('nav a').css('color', '#fff')
    } else {
        document.getElementById("navbar").style.top = "-180px";
        $('nav').css('backgroundColor', 'transparent');
        $('nav a').css('color', '#fff')
    }
    prevScrollpos = currentScrollPos;
}