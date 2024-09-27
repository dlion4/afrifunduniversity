        var readUrl = 'accounts/datatable/frm_modules',
            updateUrl = 'accounts/update',
            delUrl = 'accounts/delete',
            delHref,
            updateHref,
            status,
            updateId;

        $(document).ready(function () {

            ///////////////////////////////////////////////////////////////////////////////////////////////
            $('body').on('hidden.bs.modal', '.modal', function () {
                $(this).find('input[type="text"],input[type="email"],textarea,select').each(function () {
                    if (this.defaultValue != '' || this.value != this.defaultValue) {
                        this.value = this.defaultValue;
                    } else {
                        this.value = '';
                    }
                });
            });
            //alert();

            // check_progress_status() //Check Application Progress

            function check_progress_status() {

                var base_url = $('#base_url').val();
                var user_id = $('#user_id').val();
                var url = base_url + 'nfm/check_progress_status/';
                $("#div_progress").hide();
                //alert(url);
                ////////////////////////////////////////////////////////////////////        
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'html',
                    beforeSend: function () {
                        //Replace this with your loading gif image
                        //$('html, body').animate({scrollTop: $("#progress_bar").offset().top-100}, 150);
                        $("#progress_bar").fadeIn('slow').removeClass('info').html(
                            '<p><img src = "/static/dashboard/students/assets/assets/images/loaders/loader13.gif" class="loaders"/></span></p>');
                        $(".btn").attr("disabled", true);
                    },
                    error: function () {
                        if ($("#progress_bar").length) {
                            $("#progress_bar").fadeOut('slow').fadeIn('slow')
                                .removeClass('info').addClass('alert alert-danger');
                            $("#progress_bar").html('<strong><h5><i class="fa fa-warning"></i> Error!</h5></strong> Unable to complete your request. Please try again! If the problem persists, please contact the administrator');
                            $('html, body').animate({
                                scrollTop: $("#progress_bar").offset().top
                            }, 100);
                            $(".btn").removeAttr("disabled");
                        }
                    },
                    success: function (response) {

                        //alert(response); die();
                        $(".btn").removeAttr("disabled");
                        $("#progress_bar").hide();
                        $("#div_progress").show();
                        $('#top_header').html(response);
                        $('#top_header2').html(response);

                        //////////////////////////////////////////////////
                        $("#prog_bar").css({
                            width: response + '%'
                        });
                        $('#progress-value').html(response + '%');
                        //alert(response); die();
                    }
                });


                return false;
            } // end readResults

            $('#big_table2').DataTable({
                destroy: true,
                responsive: true,
                autoWidth: false,
                fixedColumns: true,
                stateSave: true,
                //rowReorder: false,
                processing: true,
                serverSide: false,
                paging: true,
                //pageLength : 2, //Lenght of datatable
                //lengthMenu: [ 2, 10, 20, 30, 40, 50, 70, 100 ],
                lengthMenu: [
                    [5, 10, 25, 50, 100, -1],
                    [5, 10, 25, 50, 100, "All"]
                ],
                pageLength: 5,
                searching: true,
                info: false,
                ordering: false, //Change the order asc / desc of datatable
                deferRender: false,
                //sDom     :"fptip",
                //dom      : "<ipf>",
            });

            $('.zero-configuration').DataTable();

            /**
             ** Products
             ***************************************************************************************/
            $(document).on("click", ".btn-loans", function (e) {
                e.preventDefault();

                var base_url = $('#base_url').val();
                var jenga_status = $('#jenga_status').val();

                updateHref = $(this).attr('href');
                //alert(updateHref);
                var res = updateHref.split("(");

                var val = res[1].split(",");
                var acad = val[1].split(")");
                //alert(val);
                //////////////////////////////////////
                var rec = val[2].split(")");
                var fstatus = rec[0];
                //alert(acad[0].replace(/['"]+/g, '')); die();

                $('#product_id').val(val[0]);
                $('#academic_year').val(acad[0].replace(/['"]+/g, ''));
                //alert(acad[0]);
                //alert(jenga_status + '-' + $('#product_id').val() + '-' +  $('#academic_year').val());

                if (jenga_status == 'fail' && fstatus == 1) {

                    $('#responsive-modal').modal({
                        //show: 'true',
                        keyboard: false,
                        backdrop: 'static',
                        //keyboard: false,
                    });

                    $('#responsive-modal').modal('show');

                } else {

                    $('#prod_id').val(val[0]);
                    $('#acad_year').val(acad[0].replace(/['"]+/g, ''));

                    //alert($('#product_id').val() + '-' + $('#academic_year').val() );
                    document.pForm.submit();
                }


            });


            /**
             ** Save Form online
             ***************************************************************************************/
            $(document).on("click", ".btn-employed", function (e) {
                e.preventDefault();

                $(':input').css({
                    'border-color': '',
                    'box-shadow': 'none'
                });
                $('label small').css('color', '').html('');

                //Declare variables
                var base_url = $('#base_url').val();
                var user_id = $('#user_id').val();
                var employed = $('#form-is_employed').val();
                var study_level = $('#form-study_level').val();

                var url = '';
                var action = '';
                var str = '';

                url = 'https://portal.hef.co.ke/' + 'account/save_form/frm_employed/update/' + user_id + '/' + employed + '/' + study_level;
                action = 'update';
                //alert(url);

                ////////////////////////////////////////////////////////////////////        
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: $("#search-form").serialize(),
                    dataType: 'html',
                    beforeSend: function () {
                        // Replace this with your loading gif image
                        $(".btn").attr("disabled", true);
                        $('html, body').animate({
                            scrollTop: $("#message").offset().top - 100
                        }, 150);
                        $('#message').show();
                        $('#message').addClass('alert alert-danger').html(
                            '<img src="' + base_url + 
                            'static/dashboard/students/assets/assets/images/loaders/loader7.gif" /><span style="font-weight: bold; padding-left: 1em;font-size: 12px;">Processing Data please wait..!</span>');
                    },
                    error: function () {
                        $('#message').fadeOut('slow');
                        $('#message').fadeIn('slow').removeClass('info').addClass('alert alert-danger');
                        $('#message').html('<strong><h5><i class="fa fa-warning"></i> Error!</h5></strong> Unable to complete your request. Please try again!. If the problem persists, please contact the administrator');
                        $('html, body').animate({
                            scrollTop: $('#message').offset().top
                        }, 100);
                        $(".btn").removeAttr("disabled");
                    },
                    success: function (result) {
                        //alert(result);   
                        $(".btn").removeAttr("disabled");

                        //////////////////////////////////////////////////////////////////////////////////
                        var a = JSON.parse(result);
                        var data = result;
                        var s = " [" + data + "]";
                        var myObject = eval('(' + s + ')');
                        for (i in myObject) {
                            for (f in myObject[i]) {
                                //alert(f);
                                if (f === 'info') {

                                    if ((myObject[i][f]) === 'success') {


                                        /////////////////////////////////////////////////////
                                        $('#message').hide();
                                        var base_url = $('#base_url').val();
                                        var url = base_url + 'account/index/';

                                        //alert(url);  
                                        window.location = url;


                                    } else if ((myObject[i][f]) === 'error') {
                                        $('#message').removeClass('info').addClass('alert alert-error').html('<b>Oops! </b>').append('<br />A problem occurred when creating your account. Please try again!');
                                        $('html, body').animate({
                                            scrollTop: $('#message').offset().top
                                        }, 100);

                                    } else if ((myObject[i][f]) === 'emp_error') {
                                        $('#message').removeClass('info').addClass('alert alert-error').html('<b>Error! </b>').append('<br />You must be <b>EMPLOYED</b> to proceed under this Level of Study!');
                                        //$('html, body').animate({scrollTop: $('#message').offset().top}, 100);
                                        $('#message').focus();
                                        $('#form-is_employed').css({
                                            'border-color': '#a94442',
                                            'box-shadow': '0 3px 3px #e8c8c8'
                                        });
                                        $("label[for='form-is_employed'] small").css('color', '#a94442').html('Must be Employed');

                                    } else if ((myObject[i][f]) === 'redirect') {
                                        var base_url = $('#base_url').val();
                                        var url = base_url + 'account/index/index';

                                        //alert(url);  
                                        window.location = url;
                                    }

                                } else {
                                    //alert(f+' - '+myObject[i][f]);

                                    $('#form-' + f).css({
                                        'border-color': '#a94442',
                                        'box-shadow': '0 3px 3px #e8c8c8'
                                    })
                                    $("label[for='form-" + f + "'] small").css('color', '#a94442').html(myObject[i][f])
                                    $('#message h3').show().html('Oops!');
                                    $('#message').removeClass('info').addClass('alert alert-error').html('<h3 style="color: #000"><i class="la la-warning"></i> Oops!</h3>Please Correct the errors highlighted below!');
                                    $('html, body').animate({
                                        scrollTop: $('#message').offset().top
                                    }, 100);
                                }
                            }
                        }
                    }
                });

                return false;
            });


            /**
             ** Save Form online
             ***************************************************************************************/
            $(document).on("click", ".btn-save", function (e) {
                e.preventDefault();

                $(':input').css({
                    'border-color': '',
                    'box-shadow': 'none'
                });
                $('label small').css('color', '').html('');

                //Declare variables
                var base_url = $('#base_url').val();
                var cid = $('#cid').val();
                var url = '';
                var action = '';
                var str = '';

                //////////////////////////////////////////////////////////////////////////////////
                var form = new FormData(document.getElementById('myForm'));
                //append files
                //var file1 = document.getElementById('userfile1').files[0];
                //if (file1) {   form.append('userfile1', file1); }   

                /*** Prepare Ajax call */

                if (cid != "") {
                    url = 'https://portal.hef.co.ke/' + 'account/save_form/frm_modules/update/' + cid;
                    action = 'update';
                } else {
                    url = "https://portal.hef.co.ke/account/save_form/frm_modules/insert";
                    action = 'save';
                }
                //alert(base_url +'assets/assets/images/loaders/loader7.gif');
                //alert($("form").serialize());
                ///////////////////////////////////////////////////////////
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: form,
                    dataType: "html",
                    mimeType: "multipart/form-data",
                    contentType: false,
                    cache: false,
                    processData: false,
                    beforeSend: function () {
                        // Replace this with your loading gif image                                        
                        $('html, body').animate({
                            scrollTop: $("#message").offset().top - 100
                        }, 150);
                        $('#message').show();
                        $('#message').removeClass('alert alert-success').addClass('alert alert-danger').html('<img src="' + base_url + 
                            'static/dashboard/students/assets/assets/images/loaders/loader7.gif" /><span style="font-weight: bold; padding-left: 1em;font-size: 12px;">Saving Data please wait..!</span>');
                        $('html, body').animate({
                            scrollTop: $("#message").offset().top - 100
                        }, 150);
                        $(".btn-save").prop('disabled', true);
                    },
                    error: function () {
                        $('#message').fadeOut('slow');
                        $('#message').fadeIn('slow').removeClass('info').addClass('alert alert-error');
                        $('#message').html('<strong><h5><i class="fa fa-warning"></i> Error!</h5></strong> Unable to complete your request. Please try again!. If the problem persists, please contact the administrator');
                        $('html, body').animate({
                            scrollTop: $('#message').offset().top
                        }, 100);
                        $(".btn-save").prop('disabled', false);
                        //$(".finisher").removeAttr("disabled");
                    },
                    success: function (result) {

                        //alert(result);

                        //////////////////////////////////////////////////////////////////////////////////
                        $(".btn-save").prop('disabled', false);
                        //////////////////////////////////////////////////////////////////////////////////
                        var a = JSON.parse(result);
                        var data = result;
                        var s = " [" + data + "]";
                        var myObject = eval('(' + s + ')');
                        for (i in myObject) {
                            for (f in myObject[i]) {
                                //alert(f);
                                if (f === 'cl_error') {
                                    if (a.cl_error) {
                                        $('#message h3').show();

                                        if (a.cl_error == '<p>The uploaded file exceeds the maximum allowed size in your PHP configuration file.<\/p>') {
                                            $('#message').removeClass('alert alert-info alert-primary').addClass('alert alert-danger').html('<h5><i class="fa fa-warning"></i> <b>Upload Error! </b></h5>').append('File is greater than maximum upload Size of 5Mb');
                                            ("label[for='form-userfile1'] small").css('color', '#a94442').html('File is greater than maximum upload Size of 5Mb');
                                        } else {
                                            $('#message').removeClass('alert alert-info alert-primary').addClass('alert alert-danger').html('<h5><i class="fa fa-warning"></i> <b>Upload Error! </b></h5>').append(a.cl_error);
                                            $("label[for='form-userfile1'] small").css('color', '#a94442').html(a.cl_error);
                                        }
                                        $('html, body').animate({
                                            scrollTop: $('section').offset().top
                                        }, 100);
                                        die();
                                    }

                                } else if (f === 'max_upload') {
                                    if (a.max_upload) {
                                        $('#message h3').show();
                                        $('#message').removeClass('alert alert-info alert-primary').addClass('alert alert-danger').html(
                                            '<h5><i class="fa fa-warning"></i> <b>File Size Error! </b></h5>').append(a.max_upload);
                                        //$('.fileupload').css({'border-color':'#a94442'});
                                        $("label[for='form-userfile1'] small").css('color', '#a94442').html(a.max_upload);
                                        $('html, body').animate({
                                            scrollTop: $('.panel-title').offset().top
                                        }, 100);
                                        die();
                                    }
                                    die();

                                } else if (f === 'info') {

                                    if ((myObject[i][f]) === 'success') {

                                        readData(); //Load module table

                                        /////////////////////////////////////////////////////
                                        //Toast success popup
                                        toastr.success('Record Saved successfully !', 'Success', {
                                            positionClass: 'toast-top-center',
                                            containerId: 'toast-top-right',
                                            "progressBar": true,
                                            "closeButton": true,
                                            "showMethod": "slideDown",
                                            "hideMethod": "slideUp",
                                            timeOut: 2000
                                        });

                                        /////////////////////////////////////////////////////

                                        $('#message').hide();
                                        $('#cid').val('');
                                        $('#responsive-modal').modal('toggle'); //Close Boostrap modal
                                        //return false;                           

                                    } else if ((myObject[i][f]) === 'error') {
                                        $('#message').removeClass('info').addClass('alert alert-error').html('<b>Oops! </b>').append('<br />A problem occurred when creating your account. Please try again!');
                                        $('html, body').animate({
                                            scrollTop: $('#message').offset().top
                                        }, 100);

                                    } else if ((myObject[i][f]) === 'redirect') {
                                        var base_url = $('#base_url').val();
                                        var url = base_url + 'account/index/index';

                                        //alert(url);  
                                        window.location = url;
                                    }

                                } else {
                                    //alert(f+' - '+myObject[i][f]);

                                    $('#form-' + f).css({
                                        'border-color': '#a94442',
                                        'box-shadow': '0 3px 3px #e8c8c8'
                                    })
                                    $("label[for='form-" + f + "'] small").css('color', '#a94442').html(myObject[i][f])
                                    $('#message h3').show().html('Oops!');
                                    $('#message').removeClass('info').addClass('alert alert-error').html('<h3 style="color: #000"><i class="la la-warning"></i> Oops!</h3>Please Correct the errors highlighted below!');
                                    $('html, body').animate({
                                        scrollTop: $('#message').offset().top
                                    }, 100);
                                }
                            }
                        }
                    }
                });

                return false;
            });


            /*
            Edit Form
            */
            $(document).on("click", ".btn-edit", function (e) {
                e.preventDefault();

                updateHref = $(this).attr('href');
                updateId = $(this).parents('tr').attr("id");
                var base_url = $('#base_url').val();
                $('.message').hide();
                //alert(updateHref);

                $('#responsive-modal').modal({
                    backdrop: 'static',
                    keyboard: false
                });


                ////////////////////////////////////////////////////////////////////        
                $.ajax({
                    url: updateHref,
                    type: 'POST',
                    dataType: 'json',
                    beforeSend: function () {
                        // Replace this with your loading gif image
                        $(".btn").attr("disabled", true);
                        $('html, body').animate({
                            scrollTop: $("#message").offset().top - 100
                        }, 150);
                        $('#message').show();
                        $('#message').addClass('alert alert-danger').html('<img src="' + base_url +
                             'static/dashboard/students/assets/assets/images/loaders/loader7.gif" /><span style="font-weight: bold; padding-left: 1em;font-size: 12px;">Loading Data please wait..!</span>');
                    },
                    error: function () {
                        $('#message').fadeOut('slow');
                        $('#message').fadeIn('slow').removeClass('info').addClass('alert alert-danger');
                        $('#message').html('<strong><h5><i class="fa fa-warning"></i> Error!</h5></strong> Unable to complete your request. Please try again!. If the problem persists, please contact the administrator');
                        $('html, body').animate({
                            scrollTop: $('#message').offset().top
                        }, 100);
                        $(".btn").removeAttr("disabled");
                    },
                    success: function (response) {
                        //alert(response.mod_id);   
                        $(".btn").removeAttr("disabled");


                        ///////////////////////////////////////////////////////////////////////////
                        $('#cid').val(response.mod_id);
                        $('#form-mod_name').val(response.mod_name);
                        $('#form-mod_desc').val(response.mod_desc);
                        $('#form-mod_controller').val(response.mod_controller);
                        $('#form-mod_class').val(response.mod_class);

                        //////////////////////////////////////////////////////////////////////////////
                        $('#message').removeClass('alert alert-danger').addClass('bs-callout-info callout-border-left mt-1 p-1').html('All Fields marked with (*) Asterisks are required!');
                        //$('#main-panel').hide();
                        //$('#job_form').fadeIn('slow');
                    }
                });
                return false;
            });

            /*
             ** Delete records
             */
            //$( '.btn-remove' ).live('click',function(e) {
            $(document).on("click", ".btn-remove", function (e) {
                e.preventDefault();

                delHref = $(this).attr('href');
                //alert(delHref);
                $('#message').hide();
                $('#deleteDialog').modal({
                    backdrop: 'static',
                    keyboard: false
                });

                return false;
            });

            /*
             ** Delete Records
             */

            $(document).on('click', '.btn-delete', function (e) {
                e.preventDefault();
                //alert(delHref);
                var base_url = $('#base_url').val();
                $('.message').hide();

                ////////////////////////////////////////////////////////////////////        
                $.ajax({
                    url: delHref,
                    type: 'POST',
                    dataType: 'json',
                    beforeSend: function () {
                        // Replace this with your loading gif image
                        $(".btn").attr("disabled", true);
                        $('html, body').animate({
                            scrollTop: $(".message").offset().top - 100
                        }, 150);
                        $('.message').show();
                        $('.message').addClass('alert alert-danger').html('<img src="' + base_url + 
                            'static/dashboard/students/assets/assets/images/loaders/loader7.gif" /><span style="font-weight: bold; padding-left: 1em;font-size: 12px;">Deleting Data please wait..!</span>');
                    },
                    error: function () {
                        $('.message').fadeOut('slow');
                        $('.message').fadeIn('slow').removeClass('alert alert-success').addClass('alert alert-danger');
                        $('.message').html('<strong><h5><i class="fa fa-warning"></i> Error!</h5></strong> Unable to complete your request. Please try again!. If the problem persists, please contact the administrator');
                        $('html, body').animate({
                            scrollTop: $('.message').offset().top
                        }, 100);
                        $(".btn").removeAttr("disabled");
                    },
                    success: function (response) {

                        $(".btn").removeAttr("disabled");
                        if (response.info == 'success') {

                            /////////////////////////////////////////////////////
                            readData(); //Load data

                            //Toast success popup
                            toastr.success('Record Deleted successfully !', 'Success', {
                                positionClass: 'toast-top-center',
                                containerId: 'toast-top-right',
                                "progressBar": true,
                                "closeButton": true,
                                "showMethod": "slideDown",
                                "hideMethod": "slideUp",
                                timeOut: 2000
                            });

                            /////////////////////////////////////////////////////

                            $('.message').hide();
                            $('#deleteDialog').modal('toggle'); //Close Boostrap modal


                        } else if (response.info == 'error') {

                            $('.message').removeClass('info').addClass('alert alert-danger').html('<b>Oops! </b>').append('<br />A problem occurred when creating your account. Please try again!');
                        }
                    }
                });
            });

            /* 
             ** IDNumber Validation
             */
            $(document).on("click", ".btn-validate", function (e) {
                e.preventDefault();
                var page = 'student_search';

                $(':input').css('border-color', '');
                $(':input').css('box-shadow', '');
                $('label small').css('color', '').html('');

                $(".btn").attr("disabled", true);
                //alert("https://portal.hef.co.ke/auth/iprs_search/"+ page);
                //alert($("form").serialize());

                ////////////////////////////////////////////////////////////////////        
                $.ajax({
                    url: "https://portal.hef.co.ke/auth/iprs_search/" + page,
                    type: 'POST',
                    dataType: "html",
                    data: $("form").serialize(),
                    beforeSend: function () {
                        // Replace this with your loading gif image
                        $('html, body').animate({
                            scrollTop: $(".msg").offset().top - 100
                        }, 150);
                        $('.msg').show();
                        $('.msg').addClass('bs-callout-danger callout-border-left mt-1 p-1').html(
                            '<img src="/static/dashboard/students/assets/assets/images/loaders/loader7.gif" style="vertical-align:text-bottom;" alt="" /><span style="font-weight: bold; padding-left: 1em;font-size: 12px;">Processing please wait..!</span>');
                        $(".btn").attr("disabled", true);
                    },
                    error: function () {
                        $('.msg').fadeOut('slow');
                        $('.msg').fadeIn('slow').removeClass('alert bs-callout-danger bs-callout-info bs-callout-teal').addClass('bs-callout-danger callout-border-left mt-1 p-1').html('<strong><h5><i class="fa fa-warning"></i> Error!</h5></strong> Unable to complete your request. Please try again!. If the problem persists, please contact the administrator');
                        $(".btn").removeAttr("disabled");
                    },

                    success: function (result) {
                        //alert(result);
                        var data = result;

                        $(".btn").removeAttr("disabled");
                        var s = " [" + data + "]";
                        var myObject = eval('(' + s + ')');
                        for (i in myObject) {
                            for (f in myObject[i]) {
                                if (f === 'info') {
                                    if ((myObject[i][f]) === 'success') {

                                        var data = JSON.parse(result);
                                        //alert(data.html.last_name);

                                        //////////////////////////////////////////////////////////////////////
                                        //$('#fullnames').html(data.html.full_name);
                                        $('#fullnames').html(data.html.maskednames);
                                        $('#idnumber').html(data.html.id_no);
                                        if (data.html.kra_pin != 'error_pin') {
                                            $('#kra_pin').val(data.html.kra_pin);
                                        } else {
                                            $('#kra_pin').val('');
                                        }

                                        $('#user_dob').val(data.html.dob);
                                        $('#gender').val(data.html.gender);
                                        $('#id_number').val($.trim(data.html.id_no));
                                        $('#last_name').val(data.html.last_name);
                                        $('#firstname').val(data.html.first_name);
                                        $('#mid_name').val(data.html.mid_name);

                                        //////////////////////////////////////////////////////////////////////
                                        $('.msg').hide();
                                        $('.message').show();
                                        $('.message').removeClass('alert alert-danger').addClass('alert alert-success').html('<h5> <b>IDNumber Found ! </b></h5> <small>Complete Registration by Confirming Details below and Clicking Register Button.');

                                        $(".card-header").scrollTop(0);
                                        $('#iprs_search').hide();
                                        $('#reset_msg').show();


                                        //$("#display").html(data);
                                        // $('#bank_det').hide(1000);
                                    } else if ((myObject[i][f]) === 'warning') {

                                        $('.msg').show();
                                        $('.msg').removeClass('alert alert-success').addClass('alert alert-danger').html('<h5><b><i class="la la-warning"></i> Failed! </b></h5> The details provided do not match.');

                                    } else if ((myObject[i][f]) === 'error') {

                                        $('.msg').show();
                                        $('.msg').removeClass('alert alert-success').addClass('alert alert-danger').html('<h5><b><i class="la la-warning"></i> Failed! </b></h5> <b>The ID Number could not be found.</b> <p style="color: #000">Please email a scanned copy of your ID Card with your contact details to <a href="mailto:contactcentre@helb.co.ke"> contactcentre@helb.co.ke.</a> You can try within 24hrs after submission of the IDCard.');
                                    } else if ((myObject[i][f]) === 'wrong-id-error') {

                                        $('.msg').show();
                                        $('.msg').removeClass('alert alert-success').addClass('alert alert-danger').html('<h5><b><i class="la la-warning"></i> Failed! </b></h5> <b>The provided ID number does not match our records for your account.</b> <p style="color: #000">Please provide the correct details to proceed.');
                                    } else if ((myObject[i][f]) === 'false-identity') {

                                        $('.msg').show();
                                        $('.msg').removeClass('alert alert-success').addClass('alert alert-danger').html('<h5><b><i class="la la-warning"></i> Failed! </b></h5> <b>The provided ID number cannot be used to update your account.</b> <p style="color: #000">Please provide the correct details to proceed.');
                                    }

                                } else {
                                    //alert(f+' - '+myObject[i][f]);
                                    $('#form-' + f).css({
                                        'border-color': '#a94442',
                                        'box-shadow': '0 3px 3px #e8c8c8'
                                    });
                                    $("label[for='form-" + f + "'] small").css('color', '#a94442').html(myObject[i][f]);
                                    $('.msg h3').show().html('Oops!');
                                    $('.msg').removeClass('alert bs-callout-info bs-callout-success bs-callout-teal').addClass('bs-callout-danger callout-border-left mt-1 p-1').html('<h5 style="color: #000"><i class="la la-warning"></i> Oops!</h5>Please Correct the errors highlighted below!');

                                    $('html, body').animate({
                                        scrollTop: $('.msg').offset().top
                                    }, 100);
                                    $(".btn").removeAttr("disabled");
                                }
                            }
                        }
                    }
                });

                e.preventDefault();
                return false;
            });


            $(document).on("click", ".btn-register", function (e) {
                e.preventDefault();
                ///alert('yo');

                $(':input').css('border-color', '');
                $(':input').css('box-shadow', '');
                $('label small').css('color', '').html('');

                $(".btn").attr("disabled", true);
                //////////////////////////////////////////////////////////////////////////////////
                var form = new FormData(document.getElementById('loanForm'));
                //alert($("#loanForm").serialize());

                ////////////////////////////////////////////////////////////////////        
                $.ajax({
                    url: "https://portal.hef.co.ke/nfm/save_form/update-idno/insert/",
                    type: 'POST',
                    data: form,
                    //data: $("#loanForm").serialize(),
                    dataType: "html",
                    mimeType: "multipart/form-data",
                    contentType: false,
                    cache: false,
                    processData: false,
                    beforeSend: function () {
                        // Replace this with your loading gif image
                        $('html, body').animate({
                            scrollTop: $(".message").offset().top - 100
                        }, 150);
                        $('.message').show();
                        $('.message').addClass('alert alert-danger').html(
                            '<img src="/static/dashboard/students/assets/assets/images/loaders/loader7.gif" style="vertical-align:text-bottom;" alt="" /><span style="font-weight: bold; padding-left: 1em;font-size: 12px;">Processing please wait..!</span>');

                        //Disable Button
                        $(".btn").attr("disabled", true);
                    },
                    error: function () {
                        $('.message').fadeOut('slow');
                        $('.message').fadeIn('slow').removeClass('info').addClass('alert alert-danger');
                        $('.message').html('<strong><h5><i class="fa fa-warning"></i> Error!</h5></strong> Unable to complete your request. Please try again!. If the problem persists, please contact the administrator');
                        $(".btn").removeAttr("disabled");
                    },
                    success: function (result) {

                        //alert(result);
                        $(".btn").removeAttr("disabled");
                        var a = JSON.parse(result);
                        var data = result;
                        var s = " [" + data + "]";
                        var myObject = eval('(' + s + ')');
                        for (i in myObject) {
                            for (f in myObject[i]) {
                                //alert(f);
                                if (f === 'info') {
                                    if ((myObject[i][f]) === 'success') {
                                        //$('#reset_msg').hide(1000);									

                                        //Toast success popup
                                        toastr.success('Account Updated successfully !', 'Success', {
                                            positionClass: 'toast-top-center',
                                            containerId: 'toast-top-right',
                                            "progressBar": true,
                                            "closeButton": true,
                                            "showMethod": "slideDown",
                                            "hideMethod": "slideUp",
                                            timeOut: 2000
                                        });

                                        var base_url = $('#base_url').val();
                                        var url = base_url + 'auth/signOut/';

                                        //alert(url);  
                                        window.location = url;

                                    } else if ((myObject[i][f]) === 'id_no') {
                                        $('.message').removeClass('info').addClass('alert alert-danger').html('<h4><b><i class="la la-warning"></i> Error! </b>').append('IDNumber Already Registered in the system');

                                    } else if ((myObject[i][f]) === 'exists') {
                                        $('.message').removeClass('info').addClass('alert alert-danger').html('<h4><b><i class="la la-warning"></i> Error! </b>').append('FUNDER Already Registered in the system !!!');
                                        $('#form-fund_code').css({
                                            'border-color': '#a94442',
                                            'box-shadow': '0 3px 3px #e8c8c8'
                                        });
                                        $("label[for='form-fund_code'] small").css('color', '#a94442').html('Fund Already Registered');

                                    } else if ((myObject[i][f]) === 'error') {
                                        $('.message').removeClass('info').addClass('alert alert-danger').html('<h4><b><i class="la la-warning"></i> Oops! </b>').append('<br />A problem occurred when creating your account. Please try again!');
                                    }

                                } else {
                                    //alert(f+' - '+myObject[i][f]);
                                    $('#form-' + f).css({
                                        'border-color': '#a94442',
                                        'box-shadow': '0 3px 3px #e8c8c8'
                                    })
                                    $("label[for='form-" + f + "'] small").css('color', '#a94442').html(myObject[i][f])
                                    $('.message h3').show().html('Oops!');
                                    $('.message').removeClass('info').addClass('alert alert-danger').html('<h4><b><i class="la la-warning"></i> Oops! </b></h4>Please Correct the errors highlighted below!');

                                    $('html, body').animate({
                                        scrollTop: $('.message').offset().top
                                    }, 100);
                                    $(".btn").removeAttr("disabled");
                                }
                            }
                        }
                    }
                });

                e.preventDefault();
                return false;
            });

        });


