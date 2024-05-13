const apiAddress = 'http://loclahost:8080';
const userId = '018f6ea5-9e30-7698-afa1-332797e09a71';
const getAccountsUrl = apiAddress + '/api/v1/accounts';

let response = await fetch(getAccountsUrl + `?userId=${userId}`);

let accounts = [];

if (response.ok){
    accounts = await response.json();
}
else{
    alert('Error: ' + response.status);
}