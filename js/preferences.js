document.addEventListener("DOMContentLoaded", function() {
    fetchEmail();

    addEventListener('submit', (event) => {
        event.preventDefault();

        let preferencesForm = document.getElementById("preferencesForm");
        let emailForm = document.getElementById("emailForm");
        if (event.target === preferencesForm) {
            savePreferences();
        }
        else if (event.target === emailForm) {
            editEmail();
        }
    });

    if (window.location.search?.includes("?preferences_saved=1")) {
        document.getElementById('preferencesSavedAlert').classList.remove("hidden");
    }

    if (window.location.search?.includes("?preferences_saved=0")) {
        document.getElementById('preferencesNotSavedAlert').classList.remove("hidden");
    }
});

function savePreferences() {
    // Check if the user is logged in
    loginOrAccount();

    const api = document.getElementById('picture').value;
    const colorClosed = document.getElementById('cardColor').value;
    const colorFound = document.getElementById('foundCardColor').value;

    const token = getJWTData();
    if (token) {
        fetch(`http://localhost:8000/api/player/${token.id}/preferences`, {
            method: 'POST',
            headers: {
                'Authorization': token.auth,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: `{"id":"${token.id}","api":"${api}","color_closed":"${colorClosed}","color_found":"${colorFound}"}`
        })
        .then(response => {
            if (response.status === 204 && response.ok) {
                window.location = "/preferences?preferences_saved=1";
            }
            else {
                window.location = "/preferences?preferences_saved=0";
            }
        });
    }
}

function editEmail() {
    // Check if the user is logged in
    loginOrAccount();

    let email = document.getElementById("email").value;

    const token = getJWTData();
    if (token) {
        fetch(`http://localhost:8000/api/player/${token.id}/email`, {
            method: 'PUT',
            headers: {
                'Authorization': token.auth,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: `{"email":"${email}"}`
        })
            .then(response => {
                if (response.status === 204 && response.ok) {
                    window.location = "/preferences?preferences_saved=1";
                }
                else {
                    window.location = "/preferences?preferences_saved=0";
                }
            });
    }
}

function fetchEmail() {
    // Check if the user is logged in
    loginOrAccount();

    const token = getJWTData();
    if (token) {
        if (token.id) {
            fetch(`http://localhost:8000/api/player/${token.id}/email`, {
                method: 'GET',
                headers: {
                    'Authorization': token.auth
                }
            })
            .then(response => {
                if (response.status === 200 && response.ok) {
                    return response.json();
                }
            })
            .then(json => {
                document.getElementById("email").value = json;
            });
        }
    }
}
