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

function collapseSub(category, sub){
    const curState = document.getElementById(`content-${category}-${sub}`).style.display;
    const content = document.getElementsByClassName(`content-${category}`);
    Array.from(content).forEach(div => {
        div.style.display = 'none';
    });
    if (curState == 'none')
        document.getElementById(`content-${category}-${sub}`).style.display = 'block'; 
}

function generateList(){
    tar.innerHTML = '';
    categories.forEach(category => {
        tar.innerHTML += `
            <button class="collapsible" id="collapsible-${category.name}" 
            onclick="collapse('${category.name}')"> ${category.name} </button>
            <div class="content" id="content-${category.name}"> 
                <ul class="list" id="list-${category.name}"></ul>
            </div>
            <br>
        `;
        document.getElementById(`content-${category.name}`).style.display = 'none';
        const content = document.getElementById(`list-${category.name}`);
        curSpends = [];
        spends.forEach(spend => {
            if (spend.date >= dateStart.toISOString() && spend.date <= dateEnd.toISOString()){
                if (spend.category == category.name){
                    curSpends.push(spend);
                    if (spend.sub == 'General') {
                        content.innerHTML += `
                            <li> ${spend.name} — ${spend.amount}$ </li>
                        `;
                    }
                }
                else if (category.name == 'Other' && !spend.validCategory){
                    content.innerHTML += `
                        <li> ${spend.name} — ${spend.amount}$ </li>
                    `;
                }
            }
        });
        
        category.subs.forEach(sub => {
            if (sub.name !='General'){
                content.innerHTML += `
                    <li> 
                        <button class="collapsible-${category.name} collapsible-sub"
                        id="collapsible-${category.name}-${sub.name}" 
                        onclick="collapseSub('${category.name}', '${sub.name}')">
                            ${sub.name} 
                        </button>
                        <div class="content-${category.name} content-sub" id="content-${category.name}-${sub.name}">
                            <ul class="list-${category.name} list-sub" id="list-${category.name}-${sub.name}"></ul>
                    </li>
                `;
                document.getElementById(`content-${category.name}-${sub.name}`).style.display = 'none';
                const contentSub = document.getElementById(`list-${category.name}-${sub.name}`);
                curSpends.forEach(spend => {
                    if (spend.sub == sub.name){
                        contentSub.innerHTML += `
                            <li> ${spend.name} — ${spend.amount}$ </li>
                        `;
                    }
                })
            }
        });
    });

}

generateList();