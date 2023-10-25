const deleteOrderItem = (id) => {
    if (functionCall) {
        fetch(`https://scarlet-chimpanzee-gear.cyclic.app/api/v1/orderitem/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
            .catch(err => console.log(err)) // Do something with the error
    }

}
let functionCall = false;
//getting the data
let container = ``
fetch(`https://scarlet-chimpanzee-gear.cyclic.app/api/v1/orderitem`)
    .then(res => res.json())
    .then(json => {
        json.data.forEach(prod => {
            console.log(prod)
            container += `

            <div class="Pro-info">
            <div>
                <h6>Product Image:</h6>
                <img src="${prod.product.image}" alt="${prod.product.title}-image" loading="lazy">
            </div>
            <div>
                <h6>Product Name:</h6>
                <span>${prod.product.title}</span>
            </div>
            <div>
                <h6>Price:</h6>
                <span>${prod.product.price}</span>
            </div>
            <div>
                <h6>Quantity:</h6>
                <input type="number" name="quantity" id="quantity" min="1" value="${prod.quantity}"
                    class="form-control w-50 my-2 quantity">
                <button class="btn btn-danger delete"><i class="fas fa-trash"></i></button>
            </div>
            <div>
                <h6>Total Price: ${prod.product.price * prod.quantity}</h6>
                <span></span>
            </div>
        </div>
            `
        });
        document.querySelector('.products').innerHTML = container;
    })
    console.log(container)





$(document).ready(() => {
    $('.loading .spinner').fadeOut(500, () => {
        $('.loading').fadeOut(500)
    })


})