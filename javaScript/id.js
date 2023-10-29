const orderId = localStorage.getItem('vrvId');
let orderIdParsed = JSON.parse(orderId);
console.log(orderIdParsed)

fetch(`https://scarlet-chimpanzee-gear.cyclic.app/api/v1/order/${orderIdParsed}`)
.then(res => {
    res.json()

    if(!res.ok){
        document.querySelector('.order').style.display = "none";
        document.querySelector('.noOrder').style.display = "block";
    }
})
.then(data => {
    document.querySelector('.id').innerHTML = data.data._id;
    document.querySelector('.price').innerHTML = data.data.totalPrice;
})






$(document).ready(() => {
    $('.loading .spinner').fadeOut(500, () => {
        $('.loading').fadeOut(500)
    })
})