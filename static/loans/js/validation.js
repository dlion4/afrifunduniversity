$(document).ready(function () {
    const dateInput = $("#dateInput");
    const phoneInput = $("#phoneInput");
    const dateErrorMessage = $("#date-error-message");
    const phoneErrorMessage = $("#phone-error-message");
    console.log(phoneErrorMessage)

    // Date Input Formatting and Validation
    dateInput.on("input", function () {
        let value = $(this).val().replace(/\D/g, ''); // Remove non-digit characters

        // Format the input as MM/DD/YYYY
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        if (value.length >= 5) {
            value = value.slice(0, 5) + '/' + value.slice(5, 9);
        }
        $(this).val(value);
    });

    dateInput.on("blur", function () {
        const dateValue = dateInput.val();
        if (!isValidDate(dateValue)) {
            dateErrorMessage.show();
            dateInput.val('');
        } else {
            dateErrorMessage.hide();
        }
    });

    function isValidDate(dateString) {
        const today = new Date();
        const [month, day, year] = dateString.split('/').map(Number);

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
            phoneInput.val('');
        } else {
            phoneErrorMessage.hide();
        }
    });

    function isValidPhone(phone) {
        // Remove any non-digit characters
        const cleanedPhone = phone.replace(/\D/g, '');
        // Check if it is a 10-digit number starting with 07, 01, or 02
        const phoneRegex = /^(07|01|02)\d{8}$/;
        return phoneRegex.test(cleanedPhone);
    }


    phoneInput.on("keyup", function () {
        const value = $(this).val().replace(/\D/g, ''); // Remove non-digit characters
        $(this).val(value); // Update the input value

        // Validate phone number
        if (!isValidKenyanPhoneNumber(value)) {
            phoneErrorMessage.text("Invalid phone number");
        } else {
            phoneErrorMessage.text("");
        }
    });

    function isValidKenyanPhoneNumber(number) {
        if (number.startsWith('254')) {
            return number.length <= 12; // Allow 12 digits for 254
        } else if (number.startsWith('01') || number.startsWith('02')) {
            return number.length <= 10; // Allow 10 digits for 01 or 02
        }
        return false; // Invalid if it doesn't match
    }
});