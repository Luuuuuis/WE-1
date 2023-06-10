function init() {
    startRouter();

    if (!isLoggedIn()) {
        location.replace("./#/login")
        showElement("loginForm");
        return;
    }

    showElement("content");
    showElement("navBar");

    callNavigation();
}

function toggleLoginForm() {
    toggleElement("loginForm");
    toggleElement("navBar");
    toggleElement("content");
}

function toggleElement(id) {
    const element = document.getElementById(id);
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
}

function showElement(id) {
    const element = document.getElementById(id);
    element.classList.remove('hidden');
}

function hideElement(id) {
    const element = document.getElementById(id);
    element.classList.add('hidden');
}

function del() { // Folder has to be empty before deletion
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:8080/' + getCurrentPath(), true);
    xhr.setRequestHeader('Authorization', 'Basic ' + getAuthCode());

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 200) {
            alert(JSON.parse(xhr.responseText).message);
            navigateBack();
        } else {
            alert(JSON.parse(xhr.responseText).error);
        }
    }

    xhr.send();
}