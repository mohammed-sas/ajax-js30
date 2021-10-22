const containers = document.querySelectorAll('.container');

let source;
containers.forEach(container =>{

    container.addEventListener('dragstart',e=>{
        source=e.target;
        setTimeout(()=>e.target.style.display="none",0);
        e.dataTransfer.setData("text/plain",e.target.innerHTML);
        e.dataTransfer.effectAllowed="move";
    })

    container.addEventListener('dragover',e=>{
            e.preventDefault();
            e.dataTransfer.dropEffect="move";
    })

    container.addEventListener('dragend',e=>{
        e.preventDefault();
        setTimeout(()=>source.style.display="block",0);
    })

    container.addEventListener('drop',e=>{
        e.preventDefault();
        e.stopPropagation();
        source.innerHTML = e.target.innerHTML;
        e.target.innerHTML = e.dataTransfer.getData('text/plain');
    })


})