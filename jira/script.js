const listContainer = document.querySelector(".list-container");
const listForm = document.querySelector("#list-form");
const taskForm = document.querySelector("#task-form");
const taskSelector = document.querySelector("#task-options");
let source;
let startIndex;
let endIndex;
let currentTarget;
let parentId;
let draggedTask;
listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formdata = new FormData(listForm);
  const listName = formdata.get("list-name");
  createListContainer(listName);
});

const getListFromStorage = () => JSON.parse(localStorage.getItem("listItems"));
const setListIntoStorage = (lists) =>
  localStorage.setItem("listItems", JSON.stringify(lists));
const createListContainer = (listName) => {
  let listObject = {
    listId: Date.now(),
    listName: listName,
    taskChildren: [],
  };

  if (!JSON.parse(localStorage.getItem("listItems"))) {
    let listItems = [];
    setListIntoStorage(listItems);
  }

  let lists = getListFromStorage();
  lists.push(listObject);
  setListIntoStorage(lists);
  renderView();
};
const createView = (list) => {
  let taskItems = "";
  if (list.taskChildren.length > 0) {
    for (let i of list.taskChildren) {
      taskItems += `<div draggable=true data-parentId=${list.listId} data-id=${i.taskId} class=task-item>${i.taskText}<div class=list-action><span data-taskId=${i.taskId} >Edit</span><span data-taskId=${i.taskId} >x</span></div>
                </div>`;
    }
  }
  let item = `<div draggable=true data-main=${list.listId} id=${list.listId} class=list-body>
        <div class=list-header data-parentId=${list.listId}><h3 data-grandId=${list.listId}>${list.listName}</h3><span data-grandId=${list.listId}>Edit</span><span data-grandId=${list.listId}>x</span></div>
        ${taskItems}
        </div>`;
  return item;
};

const renderView = () => {
  const lists = getListFromStorage();
  let fullView = "";
  for (let i of lists) {
    fullView += createView(i);
  }

  listContainer.innerHTML = fullView;
  createTaskOptions();
};

const createTaskOptions = () => {
  const allList = getListFromStorage();
  let options = "";
  for (let i of allList) {
    options += `<option id=${i.listId} >${i.listName}</option>`;
  }
  taskSelector.innerHTML = options;
};

if (getListFromStorage()) renderView();

const listItems = document.querySelectorAll(".list-body");
const getIndex = (id) => {
  const allList = getListFromStorage();
  for (i in allList) {
    if (allList[i].listId == id) {
      return i;
    }
  }
};

const swap = (start, end) => {
  const allList = getListFromStorage();
  console.log(start, end);
  let temp = allList[start];
  allList[start] = allList[end];
  allList[end] = temp;

  setListIntoStorage(allList);
};

listItems.forEach((list) => {
  list.addEventListener("dragstart", (e) => {
    source = e.target;

    if (source.getAttribute("data-main")) {
      startIndex = getIndex(source.getAttribute("data-main"));
    } else {
      const allList = getListFromStorage();
      for (let i in allList) {
        if (allList[i].taskChildren.length > 0) {
          for (let j in allList[i].taskChildren) {
            if (
              allList[i].taskChildren[j].taskId ==
              source.getAttribute("data-id")
            ) {
              draggedTask = { ...allList[i].taskChildren.splice(j, 1)[0] };
              setListIntoStorage(allList);

              break;
            }
          }
        }
      }
    }

    setTimeout(() => (e.target.style.display = "none"), 0);
    e.dataTransfer.setData("text/plain", e.target.innerHTML);
    e.dataTransfer.effectAllowed = "move";
  });

  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  list.addEventListener("dragend", (e) => {
    e.preventDefault();
    setTimeout(() => (source.style.display = "block"), 0);
  });

  list.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (source.getAttribute("data-main")) {
      endIndex = getIndex(
        e.target.getAttribute("data-main") ||
          e.target.getAttribute("data-parentId") ||
          e.target.getAttribute("data-grandId")
      );
      let currentTarget;
      if (e.target.getAttribute("data-main")) {
        currentTarget = e.target;
      } else if (e.target.getAttribute("data-parentId")) {
        currentTarget = e.target.parentNode;
      } else if (e.target.getAttribute("data-grandId")) {
        console.log("hi");
        currentTarget = e.target.parentNode.parentNode;
      }
      source.innerHTML = currentTarget.innerHTML;
      currentTarget.innerHTML = e.dataTransfer.getData("text/plain");
      swap(startIndex, endIndex);
    } else {
      console.log(draggedTask);
      const allList = getListFromStorage();

      for (let i in allList) {
        const parentid =
          e.target.getAttribute("data-parentId") ||
          e.target.getAttribute("data-main");
        if (allList[i].listId == parentid) {
          allList[i].taskChildren.push(draggedTask);
          setListIntoStorage(allList);
          renderView();
        }
      }
    }
  });

  list.addEventListener("click", (e) => {
    if (e.target.innerText === "Edit") {
      e.target.style.display = "none";
      let text;
      if (e.target.getAttribute("data-taskId")) {
        text = e.target.parentNode.parentNode.firstChild.data;
      } else {
        text = e.target.parentNode.firstChild.innerText;
      }
      let div = createEditField(text, "Update");
      e.target.parentNode.insertAdjacentElement("afterend", div);
    } else if (e.target.innerText === "x") {
    
      const parentid = e.target.getAttribute("data-grandid") || e.target.parentNode.parentNode.getAttribute('data-id');
        console.log(parentid);
    deleteList(parentid);
    } else if (e.target.innerText === "Update") {
      const newText = e.target.parentNode.firstChild.value;
      let id;
      if (e.target.parentNode.parentNode.getAttribute("data-id")) {
        id = e.target.parentNode.parentNode.getAttribute("data-id");
      } else {
        id = e.target.parentNode.parentNode.getAttribute("data-main");
      }
      console.log(id);

      const allList = getListFromStorage();
      for (let i in allList) {
        if (allList[i].listId == id) {
          allList[i].listName = newText;
          break;
        } else if (allList[i].taskChildren.length > 0) {
          for (let j of allList[i].taskChildren) {
            if (j.taskId == id) {
              j.taskText = newText;
              break;
            }
          }
        }
      }
      setListIntoStorage(allList);
      renderView();
    }
  });
});

const deleteList = (id) => {
  const allList = getListFromStorage();
  for (let i in allList) {
    if (allList[i].listId == id) {
      allList.splice(i, 1); 
      break;
    }else if(allList[i].taskChildren.length>0){
        for(let j of allList[i].taskChildren){
            if(j.taskId == id){
                allList[i].taskChildren.splice(j,1);
                break;
            }
        }
    }
  }
  setListIntoStorage(allList);
      renderView();
};

const createEditField = (text, action) => {
  let div = document.createElement("div");
  div.classList.add("edit");
  div.innerHTML = `<input type=text value=${text}><span>${action}</span>`;
  return div;
};

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formdata = new FormData(taskForm);
  const task = formdata.get("task");

  const option = formdata.get("task-options");
  let newTask = {
    taskId: Date.now(),
    taskText: task,
  };
  addTaskToList(option, newTask);
});

const addTaskToList = (option, newTask) => {
  let allList = getListFromStorage();
  for (let i in allList) {
    if (allList[i].listName == option) {
      allList[i].taskChildren.push(newTask);

      break;
    }
  }
  setListIntoStorage(allList);

  renderView();
};
