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
    const spendAmount = parseInt(document.getElementById('spend-amount').valueAsNumber);
    const spendCategory = document.getElementById('category-selector').value;
    const spendSub = document.getElementById('sub-selector').value;
    const spendAccount = document.getElementById('account-selector').value;
    let curAccount;
    accounts.forEach(account => {
        if (spendAccount == account.name)
            curAccount = account;
    });
    curAccount.balance -= spendAmount;
    const now = new Date();
    if (spendName.length > 0  && spendName.length <= 50){
        spends.push({
            id: Math.floor(Math.random() * 10000),
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