const prodCont = document.querySelector('.products');
let productContainer;
const value = localStorage.key(0);
//getting the data
if (value != null) {
    // check that user have past storage
    productContainer = JSON.parse(localStorage.getItem("vrvProducts"));
    document.querySelector('.proceed').removeAttribute('disabled');
    displayData();
} else {

    document.querySelector('.proceed').setAttribute('disabled', "");
    productContainer = []; // if User don't have storage so it will create an empty array
}

// A function to Display the data in the table row 
function displayData() {
    container = ``;
    for (let i = 0; i < productContainer.length; i++) {
        container += `

        <div class="Pro-info" >
    <div>
        <h6>Product Image:</h6>
        <img src="${productContainer[i].coverImg}" alt="${productContainer[i].title}" loading="lazy" decoding="async" fetchpriority="high">
    </div>
    <div>
        <h6>Product Name:</h6>
        <span>${productContainer[i].title}</span>
    </div>
    <div>
        <h6>Price:</h6>
        <span class="price">${productContainer[i].price}</span>
    </div>
    <div>
        <h6>Quantity:</h6>
        <span>${productContainer[i].quantity}</span>
        </div>
        <div>
        <h6>Total Price: ${productContainer[i].price * productContainer[i].quantity}</h6>
        <span></span>
        </div>
        <button class="btn btn-danger delete" onclick="deleteProduct(${i})"><i class="fas fa-trash"></i></button>
    </div>
    `
    }
    document.querySelector('.products').innerHTML = container;
}

//Delete product

function deleteProduct(e) {
    productContainer.splice(e, 1);
    displayData();
    localStorage.setItem('vrvProducts', JSON.stringify(productContainer));
    window.location.reload();
}





$(document).ready(() => {
    $('.loading .spinner').fadeOut(500, () => {
        $('.loading').fadeOut(500)
    })
})
