const listContainer = document.querySelector('.list-container');
const listForm = document.querySelector('#list-form');
const taskForm = document.querySelector('#task-form');
const taskSelector = document.querySelector('#task-options')
let source;
let startIndex;
let endIndex;
let currentTarget;
listForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formdata = new FormData(listForm);
    const listName = formdata.get('list-name');
    createListContainer(listName);
})

const getListFromStorage=()=>JSON.parse(localStorage.getItem('listItems'));
const setListIntoStorage=(lists)=>localStorage.setItem('listItems',JSON.stringify(lists));
const createListContainer=(listName)=>{
    let listObject ={
        listId : Date.now(),
        listName: listName,
        taskChildren:[]
    }
   
    if(!JSON.parse(localStorage.getItem('listItems'))){
        let listItems=[];
        setListIntoStorage(listItems);
    }

    let lists = getListFromStorage();
    lists.push(listObject);
    setListIntoStorage(lists);
    renderView();
}
const createView=(list)=>{
        let taskItems="";
        if(list.taskChildren.length>0){
            for(let i of list.taskChildren){
                taskItems+=`<div draggable=true data-parentId=${list.listId} data-id=${i.taskId} class=task-item>${i.taskText}</div>`
            }
        }
        let item=`<div draggable=true id=${list.listId} class=list-body>
        <h3>${list.listName}</h3>
        ${taskItems}
        </div>`;
        return item;
        
}

const renderView =()=>{
    const lists = getListFromStorage();
    let fullView="";
    for(let i of lists){
        fullView+=createView(i);
        
    }
    
    listContainer.innerHTML=fullView;
    createTaskOptions();
}

const createTaskOptions =()=>{
    const allList = getListFromStorage();
    let options ="";
    for(let i of allList){
        options +=`<option id=${i.listId} >${i.listName}</option>`;
    }
    taskSelector.innerHTML = options;
}

if(getListFromStorage())
renderView();

const listItems = document.querySelectorAll('.list-body');
const getIndex=(id)=>{
    const allList = getListFromStorage();
    for( i in allList){
        if(allList[i].listId == id){
            return i;
        }
    }
}

const swap=(start,end)=>{
    const allList=getListFromStorage();
    console.log(start,end);
        let temp = allList[start];
         allList[start]= allList[end];
        allList[end]=temp;
    
    setListIntoStorage(allList);
    
    

}

listItems.forEach(list=>{
    list.addEventListener('dragstart',(e)=>{
        source=e.target;
        
        if(source.id){
        startIndex=getIndex(e.target.id);
        }else{
            const allList = getListFromStorage();
            for(let i in allList){
                if(allList[i].listId == source.getAttribute('data-parentId'))
                    allList.splice(i,1);
            }
        }
        
        setTimeout(()=>e.target.style.display="none",0);
        e.dataTransfer.setData("text/plain",e.target.innerHTML);
        e.dataTransfer.effectAllowed="move";
    })

    list.addEventListener('dragover',e=>{
        e.preventDefault();
        e.dataTransfer.dropEffect="move";
        
    })

    list.addEventListener('dragend',e=>{
        e.preventDefault();
        setTimeout(()=>source.style.display="block",0);
    })

    list.addEventListener('drop',e=>{
        e.preventDefault();
        e.stopPropagation();
        
        if(e.target.parentNode.id){
            endIndex=getIndex(e.target.parentNode.id);
            currentTarget = e.target.parentNode;
        }else{
            endIndex=getIndex(e.target.id);
            currentTarget=e.target;
        }
        
      
        
        source.innerHTML =currentTarget.innerHTML ;
        currentTarget.innerHTML= e.dataTransfer.getData('text/plain');
        
        swap(startIndex,endIndex);
        // console.log(listItems);
    })

    list.addEventListener('click',(e)=>{
        console.log(e.target);
    })
})



taskForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formdata = new FormData(taskForm);
    const task = formdata.get('task');
    
    const option = formdata.get('task-options');
    let newTask={
        taskId: Date.now(),
        taskText:task
    }
    addTaskToList(option,newTask);

})


const addTaskToList=(option,newTask)=>{
    let allList = getListFromStorage();
    for(let i in allList){
        
        if(allList[i].listName == option){
            allList[i].taskChildren.push(newTask);
            
            break;
        }
        
    }
    setListIntoStorage(allList);
    
    renderView();
}


