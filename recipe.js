const recipeNameEl = document.querySelector('#recipe-name');
const recipeImgEl = document.querySelector('#recipe-img');
const ingredientsDivEl = document.querySelector('#ingredients-div');
const instructionsDivEl = document.querySelector('#instructions-div');
const videoEL = document.querySelector('#video-iframe');
const savedButtonEl = document.querySelector('#saved-pages');

const redirectedCategory = JSON.parse(window.localStorage.getItem('category'));
console.log(redirectedCategory);
const categoryUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const idUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='

fetch((categoryUrl + redirectedCategory))
    .then(function(response){
        return response.json();
    })
        .then(function(json){
            let id = generateRandomRecipe(json);
            fetch((idUrl + id))
                .then(function(response){
                    return response.json();
                })
                    .then(function(json){
                        console.log(json);
                        populatePage(json);

                        savedButtonEl.addEventListener('click', saveRecipeData)
                    })
        });



function generateRandomRecipe(obj){
    let randomMeal = Math.floor(Math.random() * obj.meals.length);
    const mealsId = obj.meals[randomMeal].idMeal;
    return mealsId;
};

function populateYouTube(obj){
    let videoID = obj.meals[0].strYoutube.split("=")[1];
    let videoURL = `https://www.youtube.com/embed/${videoID}`;
    videoEL.setAttribute("src", videoURL);
}

function populatePage(obj){
    recipeNameEl.textContent = `Recipe Name: ${obj.meals[0].strMeal}`;
    recipeImgEl.setAttribute('src', obj.meals[0].strMealThumb);
    let arr = createIngredientsArray(obj);
    generateListOfIngredients(arr);
    getInstructions(obj);
    populateYouTube(obj);
}

function createIngredientsArray(obj){
    let ingredientsArr = [];
    let counter = 1;
    while (counter < 50) {
        let ingredient = 'strIngredient';
        let nextIngredient = ingredient + counter
        let measure = 'strMeasure'
        let nextMeasure = measure + counter;
        // console.log(nextIngredient);
        let finalMeasure = obj.meals[0][nextMeasure];
        let ingredientCheck = obj.meals[0][nextIngredient];
        // console.log(ingredientCheck)
        if (ingredientCheck === '' || ingredientCheck === null) {
            return ingredientsArr;
        }
        else {
            ingredientsArr.push(`${ingredientCheck}: ${finalMeasure}`);
        }
        counter++;
    }
}

function generateListOfIngredients(arr) {
    const newList = document.createElement('ul');
    newList.setAttribute('id', 'new-list');
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        let newListItem = document.createElement('li');
        newListItem.setAttribute('id', `list-item-${i}`);
        let newIngredient = arr[i];
        newListItem.textContent = newIngredient;
        newList.append(newListItem);
    }
    ingredientsDivEl.append(newList);
}

function getInstructions(obj) {
    const newDiv = document.createElement('div');
    const instructions = obj.meals[0].strInstructions;
    newDiv.textContent = `Instructions: ${instructions}`
    newDiv.setAttribute('id', 'new-instructions-div');
    instructionsDivEl.append(newDiv);
}

function saveRecipeData() {
    let savedRecipesArr = JSON.parse(window.localStorage.getItem('saved-recipes'));
    if (savedRecipesArr == null){
        savedRecipesArr = [];
    }
    
    const savedMealName = recipeNameEl.textContent;
    const savedImgName = recipeImgEl.getAttribute('src');
    // const ingredientsArr = createIngredientsArray(obj);
    // let videoID = obj.meals[0].strYoutube.split("=")[1];
    // let videoURL = `https://www.youtube.com/embed/${videoID}`;
    let listEl = document.querySelectorAll('li');
    let ingredientsArr = [];
    console.log(listEl.length);
    for (let i = 0; i < listEl.length; i++) {
        let liEl = document.querySelector(`#list-item-${i}`).textContent;
        console.log(liEl);
        ingredientsArr.push(liEl);
    }
    const savedInstructions = (document.querySelector('#new-instructions-div').textContent);
    const savedVideoURL = videoEL.getAttribute('src');
    
    const savedRecipeObj = {
        name: savedMealName,
        photo: savedImgName,
        ingredients: ingredientsArr,
        instructions: savedInstructions,
        youtube: savedVideoURL
    };

    const nameCheck = checkIfRecipeSaved(savedRecipesArr, savedRecipeObj);
    
    if (nameCheck == false){
        savedRecipesArr.push(savedRecipeObj);
    };

    window.localStorage.setItem('saved-recipes', JSON.stringify(savedRecipesArr));
    console.log(savedRecipesArr);
    window.location.href="savedpages.html";
}

function checkIfRecipeSaved(arr, obj) {
    let used = false;
    let objName = obj.name;
    
    for (let i = 0; i < arr.length; i++) {
        let nameCheck = arr[i].name;
        if (nameCheck === objName){
            used = true;
        }
    }
    return used;
}