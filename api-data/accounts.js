const apiAddress = 'http://localhost:8080';
const userId = '17c4a52b-007e-4822-aba4-d1e6538cb2de';
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