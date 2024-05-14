function generatePlot(){

    let data = [], label = [], color = [];

    let n = categories.length;

    categories.forEach(element => {
        if (element.type == window.mode){
            data.push(0);
            label.push(element.name);
            color.push(element.color);
            //color.push(`rgb(${element.colorR}, ${element.colorG}, ${element.colorB})`);
        }
    });

    spends.forEach((spend, index) =>{
        if (spend.date >= dateStart.toISOString() && spend.date <= dateEnd.toISOString()){
            let f = false;
            for (let i =  0; i < n; i++){
                if (spend.category == label[i]){
                    f = true;
                    spends[index].validCategory = true;
                    data[i] += spend.amount;
                    break;
                }
            }
            /*if (!f){
                spends[index].validCategory = false;
                data[n - 1] += spend.amount;
            }*/
        }   
    });

    const pieData = {
        labels: label,
        datasets: [{
            label: label,
            data: data, 
            backgroundColor: color
        }]
    };

    const chart = document.getElementById('myChart');
    new Chart(chart, {
        type:'pie',
        data: pieData,
        options: {
            legend: {
                labels: {
                    fontColor: 'white'
                }
            }
        }
    });

}

//generatePlot();