let listItems = document.querySelectorAll('.list-item')
const jiraContainer = document.querySelectorAll('.jira-container');
const todoContainer = document.querySelector('#todo')
const progressContainer=document.querySelector('#progress');
const completedContainer=document.querySelector('#completed');
const form =document.querySelector('#form');
const options={
    todo : todoContainer,
    progress : progressContainer,
    completed : completedContainer
}

let draggedItem = null;

const dragged=()=>{
for(let i = 0 ; i< listItems.length;i++){
    const item = listItems[i];
    item.addEventListener('dragstart',()=>{
        draggedItem = item
        console.log(draggedItem)
        setTimeout(()=>{
            item.style.display='none';
        },0)
       
    })

    item.addEventListener('dragend',()=>{
        
        setTimeout(()=>{
            draggedItem.style.display='block';
        },0)
    })
}
}
dragged();

    for(let j = 0 ; j < jiraContainer.length ;j++){
        const container = jiraContainer[j];
        container.addEventListener('dragenter',function(e){
            console.log(`drag enter`);
            this.style.backgroundColor = 'rgba(0,0,0,0.2)';
            e.preventDefault();
        })

        container.addEventListener('dragover',(e)=>{
            e.preventDefault();
        })

        container.addEventListener('dragleave',function (e){
            e.preventDefault();
            this.style.backgroundColor = '#A5B4FC';
        })

        container.addEventListener('drop',function (){
            this.style.backgroundColor = '#A5B4FC';
            this.append(draggedItem);
        })
    }


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formdata = new FormData(form);
    const task = formdata.get('task');
    const option =formdata.get('option');
    const priority = formdata.get('priority');
    console.log(task)
    console.log(option)
    const div = document.createElement('div')
    div.classList.add('list-item');
    div.classList.add(priority.toLowerCase());
    div.innerText=task;
    div.setAttribute('draggable','true');
    options[option].appendChild(div);
    listItems=document.querySelectorAll('.list-item');
    console.log(listItems)
    dragged();
    
})