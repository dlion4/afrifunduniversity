// Fetch the GTM script from the server
fetch("/load-gtm/").then(response => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}).then(data => {
  // Create a script tag and inject the GTM script
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.text = data.script;
  document.head.appendChild(script);
}).catch(error => {
  console.error("Error loading GTM script:", error);
});
