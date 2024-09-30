// Function to initialize IndexedDB
function initIndexedDB() {
  return new Promise((resolve, reject) => {
    let request = indexedDB.open("browserPathsDB", 1);

    request.onupgradeneeded = function (event) {
      let db = event.target.result;
      db.createObjectStore("paths", {keyPath: "id"});
    };

    request.onsuccess = function (event) {
      resolve(event.target.result); // This should resolve with the db instance
    };

    request.onerror = function (event) {
      reject("Error opening IndexedDB: " + event.target.errorCode);
    };
  });
}

// Function to save a path to IndexedDB
function savePath(db, pathData) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["paths"], "readwrite");
    let store = transaction.objectStore("paths");

    let request = store.put(pathData);

    request.onsuccess = function () {
      resolve("Path saved successfully");
    };

    request.onerror = function (event) {
      reject("Error saving path: " + event.target.errorCode);
    };
  });
}

// Function to get the last saved path
function getLastPath(db) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(["paths"], "readonly");
    let store = transaction.objectStore("paths");

    let request = store.get(1); // Assuming we're using id: 1

    request.onsuccess = function (event) {
      resolve(
        event.target.result
        ? event.target.result.path
        : null);
    };

    request.onerror = function (event) {
      reject("Error fetching last path: " + event.target.errorCode);
    };
  });
}

$(document).ready(async function () {
  let db;

  // Initialize the database
  try {
    db = await initIndexedDB();
  } catch (error) {
    console.error(error);
    return; // Exit if the database couldn't be initialized
  }

  // Get the current path
  let currentPath = window.location.pathname;

  // Retrieve the last path from IndexedDB
  let lastPath;
  try {
    lastPath = await getLastPath(db);
  } catch (error) {
    console.error(error);
  }
  $("#last-path").text("Last Path: " + (
  lastPath || ""));

  // Save the current path as the latest in IndexedDB
  let pathData = {
    id: 1,
    path: currentPath
  };
  // Save the current path as the latest in IndexedDB only if it's different
  if (currentPath !== lastPath) {
    let pathData = {
      id: 1,
      path: currentPath
    };
    try {
      await savePath(db, pathData);
      $("#current-path").text("Current Path Saved: " + currentPath);
    } catch (error) {
      console.error(error);
    }
  } else {
    $("#current-path").text("No new path to save.");
  }

  try {
    // back batton
    $("button.arrow-button__left").click(function () {
      window.location.href = lastPath;
      // window.localStorage.removeItem("__AFUL_PREQUALIFY_TARGET_SEGMENT");
    });
  } catch (error) {}
});

// Track path changes during navigation (back/forward)
window.onpopstate = async function (event) {
  let db;

  // Initialize the database
  try {
    db = await initIndexedDB();
  } catch (error) {
    console.error(error);
    return; // Exit if the database couldn't be initialized
  }

  // Get the current path and store it
  let currentPath = window.location.pathname;

  // Retrieve the last path from IndexedDB
  let lastPath;
  try {
    lastPath = await getLastPath(db);
  } catch (error) {
    console.error(error);
  }
  $("#last-path").text("Last Path: " + (
  lastPath || "No previous path found"));

  // Save the current path as the latest
  let pathData = {
    id: 1,
    path: currentPath
  };
  // Save the current path as the latest only if it's different
  if (currentPath !== lastPath) {
    let pathData = {
      id: 1,
      path: currentPath
    };
    try {
      await savePath(db, pathData);
      $("#current-path").text("New Path Saved: " + currentPath);
    } catch (error) {
      console.error(error);
    }
  } else {
    $("#current-path").text("No new path to save.");
  }
  try {
    // back batton
    $("button.arrow-button__left").click(function () {
      window.location.href = lastPath;
      // window.localStorage.removeItem("__AFUL_PREQUALIFY_TARGET_SEGMENT");
    });
  } catch (error) {}
};

$(document).ready(async function () {
  let __AFUL_PREQUALIFY_TARGET_SEGMENT = window.localStorage.getItem("__AFUL_PREQUALIFY_TARGET_SEGMENT");
  if (__AFUL_PREQUALIFY_TARGET_SEGMENT && __AFUL_PREQUALIFY_TARGET_SEGMENT === "parent") {
    $(".prequalify-screen[data-prequalify-container='parent']").show(function () {
      $(this).on("click", "button[data-id='parent-prequalify']", function (event) {
        event.preventDefault();
        $(this).parent().fadeOut(500, function () {
          $("section[data-section-name='Prequalify-parent-step-1']").hide();
          $("section[data-section-name='Prequalify-parent-step-2']").fadeIn(500);
        });
      });
    });
  }

  if (__AFUL_PREQUALIFY_TARGET_SEGMENT && __AFUL_PREQUALIFY_TARGET_SEGMENT === "career") {
    $(".prequalify-screen[data-prequalify-container='career']").show(function () {
      $(".prequalify-selection-group").find("button.product-selection-button").each(function () {
        $(this).click(function () {
          $(".prequalify-screen__section-container[data-section-name=Prequalify-career-step-1]").fadeOut(500, function () {
            $(".prequalify-screen__section-container[data-section-name=Prequalify-career-step-2]").fadeIn(500, function () {
              $(".progress-bar__complete.background-color__teal").css("width", "75%");
            });
          });
        });
      });

      function handlePreQualificationCheck(who) {}

      $(".prequalify-form").submit(function (event) {
        event.preventDefault();

        let formData = {};

        $(this).find(":input").each(function () {
          if ($(this).attr("name") && !$(this).prop("disabled")) {
            if ($(this).is("select")) {
              formData[$(this).attr("name")] = $(this).find("option:selected").val();
            } else {
              formData[$(this).attr("name")] = $(this).val();
            }
          }
        });
        formData.prequalifyWho = "career";
        $.ajax({
          url: $(this).attr("action"),
          type: "POST",
          data: JSON.stringify(formData),
          headers: {
            "X-CSRFToken": $("input[name=csrfmiddlewaretoken]").val()
          },
          success: function (response) {
            const {client} = response;
            $(".prequalify-screen__section-container[data-section-name=Prequalify-career-step-2]").fadeOut(500, function () {
              $(".prequalify-screen__section-container[data-section-name=Prequalify-career-step-3]").fadeIn(500, function () {
                $(".progress-bar__complete.background-color__teal").css("width", "100%");
                $(this).find(".prequalify-screen__results-view").find("h2.h2").text("Sorry " + client + ",");
              });
            });
          },
          error: function (xhr, status, error) {
            alert(xhr.responseText);
          }
        });
      });
    });
  }
});
