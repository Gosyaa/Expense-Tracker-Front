const getSpendsUrl = apiAddress + '/api/v1/transactions/income';

const earlyDate = new Date(1971, 1, 1);
const lateDate = new Date(2031, 1, 1);

let incomes = [];

(async () => {
    let response = await fetch(getSpendsUrl + 
        `?userId=${userId}&startDate=${earlyDate.toISOString()}&endDate=${lateDate.toISOString()}`);

    if (response.ok){
        incomes = await response.json();
        for (let i = 0; i < incomes.length; i++){
            incomes[i].sub = incomes[i].subcategoryName;
            incomes[i].category = incomes[i].categoryName;
        }
        generateList();
        generatePlot();
    }
    else{
        alert('Error: ' + response.status);
    }
})();