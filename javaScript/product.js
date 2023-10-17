$(document).ready(() => {
    $('.loading .spinner').fadeOut(500, () => {
        $('.loading').fadeOut(500)
    })
})

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

// Image Swiper


const mainImg = document.querySelector('.col-md-6 .image img');
let images = document.querySelectorAll('.col-md-6 .img-slider img');

images.forEach(img => {
    img.addEventListener('click',(e)=>{
        mainImg.src = e.target.src
    })
})