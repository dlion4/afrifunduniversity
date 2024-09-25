// Dynamically load a JavaScript file via AJAX
function loadJSFile(url, callback, options = document.head) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.text = xhr.responseText;
            if (options) {
                options.appendChild(script);
            }
            if (callback) {
                callback();
            }
        }
    };
    xhr.send();
}
