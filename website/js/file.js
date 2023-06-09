function loadFileContent(file) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/' + file + "?format=base64", true);
    xhr.setRequestHeader('Authorization', 'Basic ' + getAuthCode());

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("res: " + xhr.responseText);

            document.querySelectorAll(".contentSource").forEach(function (element) {
                element.src = element.src.split(",")[0] + "," + xhr.responseText;
            });
        }
    }

    xhr.send();
}