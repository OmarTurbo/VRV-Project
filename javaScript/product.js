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
        $('nav').css('backgroundColor', '#0000009a');
        $('nav a').css('color', '#fff')
    } else {
        document.getElementById("navbar").style.top = "-180px";
        $('nav').css('backgroundColor', 'transparent');
        $('nav a').css('color', '#fff')
        prevScrollpos = 0;
    }

    prevScrollpos = currentScrollPos;
}

// Image Zoom Effect

const container = document.querySelector(".image");
const img = document.querySelector('.image img');

container.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = container.getBoundingClientRect();

    const x = e.clientX - left;
    const y = e.clientY - top;

    const scale = 1.3;

    const zoomX = (x / width) * (1 - scale);
    const zoomY = (y / height) * (1 - scale);

    img.style.transform = `scale(${scale}) translate(${zoomX * 100}%,${zoomY * 100}%)`;
    container.style.cursor = 'zoom-in'
})

container.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1) translate(0% ,0%)';
    container.style.cursor = 'default'
})
