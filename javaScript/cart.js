// post the data in the dataBase 

window.addEventListener('load', () => {
    const params = (new URL(document.location)).searchParams;
    const size = params.get('size');
    const quantity = params.get('quantity');
    const prodId = params.get('productId');
    const price = params.get('price');
    const totalPrice = price * quantity;
    const data = {
        quantity: quantity,
        size: size,
        product: prodId
    };

    // posting data to orderitem route
    // fetch(`https://scarlet-chimpanzee-gear.cyclic.app/api/v1/orderitem`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)

    // })

    //getting the data
    fetch(`https://scarlet-chimpanzee-gear.cyclic.app/api/v1/orderitem`)
        .then(res => res.json())
        .then(json => {
            json.data.forEach(prod => {
                let container = `

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
                    <span>${price}</span>
                </div>
                <div>
                    <h6>Quantity:</h6>
                    <input type="number" name="quantity" id="quantity" min="1" value="${quantity}"
                        class="form-control w-50 my-2 quantity">
                    <button class="btn btn-danger"  onclick="${deleteOrderItem(prod._id)}"><i class="fas fa-trash"></i></button>
                </div>
                <div>
                    <h6>Total Price:</h6>
                    <span>${totalPrice}</span>
                </div>
            </div>
                `
                document.querySelector('.products').innerHTML = container;
            });
        })
})


const deleteOrderItem = (id) => {
    fetch(`https://scarlet-chimpanzee-gear.cyclic.app/api/v1/orderitem/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(err)) // Do something with the error

}

$(document).ready(() => {
    $('.loading .spinner').fadeOut(500, () => {
        $('.loading').fadeOut(500)
    })
})
