/*=========================================================================================
    File Name: dropzone.js
    Description: dropzone
    --------------------------------------------------------------------------------------
    Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
    Version: 1.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
//alert('yo');
/*Dropzone.options.dpzSingleFile = {
    paramName: "file", // The name that will be used to transfer the file
    maxFiles: 1,
    init: function() {
        this.on("maxfilesexceeded", function(file) {
            this.removeAllFiles();
            this.addFile(file);
        });
    }
};*/

/********************************************
*               Multiple Files              *
********************************************/
/*Dropzone.options.dpzMultipleFiles = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 0.5, // MB
    clickable: true
}*/


/********************************************************
*               Use Button To Select Files              *
********************************************************/
/*new Dropzone(document.body, { // Make the whole body a dropzone
    url: "#", // Set the url
    previewsContainer: "#dpz-btn-select-files", // Define the container to display the previews
    clickable: "#select-files" // Define the element that should be used as click trigger to select files.
});*/


/****************************************************************
*               Limit File Size and No. Of Files                *
****************************************************************/
/*Dropzone.options.dpzFileLimits = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 0.5, // MB
    maxFiles: 5,
    maxThumbnailFilesize: 1, // MB
}*/


/********************************************
*               Accepted Files              *
********************************************/
Dropzone.options.myDropzone = {
    url: "/Account/Create",
    autoProcessQueue: false,
    uploadMultiple: true,
    parallelUploads: 100,
    maxFilesize: 3, // MB
    maxFiles: 5,
    maxThumbnailFilesize: 1, // MB
    acceptedFiles: 'image/*',
    addRemoveLinks: true,
    dictRemoveFile: " Trash",

    init: function () {

         // Using a closure.
         var _this = this;

         // Setup the observer for the button.
         $("#clear-dropzone").on("click", function(e) {
             e.preventDefault();
             // Using "_this" here, because "this" doesn't point to the dropzone anymore
             _this.removeAllFiles();
             // If you want to cancel uploads as well, you
             // could also call _this.removeAllFiles(true);
         });

        var submitButton = document.querySelector("#submit-all");
        var wrapperThis = this;

        submitButton.addEventListener("click", function () {
            wrapperThis.processQueue();
        });

        this.on("addedfile", function (file) {

            // Create the remove button
            var removeButton = Dropzone.createElement("<button class='btn btn-lg dark'>Remove File</button>");

            // Listen to the click event
            removeButton.addEventListener("click", function (e) {
                // Make sure the button click doesn't submit the form:
                e.preventDefault();
                e.stopPropagation();

                // Remove the file preview.
                wrapperThis.removeFile(file);
                // If you want to the delete the file on the server as well,
                // you can do the AJAX request here.
            });

            // Add the button to the file preview element.
            file.previewElement.appendChild(removeButton);
        });

        this.on('sendingmultiple', function (data, xhr, formData) {
            formData.append("Username", $("#Username").val());
        });
    }
};

Dropzone.options.dpAcceptFiles = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 3, // MB
    maxFiles: 5,
    maxThumbnailFilesize: 1, // MB
    acceptedFiles: 'image/*',
    addRemoveLinks: true,
    dictRemoveFile: " Trash",
    height: "100px",   
    init: function() {

        // Using a closure.
        var _this = this;

        // Setup the observer for the button.
        $("#clear-dropzone").on("click", function(e) {
            e.preventDefault();
            // Using "_this" here, because "this" doesn't point to the dropzone anymore
            _this.removeAllFiles();
            // If you want to cancel uploads as well, you
            // could also call _this.removeAllFiles(true);
        });
    }
}


/************************************************
*               Remove Thumbnail                *
************************************************/
Dropzone.options.dpzRemoveThumb = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 1, // MB
    addRemoveLinks: true,
    dictRemoveFile: " Trash"
}

/*****************************************************
*               Remove All Thumbnails                *
*****************************************************/
Dropzone.options.dpzRemoveAllThumb = {
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 1, // MB
    init: function() {

        // Using a closure.
        var _this = this;

        // Setup the observer for the button.
        $("#clear-dropzone").on("click", function() {
            // Using "_this" here, because "this" doesn't point to the dropzone anymore
            _this.removeAllFiles();
            // If you want to cancel uploads as well, you
            // could also call _this.removeAllFiles(true);
        });
    }
}