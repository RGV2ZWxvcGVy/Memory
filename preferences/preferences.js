document.addEventListener("DOMContentLoaded", function() {
    loginOrAccount();

    addEventListener('submit', (event) => {
        event.preventDefault();
        savePreferences();
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

    const token = getJWTTokenData();
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
