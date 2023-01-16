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

    // let character = document.getElementById('character').value;
    let picture = document.getElementById('picture').value;
    // let size = document.getElementById('size').value;
    let cardColor = document.getElementById('cardColor').value;
    // let openCardColor = document.getElementById('openCardColor').value;
    let foundCardColor = document.getElementById('foundCardColor').value;

    const token = getJWTData();
    if (token) {
        fetch(`http://localhost:8000/api/player/${token.id}/preferences`, {
            method: 'POST',
            headers: {
                'Authorization': token.auth,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: `{"id":"${token.id}","api":"${picture}","color_found":"${foundCardColor}","color_closed":"${cardColor}"}`
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
