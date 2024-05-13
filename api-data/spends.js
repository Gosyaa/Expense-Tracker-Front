const getSpendsUrl = apiAddress + '/api/v1/transactions/expense';

const earlyDate = new Date(1971, 1, 1);
const lateDate = new Date(2031, 1, 1);

let spends = [];

(async () => {
    let response = await fetch(getSpendsUrl + 
        `?userId=${userId}&startDate=${earlyDate.toISOString()}&endDate=${lateDate.toISOString()}`);

    if (response.ok){
        spends = await response.json();
        for (let i = 0; i < spends.length; i++){
            spends[i].sub = spends[i].subcategoryName;
            spends[i].category = spends[i].categoryName;
        }
    }
    else{
        alert('Error: ' + response.status);
    }
})();