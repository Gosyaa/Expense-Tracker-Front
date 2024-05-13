async function postCategory(category){
    const url = apiAddress + '/api/v1/categories';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(category)
    });
    
    if (response.ok){
        let newCategory = await response.json;
        categories.push(newCategory);
    }
    else{
        alert('Error');
    }
}