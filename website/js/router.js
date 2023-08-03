// to handle the manual back button in the browser
window.addEventListener('popstate', function () {
    callNavigation();
});

const type = new Map();
type.set('/', 'folder');

type.set('.mp4', 'video');
type.set('.txt', 'text');
type.set('.mp3', 'audio');

type.set('.png', 'image');
type.set('.jpg', 'image');
type.set('.jpeg', 'image');

function callNavigation() {
    if (!isLoggedIn()) {
        console.error("User is not logged in! Not doing anything! >:(");
        if(window.location.hash !== "#/login") {
            location.replace("./#/login");
            showElement("loginForm");
            hideElement("content");
            hideElement("navBar");
        }
        return;
    }

    setBreadcrumb();

    //hide all views to reset to default
    document.querySelectorAll(".view").forEach(function (view) {
        hideElement(view.id);
    });

    const fileType = getFileType();
    if (fileType === "folder") {
        loadFolderContent(window.location.hash.replace('#', ''));
        showElement("mkdirAction");
        showElement("touchTextFileAction");
        showElement("uploadAction");
    } else {
        loadFileContent(window.location.hash.replace('#', ''), fileType);
        showElement("downloadAction");
    }

    showElement(fileType + "View");
}

function getFileType() {
    let fileType;
    type.forEach(function (value, key) {
        if (window.location.hash.toLowerCase().endsWith(key.toLowerCase())) {
            fileType = value;
        }
    });
    return fileType;
}

function startRouter() {
    if (window.location.hash === "") {
        location.assign("#/");
    }

    console.log(window.location.hash)
}

function navigateTo(path) {
    location.assign(window.location.hash + path);
}

function navigateBack() {
    history.back();
}

function getCurrentPath() {
    return window.location.hash.replace('#/', '');
}

function setBreadcrumb() {
    if (getCurrentPath() === "") {
        document.getElementById("breadcrumbText").innerHTML = "data";
        hideElement("breadcrumbBack");
        return;
    }

    document.getElementById("breadcrumbText").innerHTML = getCurrentPath();
    showElement("breadcrumbBack");
}