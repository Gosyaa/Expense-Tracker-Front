function transferMoney(event){
    event.preventDefault();

    const accountName1 = document.getElementById('account1-selector').value;
    const accountName2 = document.getElementById('account2-selector').value;
    const amount = document.getElementById('add-ammount-input').valueAsNumber;
    if (accountName1 != accountName2){
        let curAccount1, curAccount2;
        accounts.forEach(account => {
            if (account.name == accountName1)
                curAccount1 = account;
            if (account.name == accountName2)
                curAccount2 = account;
        }); 
        postTransfer({
            accountFromId: curAccount1.id,
            accountToId: curAccount2.id,
            amount: amount
        }, accountName1, accountName2);
        closePopUp();
    }
    else{
        alert("Error!");
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
        postAccount({
            userId: userId,
            name: accountName,
            balance: 0
        });
        closePopUp();
    }
    else{
        alert('Error!');
    }
}