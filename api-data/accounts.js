const apiAddress = 'http://localhost:8080';
const userId = '4ee1f5bf-55af-4d6b-a9b6-7c7e24987987';
const getAccountsUrl = apiAddress + '/api/v1/accounts';

let accounts = [];

(async () => {
    let response = await fetch(getAccountsUrl + `?userId=${userId}`);

    if (response.ok){
        accounts = await response.json();
        updateAccounts();
    }
    else{
        alert('Error: ' + response.status);
    }
})();