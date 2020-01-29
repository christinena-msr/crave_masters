const recipeNameEl = document.querySelector('#recipe-name');
const recipeImgEl = document.querySelector('#recipe-img');
const ingredientsDivEl = document.querySelector('#ingredients-div');
const instructionsDivEl = document.querySelector('#instructions-div');
const videoEL = document.querySelector('#video-iframe');
const savedButtonEl = document.querySelector('#save-recipe');
const refreshButtonEl = document.querySelector('#refresh-btn');

const redirectedCategory = JSON.parse(window.localStorage.getItem('category'));

const categoryUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const idUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='

//run the function to search for the data
getRecipeData();

//adds a listener to search for data again and rewrite the page
refreshButtonEl.addEventListener('click', getRecipeData);

//function to get data. makes a first ajax call to get a full aray of the category given by the user, then genereates a random id and calls to get 1 specific recipe.
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
                    //function to get all the data and fill the page.
                    populatePage(json);

                    //adds the listener to the save button that when clicked runs the saveRecipeData function.
                    savedButtonEl.addEventListener('click', saveRecipeData);
                })
    })
};

//generate a random number and find the id of the recipe in that spot in the array
function generateRandomRecipe(obj){
    
    let randomNum = Math.floor(Math.random() * obj.meals.length);
    let mealsId = obj.meals[randomNum].idMeal;

    return mealsId;
};

//function to get the embedded youtube url. split the url from the = to get just the video code and add it to a base embed youtube url.
function populateYouTube(obj){
    let videoID = obj.meals[0].strYoutube.split("=")[1];
    let videoURL = `https://www.youtube.com/embed/${videoID}`;
    videoEL.setAttribute("src", videoURL);
}

//function that gets all the content for the page.
function populatePage(obj){
    //sets recipe name to the page.
    recipeNameEl.textContent = `${obj.meals[0].strMeal}`;

    //sets the source of the image to the given source
    recipeImgEl.setAttribute('src', obj.meals[0].strMealThumb);

    //creates an array of the ingredients
    let arr = createIngredientsArray(obj);

    //uses the array generated above to create a list of them and add it to the page.
    generateListOfIngredients(arr);

    //pulls instructions from the object and adds them to the page.
    getInstructions(obj);

    //runs the function to get youtube vid.
    populateYouTube(obj);
}

//function to create an array of the ingredients from the object.
function createIngredientsArray(obj){
    //declares an empty array and a counter for the loop.
    let ingredientsArr = [];
    let counter = 1;

    //loops through and pulls the ingredients from the object by adding the counter to the base strings and then adding each of those to the array.
    while (counter < 50) {
        let ingredient = 'strIngredient';
        let nextIngredient = ingredient + counter
        let measure = 'strMeasure'
        let nextMeasure = measure + counter;
        
        //checks to make sure that the strIngredient with the number of the current loop exists in the object. If it does, it continues, if it doesnt, it returns the array and stops the loop.
        if (!(`${nextIngredient}` in obj.meals[0])) {
            return ingredientsArr;
        }
            let finalMeasure = obj.meals[0][nextMeasure];
            let ingredientCheck = obj.meals[0][nextIngredient];
        
            //check to end the loop if the next ingredient would be empty or null
            if (ingredientCheck === '' || ingredientCheck === null) {
                return ingredientsArr;
            }

            //if there is a value, add it to the array
            else {
                ingredientsArr.push(`${ingredientCheck}: ${finalMeasure}`);
            }
        counter++;
        
    }
}

//function to generate an unordered list where the list items will be each ingredient of the array passed in.
function generateListOfIngredients(arr) {
    //clear the content so when rewritten will not have multiples
    ingredientsDivEl.innerHTML = '';
    
    const newList = document.createElement('ul');
    newList.setAttribute('id', 'new-list');

    //loop through the array and make each list item the text in the array at the current loop.
    for (let i = 0; i < arr.length; i++) {
        let newListItem = document.createElement('li');
        newListItem.setAttribute('id', `list-item-${i}`);
        let newIngredient = arr[i];
        newListItem.textContent = newIngredient;
        newList.append(newListItem);
    }

    //makes the header and then append it and the list to the page.
    const ingredientsh3 = document.createElement('h3');
    ingredientsh3.textContent = 'Ingredients: ';
    ingredientsDivEl.append(ingredientsh3);
    ingredientsDivEl.append(newList);
}

//function to get the instructions from the object.
function getInstructions(obj) {
    //clear the div so there wont be multiple instructions
    instructionsDivEl.innerHTML = '';

    //create a div, style it and makes its content the text from the instructions of the object.
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'instructions-text');
    const instructions = obj.meals[0].strInstructions;
    newDiv.textContent = `${instructions}`
    newDiv.setAttribute('id', 'new-instructions-div');

    //append them to the page
    const instructionsh3 = document.createElement('h3');
    instructionsh3.textContent = 'Instructions: ';
    instructionsDivEl.append(instructionsh3);  
    instructionsDivEl.append(newDiv);
}

//function to save the current recipe. pulls the data from the page, adds it to a saved recipes array and then stores it in local storage.
function saveRecipeData() {
    //gets the saved recipes from local storage.  If there are none, set it to a new blank array.
    let savedRecipesArr = JSON.parse(window.localStorage.getItem('saved-recipes'));
    if (savedRecipesArr == null){
        savedRecipesArr = [];
    }
    
    //gets the name of the meal and the src of the image from the page.
    const savedMealName = recipeNameEl.textContent;
    const savedImgName = recipeImgEl.getAttribute('src');

    //creates and array that is all of the list items from the page and creates a blank array to fill with the ingredients.
    let listEl = document.querySelectorAll('li');
    let ingredientsArr = [];

    //loops through the array of list elements, pulls the text of it and pushes it to the ingredients array.
    for (let i = 0; i < listEl.length; i++) {
        let liEl = document.querySelector(`#list-item-${i}`).textContent;
        ingredientsArr.push(liEl);
    }
    
    //gets the instructions and videourl from the page.
    const savedInstructions = (document.querySelector('#new-instructions-div').textContent);
    const savedVideoURL = videoEL.getAttribute('src');
    
    //sticks the data gathered from the rest of the function into an object.
    const savedRecipeObj = {
        name: savedMealName,
        photo: savedImgName,
        ingredients: ingredientsArr,
        instructions: savedInstructions,
        youtube: savedVideoURL
    };

    //checks if the recipe is already saved.
    const nameCheck = checkIfRecipeSaved(savedRecipesArr, savedRecipeObj);
    
    //if it hasnt been saved already, added to the array of saved recipes.
    if (nameCheck == false){
        savedRecipesArr.push(savedRecipeObj);
    };

    //saves the array of saved recipes to local storage
    window.localStorage.setItem('saved-recipes', JSON.stringify(savedRecipesArr));
}

//function that checks if a recipe has already been saved when passed an array and object.
function checkIfRecipeSaved(arr, obj) {
    //set to default of false
    let used = false;

    //gets the name of the recipe from the object
    let objName = obj.name;
    
    //loops through the array and checks the name above against the name of the obj at each array index to see if it is used.
    for (let i = 0; i < arr.length; i++) {
        let nameCheck = arr[i].name;
        
        //if the names are the same (meaning it has been used), set the used to true. and return that it was used.
        if (nameCheck === objName){
            used = true;
        }
    }
    return used;
}