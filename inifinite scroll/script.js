const imgContainer = document.querySelector('.image-container');

const displayImage =async ()=>{
    let i =0;
    while( i < 20){
    let id = Math.ceil(Math.random()*500);
    let imageObj = await fetch(`https://www.superheroapi.com/api.php/4194898577302221/${id}/image`);
    imageObj = await imageObj.json();
    let imageUrl = imageObj.url;
    let img = document.createElement('img');
    img.src=imageUrl;
    img.classList.add('image');
    imgContainer.appendChild(img);
    console.log(imageUrl);
    i++;
    }


}

displayImage();    

window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= imgContainer.scrollHeight)
        displayImage();
})
