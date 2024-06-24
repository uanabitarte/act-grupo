

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

    if(sessionStorage.getItem('email')) {
        loginLink.hide();
        loggedUser.innerHTML = sessionStorage.getItem('email');
    } else {
        loginLink.show();
        loggedUser.hide();
    }
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let email = document.getElementById('emailInput')
        sessionStorage.setItem('email', email)
    })
})
