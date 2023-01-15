
function loginOrAccount() {
    const token = getJWTTokenData();

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

                window.location = "/login?token_expired=1";
            })
            .then(json => {
                if (window.location.pathname === "/preferences") {
                    setPreferences(json);
                }
            });
        }
    }
    else {
        window.location = "/login?not_logged_in=1";
    }
}

function setPreferences(json) {
    // document.getElementById('character').value = json.character;
    document.getElementById('picture').value = json.preferred_api;
    // document.getElementById('size').value = json.size;
    document.getElementById('cardColor').value = json.color_closed;
    // document.getElementById('openCardColor').value = json.color_open;
    document.getElementById('foundCardColor').value = json.color_found;
}

function getJWTTokenData() {
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
