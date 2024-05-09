function popUp(){
    const overlay = document.getElementById('pop-up-overlay');
    overlay.classList.toggle('show');
    const box = document.getElementById('box');
    box.classList.toggle('show');

    let body = document.body
    let html = document.documentElement;

    let height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    overlay.style.height = `${height}px`;
}