// to handle the manual back button in the browser
window.addEventListener('popstate', function (e) {
    callNavigation();
});

const type = new Map();
type.set('/', 'folder');
type.set('.mp4', 'video');
type.set('.txt', 'text');
type.set('.mp3', 'audio');
type.set('.png', 'image');

function callNavigation() {
    setBreadcrumb();

    //hide all views to reset to default
    document.querySelectorAll(".view").forEach(function (view) {
       hideElement(view.id);
    });

    type.forEach(function (value, key) {
       if (window.location.hash.endsWith(key)) {
           if(value === "folder") {
                loadFolderContent(window.location.hash.replace('#', ''));
           } else {
               loadFileContent(window.location.hash.replace('#', ''));
           }

           showElement(value + "View");
       }
    });
}

function startRouter() {
    if (window.location.hash === "") {
        location.assign("#/");
    }

    console.log(window.location.hash)
}

function navigateToFolder(folder) {
    location.assign(window.location.hash + folder + "/")
}
function navigateToFile(file) {
    location.assign(window.location.hash + file)
}

function naviagteBack() {
    history.back();
}

function setBreadcrumb() {
    const path = window.location.hash.replace('#/', '');
    if(path === "") {
        document.getElementById("breadcrumbText").innerHTML = "data";
        hideElement("breadcrumbBack");
        return;
    }

    document.getElementById("breadcrumbText").innerHTML = path;
    showElement("breadcrumbBack");
}