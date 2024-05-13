const getCategoriesUrl = apiAddress + '/api/v1/categories';
let categories = [];

(async () => {
    let response = await fetch(getCategoriesUrl + `?userId=${userId}`);

    if (response.ok){
        categories = await response.json();
        for (let i = 0; i < categories.length; i++){
            categories[i].color = categories[i].hex;
            categories[i].subs = categories[i].subcategories;
        }
        generateList();
        generatePlot();
    }
    else{
        alert('Error: ' + response.status);
    }
})();