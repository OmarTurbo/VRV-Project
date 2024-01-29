const productContainer = document.querySelectorAll('.product');
// Getting all product
let container = ``
fetch('https://scarlet-chimpanzee-gear.cyclic.app/api/v1/products')
    .then(response => response.json()
        .then(json => json.data.forEach(product => {
            container += `
            <div class="col-md-4">
            <div class="card">
                <!-- picture number 1 -->
                <img src="${product.image}" alt="productNum1" loading="lazy" class="img-fluid p1" decoding="async" fetchpriority="high">
                <!-- picture number 1 -->
                <picture>
                    <source 
                    type="image/webp">
                    <img src="${product.imageGallery[1]}" alt="productNum1" decoding="async" fetchpriority="high" loading="lazy" class="img-fluid p2">
                </picture>
                <h4>${product.title}</h4>
                <div class="d-flex align-items-center justify-content-between">
                    <h5>${product.price} EG</h5>
                    <form  method="get" action="product.html">
                    <input type="hidden" class="hidden" name="productId" value="${product._id}">
                    <button class="btn btn-outline-light shopBtn" type="submit">Buy Now!</button>
                    </form>
                </div>
            </div>
        </div>`;

            productContainer.forEach(product => {
                product.innerHTML = container
            })
        })))




$('#closeScreen').click(() => {
    $('.loading .spinner').fadeOut(500, () => {
        $('.loading button').fadeOut(1,()=>{

            $('.loading').fadeOut(500,()=>{
                $('body').css('overflow',"auto")
            })
        })
    })
})



// // changing Navbar
// var prevScrollpos = window.scrollY;
// window.onscroll = function () {
//     var currentScrollPos = window.scrollY;
//     if (prevScrollpos > currentScrollPos) {
//         document.getElementById("navbar").style.top = "0";
//         $('nav').css('backgroundColor', '#00000050');
//         $('nav a').css('color', '#fff')
//     } else {
//         document.getElementById("navbar").style.top = "-180px";
//         $('nav').css('backgroundColor', 'transparent');
//         $('nav a').css('color', '#fff')
//         prevScrollpos = 0;
//     }

//     prevScrollpos = currentScrollPos;
// }

const swiper = new Swiper(
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