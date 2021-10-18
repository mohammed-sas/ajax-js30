const getPost = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const dataArrray = await response.json();
  displayPost(dataArrray);
  pageCalculation(dataArrray.length);
};

getPost();

const displayPost = (data) => {
  const postContainer = document.querySelector(".post-container");
  data.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.innerHTML = `
       <p> ${post.title}</p>
        <p>${post.body}</p>
    `;
    postDiv.classList.add("post-body");
    postContainer.appendChild(postDiv);
  });
};

const pageCalculation=(length)=>{
    const totalPage = Math.ceil(length/10);
    console.log(totalPage);
    const pageIndex = document.querySelector('.page-index');
    for(let i = 0 ; i< totalPage ;i++){
        const span = document.createElement('span');
        span.innerHTML=`${i+1}`;
        span.classList.add('page-number');
        pageIndex.appendChild(span);
    }
}