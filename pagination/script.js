const itemPerPage = 5;
let currentPage = 1;
let totalPage;
let initialIndex = 0;
let lastIndex = itemPerPage;
const nextBtn = document.querySelector('#nextBtn');
const prevBtn = document.querySelector('#prevBtn');
const pageIndex = document.querySelector('.page-index')
const postContainer = document.querySelector('.post-container');
const searchBtn = document.querySelector('#searchBtn');
const searchCountry=document.querySelector('#searchCountry');
let initialData=[];
const getData = async()=>{
    fetch("https://countriesnow.space/api/v0.1/countries")
    .then(res => res.json())
    .then(data => {
        findNumberOfPages(data.data);
        initialData = data.data;
    })
}


const findNumberOfPages =(data)=>{
    
    
    totalPage = Math.ceil(data.length/itemPerPage);
    while(pageIndex.children.length>0)
        pageIndex.lastElementChild.remove();
    createPageButton(totalPage);
    display(data,initialIndex,lastIndex);
}

const display=(data,start,end)=>{   
    
    let itemPerPage =  data.slice(start,end);
    while(postContainer.children.length > 0)
        postContainer.lastElementChild.remove();
    
    itemPerPage.map(post => {
        let div = document.createElement('div');
        div.innerHTML=`
        <h4>${post.country}</h4>
        <p> ${post.cities[0]}</p>
        `;
        postContainer.appendChild(div);
    })
    
    
    
}

const getCurrentPage=(pageNum)=>{
    
    initialIndex = pageNum*itemPerPage;
    lastIndex = initialIndex + itemPerPage;
    display(initialData,initialIndex,lastIndex);
    initialIndex=0;
    lastIndex=itemPerPage;
}



const createPageButton=(totalPage)=>{
    for(let i = 0 ; i< totalPage ; i++){
        let span = document.createElement('span');
        span.innerHTML=`${i+1}`;
        span.classList.add('page-number');
        span.setAttribute('data-key',i);
        pageIndex.appendChild(span);
    }
    const allPageButton = document.querySelectorAll('.page-number');
    
    allPageButton.forEach(pageButton => {
        pageButton.addEventListener('click',()=>getCurrentPage(pageButton.dataset.key));
    })
}

searchBtn.addEventListener('click',()=>{
    let searchString = searchCountry.value.toLowerCase();
    console.log(searchString);
    let searchArray = initialData.filter(item =>  item.country.substring(0,searchString.length).toLowerCase().includes(searchString));
    findNumberOfPages(searchArray);
})



getData();