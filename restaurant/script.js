import {lists} from './data.js';

let dbList = lists;
const cardContainer = document.querySelector('.card-container');
const searchBox = document.querySelector('#search');
const sortOptions = document.querySelector('#sort');
const pageIndexes = document.querySelector('.page-indexes');
let pageStart=0;
let itemPerPage=2;
const createCard= (list)=>{
    let tags="";
    if(list.tags.length>0){
        list.tags.forEach(tag=>{
            tags +=`<span>${tag}</span>`;
        })
    }

    let item=`<div><div class=image-container><img src=${list.url}>
    </div>
    <div class=flex>
    <h4>${list.name}</h4>
    <span class=rating>${list.rating} <i class="fas fa-star"></i></span>
    </div>
    <div class=tags>
        ${tags}
    </div>
    <small>ETA : ${list.eta} mins</small>
    </div>`;
    return item;
}


const renderView=async (allList)=>{
    let fullView="";
    allList.forEach(list=>{
        
        
         fullView += createCard(list);
    });
    
    
     cardContainer.innerHTML= fullView;
}


const debounce =(fn,delay)=>{
    let interval;
    return (...args)=>{
        clearTimeout(interval);
        interval = setTimeout(()=>fn(...args),delay);
    }
}
searchBox.addEventListener('keydown',debounce(e=>{
        console.log(e.target.value)
        generateList(e.target.value);
    
},200))

const generateList=(text)=>{
    text = text.toLowerCase();
    
     dbList = lists.filter(list=>{

       return list.name.substring(0,text.length).toLowerCase().includes(text) === true ? true : false;   
    })
    pages = Math.ceil(dbList.length/itemPerPage);
    createPageIndex(pages);
    renderView(dbList.slice(pageStart,pageStart+itemPerPage));
}

sortOptions.addEventListener('change',(e)=>{
    console.log(e.target[e.target.selectedIndex].value);
    generateSortedList(e.target[e.target.selectedIndex].value);
})

const generateSortedList =(option)=>{
    
    if(option === "name"){
        dbList = lists.sort(function(a,b){
            if(a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
            else if(a.name.toLowerCase() > b.name.toLowerCase())
                return 1;
            else 
                return 0;

            
        })
        
    }else if(option ==="rating"){
        dbList = lists.sort(function(a,b){
            if(a.rating < b.rating)
                return -1;
            else if(a.rating > b.rating)
                return 1;
            else 
                return 0;
            
        })
        
    }else if(option ==="eta"){
        dbList = lists.sort(function(a,b){
            if(a.eta < b.eta)
                return -1;
            else if(a.eta>b.eta)
                return 1;
            else
                return 0;
        })
        
    }
    renderView(dbList.slice(pageStart,pageStart+itemPerPage));
}

let pages = Math.ceil(dbList.length/itemPerPage);

const createPageIndex=(pages)=>{
    let pageNo="";
    for(let i = 0 ;i < pages ;i++){
        pageNo+= `<span class=page-num>${i+1}</span>`;
    }

    pageIndexes.innerHTML = pageNo;
}

pageIndexes.addEventListener('click',e=>{
    let si =(Number(e.target.innerText)-1)*itemPerPage;
    let ei = si+itemPerPage;
    console.log(si,ei);
    renderView(dbList.slice(si,ei));
})

renderView(dbList.slice(pageStart,pageStart+itemPerPage));

createPageIndex(pages);