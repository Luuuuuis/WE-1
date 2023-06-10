const icons = new Map();
icons.set('application', '🕳');
icons.set('dir', '📁');
icons.set('video', '📼');
icons.set('audio', '🎵');
icons.set('text', '📃');
icons.set('image', '📷');


function loadFolderContent(folder) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/' + folder, true);
    xhr.setRequestHeader('Authorization', 'Basic ' + getAuthCode());

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }

        if(xhr.status === 200) {
            console.log(xhr.responseText);
            const files = JSON.parse(xhr.responseText);

            const contentList = document.getElementById('contentList');
            contentList.innerHTML = '';

            files.forEach(function(file) {
                const listItem = document.createElement('li');
                const icon = icons.get(file.Type.split("/")[0]);

                const path = file.Name + (file.Type === "dir" ? "/" : "");

                listItem.innerHTML = "<a onclick=\"navigateTo(\'" + path + "\')\">" + icon + file.Name + "</a>";

                contentList.appendChild(listItem);
            });
        } else {
            alert(JSON.parse(xhr.responseText).error);
        }
    }

    xhr.send();
}

function createFolder() {
    const folderName = prompt("Enter folder name");

    if(folderName === null || folderName === "") {
        alert("Invalid folder name");
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/' + getCurrentPath() + folderName, true);
    xhr.setRequestHeader('Authorization', 'Basic ' + getAuthCode());

    // has to be set!! but than formdata stops working?? why? I just wrote it manually in the body
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

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

    xhr.send("type=dir");
}