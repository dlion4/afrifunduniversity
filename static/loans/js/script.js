var _analytics = _analytics || {};
(function () {
    function l(a, b, c) {
        if (a && a.attributes) {
            for (var e = a.attributes, g = 0; g < e.length; g++)
                if (e[g].nodeName == b) {
                    e[g].nodeValue = c;
                    return
                }
            b = document.createAttribute(b);
            b.value = c;
            a.setAttributeNode(b)
        }
    }
    function f(a) {
        if (a)
            return m || (m = n()),
                (a = m && m.match(new RegExp(a + "\x3d([^|]*)"))) && a[1].replaceAll("+", " ")
    }
    function n() {
        var a = _analytics.getURLParameter("_casl_utmc");
        if (a)
            return a = decodeURIComponent(a),
                _analytics.setCookie("_casl_utmc", a, {
                    days: 180
                }),
                a;
        a = _analytics.getCookie("_casl_utmc");
        var b = ""
            , c = ""
            , e = ""
            , g = ""
            , p = ""
            , q = ""
            , r = ""
            , t = ""
            , u = ""
            , v = ""
            , w = ""
            , x = ""
            , y = ""
            , z = ""
            , A = "";
        if (_analytics.getURLParameter("utm_source"))
            b = _analytics.getURLParameter("utm_source").replaceAll("+", " "),
                c = _analytics.getURLParameter("utm_medium").replaceAll("+", " "),
                e = _analytics.getURLParameter("utm_campaign").replaceAll("+", " "),
                g = _analytics.getURLParameter("utm_term").replaceAll("+", " "),
                p = _analytics.getURLParameter("utm_content").replaceAll("+", " "),
                q = _analytics.getURLParameter("school_type"),
                r = _analytics.getURLParameter("goal"),
                t = _analytics.getURLParameter("program"),
                u = _analytics.getURLParameter("product"),
                v = _analytics.getURLParameter("brand"),
                w = _analytics.getURLParameter("l_source"),
                x = _analytics.getURLParameter("p_aff"),
                y = _analytics.getURLParameter("tar_str"),
                z = _analytics.getURLParameter("agg_ref_id"),
                A = _analytics.getURLParameter("aff_doe");
        else if (_analytics.getURLParameter("gclid"))
            b = "google",
                c = "cpc";
        else if (_analytics.getURLParameter("dclid"))
            b = "dfa",
                c = "cpm";
        else {
            var d;
            if (d = document.referrer)
                d = _analytics.getTopLevelDomain(),
                    d = new RegExp(d.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$\x26"), "i"),
                    d = d.test(document.referrer),
                    d = !d;
            d && (d = ["docusign.net"],
                d = new RegExp(d.join("|"), "i"),
                d = d.test(document.referrer),
                d = !d);
            if (d) {
                d = "google yahoo bing aol ask yandex baidu naver msn duckduckgo".split(" ");
                var h = new RegExp(d.join("|"), "i");
                if (h.test(document.referrer))
                    for (h = 0; h < d.length; h++) {
                        var B = d[h]
                            , C = new RegExp(B, "i");
                        if (C.test(document.referrer)) {
                            b = B;
                            c = "organic";
                            break
                        }
                    }
                else
                    b = document.referrer.match(/\/\/([^/?&#]*)/)[1].replace(/^www\./, ""),
                        c = "referral"
            } else
                a || (b = "(direct)",
                    c = "(none)")
        }
        b && (a = ["utmcsr\x3d" + b.toLowerCase(), "utmcmd\x3d" + c.toLowerCase(), "utmccn\x3d" + e, "utmctr\x3d" + g, "utmcct\x3d" + p, "schooltype\x3d" + q, "goal\x3d" + r, "program\x3d" + t, "product\x3d" + u, "brand\x3d" + v, "listsource\x3d" + w, "paff\x3d" + x, "tarstr\x3d" + y, "aggref\x3d" + z, "affdoe\x3d" + A].join("|"),
            _analytics.setCookie("_casl_utmc", a, {
                days: 180
            }));
        return a
    }
    this.debug = function (a, b) {
        var c = !1;
        c && window.console && (b ? console.log(a, b) : console.log(a))
    };
    this.getVisitorId = function () {
        var a = _analytics.getCookie("_ga");
        if (a && (a = a.split("."),
            a.length > 3))
            return a[2] + "." + a[3]
    };
    this.setUserSegment = function (a) {
        window.digitalData = window.digitalData || {};
        window.digitalData.user_segment = a
    };
    this.getUserSegment = function () {
        return window.digitalData && digitalData.user_segment || "Borrower-Cosigner"
    };
    this.getApplicationId = function () {
        return window.digitalData && digitalData.ref_num
    };
    this.setLoanAmount = function (a) { };
    this.getLoanAmount = function () {
        return window.digitalData && digitalData.loan_amount && digitalData.loan_amount.toString().replace(/\$|,|\.00$/g, "")
    };
    this.setLoanType = function (a) { };
    this.getLoanType = function () { };
    this.getSchoolName = function () {
        return window.digitalData && digitalData.school_name
    };
    this.getSchoolCode = function () {
        return window.digitalData && digitalData.school_code
    };
    this.getSchoolState = function () {
        return window.digitalData && digitalData.school_state
    };
    this.getSchoolProfitStatus = function () {
        var a = window.digitalData && digitalData.school_code;
        if (a)
            return ""
        return ""
    };
    this.getBorrowerZipCode = function () {
        return window.digitalData && digitalData.borrower_zip
    };
    this.getStepName = function () {
        return window.digitalData && digitalData.step_name
    };
    this.getUserCountry = function () {
        return window.digitalData && digitalData.user_country
    };
    this.getProductType = function () {
        return window.digitalData && digitalData.product_type
    };
    this.getUserEmail = function () {
        return window.digitalData && digitalData.email
    };
    this.getUserPhoneNumber = function () {
        return window.digitalData && digitalData.phone_number
    };
    this.isCosignerFirst = function () {
        return window.digitalData && digitalData.cosigner_first || /(\?|&)ACT=CF/.test(location.search)
    };
    this.getChannelGrouping = function () {
        return window.digitalData && digitalData.channel_grouping
    };
    this.toTitleCase = function (a) {
        if (a)
            return a.replace(/\w*/g, function (b) {
                return b.charAt(0).toUpperCase() + b.substr(1).toLowerCase()
            })
    };
    this.appendIframe = function (a) {
        var b = document.createElement("IFRAME");
        l(b, "src", a);
        l(b, "width", 1);
        l(b, "height", 1);
        l(b, "frameborder", 0);
        document.body.appendChild(b)
    };
    this.trackDecision = function (a, b, c) {
        if (!a || !b)
            return !1;
        $.ajax({
            type: "GET",
            url: "https://api.collegeavestudentloans.com/v1/application/decision?fniRefId\x3d" + a + "\x26appDecision\x3d" + b,
            async: !0,
            cache: !1,
            timeout: 5E3,
            error: function () { },
            success: function (e) {
                if (!e.date)
                    return c()
            }
        })
    };
    this.getTPTEventData = function () {
        return {
            orderId: _analytics.getApplicationId(),
            revenue: _analytics.getLoanAmount(),
            userSegment: _analytics.getUserSegment(),
            visitorID: _analytics.getVisitorId() || "",
            campaignInfo: _analytics.getCookie("_casl_utmc") || "",
            schoolCode: _analytics.getSchoolCode() || "",
            schoolState: _analytics.getSchoolState() || "",
            schoolProfitStatus: _analytics.getSchoolProfitStatus() || "",
            userEmail: _analytics.getUserEmail(),
            userPhoneNumber: _analytics.getUserPhoneNumber(),
            cosignerFirst: _analytics.isCosignerFirst()
        }
    };
    var k;
    this.getDeviceId = function () {
        if (k)
            return k;
        $.ajax({
            url: "https://api.collegeavestudentloans.com/v1/data/ip-address",
            type: "GET",
            async: !1,
            cache: !1,
            timeout: 1E3,
            error: function (jq, jshx, text) {

                console.log("error", text)
            },
            success: function (a) {
                var b = a;
                if (b) {
                    b = b.split(".");
                    for (a = 0; a < b.length; a++) {
                        var c = a;
                        var e = "" + Math.floor(Math.random() * 100 + 1);
                        e.length == 1 ? e = "0" + e : e.length == 3 && (e = "99");
                        b[c] = e + b[a]
                    }
                    b = b.join(".");
                    c = 100;
                    e = "";
                    for (a = 0; a < b.length; a++)
                        e += String.fromCharCode(c ^ b.charCodeAt(a));
                    k = e
                } else
                    k = void 0;
                console.log(b)
            }
        });
        return k
    };
    var m = n();
    this.getCampaignSource = function () {
        return f("utmcsr")
    };
    this.getCampaignMedium = function () {
        return f("utmcmd")
    };
    this.getCampaignName = function () {
        return f("utmccn")
    };
    this.getCampaignKeyword = function () {
        return f("utmctr")
    };
    this.getCampaignContent = function () {
        return f("utmcct")
    };
    this.getCampaignSchoolType = function () {
        return f("schooltype")
    };
    this.getCampaignGoal = function () {
        return f("goal")
    };
    this.getCampaignProgram = function () {
        return f("program")
    };
    this.getCampaignProduct = function () {
        return f("product")
    };
    this.getCampaignBrand = function () {
        return f("brand")
    };
    this.getCampaignListSource = function () {
        return f("listsource")
    };
    this.getCampaignPartnerAffiliation = function () {
        return f("paff")
    };
    this.getCampaignTargetingStrategy = function () {
        return f("tarstr")
    };
    this.getPartnerReferralId = function () {
        return f("aggref")
    };
    this.getPartnerReferralSchoolDOECode = function () {
        return f("affdoe")
    };
    this.getDefaultChannelGrouping = function () {
        var a = _analytics.getCampaignSource().toLowerCase()
            , b = _analytics.getCampaignMedium().toLowerCase()
            , c = _analytics.getCampaignName().toLowerCase();
        return "simple tuition;lending tree;lendingtree;magnify money;consumer advocate;studentloanhero;studentloanhero2".split(";").includes(a) && b === "aggregator" ? "LendingTree" : a === "edvisors" && b === "aggregator" ? "Edvisors" : a === "credible" && b === "aggregator" ? "Credible" : a === "nerdwallet" && b === "aggregator" ? "Nerdwallet" : a === "college finance" && b === "aggregator" ? "College Finance" : ["consumers advocate", "money", "digg"].includes(a) && b === "aggregator" ? "Consumers Advocate" : ["tuitionchart", "beststudentloan"].includes(a) && b === "aggregator" ? "TuitionChart" : a === "usnews" && b === "aggregator" ? "US News" : a === "consumer voice" && b === "aggregator" ? "Consumer Voice" : a === "fund.com" && b === "aggregator" ? "Fund" : a === "lendedu" && b === "aggregator" ? "LendEdu" : ["natural intelligence", "cappsool"].includes(a) && b === "aggregator" ? "Natural Intelligence" : ["spotower", "trezix"].includes(a) && b === "aggregator" ? "Spotower" : b === "aggregator" ? "Aggregator Other" : ["google", "bing"].includes(a) && b === "cpc" && c.includes("brand") ? "Brand Search" : ["google", "bing"].includes(a) && b === "cpc" && !c.includes("brand") ? "Non-Brand Search" : a === "(direct)" ? "Direct to Site" : b === "organic" ? "Organic" : b === "school" && a === "harvard" ? "Harvard Law - Direct" : b === "school" && a === "imba" && c === "acq_imba_school" ? "International MBA" : b === "referral" && ["elmselect.com", "launch2.fullsail.com"].includes(a) ? "School" : ["school", "schools"].includes(b) ? "School" : a.includes(".edu") && b === "referral" ? "School" : b === "referral" ? "Referral" : a === "uas" ? "Servicing Web" : b === "dm" && a.includes("_pq") ? "DM - Pre-Screen" : b === "dm" ? "DM - ITA" : c.includes("acq_") && b === "email" ? "Email - Marketing" : c.includes("br_") && b === "email" ? "Email - Marketing" : ["fni", "salesforce", "internal-n", "casl"].includes(a) && b === "email" ? "Email - Transactional" : b === "email" ? "Email - Marketing" : "display display-banner display-retargeting-banner banner-retargeting banner-rt display-retargeting".split(" ").includes(b) ? "Display" : b === "social-paid" ? "Paid Social" : b === "partner" ? "Partner" : a === "casl" && b === "mobile app" ? "Mobile App" : a === "ambition" || c.includes("amb_acq_") || c.includes("amb_br_") ? "Card Leads" : "(Other)"
    };
    this.trackVWOExperiments = function () {
        window.VWO = window.VWO || [];
        window.dataLayer = window.dataLayer || [];
        VWO.push(["onVariationApplied", function (a) {
            if (a) {
                var b = a[1];
                a = a[2];
                typeof _vwo_exp[b].comb_n[a] !== "undefined" && _vwo_exp[b].GTM && (b = _vwo_exp[b].name + " (" + b + ") - " + _vwo_exp[b].comb_n[a] + " (" + a + ")",
                    _analytics.trackEvent("VWO", "Experiment Variant - applied", b, {
                        nonInteraction: !0
                    }))
            }
        }
        ])
    }
}
).apply(_analytics);





(function (f) {
    function m(a, b) {
        if (a.objectId) {
            var d = {};
            switch (a.objectId) {
                case "cosigner-application-school-and-loan-information-section-school-state":
                case "borrower-application-school-and-loan-information-section-school-state":
                    (b = _analytics.getSchoolState()) && _analytics.setDimension("school_state", b);
                    break;
                case "cosigner-application-school-and-loan-information-section-school-search":
                case "borrower-application-school-and-loan-information-section-school-search":
                    b = _analytics.getSchoolCode();
                    var c = _analytics.toTitleCase(_analytics.getSchoolName());
                    c && -1 != c.indexOf(" - ") && (c = c.substring(0, c.lastIndexOf(" - ")));
                    _analytics.setDimension("school_doe_code", b);
                    _analytics.setDimension("school_name", c);
                    break;
                case "borrower-application-submit-cosigner-ready-to-apply-yes":
                case "soft-decline-cosigner-here":
                    d.cosigner_present = "Yes";
                    break;
                case "borrower-application-submit-cosigner-ready-to-apply-no":
                case "soft-decline-cosigner-not-here":
                    d.cosigner_present = "No";
                    break;
                case "borrower-application-basic-information-section-first-name":
                    a.dimensions.cosigner_first || (_analytics.trackEvent(k, "Application - start", _analytics.getUserSegment()),
                        _analytics.dataChannel.publishEvent("App Start", _analytics.getTPTEventData()));
                    break;
                case "cosigner-application-basic-information-section-first-name":
                    a.dimensions.cosigner_first && _analytics.trackEvent(k, "Application - start", _analytics.getUserSegment());
                    _analytics.dataChannel.publishEvent("App Start", _analytics.getTPTEventData());
                    break;
                case "borrower-application-basic-information-section-email-address":
                    a.dimensions.cosigner_first && _analytics.dataChannel.publishEvent("App Start", _analytics.getTPTEventData());
                    break;
                case "borrower-application-school-and-loan-information-section-year-in-school":
                    a && a.dimensions && a.dimensions.year_in_school && _analytics.setDimension("borrower_enrollment_term", a.dimensions.year_in_school);
                    break;
                case "borrower-application-contact-information-section-zip-code":
                    b = _analytics.getBorrowerZipCode();
                    /^\d{5}$/.test(b) && _analytics.setDimension("borrower_zip_code", b);
                    break;
                case "cosigner-application-personal-information-section-citizenship":
                case "borrower-application-personal-information-section-citizenship":
                    a && a.dimensions && a.dimensions.citizenship && _analytics.setDimension("citizenship", a.dimensions.citizenship)
            }
            /yes|true|on/i.test(d.form_field_id = a.objectId,
                b = "Form Field - interaction",
                "Currency Field Incrementer" === a.object && (b = a.object + " - " + a.action),
                _analytics.trackEvent(a.dimensions.page_template + " Forms \x3e " + q, b, a.objectId, {
                    dimensions: d
                }))
        } else {
            /Bureau Fail/i.test(a.object) && /Cosigner/i.test(a.dimensions.user_segment) ? a.dimensions.user_segment = digitalData.user_segment = "Borrower-Cosigner" : /Soft Decline/i.test(a.object) && /continue/i.test(a.action) && !a.optTarget && (a.action = a.dimensions && a.dimensions.student_major ? "submit major" : "continue with cosigner");
            d = _analytics.getUserSegment() + " \x3e " + a.object + " - " + a.action.toLowerCase();
            a.optTarget && /^(continue|back)$/i.test(a.action) && (d += " to " + ("CASL.com" == a.optTarget ? a.optTarget : a.optTarget.toLowerCase()));
            if ("Borrower \x3e Submit Application - continue" == d)
                b = u(a),
                    c = v(a),
                    "No" == b && "No" == c ? (r(),
                        _analytics.dataChannel.publishEvent("App Complete - Hard Pull", _analytics.getTPTEventData())) : a.dimensions.cosigner_first ? r() : x(c),
                    b = _analytics.createLabel(["apply_with_cosigner", b], ["cosigner_present", c]);
            else if ("Cosigner \x3e Submit Application - continue" == d)
                if (a.dimensions.cosigner_first) {
                    (b = a.dimensions.student_present) && _analytics.setDimension("borrower_present", b);
                    c = b;
                    p();
                    _analytics.trackEvent(k, "Application - borrower pending", "borrower_present\x3d" + c);
                    var l = _analytics.getTPTEventData();
                    l.borrowerPresent = c;
                    _analytics.dataChannel.publishEvent("Borrower Pending", l);
                    b = _analytics.createLabel(["borrower_present", b])
                } else
                    r();
            else
                "Borrower \x3e Soft Decline - continue with cosigner" == d && (b = u(a),
                    c = v(a),
                    b = _analytics.createLabel(["apply_with_cosigner", b], ["cosigner_present", c]),
                    l = _analytics.getTPTEventData(),
                    l.cosignerPresent = c,
                    _analytics.dataChannel.publishEvent("Soft Decline - Cosigner Pending", l));
            "apply_with_cosigner\x3dYes|cosigner_present\x3dNo" == b && f(document).trigger("cosInvited");
            /Borrower-Cosigner > Esign Return - (borrower|cosigner) complete/.test(d) && (c = d.match(/Borrower-Cosigner > Esign Return - (borrower|cosigner) complete/)[1],
                f(document).trigger("esignCompleteView", [{
                    userSegment: c
                }]));
            /Welcome - view/.test(d) && (d = "Borrower-Cosigner \x3e Welcome - view");
            /Loan Configuration - continue/.test(d) && "All Options" == b && (a.dimensions.repayment_type && (c = {
                FD: "Deferred",
                PI: "Full Principal \x26 Interest",
                FP: "Flat",
                IO: "Interest Only"
            }[a.dimensions.repayment_type] || a.dimensions.repayment_type,
                b += "|" + c),
                a.dimensions.loan_term && (b += "|" + a.dimensions.loan_term + " Yrs"),
                "V" == a.dimensions.interest_rate_type ? b += "|Variable" : "F" == a.dimensions.interest_rate_type && (b += "|Fixed"));
            /Personal Info - prefilled/.test(d) && (_analytics.trackEvent(k, "Application - start", _analytics.getUserSegment()),
                _analytics.dataChannel.publishEvent("App Start", _analytics.getTPTEventData()));
            /Find Application - continue/.test(d) && _analytics.dataChannel.publishEvent("Find Application", _analytics.getTPTEventData());
            /Loan Amount Modal - continue/.test(d) && (d = d.replace("- continue", "- click change amount"));
            if (c = a.dimensions)
                c.total_num_loans && _analytics.setDimension("total_student_loans", c.total_num_loans),
                    c.total_loan_balance && _analytics.setDimension("total_student_loan_balance", c.total_loan_balance),
                    c.interest_rate_type && (l = {
                        V: "Variable Rate",
                        F: "Fixed Rate"
                    }[c.interest_rate_type] || c.interest_rate_type,
                        _analytics.setDimension("interest_rate_type", l)),
                    c.repayment_type && (l = {
                        FD: "Deferred",
                        PI: "Full Principal \x26 Interest",
                        FP: "Flat",
                        IO: "Interest Only"
                    }[c.repayment_type] || c.repayment_type,
                        _analytics.setDimension("application_repayment_option", l)),
                    c.loan_term && _analytics.setDimension("application_loan_term", c.loan_term),
                    c.student_major && _analytics.setDimension("soft_declined_student_major", c.student_major),
                    c.bankName && _analytics.setDimension("application_bank_name", c.bankName);
            c = {};
            a.dimensions && a.dimensions.load_time && (c.time_pdf_download = a.dimensions.load_time);
            a.dimensions && a.dimensions.esign_load_time && (c.time_esign_compiling = a.dimensions.esign_load_time);
            _analytics.trackEvent(k, d, b, {
                dimensions: c
            })
        }
    }
    function u(a) {
        var b = a.dimensions.apply_with_cosigner;
        a.dimensions.cosigner_first && (b = "Yes");
        b && _analytics.setDimension("apply_with_cosigner", b);
        return b
    }
    function v(a) {
        var b = a.dimensions.cosigner_present;
        a.dimensions.cosigner_first && (b = "N/A");
        b && _analytics.setDimension("cosigner_present", b);
        return b
    }
    function p() {
        var a = _analytics.getApplicationId();
        a && _analytics.setDimension("fni_reference_number", a);
        return a
    }
    function r() {
        var a = p()
            , b = /borrower/i.test(_analytics.getUserSegment()) ? "borrower" : "cosigner";
        _analytics.trackDecision(a, b + "_app_complete", function () {
            _analytics.trackEvent(k, "Application - complete", _analytics.createLabel(["reference_number", a || "(not set)"], ["user_segment", _analytics.getUserSegment()]));
            _analytics.dataChannel.publishEvent("App Complete", _analytics.getTPTEventData())
        })
    }
    function x(a) {
        var b = p();
        _analytics.trackDecision(b, "borrower_cosigner_pending", function () {
            _analytics.trackEvent(k, "Application - cosigner pending", "apply_with_cosigner\x3dYes|cosigner_present\x3d" + a);
            var d = _analytics.getTPTEventData();
            d.cosignerPresent = a;
            _analytics.dataChannel.publishEvent("Cosigner Pending", d)
        })
    }
    function w(a) {
        var b = p()
            , d = a && a.dimensions && "APPROVE" == a.dimensions.app_decision;
        d && _analytics.trackDecision(b, "conditional_approval", function () {
            _analytics.trackEvent(k, "Application - conditional approval", a.dimensions.user_segment);
            _analytics.dataChannel.publishEvent("App Complete - Conditional Approval", _analytics.getTPTEventData())
        })
    }
    function e(a, b) {
        var d = a.replace(/\s+/g, "")
            , c = _analytics.getUserSegment();
        /Welcome/.test(a) && (c = "Borrower-Cosigner");
        var l = _analytics
            , y = l.setContentGroup;
        var h = c;
        var g = d;
        h = /^LoanStatus/i.test(g) ? h + " \x3e Loan Status" : /Welcome$/i.test(g) ? h + " \x3e Welcome" : /VisitObjective/i.test(g) ? h + " \x3e Visit Objective" : /InviteBorrower$/i.test(g) ? h + " \x3e Invite Borrower" : /InviteBorrowerConfirmation/i.test(g) ? h + " \x3e Invite Borrower Confirmation" : /FindApplication/i.test(g) ? h + " \x3e Find Application" : /GetStarted/i.test(g) ? h + " \x3e Get Started" : /PersonalInfo/i.test(g) || /ContactInfo/i.test(g) || /SchoolInfo/i.test(g) || /SecurityInfo/i.test(g) || /RequestedLoanInfo/i.test(g) ? h + " \x3e Personal Info" : /ApplicationSolicitationDisclosure/i.test(g) ? h + " \x3e Application Solicitation Disclosure" : /LoanConfiguration/i.test(g) ? h + " \x3e Loan Configuration" : /LoanConfigurationConfirmation/i.test(g) ? h + " \x3e Loan Configuration Confirmation" : /LoanReconfiguration/i.test(g) ? h + " \x3e Loan Reconfiguration" : /LoanReconfigurationConfirmation/i.test(g) ? h + " \x3e Loan Reconfiguration Confirmation" : /ApprovalDisclosure/i.test(g) ? h + " \x3e Approval Disclosure" : /LoanReconfigurationApprovalDisclosure/i.test(g) ? h + " \x3e Loan Reconfiguration Approval Disclosure" : /SubmitApplication/i.test(g) ? h + " \x3e Submit Application" : /SoftDecline/i.test(g) ? h + " \x3e Application Decision" : /HardDecline/i.test(g) ? h + " \x3e Application Decision" : /EsignPending/i.test(g) ? h + " \x3e Esign Pending" : /EsignReturn/i.test(g) ? h + " \x3e Esign Return" : /IdentityDocsNeeded/i.test(g) ? h + " \x3e Identity Docs Needed" : /UploadIdentityDocs/i.test(g) ? h + " \x3e Upload Identity Docs" : /ApplicationPending/i.test(g) ? h + " \x3e Application Pending" : /ApplicationCertificationPending/i.test(g) ? h + " \x3e Application Certification Pending" : /FinalDisclosure/i.test(g) ? h + " \x3e Final Disclosure" : /BureauFail/i.test(g) ? h + " \x3e Error" : /InternationalLockout/i.test(g) ? h + " \x3e International Lockout" : /Maintenance/i.test(g) ? h + " \x3e Error" : /Error/i.test(g) ? h + " \x3e Error" : /404/i.test(g) ? h + " \x3e Error" : /SessionTimeout/i.test(g) ? h + " \x3e Session Timeout" : /LoanInfo/i.test(g) ? h + " \x3e Loan Info" : /Account Information/i.test(g) ? h + "\x3e Account Information" : "(Other)";
        y.call(l, 3, h);
        (l = _analytics.getUserCountry()) && _analytics.setDimension("user_country", l);
        switch (q) {
            case "In School":
                var t = "IS";
                break;
            case "Refi":
                t = "RF";
                break;
            case "Parent":
                t = "PA"
        }
        d = "/virtual-page/" + t + "/" + c + "/" + d;
        _analytics.trackPageView(d);
        window.zE && (zE("webWidget", "updatePath", {
            url: location.href,
            title: document.title
        }),
            "chat" === zE("webWidget:get", "display") && window.proactiveChatShowing && (zE("webWidget", "close"),
                zE("webWidget", "reset")));
        a += " - view";
        d = {};
        digitalData.loan_pricing_array && ("CAISHL" == digitalData.source_code && /Loan Configuration Confirmation - view/.test(a) || /Loan Configuration - view/.test(a)) && (d.application_loan_pricing_array = digitalData.loan_pricing_array);
        _analytics.trackEvent(k, c + " \x3e " + a, b, {
            dimensions: d,
            nonInteraction: !0
        })
    }
    function z(a) {
        var b = a.dimensions.step_name
            , d = _analytics.getUserSegment();
        switch (b) {
            case "Welcome":
                e(b);
                break;
            case "Visit Objective":
                e(b);
                break;
            case "Invite Borrower":
                e(b);
                break;
            case "Invite Borrower Confirmation":
                e(b);
                break;
            case "Find Application":
                e(b);
                break;
            case "Get Started":
                e(b);
                break;
            case "Contact Info":
                e("Personal Info");
                e("Contact Info");
                _analytics.dataChannel.publishEvent("App Visit", _analytics.getTPTEventData());
                break;
            case "School Info":
                e(b);
                break;
            case "Security Info":
                e(b);
                break;
            case "Requested Loan Info":
                e(b);
                break;
            case "Personal Info":
                e(b);
                /borrower/i.test(d) && f(document).trigger("borPersonalInfoView");
                /cosigner/i.test(d) && f(document).trigger("cosPersonalInfoView");
                _analytics.dataChannel.publishEvent("App Visit", _analytics.getTPTEventData());
                break;
            case "Application Solicitation Disclosure":
                e(b);
                f(document).trigger("ASDView", [{
                    userSegment: d
                }]);
                _analytics.dataChannel.publishEvent("Info Submitted", _analytics.getTPTEventData());
                "Refi" == q && _analytics.getCookie("ambassador_shortcode") && (_analytics.setDimension("ambassador_shortcode", _analytics.getCookie("ambassador_shortcode")),
                    _analytics.trackEvent(k, "Ambassador Referral - trigger", _analytics.getCookie("ambassador_shortcode")));
                break;
            case "Submit Application":
                e(b);
                break;
            case "Stride Referral":
                e(b);
                f(document).trigger("trackYoutubeVideo");
                break;
            case "Soft Decline":
                e(b);
                f(document).trigger("softDeclineView");
                _analytics.trackDecision(p(), "borrower_soft_decline", function () {
                    _analytics.trackEvent(k, "Application - soft decline");
                    _analytics.dataChannel.publishEvent("Soft Decline View", _analytics.getTPTEventData())
                });
                break;
            case "Hard Decline":
                e(b);
                f(document).trigger("hardDeclineView", [{
                    userSegment: d
                }]);
                _analytics.trackDecision(p(), "hard_decline", function () {
                    _analytics.trackEvent(k, "Application - hard decline", d);
                    _analytics.dataChannel.publishEvent("Hard Decline View", _analytics.getTPTEventData())
                });
                break;
            case "Loan Configuration":
                if (a.dimensions.default_repayment_type) {
                    var c = {
                        FD: "Deferred",
                        PI: "Full Principal \x26 Interest",
                        FP: "Flat",
                        IO: "Interest Only"
                    }[a.dimensions.default_repayment_type] || a.dimensions.default_repayment_type;
                    _analytics.setDimension("application_default_repayment_option", c)
                }
                a.dimensions.default_loan_term && _analytics.setDimension("application_default_loan_term", a.dimensions.default_loan_term);
                a.dimensions.default_configuration_id && _analytics.setDimension("application_default_loan_config_id", a.dimensions.default_configuration_id);
                e(b);
                w(a);
                f(document).trigger("loanConfigView", [{
                    userSegment: d
                }]);
                _analytics.dataChannel.publishEvent("Loan Configuration View");
                break;
            case "Loan Configuration Confirmation":
                e(b);
                break;
            case "Approval Disclosure":
                e(b);
                _analytics.dataChannel.publishEvent("LAD View", _analytics.getTPTEventData());
                break;
            case "Esign Compiling":
                e(b);
                break;
            case "Esign Pending":
                e(b);
                f(document).trigger("esignatureView", [{
                    userSegment: d
                }]);
                break;
            case "Esign Return":
                e(b);
                f(document).trigger("esignCompleteView", [{
                    userSegment: d
                }]);
                _analytics.dataChannel.publishEvent("Esign Complete View", _analytics.getTPTEventData());
                break;
            case "Identity Docs Needed":
                e(b);
                break;
            case "Upload Identity Docs":
                e(b);
                break;
            case "Application Pending":
                e(b);
                break;
            case "Application Certification Pending":
                e(b);
                "In School" != q && "Parent" != q || _analytics.trackDecision(p(), "completed_loan", function () {
                    _analytics.trackEvent(k, "Application - completed loan");
                    _analytics.dataChannel.publishEvent("ACP View", _analytics.getTPTEventData())
                });
                break;
            case "Loan Reconfiguration":
                e(b);
                break;
            case "Loan Reconfiguration Confirmation":
                e(b);
                break;
            case "Loan Reconfiguration Approval Disclosure":
                e(b);
                break;
            case "Final Disclosure":
                e(b);
                "Refi" == q && _analytics.trackDecision(p(), "completed_loan", function () {
                    _analytics.trackEvent(k, "Application - completed loan");
                    _analytics.dataChannel.publishEvent("ACP View", _analytics.getTPTEventData())
                });
                break;
            case "Bureau Fail":
                e(b);
                break;
            case "International Lockout":
                e(b, _analytics.getUserCountry());
                break;
            case "Error":
                e(b);
                break;
            case "Maintenance":
                e(b);
                break;
            case "404":
                e(b);
                break;
            case "Session Timeout":
                e(b);
                break;
            case "Loan Status Welcome":
                e(b);
                break;
            case "Loan Status Lookup":
                e(b);
                break;
            case "Loan Status Thanks":
                e(b);
                break;
            case "Loan Info":
                e(b);
                f(document).trigger("loanConfigView", [{
                    userSegment: d
                }]);
                w(a);
                break;
            case "Account Information":
                e(b);
                break;
            case "Bureau Frozen":
                e(b);
                break;
            case "Bureau Exception":
                e(b);
                break;
            case "Lemonade Referral":
                e(b);
                break;
            default:
                b ? _analytics.trackEvent("Global Notifications", "Error: step name is not supported", b) : _analytics.trackEvent("Global Notifications", "Error: step name is not defined")
        }
    }
    function n(a, b, d) {
        return {
            object: d || _analytics.getStepName(),
            action: b || "continue",
            optTarget: a || "",
            dimensions: {
                product_type: _analytics.getProductType(),
                page_template: "Loan Application",
                user_segment: _analytics.getUserSegment()
            }
        }
    }
    if (f) {
        _analytics.trackVWOExperiments();
        var q, k;
        setInterval(function () {
            if (window.eventQueue && eventQueue.length) {
                do {
                    var a = data = eventQueue.shift();
                    a && a.dimensions && a.dimensions.user_segment && _analytics.setUserSegment(a.dimensions.user_segment);
                    p();
                    _analytics.setDimension("user_segment", _analytics.getUserSegment());
                    _analytics.setDimension("loanapp_url_pathname", location.pathname);
                    a && !f.isEmptyObject(a.dimensions) && (q = a.dimensions.product_type,
                        k = (a.dimensions.page_template || "Loan Application") + " \x3e " + q,
                        _analytics.setDimension("loanapp_step_name", a.dimensions.step_name),
                        _analytics.setDimension("is_cosignerfirst_flow", a.dimensions.cosigner_first),
                        _analytics.setDimension("requested_loan_amount", _analytics.getLoanAmount()));
                    var b = _analytics.getURLParameter("SC") || a && a.dimensions && a.dimensions.source_code;
                    b && _analytics.setDimension("source_code", b);
                    (b = _analytics.getChannelGrouping()) && _analytics.setDimension("fni_channel_grouping", b);
                    switch (a.type) {
                        case "event":
                            m(a, a.optLabel);
                            break;
                        case "pageview":
                            z(a);
                            break;
                        default:
                            _analytics.trackEvent("Global Notifications", "Error: hit type is not supported", a.type)
                    }
                } while (eventQueue.length)
            }
        }, 9);
        f(document).on("click", ".continue-to-personal-info", function (a) {
            a.preventDefault();
            var b = f(this).attr("href");
            m(n("personal info"));
            setTimeout(function () {
                location.href = b
            }, 250)
        });
        f(document).on("click", ".continue-to-apply-now", function (a) {
            a.preventDefault();
            var b = f(this).attr("href");
            m(n("apply now"));
            setTimeout(function () {
                location.href = b
            }, 250)
        });
        f(document).on("click", ".continue-to-find-application", function (a) {
            a.preventDefault();
            var b = f(this).attr("href");
            m(n("find application"));
            setTimeout(function () {
                location.href = b
            }, 250)
        });
        f(document).on("click", ".continue-to-visit-objective", function (a) {
            a.preventDefault();
            var b = f(this).attr("href");
            m(n("visit objective"));
            setTimeout(function () {
                location.href = b
            }, 250)
        });
        f(document).on("click", ".continue-to-invite-borrower", function (a) {
            a.preventDefault();
            var b = f(this).attr("href");
            m(n("invite borrower"));
            setTimeout(function () {
                location.href = b
            }, 250)
        });
        f(document).on("click", ".continue-to-casl", function (a) {
            a.preventDefault();
            var b = f(this).attr("href")
                , d = f(this).attr("target");
            m(n("CASL.com"), f(this).attr("href"));
            setTimeout(function () {
                "_blank" == d ? window.open(b) : location.href = b
            }, 250)
        });
        f(document).on("click", ".trouble-esigning", function (a) {
            a.preventDefault();
            var b = f(this).attr("href");
            m(n("", "click", "Trouble Esigning"));
            setTimeout(function () {
                location.href = b
            }, 250)
        });
        f(document).on("click", ".esign-borrower-not-present", function (a) {
            a.preventDefault();
            var b = f(this).attr("href");
            m(n("", "borrower not present"));
            setTimeout(function () {
                location.href = b
            }, 250)
        });
        f(document).on("click", ".esign-cosigner-not-present", function (a) {
            a.preventDefault();
            var b = f(this).attr("href");
            m(n("", "cosigner not present"));
            setTimeout(function () {
                location.href = b
            }, 250)
        });
        f(document).on("click", ".cosigner-return-esign, .cosigner-return-upload", function (a) {
            a.preventDefault();
            var b = f(this).attr("href");
            m(n("cosigner login"));
            setTimeout(function () {
                location.href = b
            }, 250)
        });
        f(document).on("click", ".borrower-return-esign, .borrower-return-upload", function (a) {
            a.preventDefault();
            var b = f(this).attr("href");
            m(n("borrower login"));
            setTimeout(function () {
                location.href = b
            }, 250)
        });
        f(document).on("click", "[id$\x3d'upload-container'] \x3e label", function () {
            var a = f(this).closest("[id$\x3d'upload-container']").attr("id");
            m(n(void 0, "click upload documents button"), a)
        });
        f(document).on("input", ".school-search-container .Select-control", function () {
            if (f(".school-search-container .Select-menu-outer .Select-noresults").length) {
                var a = f(this).find("input").val();
                clearTimeout(window.schoolSearchTimer);
                window.schoolSearchTimer = setTimeout(function () {
                    var b = _analytics.getUserSegment();
                    b += " \x3e School Search - not found";
                    _analytics.trackEvent(k, b, null, {
                        dimensions: {
                            not_found_school_entry: a
                        }
                    })
                }, 1E3)
            }
        })
    }
}
)(window.jQuery);