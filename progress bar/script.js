const animatedBar = document.querySelector('.animated-bar');

const btn = document.querySelector('#btn');
let counter =0;

btn.addEventListener('click',()=>{
    counter++;
    document.documentElement.style.setProperty('--animation-counter',counter);
    animatedBar.classList.add('inner');
    
   
})

