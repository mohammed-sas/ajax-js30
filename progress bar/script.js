const animatedBar = document.querySelector('.animated-bar');

const btn = document.querySelector('#btn');
let counter =0;

btn.addEventListener('click',()=>{
    
    animatedBar.classList.add('inner');
     animatedBar.addEventListener('animationend',()=>{
        
        animatedBar.classList.remove('inner');
    })

   
    
    
   
})


    
    
     

