function tranformDate(date){

    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

let now = new Date();
let dateStart = new Date(now.getFullYear(), now.getMonth(), 1, 5, 0, 0);
let dateEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
document.getElementById('start-date').value = dateStart.toISOString().slice(0, 10);
document.getElementById('end-date').value = dateEnd.toISOString().slice(0, 10);

document.getElementById('start-date').addEventListener('change', (event) => {
    dateStart = new Date(event.target.value);
    generatePlot();
    generateList();
});

document.getElementById('end-date').addEventListener('change', (event) => {
    dateEnd = new Date(event.target.value);
    generatePlot();
    generateList();
});