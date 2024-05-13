async function postCategory(category){
    const url = apiAddress + '/api/v1/categories';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(category)
    });
    
    if (response.ok){
        let newCategory = await response.json();
        newCategory.color = newCategory.hex;
        newCategory.subs = newCategory.subcategories;
        categories.push(newCategory);
    }
    else{
        alert('HTTP Error' + response.status);
    }
    generatePlot();
    generateList();
}

async function postExpense(expense, accountName, categoryName, subName){
    let url = apiAddress + '/api/v1/transactions/expense';
    if (window.mode == 'INCOME'){
        url = apiAddress + '/api/v1/transactions/income';
    }
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(expense)
    });

    if (response.ok){
        let newSpend = await response.json();
        newSpend.accountName = accountName;
        newSpend.category = categoryName;
        newSpend.sub = subName;
        spends.push(newSpend);
    }
    else{
        alert('HTTP Error' + response.status);
    }
    generatePlot();
    generateList();
}

async function postSub (sub, categoryName){
    const url = apiAddress + '/api/v1/subcategories';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(sub)
    });

    if (response.ok){
        let newSub = await response.json();
        for (let i = 0; i < categories.length; i++){
            if (categoryName == categories[i].name)
                categories[i].subs.push(newSub);
        }
    }
    else{
        alert('HTTP Error' + response.status);
    }
    generateList();
}

async function postAccount (account){
    const url = apiAddress + '/api/v1/accounts';

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(account)
    });

    if (response.ok){
        let newAccount = await response.json();
        accounts.push(newAccount);
    }
    else{
        alert('HTTP Error' + response.status);
    }
    updateAccounts();
}

async function postTransfer (transfer, accountName1, accountName2){
    const url = apiAddress + '/api/v1/transactions/transfer';

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(transfer)
    });

    if (response.ok){
        let curAccount1, curAccount2;
        accounts.forEach(account => {
            if (account.name == accountName1)
                curAccount1 = account;
            if (account.name == accountName2)
                curAccount2 = account;
        }); 
        curAccount1.balance -= transfer.amount;
        curAccount2.balance += transfer.amount;
    }
    else{
        alert('HTTP Error' + response.status);
    }
    updateAccounts();
}