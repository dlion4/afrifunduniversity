fetch("/schema/").then(response => response.text()).then(html => {
  document.head.insertAdjacentHTML("beforeend", html);
}).catch(err => console.error("Error fetching schema:", err));

// function handleEmailDecodeScript() {
//    Define parameters
//   const params = "window.__CF$cv$params={r:'8c381cf8f826313d',t:'MTcyNjM5ODAyNy4wMDAwMDA='}";
//   const scriptPath = "/cdn-cgi/challenge-platform/scripts/jsd/main.js";

//    Construct the URL with query parameters
//   const url = new URL("{% url 'generate-decode-email-script' %}", window.location.origin);
//   url.searchParams.append("params", params);
//   url.searchParams.append("path", scriptPath);

//    Fetch the script and append it
//   fetch(url).then(response => response.text()).then(scriptContent => {
//     var script = document.createElement("script");
//     script.textContent = scriptContent;
//     document.body.appendChild(script);
//   }).catch(err => console.error("Error fetching script:", err));
// }

// handleEmailDecodeScript();
function handleSiteInspectionScript() {
  fetch("/site-inspection/").then(response => response.text()).then(scriptContent => {
    try {
      // Create a new DOMParser
      var parser = new DOMParser();
      // Parse the script content into a document
      var doc = parser.parseFromString(scriptContent, "text/html");
      // Extract the <script> element from the parsed document
      var scriptElement = doc.querySelector("script");
      if (scriptElement) {
        // Append the <script> element to the body
        document.body.appendChild(document.importNode(scriptElement, true));
      }
    } catch (err) {
      console.error("Error parsing or inserting script:", err);
    }
  }).catch(err => console.error("Error fetching script:", err));
}

handleSiteInspectionScript();
