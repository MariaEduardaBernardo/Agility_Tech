function openModal() {
    document.getElementById("myModal").style.display = "block";
}
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

/*Formulario de contato*/
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;

    // Código para enviar e-mail
});

/* Carrossel com as ONGs na home*/
$(document).ready(function(){
    $('.Ex_ONGs').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
        {
            breakpoint: 768,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        }
        ]
    });
});