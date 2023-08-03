const dataType = new Map();
dataType.set('video', 'data:video/mp4;base64,');
dataType.set('audio', 'data:audio/mp3;base64,');
dataType.set('text', 'data:text/plain;charset=utf-8,');
dataType.set('image', 'data:image/png;base64,');

function loadFileContent(file, type) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/' + file + "?format=base64", true);
    xhr.setRequestHeader('Authorization', 'Basic ' + getAuthCode());

    xhr.onreadystatechange = function () {
        if(xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 200) {
            if (type === "text") {
                document.getElementById("textViewSrc").value = atob(xhr.responseText);
                return;
            }

            document.querySelectorAll(".contentSource").forEach(function (element) {
                const data = dataType.get(type);
                element.src = data + xhr.responseText;
            });
        } else {
            if(getFileType() === "text") {
                return;
            }

            alert(JSON.parse(xhr.responseText).error);
        }
    }

    xhr.send();
}

function downloadFile() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/' + getCurrentPath() + "?format=base64", true);
    xhr.setRequestHeader('Authorization', 'Basic ' + getAuthCode());

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 200) {
            const data = getFileType() === "text" ? atob(xhr.responseText) : xhr.responseText;
            const link = document.createElement('a');
            const fileName = getCurrentPath().substring(getCurrentPath().lastIndexOf("/") + 1);

            link.setAttribute('href', dataType.get(getFileType()) + encodeURIComponent(data));
            link.setAttribute('download', fileName);
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert(JSON.parse(xhr.responseText).error);
        }
    }

    xhr.send();
}

function editTextContent() {
    const text = document.getElementById("textViewSrc").value;
    const base64 = encodeURIComponent(btoa(text));


    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/' + getCurrentPath(), true);
    xhr.setRequestHeader('Authorization', 'Basic ' + getAuthCode());

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 200) {
            alert(JSON.parse(xhr.responseText).message);
        } else {
            alert(JSON.parse(xhr.responseText).error);
        }
    }

    xhr.send("content=" + base64);
}

function createTextFile() {
    const fileName = prompt("Enter file name");

    if(fileName === null || fileName === "") {
        alert("Invalid file name");
        return;
    }

    navigateTo(fileName + ".txt");
}

function uploadFile() {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = function () {
        const selectedFile = input.files[0];
        console.log("datei ausgewählt: " + selectedFile.name);

        const formData = new FormData();
        formData.append("newFile", selectedFile);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/' + getCurrentPath() + selectedFile.name, true);
        xhr.setRequestHeader('Authorization', 'Basic ' + getAuthCode());

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 200) {
                alert(JSON.parse(xhr.responseText).message);
                callNavigation();
            } else {
                alert(JSON.parse(xhr.responseText).error);
            }
        }

        xhr.send(formData);
    }

    input.click();
}