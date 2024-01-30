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
