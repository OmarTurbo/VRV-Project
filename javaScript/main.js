const productContainer = document.querySelectorAll(".product");
// Getting all product
let container = ``;
fetch("https://scarlet-chimpanzee-gear.cyclic.app/api/v1/products?sort=-createdAt").then(
  (response) =>
    response.json().then((json) =>
      json.data.forEach((product) => {
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

        productContainer.forEach((product) => {
          product.innerHTML = container;
        });
      })
    )
);

$("#closeScreen").click(() => {
  $(".loading .spinner").fadeOut(500, () => {
    $(".loading button").fadeOut(1, () => {
      $(".loading").fadeOut(500, () => {
        $("body").css("overflow", "auto");
      });
    });
  });
});

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

const swiper = new Swiper(".swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


// Contact Us Function 
const form = document.querySelector("form");
const Name = document.querySelector(".name");
const emailContact = document.querySelector(".email");
const Number = document.querySelector(".number");
const Subject = document.querySelector(".subject");
const message = document.querySelector(".message");

function sendEmail() {
  const bodyMessage = `Name: ${Name.value}<br><br> Email: ${emailContact.value}<br><br> Phone Number: ${Number.value} <br><br> Message: ${message.value}`;
  Email.send({
    SecureToken: "dce8a255-34d5-414a-a7b9-89eb2a97b1b1",
    Host: "smtp.elasticemail.com",
    Username: "vurve3@gmail.com",
    Password: "65F779DEB8FEC0E5968EFE4803D33FDCB436",
    To: "vurve3@gmail.com",
    From: "vurve3@gmail.com",
    Subject: Subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Success!",
        text: "The Message sent successfully!",
        icon: "success",
      });
    }
  });
}

function checkInputs() {
  const inputs = document.querySelectorAll(".form-control");
  for (const item of inputs) {
    // Checking first
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }
    // Check Email Condition
    if (inputs[1].value != "") {
      checkEmail();
    }
    inputs[1].addEventListener("keyup", () => {
      checkEmail();
    });
    // updating the condition

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const emailTextMsg = document.querySelector(".error-box.email");
  if (!emailContact.value.match(emailRegex)) {
    emailContact.classList.add("error");
    emailContact.parentElement.classList.add("error");
    if (emailContact.value != "") {
      emailTextMsg.innerHTML = "<h4>enter valid email</h4>";
    } else {
      emailTextMsg.innerHTML = "<h4>The Email box Can't be blank</h4>";
    }
  } else {
    emailContact.classList.remove("error");
    emailContact.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
  if (
    !Name.classList.contains("error") &&
    !emailContact.classList.contains("error") &&
    !Number.classList.contains("error") &&
    !Subject.classList.contains("error") &&
    !message.classList.contains("error")
  ) {
    sendEmail();
    form.reset();
    return false;
  }
});
