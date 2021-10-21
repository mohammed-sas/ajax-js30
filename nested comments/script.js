const mainCommentInput = document.querySelector('#mainComment');
const addCommentBtn = document.querySelector('#addCommentBtn');
const commentListContainer = document.querySelector('.comments-list-container');



const addComment=()=>{

    let newComment={
        parentID:null,
        commentID: Date.now(),
        commentText:mainCommentInput.value,
        children:[],
        likes :0
    }
    if(!localStorage.getItem('comments')){
        let comments=[];
        localStorage.setItem('comments',JSON.stringify(comments));
    }

    comments = JSON.parse(localStorage.getItem('comments'));
    comments.push(newComment);

    localStorage.setItem('comments',JSON.stringify(comments));
    mainCommentInput.value="";
    renderView();
} 

const commentCard=(comment,margin)=>{
    let view = `
    <div style="margin-left:${margin}px" class=comment-card id="${comment.commentID}">
        ${comment.commentText}
        <br>
        <span>${comment.likes >0 ? "" : comment.likes}</span> <button>Likes</button>
    </div>
    
    `
    return view;
}

const createView=(commentsList)=>{
    let fullview ="";
    for( i of commentsList){
        fullview += commentCard(i,0);
    }

    return fullview;
}

const renderView=()=>{
    const commentsFromStorage = JSON.parse(localStorage.getItem('comments'));
    console.log(commentsFromStorage);
    let completeView = createView(commentsFromStorage);
    commentListContainer.innerHTML=completeView;
}

renderView();

addCommentBtn.addEventListener('click',addComment);
commentListContainer.addEventListener('click',(e)=>{
    console.log(e);
})