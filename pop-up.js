const categoryForm = `
    <h2 class="form-title"> Добавить категорию </h2>
    <form class="form-body" id="category-form">
        <input type="text" placeholder="Имя категории" id="category-name-input"><br>
        <label for="color-picker">Цвет категории: </label>
        <input type="color" name="color-picker" id="color-picker"><br>
        <input type="submit">
    </form>
    <button class="pop-up" onclick="closePopUp();"> Закрыть окно </button>
`;

const spendForm = `
    <h2 class="form-title"> Добавить трату </h2>
    <form class="form-body" id="spend-form">
        <input type="text" placeholder="Имя траты" id="spend-name-input"><br>
        <input type="number" min="0" placeholder="Сумма траты" id="spend-amount"><br>
        <label for='category-selector'> Категория: </label>
        <select id='category-selector' name='category-selector'> </select><br>
        <input type="submit">
    </form>
    <button class="pop-up" onclick="closePopUp();"> Закрыть окно </button>
`;

function popUp(popUpTar){
    const overlay = document.getElementById('pop-up-overlay');
    overlay.classList.toggle('show');
    const box = document.getElementById('box');
    box.innerHTML = '';
    if (popUpTar == 'category'){
        box.innerHTML += categoryForm;
        let form = document.getElementById('category-form');
        form.addEventListener('submit', addCategory);
    }
    else{
        box.innerHTML += spendForm;
        let form = document.getElementById('spend-form');
        form.addEventListener('submit', addSpend);
        let categorySelect = document.getElementById('category-selector');
        categories.forEach(category =>{
            categorySelect.innerHTML += `
            <option value='${category.name}'> ${category.name} </option>
            `;
        });
    }
    box.classList.toggle('show');

    let body = document.body
    let html = document.documentElement;

    let height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    overlay.style.height = `${height}px`;
}

function closePopUp(){
    const overlay = document.getElementById('pop-up-overlay');
    overlay.classList.toggle('show');
    const box = document.getElementById('box');
    box.classList.toggle('show');
}

function addCategory(event){
    event.preventDefault();

    const categoryNameEl = document.getElementById('category-name-input');
    const categoryName = categoryNameEl.value;
    const colorEl = document.getElementById('color-picker');
    const color_hex = colorEl.value;
    let unique = false;
    if (categoryName.length > 0 && categoryName.length <= 75){
        unique = true;
        categories.forEach(category => {
            if (categoryName == category.name){
                unique = false;
            }
        });
        if (unique){
            categories.push({
                id: Math.floor(Math.random() * 10000),
                name: categoryName,
                color: color_hex,
                sub: []
            });
            const n = categories.length;
            [categories[n - 1], categories[n - 2]] = [categories[n - 2], categories[n - 1]];
            generatePlot();
            generateList();
        }
    }
    categoryNameEl.value = '';
    colorEl.value = '#000000';
    if (unique){
        closePopUp();
    }
    else{
        alert('Ошибка');
        //Улучшить оповешение
        
    }  
}

function addSpend(event){
    event.preventDefault();

    const spendName = document.getElementById('spend-name-input').value;
    const spendAmount = parseInt(document.getElementById('spend-amount').value);
    const spendCategory = document.getElementById('category-selector').value;
    if (spendName.length > 0  && spendName.length <= 50){
        spends.push({
            name: spendName,
            category: spendCategory,
            amount: spendAmount
        });
        generatePlot();
        generateList();
        closePopUp();
    }
    else{
        alert('Ошибка');
        //Улучшить оповешение
    }
}