$(document).ready(function () {
  const dateInput = $("#dateInput");
  const phoneInput = $("#phoneInput");
  const dateErrorMessage = $("#date-error-message");
  const phoneErrorMessage = $("#phone-error-message");
  console.log(phoneErrorMessage);

  // Date Input Formatting and Validation
  dateInput.on("input", function () {
    let value = $(this).val().replace(/\D/g, ""); // Remove non-digit characters

    // Format the input as MM/DD/YYYY
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + "/" + value.slice(5, 9);
    }
    $(this).val(value);
  });

  dateInput.on("blur", function () {
    const dateValue = dateInput.val();
    if (!isValidDate(dateValue)) {
      dateErrorMessage.show();
      dateInput.val("");
    } else {
      dateErrorMessage.hide();
    }
  });

  function isValidDate(dateString) {
    const today = new Date();
    const [month, day, year] = dateString.split("/").map(Number);

    if (!month || !day || !year || year > today.getFullYear() || month > 12 || day > 31) {
      return false; // Basic validation
    }

    // Check if the date is at least 10 years ago
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(today.getFullYear() - 10);

    const inputDate = new Date(year, month - 1, day); // Month is 0-based in Date

    return inputDate <= tenYearsAgo && inputDate <= today;
  }

  // Phone Input Validation
  phoneInput.on("blur", function () {
    const phoneValue = phoneInput.val();
    if (!isValidPhone(phoneValue)) {
      phoneErrorMessage.show();
      phoneInput.val("");
    } else {
      phoneErrorMessage.hide();
    }
  });

  function isValidPhone(phone) {
    // Remove any non-digit characters
    const cleanedPhone = phone.replace(/\D/g, "");
    // Check if it is a 10-digit number starting with 07, 01, or 02
    const phoneRegex = /^(07|01|02)\d{8}$/;
    return phoneRegex.test(cleanedPhone);
  }

  phoneInput.on("keyup", function () {
    const value = $(this).val().replace(/\D/g, ""); // Remove non-digit characters
    $(this).val(value); // Update the input value

    // Validate phone number
    if (!isValidKenyanPhoneNumber(value)) {
      phoneErrorMessage.text("Invalid phone number");
    } else {
      phoneErrorMessage.text("");
    }
  });

  function isValidKenyanPhoneNumber(number) {
    if (number.startsWith("254")) {
      return number.length <= 12; // Allow 12 digits for 254
    } else if (number.startsWith("01") || number.startsWith("02")) {
      return number.length <= 10; // Allow 10 digits for 01 or 02
    }
    return false; // Invalid if it doesn't match
  }
});

