const getCategoriesUrl = apiAddress + '/api/v1/categories';

let response = await fetch(getCategoriesUrl + `?userId=${userId}`);

let categories = [];

if (response.ok){
    categories = await response.json();
    categories.array.forEach(category => {
        category.color = category.hex;
    });
}
else{
    alert('Error: ' + response.status);
}