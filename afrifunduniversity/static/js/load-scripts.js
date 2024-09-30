// Dynamically load a JavaScript file via AJAX
function loadJSFile(url, callback, options = document.head, token = null) {
  if (token) {
    url += (
      url.includes("?")
      ? "&"
      : "?") + "token=" + encodeURIComponent(token);
    if (!validateToken(token)) {
      return false;
    }
  }
  console.log(url);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.text = xhr.responseText;
      if (token === null) {
        script.id = "dynamic-script-" + Date.now();
      } else {
        script.id = encodeURIComponent(token);
      }

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

async function getToken() {
  const url = "/obfuscation-token-view/";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  if (data.token) {
    return data.token;
  } else {
    throw new Error("No token received");
  }
}

const validateToken = token => {
  return fetch(`/obfuscation-token-view/validation/?token=${encodeURIComponent(token)}`).then(response => response.json()).then(data => {
    return data.valid;
  });
};