$(document).ready(function () {
  //$('.spinner').html('<img src="/assets/images/spinner.png" alt="Loading..." style="width: 20px; height: 20px; display: none;">');

  var currentSection = localStorage.getItem("currentSection")
    ? parseInt(localStorage.getItem("currentSection"))
    : 0;
  var sections = $(".form-section");

  $(sections).hide();
  $(sections[currentSection]).show();

  $(".prev-button").hide();

  if (currentSection > 0) {
    $(".prev-button").show();
  }

  // Function to validate the current section
  function validateSection(sectionIndex) {
    var isValid = true;
    $(sections[sectionIndex]).find("input, select, textarea").each(function () {
      if (!this.checkValidity()) {
        isValid = false;
      }
    });
    return isValid;
  }

  if (currentSection === sections.length - 1 && validateSection(currentSection)) {
    $(".next-button").text("Submit Application");
  }

  // Save form data to localStorage
  function saveFormData() {
    $(sections[currentSection]).find("input, select, textarea").each(function () {
      localStorage.setItem(this.name, $(this).val());
    });
  }

  // Load form data from localStorage
  function loadFormData() {
    $(sections).find("input, select, textarea").each(function () {
      if (localStorage.getItem(this.name)) {
        $(this).val(localStorage.getItem(this.name));
      }
    });
  }
  // Function to update form data in localStorage when an input changes
  function updateFormDataOnChange() {
    $("input, select, textarea").on("change keyup", function () {
      localStorage.setItem(this.name, $(this).val());
    });
  }

  loadFormData(); // Load form data when the page loads
  updateFormDataOnChange(); // Attach event listener to update localStorage on change

  // Navigate to the next section
  $(".next-button").on("click", function () {
    if (validateSection(currentSection)) {
      saveFormData(); // Save the data before moving to the next section
      $(sections[currentSection]).find("input, select, textarea").each(function () {
        $(`span.${$(this).attr("name")}-is-invalid`).parent().hide();
        $(`span.${$(this).attr("name")}-is-invalid`).text("");
      });

      if (currentSection < sections.length - 1) {
        $(sections[currentSection]).fadeOut(500, function () {
          currentSection++;
          localStorage.setItem("currentSection", currentSection); // Save current section to localStorage
          $(sections[currentSection]).fadeIn(500);

          if (currentSection === sections.length - 1) {
            $(".next-button").text("Submit Application");
            if ($(".next-button-sibling").length === 0) {
              $(".next-button").after(`
                                    <p style="padding-top: 0.94rem;" class="next-button-sibling">
                                        After submission, it may take a few moments to save or retrieve your data.
                                    </p>
                                `);
            }
          }
          if (currentSection > 0) {
            $(".prev-button").show();
          }
        });
      }
    } else {
      $(sections[currentSection]).find("input, select, textarea").each(function () {
        if ($(this).val().trim() === "") {
          $(`span.${$(this).attr("name")}-is-invalid`).parent().show();
          $(`span.${$(this).attr("name")}-is-invalid`).text("This field is required");
          $(this).focus();
        }
      });
    }
  });

  // Navigate to the previous section
  $(".prev-button").on("click", function () {
    if (currentSection > 0) {
      $(sections[currentSection]).fadeOut(500, function () {
        currentSection--;
        localStorage.setItem("currentSection", currentSection); // Save current section to localStorage
        $(sections[currentSection]).fadeIn(500, function () {
          if (currentSection === 0) {
            $(".prev-button").hide();
          }
          if (currentSection < sections.length - 1) {
            $(".next-button").show();
            $(".next-button").text("Proceed Next");
            $(".next-button-sibling").remove();
          }
        });
      });
    }
  });

  $(".next-button").click(function () {
    if (currentSection === sections.length - 1 && validateSection(currentSection)) {
      saveFormData();
      if (localStorage.getItem("AccurateLoanApplicationDetails") === "true") {
        handleLoanApplicationForm("#uploadForm", function (event) {
          event.preventDefault();
          localStorage.removeItem("AccurateLoanApplicationDetails");
        });
      } else {
        $("div[data-modal=loanAmount]").fadeIn(300, function () {
          let formatter = new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          let amount = formatter.format($("input[name=annual_fee]").val());
          $(this).find("span.requestedValue").text(`${amount}`);

          $(this).find("span.hRcaWV").click(function () {
            $("div[data-modal=loanAmount]").fadeOut(300);
          });

          $(this).find("button.gibiUE").click(function () {
            $("div[data-modal=loanAmount]").fadeOut(300);
          });

          $(this).find("button.gNEyLx").click(function () {
            localStorage.setItem("AccurateLoanApplicationDetails", "true");
            $("div[data-modal=loanAmount]").fadeOut(300);
          });
        });
      }
    }
  });

  function getFormData() {
    let formData = {};

    $(sections).find("input, select, textarea").each(function () {
      let fieldType = $(this).attr("type");
      if (fieldType === "checkbox" || fieldType === "radio") {
        if ($(this).is(":checked")) {
          formData[this.name] = $(this).val();
        } else if (fieldType === "checkbox" && !$(this).is(":checked")) {
          formData[this.name] = "";
        }
      } else {
        formData[this.name] = $(this).val();
      }
      console.log(formData);
    });

    return formData;
  }

  function clearLocalStorageFormData() {
    $(sections).find("input, select, textarea").each(function () {
      localStorage.removeItem(this.name);
    });
    localStorage.removeItem("currentSection");
  }

  function handleLoanApplicationForm(form, callback) {
    callback(event);
    const urlParams = new URLSearchParams(window.location.search);
    const searchParams = {};

    for (const [key, value] of urlParams.entries()) {
      searchParams[key] = value;
    }

    const formDataObject = getFormData();

    const combinedData = {
      ...formDataObject,
      ...searchParams
    };

    $("button.next-button").text("Submitting Application ...");

    $.ajax({
      url: $(form).attr("action"),
      type: "POST",
      data: JSON.stringify(combinedData),
      contentType: "application/json",
      headers: {
        "X-CSRFToken": $("input[name='csrfmiddlewaretoken']").val()
      },
      success: function (response) {
        const {completed_url} = response;
        $("button.next-button").text("Application sent");
        setTimeout(() => {
          clearLocalStorageFormData();
          window.location.href = completed_url;
        }, 1000);
      },
      error: function (xhr, status, error) {
        console.error("Error submitting form:", error);
        console.log("Response:", xhr.responseText);
      }
    });
  }

  $(".modal-container").click(function () {
    $(this).fadeOut(300); // Hide modal
  });

  function showScholarshipModal() {
    if (!localStorage.getItem("scholarshipModalShow")) {
      $("div[data-modal=scholarshipBanner]").fadeIn(300, function () {
        $(this).find("a.kFncay").click(function () {
          $("div[data-modal=scholarshipBanner]").fadeOut(300, function () {
            localStorage.removeItem("scholarshipModalShow"); // Remove flag to show again
            $("div[data-modal=scholarshipEntryForm]").fadeIn(300, function () {
              var formEntry = $("div[data-modal=scholarshipEntryForm]").find("form");

              $(formEntry).submit(function (event) {
                event.preventDefault();
                // $("div[data-modal=scholarshipEntryForm]").fadeOut(300);
                console.log($(this).serializeArray());
              });

              $(formEntry).find("span.hRcaWV").click(function () {
                $("div[data-modal=scholarshipEntryForm]").fadeOut(300, function () {
                  $(".modal-content").fadeOut(300);
                });
                localStorage.removeItem("scholarshipModalShow");
                // Add your code here to send the form data to the server
                // $.ajax({
                //     url: '/scholarship/submit',
                //     type: 'POST',
                //     data: $(this).serializeArray(),
                //     success: function (response) {
                //         console.log(response);
                //     }
                //
              });
            });
          });
        });

        $(this).find("span.sc-kkbgRg").click(function () {
          $("div[data-modal=scholarshipBanner]").fadeOut(300);
        });
      }); // Show modal after 10 seconds
      localStorage.setItem("scholarshipModalShow", "true"); // Set flag to not show again
    }
  }

  setTimeout(showScholarshipModal, 10000);

  // Prevent clicking inside modal content from closing the modal
  $(".modal-content-1").click(function (e) {
    e.stopPropagation(); // Stops the event from bubbling up
  });
});
