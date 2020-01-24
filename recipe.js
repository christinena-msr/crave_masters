const recipeNameEl = document.querySelector('#recipe-name');
const recipeImgEl = document.querySelector('#recipe-img');
const ingredientsDivEl = document.querySelector('#ingredients-div');
const instructionsDivEl = document.querySelector('#instructions-div');

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
                    })
        })

function generateRandomRecipe(obj){
    let randomMeal = Math.floor(Math.random() * obj.meals.length);
    const mealsId = obj.meals[randomMeal].idMeal;
    return mealsId;
};

function populatePage(obj){
    recipeNameEl.textContent = `Recipe Name: ${obj.meals[0].strMeal}`;
    recipeImgEl.setAttribute('src', obj.meals[0].strMealThumb);
    let arr = createIngredientsArray(obj);
    generateListOfIngredients(arr);
    getInstructions(obj);
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
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        let newListItem = document.createElement('li');
        let newIngredient = arr[i];
        newListItem.textContent = newIngredient;
        newList.append(newListItem);
    }
    ingredientsDivEl.append(newList);
}

function getInstructions(obj) {
    const newDiv = document.createElement('div');
    const instructions = obj.meals[0].strInstructions;
    newDiv.textContent = `Instructions: ${instructions}`;
    instructionsDivEl.append(newDiv);
}