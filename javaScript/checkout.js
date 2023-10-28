//getting the data
if (localStorage.getItem("products") != null) {// check that user have past storage
    productContainer = JSON.parse(localStorage.getItem("products"));
    displayData();
} else {
    productContainer = []; // if User don't have storage so it will create an empty array
}

function displayData() {
    let container = ``;
    productContainer.forEach(product => {
        container +=
            `
        <div class="header">
        <input type="hidden" value="${product.id}" class="prodId">
            <div class="img position-relative">
                <img src="${product.coverImg}" alt="coverImg" loading="lazy">
                    <span class="position-absolute quantity top-0 start-100 translate-middle badge rounded-pill bg-danger">${product.quantity}</span>
            </div>
            <div class="name">
                <h5 id="pName">${product.title}</h5>
                <span id="pSize">${product.size}</span>
            </div>
            <h5 class="price">${product.totalPrice}</h5>
        </div>
        
        `;
    })

    document.querySelector('.parent').innerHTML = container;
}

$(document).ready(() => {
    $('.loading .spinner').fadeOut(500, () => {
        $('.loading').fadeOut(500)
    })
})

const price = document.querySelectorAll('.price');
const sub = document.querySelector('.sub');
const ship = document.querySelector('.ship');
const city = document.querySelector('#city');
let total = document.querySelector('.total');
// adding subtotal
let totalPrice = 0;
for (let i = 0; i < price.length; i++) {
    let element = Number(price[i].innerHTML);
    totalPrice += element;
}
sub.innerHTML = totalPrice;

// validate shipping & totalPrice

city.addEventListener('keyup', () => {
    if (city.value.toLowerCase() == 'cairo' || city.value == '') {
        ship.innerHTML = 50;
        total = Number(ship.innerHTML) + totalPrice;
        total.innerHTML = Number(ship.innerHTML) + totalPrice;
    } else if (city.value.toLowerCase() == 'giza') {
        ship.innerHTML = 60;
        total = Number(ship.innerHTML) + totalPrice;
        total.innerHTML = Number(ship.innerHTML) + totalPrice;
    } else {
        ship.innerHTML = 70;
        total = Number(ship.innerHTML) + totalPrice;
        total.innerHTML = Number(ship.innerHTML) + totalPrice;
    }

})

const buyBtn = document.querySelector('.submit');
const email = document.querySelector('#email');
const firstName = document.querySelector('#fname');
const lastName = document.querySelector('#lname');
const phone = document.querySelector('#phone');
const address = document.querySelector('#address');
const quantity = document.querySelectorAll('.quantity');
const productId = document.querySelectorAll('.prodId');

let orderItem = []
productContainer.forEach(item => {
    orderItem.push({ "quantity": Number(`${item.quantity}`), "size": `${item.size}`, "product": `${item.id}` })
})
// Adding order to DB 
buyBtn.addEventListener('click', async () => {
    const data = {
        orderItems: orderItem,
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        phone: Number(phone.value),
        address: address.value,
        city: city.value,
        totalPrice: total
    };

    try {
        const response = await fetch("https://scarlet-chimpanzee-gear.cyclic.app/api/v1/order", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        } else {
            console.error('Failed to submit the order.');
        }
    } catch (error) {
        console.error('An error occurred while sending the request:', error);
    };
    productContainer.forEach(product => {
        updateData(product.id, product.size, product.newSize, product.title)
    });

})

async function updateData(id, sizeName, newQuantity, prodName) {
    const update = {
        title: prodName,
        size: {
            sizeName: newQuantity
        }
    }
    try {
        const response = await fetch(`https://scarlet-chimpanzee-gear.cyclic.app/api/v1/products/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(update)

        })
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        } else {
            console.error('Failed to submit the order.');
        }
    } catch (error) {
        console.error('An error occurred while sending the request:', error);
    };
}