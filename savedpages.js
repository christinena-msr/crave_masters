const resultsDivEl = document.querySelector('#results-box');
let savedRecipesArr = JSON.parse(window.localStorage.getItem('saved-recipes'));

renderPage();

function renderPage() {
    
    resultsDivEl.innerHTML = '';

    for( let i = 0; i < savedRecipesArr.length; i++) {

    const goToBtn = document.createElement('button');
    goToBtn.setAttribute("class", "mdc-layout-grid__cell--span-2-desktop mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-2-tablet mdc-button mdc-button--raised button-gotorecipe");
    goToBtn.setAttribute("style", "background: #d35400");
    goToBtn.textContent='Go to recipe';
    resultsDivEl.append(goToBtn);
    goToBtn.addEventListener('click', function(){
        window.localStorage.setItem('place-in-array', JSON.stringify(i));
        window.location.href="savedrecipedisplay.html"
    })

    const recipeNameDiv = document.createElement('div');
    recipeNameDiv.setAttribute("class", "mdc-layout-grid__cell--span-8-desktop mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-4-tablet");
    recipeNameDiv.textContent = savedRecipesArr[i].name;
    resultsDivEl.append(recipeNameDiv);

    const clearBtn = document.createElement('button');
    clearBtn.setAttribute("class", "mdc-layout-grid__cell--span-2-desktop mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--span-2-tablet mdc-button mdc-button--raised button-clearrecipe");
    goToBtn.setAttribute("style", "background: #95a5a6; color: #2c3e50;"    );
    clearBtn.textContent="Clear recipe"
    clearBtn.setAttribute('data-name', savedRecipesArr[i].name);
    resultsDivEl.append(clearBtn);
    clearBtn.addEventListener('click', function(event){
        let recipeName = this.getAttribute('data-name');
        let recipeIndex = findIndex(savedRecipesArr, recipeName);
        let newSavedArr = savedRecipesArr.splice(recipeIndex, 1);
        window.localStorage.setItem('saved-recipes', JSON.stringify(newSavedArr));
        renderPage();
    })

    };
}

function findIndex(arr, name) {
    for (let i = 0; i < arr.length; i++) {
        let nameTest = arr[i].name;
        if (nameTest == name){
            return i;
        }
    }
}