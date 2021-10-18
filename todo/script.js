const form = document.querySelector('#form');
const listContainer = document.querySelector('.lists');
let taskList = [];
if(localStorage.getItem('list') === null)
    localStorage.setItem('list',JSON.stringify(taskList));



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formdata = new FormData(form);
    formdata.append("id",Date.now());
    let obj={};
    for(let i of formdata.entries()){
        
        const [name,value] = i;
        obj={...obj,[name]:value};
        
    }
    console.log(obj);
    var list =JSON.parse(localStorage.getItem('list'));
     let i = list.length;
     list[i] = obj;
     localStorage.setItem('list',JSON.stringify(list));
     let li = document.createElement('li');
    li.innerHTML=`
        <p> ${obj.taskName} </p>
        <small>${obj.date} </small>
    `;
    listContainer.appendChild(li);
     
    
})


let lists = JSON.parse(localStorage.getItem('list'));
lists.forEach(listItem => {
    let li = document.createElement('li');
    li.innerHTML=`
        <p> ${listItem.taskName} </p>
        <small>${listItem.date} </small>
    `;
    listContainer.appendChild(li);
});

console.log('you called me');
