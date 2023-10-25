// get the product data with the Id

window.addEventListener('load', () => {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('productId');
    fetch(`https://scarlet-chimpanzee-gear.cyclic.app/api/v1/products/${id}`)
        .then(res => res.json()
            .then(json => {
                const prodName = json.data.title;
                const prodId = json.data._id;
                const prodPrice = json.data.price;
                const mainImg = json.data.image;
                const size = json.data.size;
                const imageGallery = json.data.imageGallery;
                const imgSlider = document.querySelector('.img-slider');
                //fetching id
                document.querySelector('#hidden').setAttribute('value', `${prodId}`);
                //fetching productName
                document.querySelector('#pName').innerHTML = prodName;
                //fetching productPrice
                document.querySelector('#price').innerHTML = `${prodPrice} EG`;
                document.querySelector('#priceVal').setAttribute('value', `${prodPrice}`);

                // fetching the image
                document.querySelector('.mainImg').src = mainImg;
                let imgContainer = ``;
                imageGallery.forEach(img => {
                    imgContainer += `<img src="${img}" alt="productNum1" loading="lazy">`;
                })
                imgSlider.innerHTML = imgContainer;
                const coverImg = document.querySelector('.col-md-6 .image img');
                let images = document.querySelectorAll('.col-md-6 .img-slider img');

                images.forEach(img => {
                    img.addEventListener('click', (e) => {
                        coverImg.src = e.target.src
                    })
                })

                // Validating the size option
                const sizeOne = document.querySelector('.sizeOne');
                const sizeTwo = document.querySelector('.sizeTwo');

                size.forEach(size => {
                    if (size.size1 == 0) {
                        sizeOne.setAttribute("disabled", "")
                    }
                    else {
                        sizeOne.removeAttribute("disabled");
                    }

                    if (size.size2 == 0) {
                        sizeTwo.setAttribute("disabled", "");
                    } else {
                        sizeTwo.removeAttribute("disabled")
                    };
                })


            }))
})

function addingDataStorage() {
    const pId = document.getElementById('hidden').value;
    const quantity = document.querySelector('#quantity').value;
    const size = document.querySelectorAll('.size');
    let checked;
    size.forEach(size => {
        if (size.checked === true) {
            checked = size.value;
        }
    })
    const data = {
        quantity: quantity,
        size: checked,
        product: pId
    };
    // posting data to orderitem route
    fetch(`https://scarlet-chimpanzee-gear.cyclic.app/api/v1/orderitem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    }).then(res => {
        if (res.ok) {
            let alert = document.querySelector('.alert');
            alert.style.display = "block";
            setTimeout(() => { alert.style.display = 'none' }, 4000)
        }
    })
}



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


