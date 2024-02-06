// get the product data with the Id
window.addEventListener("load", async () => {
  const params = new URL(document.location).searchParams;
  const id = params.get("productId");
  await fetch(
    `https://scarlet-chimpanzee-gear.cyclic.app/api/v1/products/${id}`
  ).then((res) =>
    res.json().then((json) => {
      const prodName = json.data.title;
      const prodId = json.data._id;
      const prodPrice = json.data.price;
      const mainImg = json.data.image;
      const size = json.data.size;
      const imageGallery = json.data.imageGallery;
      const imgSlider = document.querySelector(".img-slider");
      //fetching id
      document.querySelector("#hidden").setAttribute("value", `${prodId}`);
      //fetching productName
      document.querySelector("#pName").innerHTML = prodName;
      document.querySelector("title").innerHTML = prodName;
      //fetching productPrice
      document.querySelector("#price").innerHTML = `${prodPrice} EG`;
      document.querySelector("#priceVal").setAttribute("value", `${prodPrice}`);

      // fetching the image
      document.querySelector(".mainImg").src = mainImg;
      let imgContainer = ``;
      imageGallery.forEach((img) => {
        imgContainer += `<img src="${img}" alt="productNum1" decoding="async" fetchpriority="high" loading="lazy">`;
      });
      imgSlider.innerHTML = imgContainer;
      const coverImg = document.querySelector(".col-md-6 .image img");
      let images = document.querySelectorAll(".col-md-6 .img-slider img");

      images.forEach((img) => {
        img.addEventListener("click", (e) => {
          coverImg.src = e.target.src;
        });
      });

      // Validating the size option
      const small = document.querySelector(".small");
      const medium = document.querySelector(".medium");
      const large = document.querySelector(".large");
      document
        .querySelector("#smallQuantity")
        .setAttribute("value", `${size[0].small}`);
      document
        .querySelector("#mediumQuantity")
        .setAttribute("value", `${size[0].medium}`);
      document
        .querySelector("#largeQuantity")
        .setAttribute("value", `${size[0].large}`);

      size.forEach((size) => {
        if (size.small == 0) {
          small.setAttribute("disabled", "");
          document
            .querySelector(".smallLabel")
            .classList.add("text-decoration-line-through");
          small.removeAttribute("checked");
        } else {
          document
            .querySelector(".smallLabel")
            .classList.remove("text-decoration-line-through");
          small.removeAttribute("disabled");
        }

        if (size.medium == 0) {
          document
            .querySelector(".mediumLabel")
            .classList.add("text-decoration-line-through");
          medium.setAttribute("disabled", "");
          medium.removeAttribute("checked");
        } else {
          document
            .querySelector(".mediumLabel")
            .classList.remove("text-decoration-line-through");
          medium.removeAttribute("disabled");
        }
        if (size.large == 0) {
          document
            .querySelector(".largeLabel")
            .classList.add("text-decoration-line-through");
          large.setAttribute("disabled", "");
          large.removeAttribute("checked");
        } else {
          document
            .querySelector(".largeLabel")
            .classList.remove("text-decoration-line-through");
          large.removeAttribute("disabled");
        }
      });
    })
  );
});

if (window.localStorage.getItem("vrvProducts") != null) {
  // check that user have past storage
  productContainer = JSON.parse(localStorage.getItem("products"));
} else {
  productContainer = []; // if User don't have storage so it will create an empty array
}
function addingDataToStorage() {
  const pId = document.getElementById("hidden").value;
  const quantity = document.querySelector("#quantity").value;
  const inputSize = document.querySelectorAll(".size");
  const title = document.querySelector("#pName").textContent;
  const coverImg = document.querySelector(".col-md-6 .image img").src;
  const price = document.querySelector("#priceVal").value;
  const alert = document.querySelector(".alert");
  const small = document.querySelector("#smallQuantity");
  const medium = document.querySelector("#mediumQuantity");
  const large = document.querySelector("#largeQuantity");
  let checked;
  let SmallSize;
  let mediumSize;
  let largeSize;
  let sizeObj = {
    small: 0,
    medium: 0,
    large: 0,
  };
  inputSize.forEach((selectSize) => {
    if (selectSize.checked === true) {
      checked = selectSize.value;
    }

    if (checked == small.name) {
      SmallSize = small.value - quantity;
      mediumSize = medium.value;
      largeSize = large.value;
      sizeObj.small = Number(SmallSize);
      sizeObj.medium = Number(mediumSize);
      sizeObj.large = Number(largeSize);
      if (SmallSize == 0) {
        SmallSize = 0;
      }
    } else if (checked == medium.name) {
      mediumSize = medium.value - quantity;
      SmallSize = small.value;
      largeSize = large.value;
      sizeObj.small = Number(SmallSize);
      sizeObj.medium = Number(mediumSize);
      sizeObj.large = Number(largeSize);
      if (mediumSize == 0) {
        mediumSize = 0;
      }
    } else if (checked == large.name) {
      largeSize = large.value - quantity;
      SmallSize = small.value;
      mediumSize = medium.value;
      sizeObj.small = Number(SmallSize);
      sizeObj.large = Number(largeSize);
      sizeObj.medium = Number(mediumSize);
      if (largeSize == 0) {
        largeSize = 0;
      }
    }
  });
  data = {
    title,
    quantity,
    size: checked,
    id: pId,
    coverImg,
    price,
    totalPrice: price * quantity,
    sizeObj,
  };
  // posting data to localStorage
  productContainer = [];
  productContainer.push(data);
  localStorage.setItem("vrvProducts", JSON.stringify(productContainer));
  alert.style.display = "block";
  setTimeout(() => {
    alert.style.display = "none";
  }, 5000);
}

$(document).ready(() => {
  $(".loading .spinner").fadeOut(500, () => {
    $(".loading").fadeOut(500);
  });
});

// Image Zoom Effect

const container = document.querySelector(".image");
const img = document.querySelector(".image img");

container.addEventListener("mousemove", (e) => {
  const { left, top, width, height } = container.getBoundingClientRect();

  const x = e.clientX - left;
  const y = e.clientY - top;

  const scale = 1.3;

  const zoomX = (x / width) * (1 - scale);
  const zoomY = (y / height) * (1 - scale);

  img.style.transform = `scale(${scale}) translate(${zoomX * 100}%,${
    zoomY * 100
  }%)`;
  container.style.cursor = "zoom-in";
});

container.addEventListener("mouseleave", () => {
  img.style.transform = "scale(1) translate(0% ,0%)";
  container.style.cursor = "default";
});
