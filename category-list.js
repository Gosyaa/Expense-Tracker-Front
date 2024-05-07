const tar = document.getElementById('lists-div');

function collapse(category){
    const curState = document.getElementById(`content-${category}`).style.display;
    const content = document.getElementsByClassName('content');
    Array.from(content).forEach(div => {
        div.style.display = 'none';
    });
    if (curState == 'none')
        document.getElementById(`content-${category}`).style.display = 'block';
}

categories.forEach(category => {
    tar.innerHTML += `
        <button class="collapsible" id="collapsible-${category.name}" 
        onclick="collapse('${category.name}')"> ${category.name} </button>
        <div class="content" id="content-${category.name}"> 
            <ul class="list" id="list-${category.name}"></ul>
        </div>
        <br>
    `;
    /*let button = document.getElementById(`collapsible-${category.name}`);
    document.getElementById(`collapsible-${category.name}`).addEventListener('click', () => alert("here"));*/
    document.getElementById(`content-${category.name}`).style.display = 'none';
    const content = document.getElementById(`list-${category.name}`);
    spends.forEach(spend => {
        if (spend.category == category.name){
            content.innerHTML += `
                <li> ${spend.name} — ${spend.amount}$ </li>
            `;
        }
        else if (category.name == 'Other' && !spend.validCategory){
            content.innerHTML += `
                <li> ${spend.name} — ${spend.amount}$ </li>
            `;
        }
    })
});

