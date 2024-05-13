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
            postCategory({
                userId: userId,
                name: categoryName,
                hex: color_hex,
                type: window.mode
            });
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

    const spendAmount = parseInt(document.getElementById('spend-amount').valueAsNumber);
    const spendCategory = document.getElementById('category-selector').value;
    const spendSub = document.getElementById('sub-selector').value;
    const spendAccount = document.getElementById('account-selector').value;
    let curAccount;
    accounts.forEach(account => {
        if (spendAccount == account.name)
            curAccount = account;
    });
    //curAccount.balance -= spendAmount;

    let curSub;
    categories.forEach(category => {
        if (category.name == spendCategory){
            category.subs.forEach(sub => {
                if (sub.name == spendSub)
                    curSub = sub;
            })
        }
    });

    postExpense({
        accountId: curAccount.id,
        subcategoryId: curSub.id,
        amount: spendAmount
    }, spendAccount, spendCategory, spendSub);
    closePopUp();
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
        postSub({
            categoryId: curCategory.id,
            name: subName
        }, categoryName);
        closePopUp();
    }
    else{
        alert('Error');
        //Оповещение ошибок
    }
}