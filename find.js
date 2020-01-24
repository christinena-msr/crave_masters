const buttonCategoryEl = document.querySelectorAll('li');


for (let i = 0; i < buttonCategoryEl.length; i++) {
    buttonCategoryEl[i].addEventListener('click', function(event){
        let category = this.getAttribute('data-category');
        window.localStorage.setItem('category', JSON.stringify(category));
        window.location.href = 'recipe.html';
    })
}