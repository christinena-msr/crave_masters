const recipeNameEl = document.querySelector('#recipe-name');
const recipeImgEl = document.querySelector('#recipe-img');
const ingredientsDivEl = document.querySelector('#ingredients-div');
const instructionsDivEl = document.querySelector('#instructions-div');
const videoEL = document.querySelector('#video-iframe');
const savedButtonEl = document.querySelector('#save-recipe');
const refreshButtonEl = document.querySelector('#refresh-btn');

window.localStorage.removeItem('randoms');

const redirectedCategory = JSON.parse(window.localStorage.getItem('category'));
// console.log(redirectedCategory);
const categoryUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const idUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='

getRecipeData();


refreshButtonEl.addEventListener('click', getRecipeData);

function getRecipeData() {
    fetch((categoryUrl + redirectedCategory))
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            let id = generateRandomRecipe(json);
            fetch((idUrl + id))
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json);
                    populatePage(json);

                    savedButtonEl.addEventListener('click', saveRecipeData);
                })
    })
};

function generateRandomRecipe(obj){
    // let usedRandomsArr = JSON.parse(window.localStorage.getItem('randoms'));
    // if (usedRandomsArr == null) {
    //     usedRandomsArr = [];
    // }
    
    let randomNum = Math.floor(Math.random() * obj.meals.length);
    // checkIfRandomUsed(obj, usedRandomsArr, randomNum);
    // console.log(usedRandomsArr);
    
    // if (usedRandomsArr.length > 1) {
    //     let test = true;
    //     while (test != false) {
    //         let randomNumber = Math.floor(Math.random() * obj.meals.length);
    //         let test = checkIfRandomUsed(usedRandomsArr, randomNumber);
    //         console.log(test);
    //         console.log(randomNumber);
    //         if (test == false) {
    //             window.localStorage.setItem('saved-random', JSON.stringify(randomNumber));
    //         }
    //     };
    // } else if (usedRandomsArr.length <= 1) {
    //     let randomNumber = Math.floor(Math.random() * obj.meals.length);
    //         window.localStorage.setItem('saved-random', JSON.stringify(randomNumber));
    // }
    // console.log(random);
    // if (random == 0 ) {
        //     random = Math.floor(Math.random() * obj.meals.length);
        // }

    // let random = JSON.parse(window.localStorage.getItem('saved-random'));
    // console.log(random);
    // usedRandomsArr.push(random);
    // window.localStorage.setItem('randoms', JSON.stringify(usedRandomsArr));
    // window.localStorage.removeItem('saved-random');
    let mealsId = obj.meals[randomNum].idMeal;
    console.log(mealsId);
    return mealsId;
};

function checkIfRandomUsed(obj, arr, num) {
    let numberUsed = false;
    // let randomNum = Math.floor(Math.random() * obj.meals.length);
    // console.log(randomNum);
    for (let i = 0; i < arr.length; i++) {
        let usedRandom = arr[i];
        if (usedRandom === num) {
            numberUsed = true;
            // return numberUsed;
        }
    }
    console.log(numberUsed);
    // let finalNum = 0;
    if (numberUsed == true) {
        let randomNum = Math.floor(Math.random() * obj.meals.length);
        checkIfRandomUsed(arr, randomNum);
        console.log('other thing');
    }
    else {
        console.log('this happened');
        // console.log(randomNum);
        let finalNum = num;
        window.localStorage.setItem('saved-random', JSON.stringify(finalNum));
    }
}

function populateYouTube(obj){
    let videoID = obj.meals[0].strYoutube.split("=")[1];
    let videoURL = `https://www.youtube.com/embed/${videoID}`;
    videoEL.setAttribute("src", videoURL);
}

function populatePage(obj){
    recipeNameEl.textContent = `${obj.meals[0].strMeal}`; //recipe name
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
        if (!(`${nextIngredient}` in obj.meals[0])) {
            return ingredientsArr;
        }
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
    ingredientsDivEl.innerHTML = '';
    const newList = document.createElement('ul');
    newList.setAttribute('id', 'new-list');
    // console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        let newListItem = document.createElement('li');
        newListItem.setAttribute('id', `list-item-${i}`);
        let newIngredient = arr[i];
        newListItem.textContent = newIngredient;
        newList.append(newListItem);
    }
    const ingredientsh3 = document.createElement('h3');
    ingredientsh3.textContent = 'Ingredients: ';
    ingredientsDivEl.append(ingredientsh3);
    ingredientsDivEl.append(newList);
}

function getInstructions(obj) {
    instructionsDivEl.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'instructions-text');
    const instructions = obj.meals[0].strInstructions;
    newDiv.textContent = `${instructions}`
    newDiv.setAttribute('id', 'new-instructions-div');
    
    const instructionsh3 = document.createElement('h3');
    instructionsh3.textContent = 'Instructions: ';
    instructionsDivEl.append(instructionsh3);
    
    instructionsDivEl.append(newDiv);
}

function saveRecipeData() {
    let savedRecipesArr = JSON.parse(window.localStorage.getItem('saved-recipes'));
    if (savedRecipesArr == null){
        savedRecipesArr = [];
    }
    
    const savedMealName = recipeNameEl.textContent;
    const savedImgName = recipeImgEl.getAttribute('src');
    let listEl = document.querySelectorAll('li');
    let ingredientsArr = [];
    // console.log(listEl.length);
    for (let i = 0; i < listEl.length; i++) {
        let liEl = document.querySelector(`#list-item-${i}`).textContent;
        // console.log(liEl);
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
    // console.log(savedRecipesArr);
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