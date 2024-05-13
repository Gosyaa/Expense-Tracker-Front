const getSpendsUrl = apiAddress + '/api/v1/transactions/expense';

const earlyDate = new Date(1971, 1, 1);
const lateDate = new Date(2031, 1, 1);

let response = await fetch(getSpendsUrl + 
    `?userId=${userId}&startDate=${earlyDate.toISOString()}&endDate=${lateDate.toISOString()}`);

let spends = [];

if (response.ok){
    spends = await response.json();
}
else{
    alert('Error: ' + response.status);
}