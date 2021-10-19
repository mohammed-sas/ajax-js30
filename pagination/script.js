const postPerPage = 5;
let pageNum = 0;
let start = postPerPage*pageNum;
let end = start + postPerPage;

let data ;

fetch('https://jsonplaceholder.typicode.com/posts')
.then(res => res.json())
.then(json => window.data=json);


