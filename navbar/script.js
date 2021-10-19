const burgerIcon =document.querySelector('.burger-icon');
const nav = document.querySelector('.nav-links');


burgerIcon.addEventListener('click',()=>{
    nav.classList.toggle('active');
})