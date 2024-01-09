// get the product data with the Id
window.addEventListener('load', async () => {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('productId');
    await fetch(`https://scarlet-chimpanzee-gear.cyclic.app/api/v1/products/${id}`)
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
                document.querySelector('title').innerHTML = prodName
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
                document.querySelector('#sizeOneQuantity').setAttribute('value', `${size[0].size1}`)
                document.querySelector('#sizeTwoQuantity').setAttribute('value', `${size[0].size2}`)

                size.forEach(size => {
                    if (size.size1 == 0) {
                        sizeOne.setAttribute("disabled", "");
                        document.querySelector('.sizeOneLabel').classList.add('text-decoration-line-through');
                        sizeOne.removeAttribute("checked");
                    }
                    else {
                        document.querySelector('.sizeOneLabel').classList.remove('text-decoration-line-through');
                        sizeOne.removeAttribute("disabled");
                    }

                    if (size.size2 == 0) {
                        document.querySelector('.sizeTwoLabel').classList.add('text-decoration-line-through');
                        sizeTwo.setAttribute("disabled", "");
                        sizeOne.removeAttribute("checked");
                    } else {
                        document.querySelector('.sizeTwoLabel').classList.remove('text-decoration-line-through');
                        sizeTwo.removeAttribute("disabled")
                    };
                })


            }))
})

if (window.localStorage.getItem("vrvProducts") != null) {// check that user have past storage
    productContainer = JSON.parse(localStorage.getItem("products"));
} else {
    productContainer = []; // if User don't have storage so it will create an empty array
}
function addingDataToStorage() {
    const pId = document.getElementById('hidden').value;
    const quantity = document.querySelector('#quantity').value;
    const inputSize = document.querySelectorAll('.size');
    const title = document.querySelector('#pName').textContent;
    const coverImg = document.querySelector('.col-md-6 .image img').src;
    const price = document.querySelector('#priceVal').value;
    const alert = document.querySelector('.alert');
    const sizeOne = document.querySelector('#sizeOneQuantity');
    const sizeTwo = document.querySelector('#sizeTwoQuantity');
    let checked;
    let newSize;
    let oldSize;
    let sizeObj = {
        "size1": 0,
        "size2": 0
    }
    inputSize.forEach(selectSize => {
        if (selectSize.checked === true) {
            checked = selectSize.value;
        }

        if (checked == sizeOne.name) {
            newSize = sizeOne.value - quantity;
            oldSize = sizeTwo.value;
            sizeObj.size1 = Number(newSize);
            sizeObj.size2 = Number(oldSize);
            if (newSize == 0) {
                newSize = 0
            }
        } else if (checked == sizeTwo.name) {
            newSize = sizeTwo.value - quantity;
            oldSize = sizeOne.value;
            sizeObj.size1 = Number(oldSize);
            sizeObj.size2 = Number(newSize);
            if (newSize == 0) {
                newSize = 0
            }
        }
    })
    data = {
        title,
        quantity,
        size: checked,
        id: pId,
        coverImg,
        price,
        totalPrice: price * quantity,
        newSize,
        sizeObj
    };
    // posting data to localStorage 
    productContainer.push(data)
    localStorage.setItem('vrvProducts', JSON.stringify(productContainer));
    alert.style.display = "block";
    setTimeout(() => { alert.style.display = "none" }, 5000);
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