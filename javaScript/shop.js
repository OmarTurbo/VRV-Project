const productContainer = document.querySelector('.product');
// Getting all product
let container = ``
fetch('https://scarlet-chimpanzee-gear.cyclic.app/api/v1/products')
    .then(response => response.json()
        .then(json => json.data.forEach(product => {
            container += `
            <div class="col-md-3">
            <div class="card">
                <!-- picture number 1 -->
                <img src="${product.image}" alt="productNum1" loading="lazy" class="img-fluid p1">
                <!-- picture number 1 -->
                <img src="${product.imageGallery[1]}" alt="productNum1" loading="lazy" class="img-fluid p2">
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

            productContainer.innerHTML = container;       
        })))


$(document).ready(() => {
    $('.loading .spinner').fadeOut(500, () => {
        $('.loading').fadeOut(500)
    })
})
