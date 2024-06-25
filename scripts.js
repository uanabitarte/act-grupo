
function handleApiResponse(response) {
    for (let i = 0; i < response.items.length; i++) {
        let item = response.items[i];
        let itemHtml;
        if(item.volumeInfo.imageLinks){
            itemHtml = '<div class="col-md-3 p-2"><div class="card">'+
                '<img src="'+ item.volumeInfo.imageLinks.thumbnail +'" class="card-img-top">' +
                '<div class="card-body"><h5 class="card-title">' +  item.volumeInfo.title + '</h5>' +
                '<p class="card-text">'+ item.volumeInfo.authors[0] +'</p></div></div></div>';
        } else {
            itemHtml = '<div class="col-md-3 p-2"><div class="card">'+
                '<div class="card-body"><h5 class="card-title">' +  item.volumeInfo.title + '</h5>' +
                '<p class="card-text">'+ item.volumeInfo.authors[0] +'</p></div></div></div>';
        }
        document.getElementById("content").innerHTML += itemHtml;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // var myHeaders = new Headers();
    // myHeaders.append("apikey", "yiL0lnZh6R8WyGrHNC76cqrkP1mxJCER");

    // var requestOptions = {
    // method: 'GET',
    // redirect: 'follow',
    // headers: myHeaders
    // };

    // fetch("https://api.apilayer.com/spoonacular/food/ingredients/search?sortDirection=sortDirection&sort=sort&query=query&offset=0&number=3&intolerances=egg", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
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
            console.log(sessionStorage.getItem('email'))
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
    
})
