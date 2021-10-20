const questionsContainer = document.querySelectorAll('.questions-container');
const radioInputs = document.querySelectorAll('.questions-container input');

const percentValue = document.querySelectorAll('.percent-value');
const percentage = document.querySelectorAll('.percentage');
radioInputs.forEach((radio,i)=>{
    radio.addEventListener('click',()=>{
        for( let i=0 ;i< questionsContainer.length ;i++){
            questionsContainer[i].classList.remove('selected');
            percentValue[i].style.display="block";
            percentage[i].style.display="block";
        }
          
        const parent = questionsContainer[i];
        parent.classList.add('selected'); 
        
            
    })
})

