/**
 * Your generator should consist of a form that accepts a link to an image, text for the top of the meme, and text for the bottom of the meme. 
 * When the user submits the form, use JavaScript to append to the DOM a div which contains the meme, including the image and its text.

**Requirements**

✓ The HTML page shows a form with three input options - Top Text, Bottom Text, Image - and a submit button
✓ Users should be able to submit a form on the page to generate a new meme on the page
✓ They should be able to add **multiple memes** to the page by submitting the form multiple times
✓ Users should be able to click on a button to delete/remove a meme from the page
✓ The form boxes should clear out automatically after the submit is clicked
✓ The form fields need to have validation so they will not submit if a field is missing
- Be sure to style your meme generator! It should be functional but also look nice

**Only use vanilla JavaScript: no frameworks/third-party libraries are allowed**

*/

const form = document.querySelector('#memeForm');
const rowMemes = document.querySelector('#memeRow');
const topText = document.querySelector('input[name="topText"]');
const bottomText = document.querySelector('input[name="bottomText"]');
const imageUrl = document.querySelector('input[name="imageUrl"]');
const textColor = document.getElementById("colorText");
let memesNumber = 1;

const savedMemes = JSON.parse(localStorage.getItem("memes")) || [];

for (let i = 0; i < savedMemes.length; i++) {
    createBoxMeme(savedMemes[i].id, savedMemes[i].image, savedMemes[i].textT, savedMemes[i].textB, savedMemes[i].color);
}


form.addEventListener('submit', function(event){
    event.preventDefault();

    // I think that the user has to write at least one text to create the meme
    if (topText.value === "" && bottomText.value === ""){
        alert("The fields are empty!");
    }
    else{
        
        //I will save the meme in the localStorage
        savedMemes.push({ id: memesNumber, image: imageUrl.value, textT: topText.value, textB: bottomText.value, color: textColor.value});
        localStorage.setItem("memes", JSON.stringify(savedMemes));

        createBoxMeme(memesNumber, imageUrl.value, topText.value, bottomText.value, textColor.value);

        imageUrl.value = "";
        topText.value = ""; 
        bottomText.value = "";
        textColor.value = "#000000";
    }
});

/*
    <div class="memeBox">
        <input class="trash" type="image" src="images/garbage.jpg"  alt="delete"/>
        <img class="imgMeme" src="bla" height="333">
        <div class="top" style="color: color">TOP TEXT</div>
        <div class="bottom" style="color: color">BOTTOM TEXT</div>
    </div>
*/

function createBoxMeme(idMeme, linkImg, textTop, textBottom, color){

    const divMeme = document.createElement('div');
    divMeme.classList.add("memeBox");
    divMeme.setAttribute('data-id', idMeme);

    memesNumber++; 

    const trashBtn = document.createElement('input');
    trashBtn.classList.add("trash");
    trashBtn.type = "image";
    trashBtn.src = "images/garbage.jpg"
    trashBtn.alt = "delete";

    trashBtn.addEventListener('click', function(event){

        event.target.parentElement.remove();

        const idMeme =  Number(event.target.parentElement.getAttribute("data-id"));

        // Get from storage the memes object
        const storedMemes = JSON.parse(localStorage.getItem("memes"));

        // Delete the item with id = idMeme 
        const retrievedMemes = storedMemes.filter(function(meme) {
            return meme.id !== idMeme;
        });

        // Put the object into storage
        localStorage.setItem("memes",JSON.stringify(retrievedMemes));
    });
    
    
    const imgMeme = document.createElement('img');
    imgMeme.classList.add("imgMeme");
    imgMeme.src = linkImg;
    imgMeme.alt = linkImg;
    
    const topMeme = document.createElement('div');
    topMeme.classList.add("top");
    topMeme.innerText = textTop;
    topMeme.style.color = color;

    const bottomMeme = document.createElement('div');
    bottomMeme.classList.add("bottom");
    bottomMeme.innerText = textBottom;
    bottomMeme.style.color = color;

    divMeme.append(trashBtn, imgMeme, topMeme, bottomMeme);
    rowMemes.appendChild(divMeme);
}

