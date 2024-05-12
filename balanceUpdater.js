function transferMoney(event){
    event.preventDefault();

    const accountName1 = document.getElementById('account1-selector').value;
    const accountName2 = document.getElementById('account2-selector').value;
    const ammount = document.getElementById('add-ammount-input').valueAsNumber;
    if (accountName1 != accountName2){
        let curAccount1, curAccount2;
        accounts.forEach(account => {
            if (account.name == accountName1)
                curAccount1 = account;
            if (account.name == accountName2)
                curAccount2 = account;
        }); 
        curAccount1.balance -= ammount;
        curAccount2.balance += ammount;
        updateAccounts();
        closePopUp();
    }
    else{
        alert("Error!")
    }
}

function addMoney(event){
    event.preventDefault();

    const accountName = document.getElementById('account-selector').value;
    const ammount = document.getElementById('add-ammount-input').valueAsNumber;
    let curAccount;
    accounts.forEach(account => {
        if (account.name == accountName)
            curAccount = account;
    }); 
    curAccount.balance += ammount;
    updateAccounts();
    closePopUp();
}

function addAccount(event){
    event.preventDefault();

    const accountName = document.getElementById('add-account-input').value;
    let unique = true;
    accounts.forEach(account => {
        if (account.name == accountName)
            unique = false;
    });
    if (unique){
        accounts.push({
            id: Math.floor(Math.random() * 10000),
            name: accountName, 
            balance: 0
        });
        updateAccounts();
        closePopUp();
    }
    else{
        alert('Error!');
    }
}