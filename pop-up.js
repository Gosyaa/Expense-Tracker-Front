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
        <label for='sub-selector'> Подкатегория: </label>
        <select id='sub-selector' name='sub-selector'> </select><br>
        <input type="submit">
    </form>
    <button class="pop-up" onclick="closePopUp();"> Закрыть окно </button>
`;

const subForm = `
    <h2 class="form-title"> Add subcategory </h2>
    <form class="form-body" id="sub-form">
        <label for='category-selector'> Category: </label>
        <select id='category-selector' name='category-selector'> </select><br>
        <input type="text" placeholder="Subcategory name" id="sub-name-input"><br>
        <input type="submit" value="Add">
    </form>
    <button class="pop-up" onclick="closePopUp();"> Close this window </button>
`;

function categorySelectorSetUp(){
    let categorySelect = document.getElementById('category-selector');
    categorySelect.innerHTML = '';
    categories.forEach(category =>{
        categorySelect.innerHTML += `
        <option value='${category.name}'> ${category.name} </option>
        `;
    });
}

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
    else if (popUpTar == 'spend'){
        box.innerHTML += spendForm;
        let form = document.getElementById('spend-form');
        form.addEventListener('submit', addSpend);
        categorySelectorSetUp();
        let subSelect = document.getElementById('sub-selector');
        let categorySelect = document.getElementById('category-selector');
        categorySelect.addEventListener('change', (event) => {
            subSelect.innerHTML = '';
            const categoryName = event.target.value;
            let curCategory;
            categories.forEach(category => {
                if (category.name == categoryName)
                    curCategory = category;
            });
            curCategory.subs.forEach(sub => {
                subSelect.innerHTML += `
                    <option value='${sub.name}'> ${sub.name} </option>
                `;
            });
        });
        let event = new Event('change');
        categorySelect.dispatchEvent(event);
    }
    else if (popUpTar == 'sub'){
        box.innerHTML += subForm;
        let form = document.getElementById('sub-form');
        form.addEventListener('submit', addSub);
        categorySelectorSetUp();
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
                subs: [
                    {
                        id: 1,
                        name: 'General'
                    }
                ]
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
    const spendSub = document.getElementById('sub-selector').value;
    const now = new Date();
    if (spendName.length > 0  && spendName.length <= 50){
        spends.push({
            name: spendName,
            category: spendCategory,
            sub: spendSub,
            amount: spendAmount,
            date: now.toISOString()
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

function addSub(event){
    event.preventDefault();

    const categoryName = document.getElementById('category-selector').value;
    
    let curCategory;
    categories.forEach(category => {
        if (category.name ==  categoryName)
            curCategory = category;
    });

    const subName = document.getElementById('sub-name-input').value;
    document.getElementById('sub-name-input').value = '';
    let unique = true;
    curCategory.subs.forEach(sub => {
        if (sub.name == subName)
            unique = false;
    });
    if (unique && subName.length > 0 && subName.length <= 50){
        curCategory.subs.push({
            id: Math.floor(Math.random() * 10000),
            name: subName
        });
        generateList();
        closePopUp();
    }
    else{
        alert('Error');
        //Оповещение ошибок
    }
}