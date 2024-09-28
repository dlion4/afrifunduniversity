(function ($) {
  "use strict";

  var $document,
    idleTime;

  $document = $(document);

  $(function () {
    // Set idle timer to 30 seconds (30000 ms)
    $.idleTimer(1800000); // Lock session after 30 minutes

    // On idle, redirect to lock screen
    $document.on("idle.idleTimer", function () {
      var base_url = $("#base_url").val();
      window.location.href = base_url + "account/index/lockscreen"; // Redirect to lock screen
    });

    // Prevent navigation using back button to escape the lock screen
    window.onpopstate = function (event) {
      var base_url = $("#base_url").val();
      window.location.href = base_url + "account/index/lockscreen"; // Force redirect to lock screen
    };
  });

  window.onbeforeunload = function () {
    sessionStorage.setItem("previous_page", window.location.href);
  };
}.apply(this, [jQuery]));
