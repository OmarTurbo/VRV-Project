const orderId = localStorage.getItem('vrvId');
let orderIdParsed = JSON.parse(orderId);

fetch(`https://scarlet-chimpanzee-gear.cyclic.app/api/v1/order/${orderIdParsed}`)
    .then(async res => {

        if (!res.ok) {
            document.querySelector('.order').style.display = "none";
            document.querySelector('.noOrder').style.display = "block";
            return console.log('done')
        }
        await res.json().then(order => {
            document.querySelector('.id').innerHTML = order.data._id;
            document.querySelector('.price').innerHTML = order.data.totalPrice;
            document.querySelector('.statues').innerHTML = order.data.statues;
        })
    })





$(document).ready(() => {
    $('.loading .spinner').fadeOut(500, () => {
        $('.loading').fadeOut(500)
    })
})