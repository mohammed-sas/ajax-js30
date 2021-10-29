import {lists} from './data.js';

let dbList = lists;
const cardContainer = document.querySelector('.card-container');
const searchBox = document.querySelector('#search');
const sortOptions = document.querySelector('#sort');
const pageIndexes = document.querySelector('.page-indexes');
const favBtn = document.querySelector('#favBtn');
let favourites;

const getFavourite=()=>{return JSON.parse(localStorage.getItem('favourites'))};
const setFavourite=(list)=>localStorage.setItem('favourites',JSON.stringify(list));
let pageStart=0;
let itemPerPage=3;
const createCard= (list,favouriteList)=>{
    let tags="";
    let resFavourites
    if(list.tags.length>0){
        list.tags.forEach(tag=>{
            tags +=`<span>${tag}</span>`;
        })
    }
    if(favouriteList)
     resFavourites = favouriteList.find(item=> item == list.id);
    let item=`<div><div class=image-container><img src=${list.url}>
    </div>
    <div class=flex>
    <h4>${list.name}</h4>
    <span class=rating>${list.rating} <i class="fas fa-star "></i></span>
    </div>
    <div class=tags>
        ${tags}
    </div>
    <div data-parentid=${list.id} class=eta>
    <small class=fav><i class="fas fa-star ${resFavourites != undefined ? "fill":""} "></i></small>
    <small>ETA : ${list.eta} mins</small>
    </div>
    </div>
    
    `;
    return item;
}


const renderView=async (allList)=>{
    let fullView="";
    let favouriteList=getFavourite();
    allList.forEach(list=>{
        
        
         fullView += createCard(list,favouriteList);
    });
    
    
     cardContainer.innerHTML= fullView;

     favourites = document.querySelectorAll('.fav');
     favourites.forEach(favourite=>{
        favourite.addEventListener('click',(e)=>{
            let list=[];
            let id = e.target.parentNode.parentNode.getAttribute('data-parentid');
            e.target.classList.add('fill');
            if(getFavourite()){
                list = getFavourite();
                
            }else{
                localStorage.setItem('favourites',JSON.stringify(list));
            }
            if(list.find(item=> item==id) == undefined)
            list.push(id);

            setFavourite(list);

        })
    })
   
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
        dbList = dbList.sort(function(a,b){
            if(a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
            else if(a.name.toLowerCase() > b.name.toLowerCase())
                return 1;
            else 
                return 0;

            
        })
        
    }else if(option ==="rating"){
        dbList = dbList.sort(function(a,b){
            if(a.rating < b.rating)
                return -1;
            else if(a.rating > b.rating)
                return 1;
            else 
                return 0;
            
        })
        
    }else if(option ==="eta"){
        dbList = dbList.sort(function(a,b){
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
  
    renderView(dbList.slice(si,ei));
})


favBtn.addEventListener('click',()=>{
    let favouriteList = getFavourite();
    console.log(favouriteList);
    dbList = lists.filter(list =>{
        let res = favouriteList.find(item=> item == list.id);

       if(res != undefined)
        return true;
    })
    pages = Math.ceil(dbList.length/itemPerPage);
    createPageIndex(pages);
    renderView(dbList.slice(pageStart,pageStart+itemPerPage));
})

renderView(dbList.slice(pageStart,pageStart+itemPerPage));

createPageIndex(pages);