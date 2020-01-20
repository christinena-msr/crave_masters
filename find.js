const buttonCategoryEl = document.querySelectorAll('.category');


for (let i = 0; i < buttonCategoryEl.length; i++) {
    buttonCategoryEl[i].addEventListener('click', function(event){
        let category = this.textContent;
        window.localStorage.setItem('category', JSON.stringify(category));
        window.location.href = 'recipe.html';
    })
}