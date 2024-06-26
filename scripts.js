function loadDestacados() {
    let destacados = [
        'VZX8EAAAQBAJ',
        '0XT1EAAAQBAJ',
        'PpbVEAAAQBAJ',
        'U3TdEAAAQBAJ'
    ]
    destacados.forEach((destacado) => {
        fetch("https://www.googleapis.com/books/v1/volumes/" + destacado)
        .then(response => response.json())
        .then(result => {
                if(result.volumeInfo.imageLinks){
                    itemHtml = '<div class="col-md-3 p-2"><div class="card">'+
                        '<img src="'+ result.volumeInfo.imageLinks.thumbnail +'" class="card-img-top">' +
                        '<div class="card-body"><h5 class="card-title">' +  result.volumeInfo.title + '</h5>' +
                        '<p class="card-text">'+ result.volumeInfo.authors[0] +'</p></div></div></div>';
                } else {
                    itemHtml = '<div class="col-md-3 p-2"><div class="card">'+
                        '<div class="card-body"><h5 class="card-title">' +  result.volumeInfo.title + '</h5>' +
                        '<p class="card-text">'+ result.volumeInfo.authors[0] +'</p></div></div></div>';
                }
                document.getElementById("content").innerHTML += itemHtml;
        })
        .catch(error => console.log('error', error));
    })
    
}
function loadLastSearch(){
    let qInput = sessionStorage.getItem('qInput')
    let filter = sessionStorage.getItem('filter')
    let printType = sessionStorage.getItem('printType')
    let author = sessionStorage.getItem('author')
    let publisher = sessionStorage.getItem('publisher')
    let totalItems = sessionStorage.getItem('totalItems')
    let innerHTML;
    if(qInput) {
        innerHTML = '<div class="container-fluid bg-light p-4 rounded mb-3"><div class="row justify-content-center"><div class="col-md-7">Texto: ' + qInput + '</div>'
        if(filter){
            innerHTML += '<div class="col-md-7">Buscar: ' + filter + '</div>'
        }
        if(printType){
            innerHTML += '<div class="col-md-7">Tipo de libro: ' + printType + '</div>'
        }
        if(author){
            innerHTML += '<div class="col-md-7">Autor: ' + author + '</div>'
        }
        if(publisher){
            innerHTML += '<div class="col-md-7">Editor: ' + publisher + '</div>'
        }
        innerHTML += '<div class="col-md-7 fw-bold">Número de resultados: ' + totalItems + '</div></div></div>'
    } else {
        innerHTML = '<p class="alert alert-light text-center">¡Vaya! No tienes búsquedas recientes</p>';
    }
    document.getElementById('last-search').innerHTML = innerHTML;
}
document.addEventListener('DOMContentLoaded', () => {
  
    const loginForm = document.getElementById('loginForm')
    const loginLink = document.getElementById('login-link');
    const loggedUser = document.getElementById('logged-user');
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutItem = document.getElementById('logoutItem');
    function checkLogin() {
        const email = sessionStorage.getItem('email');
        if (email) {
            loggedUser.textContent = email;
            loginLink.style.display = "none";
            logoutItem.style.display = 'block';
        } else {
            loggedUser.textContent = '';
            loginLink.style.display = "block";
            logoutItem.style.display = 'none';
        }
    }
    checkLogin()
    if(loginForm){
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault()
            let email = document.getElementById('emailInput')
            sessionStorage.setItem('email', email.value)
            checkLogin
            loginForm.reset()
            window.location.href = 'index.html';
        })
    }
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('email');
        checkLogin();
        window.location.href = 'login.html';
    });

    const searchForm = document.getElementById('searchForm')
    function cleanLastSearch() {
        sessionStorage.removeItem('qInput')
        sessionStorage.removeItem('filter')
        sessionStorage.removeItem('printType')
        sessionStorage.removeItem('author')
        sessionStorage.removeItem('publisher')
        sessionStorage.removeItem('totalItems')
    }
    if(searchForm){
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault()
            cleanLastSearch()
            let qInput = document.getElementById('qInput').value
            let filter = document.getElementById('filter').value
            let printType = document.getElementById('printType').value
            let author = document.getElementById('author').value
            let publisher = document.getElementById('publisher').value
            sessionStorage.setItem('qInput', qInput)

            qInput = qInput.replaceAll(' ', '+')
            let url = 'https://www.googleapis.com/books/v1/volumes?q=' + qInput

            if(author) {
                sessionStorage.setItem('author', author)
                url += '+inauthor:' + author.replaceAll(' ', '+')
            }
            if(publisher) {
                sessionStorage.setItem('publisher', publisher)
                url += '+inpublisher:' + publisher.replaceAll(' ', '+')
            }
            if(filter) {
                sessionStorage.setItem('filter', filter)
                url += '&filter=' + filter
            }
            if(printType) {
                sessionStorage.setItem('printType', printType)
                url += '&printType=' + printType
            }
            url += '&maxResults=18';
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    document.getElementById("search-content").innerHTML = '';
                    sessionStorage.setItem('totalItems', result.totalItems)
                    if(result.totalItems == 0){
                        document.getElementById("search-content").innerHTML = '<p class="text-center">No ha habido resultados para tu búsqueda</p>';
                    }
                    for (let i = 0; i < result.items.length; i++) {
                        let item = result.items[i];
                        let itemHtml = '<div class="col-md-2 p-2"><div class="card">';
                        if(item.volumeInfo.imageLinks){
                            itemHtml += '<img src="'+ item.volumeInfo.imageLinks.thumbnail +'" class="card-img-top">'
                        }
                        itemHtml += '<div class="card-body"><h5 class="card-title">' +  item.volumeInfo.title + '</h5>';
                        if(item.volumeInfo.authors){
                            itemHtml += '<p class="card-text">'+ item.volumeInfo.authors[0] +'</p>'
                        }   
                        itemHtml += '</div></div></div>';
                        document.getElementById("search-content").innerHTML += itemHtml;
                    }
                    
                })
                .catch(error => console.log('error', error));
        })
    }
})
