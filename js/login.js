document.addEventListener("DOMContentLoaded", function() {
    addEventListener('submit', (event) => {
        event.preventDefault();
        loginCheck();
    });

    if (window.location.search?.includes("?registered=1")) {
        document.getElementById('registerSuccessAlert').classList.remove("hidden");
    }

    if (window.location.search?.includes("?not_logged_in=1")) {
        document.getElementById('notLoggedInAlert').classList.remove("hidden");
    }

    if (window.location.search?.includes("?token_expired=1")) {
        document.getElementById('tokenExpiredAlert').classList.remove("hidden");
    }
});


function loginCheck() {
    const data = new FormData(document.getElementById('loginForm'));
    let username = data.get('username');
    let password = data.get('password');

    fetch('http://localhost:8000/api/login_check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: `{"username":"${username}","password":"${password}"}`
    })
    .then(response => {
        if (response.status === 200 && response.ok) {
            return response.json();
        }
    })
    .then(json => {
        if (json !== undefined) {
            localStorage.setItem('JWT', json.token);
            loginSuccess();
        }
        else {
            loginFailed();
        }
    });
}

function loginSuccess() {
    window.location = "/preferences";
}

function loginFailed() {
    document.getElementById('username').style.border = "2px solid red";
    document.getElementById('password').style.border = "2px solid red";
}
