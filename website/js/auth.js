// curl -X POST -d username=admin -d password=admin http://localhost:8080/login
function login() {
    // Formularfelder abrufen
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // AJAX-Request erstellen
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/login', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
        if(xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 200) {
            // Erfolgreiche Antwort erhalten
            const response = xhr.responseText;

            const token = JSON.parse(response).token; // Annahme: Antwort enthält ein JSON-Objekt mit dem Token
            sessionStorage.setItem('token', token); // Token im Session Storage speichern
            console.log('Token gespeichert:', token);

            sessionStorage.setItem('username', username); // Username im Session Storage speichern

            location.replace("./#/"); // Weiterleitung zur Startseite
            toggleLoginForm();
        } else {
            // Fehlermeldung ausgeben
            console.log('Fehler beim Login:', xhr.responseText);
            const error = JSON.parse(xhr.responseText).error;
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = error + " Please try again.";
        }
    };

    // POST-Daten erstellen
    const data = 'username=' + encodeURIComponent(username) +
        '&password=' + encodeURIComponent(password);

    // AJAX-Request senden
    xhr.send(data);
}

function logout() {
    // XMLRequest zum Logout senden
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/logout', true);
    xhr.setRequestHeader('Authorization', 'Basic ' + getAuthCode());

    xhr.onreadystatechange = function() {
        if(xhr.readyState !== 4) {
            return;
        }

        if(xhr.status !== 200) {
            alert(JSON.parse(xhr.responseText).error);
        }
    }

    xhr.send();

    // remove session anyways (even if logout failed) just to be sure
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    toggleLoginForm();
}

function isLoggedIn() {
    if(sessionStorage.getItem('token') === null) {
        return false;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/', false);
    xhr.setRequestHeader('Authorization', 'Basic ' + getAuthCode());
    xhr.send();

    return xhr.status === 200;
}

function getToken() {
    return sessionStorage.getItem('token');
}

function getUsername() {
    return sessionStorage.getItem('username');
}

function getAuthCode() {
    return btoa(getUsername() + ':' + getToken());
}