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

function getPlayerData() {
    const token = getJWTData();
    if (token) {
        fetch(`http://localhost:8000/api/player/${token.id}`, {
            method: 'GET',
            headers: {
                'Authorization': token.auth,
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then(response => {
            if (response.status === 200 && response.ok) {
                return response.json();
            }
        })
        .then(json => {
            if (json) {
                document.getElementById('loggedInAs').innerHTML = `Ingelogd als: <b>${json.name}</b>`;
            }
        });
    }
}

function getPlayerGames() {
    const token = getJWTData();
    if (token) {
        fetch(`http://localhost:8000/api/player/${token.id}/games`, {
            method: 'GET',
            headers: {
                'Authorization': token.auth,
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then(response => {
            if (response.status === 200 && response.ok) {
                return response.json();
            }
        })
        .then(json => {
            if (json) {
                const playerScores = document.getElementById('playerScores');

                json.forEach((game, index) => playerScores.innerHTML +=
                    `<tr><td>${index + 1}</td>` +
                    `<td>${new Date(game.date.date).toLocaleDateString("nl",
                        { year: "numeric", month: "long", day: "numeric", weekday: "long" })}</td>` +
                    `<td>${game.score}</td></tr>`);

                document.getElementById('playedGames').classList.remove("hidden");
            }
        });
    }
}

function saveGame(callback) {
    // The final score of the player is the remaining time in seconds, more time will mean a higher score
    const score = document.getElementById('remainingTime').innerHTML;
    const api = document.getElementById('picture').value;
    const colorClosed = document.getElementById('cardColor').value;
    const colorFound = document.getElementById('foundCardColor').value;

    const token = getJWTData();
    if (token && !isTokenExpired(0, false)) {
        fetch(`http://localhost:8000/game/save`, {
            method: 'POST',
            headers: {
                'Authorization': token.auth,
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: `{"id":"${token.id}","score":"${score}","api":"${api}","color_closed":"${colorClosed}","color_found":"${colorFound}"}`
        })
        .then(response => {
            if (response.status === 200 && response.ok) {
                if (callback) {
                    // Game saved successfully, execute the callback function which updates the scoreboard
                    callback();
                }
            }
        });
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
        let highscores = json.sort((a, b) => b.score - a.score);

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

function isTokenExpired(validityRange, infoLog, modalText) {
    const token = getJWTData()?.auth.split(' ')[1];
    if (token) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        const now = (Math.floor((new Date).getTime() / 1000));
        const minutesLeft = Math.round((expiry - now) / 60);

        if (infoLog) {
            if (minutesLeft <= 0) {
                console.info(`Your login session is expired.`);
            }
            else {
                console.info(`Your login session will expire in: ${minutesLeft} minutes.`);
            }
        }

        if (modalText) {
            if (minutesLeft <= 0) {
                modalText.innerHTML = "<span>Uw loginsessie is verlopen.</span>" +
                    "Klik <a href=\"/login\">hier</a> om opnieuw in te loggen.";
            }
            else {
                modalText.innerHTML = `<span>Uw loginsessie verloopt binnen ${minutesLeft} minuten.</span>` +
                    `Klik <a href="/login">hier</a> om opnieuw in te loggen.`;
            }
        }

        // Check if the token is expired or past the minimum validity range
        return expiry - now <= validityRange;
    }

    return true;
}

function setPreferences(json) {
    document.getElementById('picture').value = json.preferred_api;
    document.getElementById('cardColor').value = json.color_closed;
    document.getElementById('foundCardColor').value = json.color_found;
}

function initModal() {
    const modal = document.getElementById("infoModal");
    const span = document.getElementById("closeModal");

    span.onclick = function() {
        modal.classList.add("hidden");
    }

    window.checkLogin = setInterval(function() {
        checkLoginValidity(modal);
    }, 60000);
    // Immediately execute the function, but after the setInterval is defined so the clearInterval will work
    checkLoginValidity(modal);
}

function checkLoginValidity(modal) {
    let modalText = document.getElementById("modalText");
    if (isTokenExpired(300, true, modalText)) {
        if (modalText.innerHTML.length) {
            modal.classList.remove("hidden");
        }

        clearInterval(window.checkLogin);
    }
}
