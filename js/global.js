function loginOrAccount(callback) {
    // Only redirect the player on the preferences page
    const redirect = window.location.pathname.includes("/preferences");
    const token = getJWTData();

    if (token) {
        if (token.id) {
            fetch(`http://localhost:8000/api/player/${token.id}/preferences`, {
                method: 'GET',
                headers: {
                    'Authorization': token.auth
                }
            })
            .then(response => {
                if (response.status === 200 && response.ok) {
                    return response.json();
                }

                if (redirect) {
                    window.location = "/login?token_expired=1";
                }
            })
            .then(json => {
                if (json) {
                    setPreferences(json);
                }

                // Execute the callback if present
                if (callback) {
                    callback();
                }
            });
        }
    }
    else {
        if (redirect) {
            window.location = "/login?not_logged_in=1";
        }
    }
}

function getScores(callback) {
    fetch(`http://localhost:8000/scores`, {
        method: 'GET'
    })
        .then(response => {
            if (response.status === 200 && response.ok) {
                return response.json();
            }
        })
        .then(json => {
            let highscores = json.sort((a, b) => a.score - b.score);

            // Execute the callback if present
            if (callback) {
                callback(highscores);
            }
        });
}

function getJWTData() {
    const token = localStorage.getItem('JWT');
    if (token?.length) {
        const auth = `Bearer ${token}`;
        const chunks = token.split('.');
        const header = atob(chunks[0]);
        const id = parseInt(header.split(',')[2].split(':')[1]);

        return JSON.parse(`{"id":"${id}","auth":"${auth}"}`);
    }

    return token;
}

function isTokenExpired() {
    const token = getJWTData()?.auth.split(' ')[1];
    if (token) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }

    return true;
}

function setPreferences(json) {
    // document.getElementById('character').value = json.character;
    document.getElementById('picture').value = json.preferred_api;
    // document.getElementById('size').value = json.size;
    document.getElementById('cardColor').value = json.color_closed;
    // document.getElementById('openCardColor').value = json.color_open;
    document.getElementById('foundCardColor').value = json.color_found;
}

function initModal() {
    const modal = document.getElementById("infoModal");
    const span = document.getElementById("closeModal");

    span.onclick = function() {
        modal.classList.add("hidden");
    }

    if (isTokenExpired()) {
        modal.classList.remove("hidden");
    }
}
