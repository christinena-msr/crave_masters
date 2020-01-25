const recipeNameEl = document.querySelector('#recipe-name');
const recipeImgEl = document.querySelector('#recipe-img');
const ingredientsDivEl = document.querySelector('#ingredients-div');
const instructionsDivEl = document.querySelector('#instructions-div');
const videoEL = document.querySelector('#video-iframe');

const savedRecipesArr = JSON.parse(window.localStorage.getItem('saved-recipes'));
const placeInArr = JSON.parse(window.localStorage.getItem('place-in-array'));

console.log(savedRecipesArr);
console.log(placeInArr);

populatePage(savedRecipesArr, placeInArr);

function populatePage(arr, index) {
    recipeNameEl.textContent = arr[index].name;

    recipeImgEl.setAttribute('src', arr[index].photo);

    const newList = document.createElement('ul');
    newList.setAttribute('id', 'new-list');
    for (let i = 0; i < arr[index].ingredients.length; i++) {
        let newListItem = document.createElement('li');
        newListItem.setAttribute('id', `list-item-${i}`);
        let newIngredient = arr[index].ingredients[i];
        newListItem.textContent = newIngredient;
        newList.append(newListItem);
    }
    ingredientsDivEl.append(newList);

    let fullInstructions = arr[index].instructions;
    let instructions = fullInstructions.split(":")[1];
    let newDiv = document.createElement('div')
    newDiv.setAttribute('class', 'content');
    newDiv.textContent = instructions;
    instructionsDivEl.append(newDiv);

    videoEL.setAttribute('src', arr[index].youtube);
}