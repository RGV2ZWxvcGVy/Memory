document.addEventListener("DOMContentLoaded", function() {
    addEventListener('submit', (event) => {
        event.preventDefault();
        register();
    });
});


function register() {
    const data = new FormData(document.getElementById('registerForm'));
    let username = data.get('username');
    let email = data.get('email');
    let password = data.get('password');

    fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: `{"username":"${username}","email":"${email}","password":"${password}"}`
    })
    .then(response => {
        if (response.status === 201 && response.ok) {
            registerSuccess();
        }
        else {
            registerFailed();
        }
    });
}

function registerSuccess() {
    window.location = "/login?registered=1";
}

function registerFailed() {
    document.getElementById('username').style.border = "2px solid red";
    document.getElementById('email').style.border = "2px solid red";
    document.getElementById('password').style.border = "2px solid red";
}
