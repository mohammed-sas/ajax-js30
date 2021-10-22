const mainCommentInput = document.querySelector("#mainComment");
const addCommentBtn = document.querySelector("#addCommentBtn");
const commentListContainer = document.querySelector(".comments-list-container");

const addComment = () => {
  let newComment = {
    parentID: null,
    commentID: Date.now(),
    commentText: mainCommentInput.value,
    children: [],
    likes: 0,
  };
  if (!localStorage.getItem("comments")) {
    let comments = [];
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  comments = JSON.parse(localStorage.getItem("comments"));
  comments.push(newComment);

  localStorage.setItem("comments", JSON.stringify(comments));
  mainCommentInput.value = "";
  renderView();
};

const commentCard = (comment, margin) => {
  let view = `<div style="margin-left:${margin}px" class=comment-card id="${
    comment.commentID
  }"><p>${comment.commentText}</p>
        <span >${
          comment.likes === 0 ? "" : comment.likes
        }</span> <span class=btn-primary>Likes</span>
        &nbsp  <span style="color:steelblue">${
          comment.children.length === 0 ? "" : comment.children.length
        }</span> <span class=btn-primary>Reply</span>
        &nbsp <span class=btn-primary>Edit</span>
        &nbsp <span class=btn-primary>Delete</span>
    </div>`;
  return view;
};

const createView = (commentsList, padding = 0) => {
  let fullview = "";

  for (parent of commentsList) {
    fullview += commentCard(parent, padding);
    if (parent.children.length > 0) {
      fullview += createView(parent.children, (padding += 20));
      padding -= 20;
    }
  }

  return fullview;
};

const renderView = () => {
  const commentsFromStorage = JSON.parse(localStorage.getItem("comments"));
  let completeView = createView(commentsFromStorage, 0);
  commentListContainer.innerHTML = completeView;
};
if (JSON.parse(localStorage.getItem("comments"))) {
  renderView();
}

const getAllComments = () => JSON.parse(localStorage.getItem("comments"));
const setAllComments = (comments) =>
  localStorage.setItem("comments", JSON.stringify(comments));
const increaseLikeByOne = (allComments, commentLikedId) => {
  for (i of allComments) {
    if (i.commentID == commentLikedId) {
      i.likes += 1;
    } else if (i.children.length > 0) {
      increaseLikeByOne(i.children, commentLikedId);
    }
  }
};

const createReplyWithAddComment = (id,action,existingCommentText) => {
  let div = document.createElement("div");

  div.setAttribute("data-parentId", id);
    div.style.marginTop="8px"
  div.innerHTML = `<input type=text value="${action ==="Update Comment" ? existingCommentText : ""}" > <a href=#>${action}</a>`;
  return div;
};
const addNewChildComment = (allComments, comment) => {
  for (let i of allComments) {
    if (i.commentID == comment.parentID) {
      i.children.push(comment);
      break;
    } else if (i.children.length > 0) {
      addNewChildComment(i.children, comment);
    }
  }
};

const deleteComment=(allComments,id) =>{
    for(let i in allComments){
        if(allComments[i].commentID == id){
            allComments.splice(i,1);
        }else if(allComments[i].children.length >0){
            deleteComment(allComments[i].children,id);
        }
    }
}

const updateComments=(allComments,id,text)=>{
   
    for(let i of allComments){
        if(i.commentID == id){
            i.commentText = text;
        }else if(i.children.length >0){
            updateComments(i.children,id,text);
        }
    }
}

addCommentBtn.addEventListener("click", addComment);
commentListContainer.addEventListener("click", (e) => {
  if (e.target.innerText == "Likes") {
    const allComments = getAllComments();
    increaseLikeByOne(allComments, e.target.parentNode.id);
    setAllComments(allComments);
    renderView();
  } else if (e.target.innerText == "Reply") {
    const commentIDParent = e.target.parentNode.id;
    const currentParentComment = e.target.parentNode;
    currentParentComment.appendChild(
      createReplyWithAddComment(commentIDParent,"Add Comment")
    );
    e.target.style.display = "none";
  } else if (e.target.innerText === "Add Comment") {
    const parentId = e.target.parentNode.getAttribute("data-parentid");

    const reply = {
      parentID: parentId,
      commentID: Date.now(),
      commentText: e.target.parentNode.firstChild.value,
      children: [],
      likes: 0,
    };
    
    const allComments = getAllComments();
    addNewChildComment(allComments, reply);
    setAllComments(allComments);
    renderView();
  }else if(e.target.innerText ==="Delete"){
      const allComments = getAllComments();
      const parentId =e.target.parentNode.id;
      
      deleteComment(allComments,parentId);
      setAllComments(allComments);
      renderView();
  }else if(e.target.innerText==="Edit"){
      const commentId = e.target.parentNode.id;
      e.target.style.display ="none";
      let div =createReplyWithAddComment(commentId,"Update Comment",e.target.parentNode.firstChild.innerText);
      e.target.parentNode.appendChild(div);
  }else if(e.target.innerText==="Update Comment"){
      
      const parentId = e.target.parentNode.getAttribute('data-parentID');
      
      const allComments = getAllComments();
      
      updateComments(allComments,parentId,e.target.parentNode.firstChild.value);
      setAllComments(allComments);
      renderView();

  }
});
