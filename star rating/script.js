const stars = document.querySelectorAll('.star');
const output = document.querySelector('.output')
const icon = document.querySelectorAll('.star i');
console.log(stars);
let clicked = false;
stars.forEach((star,i)=>{
    
   star.addEventListener('mouseenter',()=>{
       if(!clicked){
       for(let j = 0 ; j<=i ; j++){
           stars[j].classList.toggle('fill')
           icon[j].classList.toggle('fas')
       }
    }
   })

   star.addEventListener('mouseleave',()=>{
       if(!clicked){
    for(let j = 0 ; j<=i ; j++){
        stars[j].classList.toggle('fill')
        icon[j].classList.toggle('fas')
    }
}

    
})
    
star.addEventListener('click',()=>{
    clicked=true;
    for(let j = 0 ; j<=i ; j++){
        stars[j].classList.add('fill')
    }
    output.innerHTML=`
    <h3>${i+1}/5 rating</h3>
    `
    
})
})
