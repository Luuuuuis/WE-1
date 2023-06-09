function init() {

    startRouter();

    if(!isLoggedIn()) {
        location.replace("./#/login")
        showElement("loginForm");
        return;
    }

    showElement("content");
    showElement("logoutButton");

    callNavigation();
}

function toggleLoginForm() {
    toggleElement("loginForm");
    toggleElement("logoutButton");
    toggleElement("content");
}

function toggleElement(id) {
    const element = document.getElementById(id);
    if(element.classList.contains('hidden')) {
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