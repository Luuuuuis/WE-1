const icons = new Map();
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
        if(xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            const files = JSON.parse(xhr.responseText);

            const contentList = document.getElementById('contentList');
            contentList.innerHTML = '';

            files.forEach(function(file) {
                const listItem = document.createElement('li');
                const icon = icons.get(file.Type.split("/")[0]);

                if(file.Type === "dir") {
                    listItem.innerHTML = "<a onclick=\"navigateToFolder(\'" + file.Name + "\')\">" + icon + file.Name + "</a>";
                } else {
                    listItem.innerHTML = "<a onclick=\"navigateToFile(\'" + file.Name + "\')\">" + icon + file.Name + "</a>";
                }

                contentList.appendChild(listItem);
            });
        }
    }

    xhr.send();
}