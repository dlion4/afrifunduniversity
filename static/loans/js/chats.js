function showProactiveChat(a) {
    var b = a.message
        , c = a.greetingId;
    if (b && c) {
        a = '#proactiveChatBubble {z-index:9998;box-sizing: border-box;width: 100%;max-width: 375px;border-radius: 18px;border: 5px solid #f08354;cursor: pointer;position: fixed;right: 30px;bottom: 110px;background-color: #fff;animation: 0.5s linear fadeIn;}@media (max-width: 768px) {#proactiveChatBubble {max-width: 350px;}}@media (max-width: 413px) {#proactiveChatBubble {max-width: 335px;}}#proactiveChatBubble .topSection {background-color: #f08354;padding: 18px 21px 7px 19px;}@media (max-width: 768px) {#proactiveChatBubble .topSection {padding: 15px 21px 3px 19px;}}#proactiveChatBubble .topSection .headline {color: #002169;font-family: "europa", sans-serif;line-height: 104%;font-size: 42px;font-style: normal;font-weight: 400;}@media (max-width: 768px) {#proactiveChatBubble .topSection .headline {font-size: 39px;}}#proactiveChatBubble .topSection #proactiveChatBubbleExit {position: absolute;right: 10px;}#proactiveChatBubble .middleSection {padding: 24px 17px 0;min-height: 100px;}#proactiveChatBubble .middleSection .conversation .chatBubble {border-radius: 20px;padding: 20px;max-width: 65%;position: relative;margin-bottom: 20px;}#proactiveChatBubble .middleSection .conversation .chatBubble.gray {background-color: #e6e6e6;}#proactiveChatBubble .middleSection .conversation .chatBubble.gray::before {border-color: #e6e6e6 transparent;}#proactiveChatBubble .middleSection .conversation .chatBubble.green {background-color: #9c0;margin-left: auto;}';
        a += '#proactiveChatBubble .middleSection .conversation .chatBubble.green::before {border-color: #9c0 transparent;left: 82%;margin-left: -22px;}#proactiveChatBubble .middleSection .conversation .chatBubble .text {color: #002169;font-family: "europa", sans-serif;font-size: 24px;font-style: normal;font-weight: 700;line-height: 104%;}#proactiveChatBubble .middleSection .conversation .chatBubble .typing-indicator {display: flex;justify-content: center;padding: 5px 0;}#proactiveChatBubble .middleSection .conversation .chatBubble .typing-indicator span {height: 10px;width: 10px;float: left;margin: 0 2px;background-color: #002169;display: block;border-radius: 50%;}#proactiveChatBubble .middleSection .conversation .chatBubble::before {content: "";position: absolute;display: block;width: 0;z-index: 1;border-style: solid;border-color: #68d127 transparent;border-width: 11px 22px 0;bottom: -11px;left: 18%;margin-left: -22px;}#proactiveChatBubble .bottomSection {background: #e6e6e6;padding: 16px 0 12px 17px;border-bottom-left-radius: 13px;border-bottom-right-radius: 13px;display: flex;}#proactiveChatBubble .bottomSection .inputField {background: #fff;flex: 1;padding: 4px 13px;margin-top: 4px;height: 40px;box-sizing: border-box;}#proactiveChatBubble .bottomSection .inputField .cursor {display: block;text-align: right;color: #000;font-family: "europa", sans-serif;line-height: 104%;font-size: 28px;font-style: normal;font-weight: 700;}#proactiveChatBubble .bottomSection .submitButton {flex: 0 0 47px;padding: 0 7px;}@keyframes fadeIn {0% {transform: translateY(10px);opacity: 0;}100% {transform: translateY(0);opacity: 1;}}@keyframes blink {50% {opacity: 1;}}@keyframes appear {0% {opacity: 0;width: 0;height: 0;overflow: hidden;}99% {opacity: 0;width: 0;height: 0;overflow: hidden;}100% {opacity: 1;width: auto;height: auto;}}';
        var e = '\x3cdiv id\x3d"proactiveChatBubble"\x3e \x3cdiv class\x3d"topSection"\x3e \x3cspan class\x3d"headline"\x3eChat With Us\x3c/span\x3e \x3csvg id\x3d"proactiveChatBubbleExit" xmlns\x3d"http://www.w3.org/2000/svg" width\x3d"44" height\x3d"43" viewBox\x3d"0 0 44 43" fill\x3d"none"\x3e \x3cpath d\x3d"M11.3933 10.6067L32.6065 31.8199" stroke\x3d"#002169" stroke-width\x3d"3" stroke-linecap\x3d"round"/\x3e \x3cpath d\x3d"M32.6065 10.6067L11.3933 31.8199" stroke\x3d"#002169" stroke-width\x3d"3" stroke-linecap\x3d"round"/\x3e \x3c/svg\x3e \x3c/div\x3e\x3cdiv class\x3d"middleSection"\x3e \x3cdiv class\x3d"conversation"\x3e \x3cdiv class\x3d"chatBubble gray"\x3e \x3cspan class\x3d"text"\x3e{Proactive Chat Message}\x3c/span\x3e \x3c/div\x3e\x3cdiv class\x3d"chatBubble green"\x3e \x3cdiv class\x3d"typing-indicator"\x3e \x3cspan\x3e\x3c/span\x3e \x3cspan\x3e\x3c/span\x3e \x3cspan\x3e\x3c/span\x3e \x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"bottomSection"\x3e \x3cdiv class\x3d"inputField"\x3e \x3cspan class\x3d"cursor"\x3e|\x3c/span\x3e \x3c/div\x3e\x3cdiv class\x3d"submitButton"\x3e \x3csvg xmlns\x3d"http://www.w3.org/2000/svg" width\x3d"47" height\x3d"47" viewBox\x3d"0 0 47 47" fill\x3d"none"\x3e \x3ccircle cx\x3d"23.5" cy\x3d"23.5" r\x3d"23.5" fill\x3d"#002169"/\x3e \x3cpath d\x3d"M24.0607 10.9393C23.4749 10.3536 22.5251 10.3536 21.9393 10.9393L12.3934 20.4853C11.8076 21.0711 11.8076 22.0208 12.3934 22.6066C12.9792 23.1924 13.9289 23.1924 14.5147 22.6066L23 14.1213L31.4853 22.6066C32.0711 23.1924 33.0208 23.1924 33.6066 22.6066C34.1924 22.0208 34.1924 21.0711 33.6066 20.4853L24.0607 10.9393ZM24.5 35L24.5 12L21.5 12L21.5 35L24.5 35Z" fill\x3d"white"/\x3e \x3c/svg\x3e \x3c/div\x3e\x3c/div\x3e\x3c/div\x3e';
        if ($(window).width() < 768 && location.pathname !== "/contact/" || location.pathname === "/application/loan-config")
            a = '#proactiveChatBubble {cursor: pointer;max-width: 155px;width: calc(100% - 85px);height: auto;display: block;position: fixed;text-align: center;right: 3px;bottom: 98px;border-radius: 20px;z-index: 9999;animation: .5s linear fadein;}#proactiveChatTopElement {position: relative;display: block;padding: 0;height: 30px;margin: 0;background: url(https://cdn.collegeavestudentloans.com/wp-content/uploads/2022/11/10174437/proactive-chat-top.png) no-repeat top left transparent;z-index: 5;}#proactiveChatBubbleExit {display: inline-block;width: 12px;height: 13px;background: url(https://cdn.collegeavestudentloans.com/wp-content/uploads/2022/11/10145639/new-proactivechatexit-01.svg) no-repeat top left transparent;position: absolute;top: 13px;right: 13px;text-indent: -9999px;overflow: hidden;z-index: 7;cursor: pointer;}#proactiveChatMiddle {display: block;padding: 4px 14px 0;margin: 0;background: url(https://cdn.collegeavestudentloans.com/wp-content/uploads/2022/11/10174436/proactive-chat-mid.png) repeat-y top left transparent;z-index: 1;}#proactiveChatBubble p {text-align: left;padding: 0;margin: 0;color: #002769;font-family: "europa",sans-serif;font-weight: 300;font-size: 18px;line-height: 104%;}#proactiveChatBottom {height: 36px;display: block;padding: 0;margin: 0;background: url(https://cdn.collegeavestudentloans.com/wp-content/uploads/2022/11/10174434/proactive-chat-bottom.png) no-repeat top left transparent;z-index: 1;}.proactiveChatBottomSpan {display: inline-block;overflow: hidden;text-indent: -9999px;width: 1px;height: 1px;}@keyframes fadein {from{opacity:0 }to{opacity:1 }}',
                e = '\x3cdiv id\x3d"proactiveChatBubble"\x3e\x3cdiv id\x3d"proactiveChatTopElement"\x3e\x3cspan id\x3d"proactiveChatBubbleExit"\x3eexit\x3c/span\x3e\x3c/div\x3e\x3cdiv id\x3d"proactiveChatMiddle"\x3e\x3cp\x3e{Proactive Chat Message}\x3c/p\x3e\x3c/div\x3e\x3cdiv id\x3d"proactiveChatBottom"\x3e\x3cspan class\x3d"proactiveChatBottomSpan"\x3eart asset\x3c/span\x3e\x3c/div\x3e\x3c/div\x3e';
        e = e.replace("{Proactive Chat Message}", b);
        document.head.insertAdjacentHTML("beforebegin", '\x3cstyle id\x3d"proactive-chat-styles"\x3e' + a + "\x3c/style\x3e");
        document.getElementById("web-messenger-container").insertAdjacentHTML("beforebegin", e);
        document.getElementById("proactiveChatBubble").addEventListener("click", function (g) {
            g.target.closest("#proactiveChatBubbleExit") ? (_analytics.trackEvent("Zendesk Web Messenger", "Proactive Chat Closed", c),
                window.proactiveChatMetadata = {}) : (_analytics.trackEvent("Zendesk Web Messenger", "Proactive Chat Clicked", c),
                    Smooch.open());
            removeProactiveChatElements()
        });
        _analytics.trackEvent("Zendesk Web Widget", "Proactive Chat Shown", c, {
            nonInteraction: 1
        })
    }
}
function removeProactiveChatElements() {
    document.getElementById("proactive-chat-styles") && document.getElementById("proactive-chat-styles").remove();
    document.getElementById("proactiveChatBubble") && document.getElementById("proactiveChatBubble").remove()
}
function initializeProactiveChat() {
    try {
        var a = window.proactiveChatRules
            , b = void 0;
        window.setInterval(function () {
            var c = location.pathname + location.search;
            if (c != b) {
                b = c;
                window.clearTimeout(window.proactiveChatTimeoutId);
                removeProactiveChatElements();
                var e = void 0, g;
                for (g in a) {
                    var q = new RegExp(g);
                    q.test(c) && (e = a[g])
                }
                e && (window.proactiveChatTimeoutId = window.setTimeout(function () {
                    Smooch.getConversations().length > 0 || (showProactiveChat(e),
                        window.proactiveChatMetadata = e)
                }, e.timer * 1E3))
            }
        }, 100)
    } catch (c) { }
}
function reInitializeChat() {
    Smooch.destroy();
    window.firstMessageTracked = void 0;
    window.firstUserMessageTracked = void 0;
    var a = document.querySelector("#proactiveChatBubble");
    a && a.remove();
    window.proactiveChatMetadata = {};
    initializeChat()
}
function fetchChatConfiguration() {
    fetch("https://staging.collegeavestudentloans.com/wp-content/themes/College-Ave-2018/data/chat-info.json?validtester\x3dtrue\x26v\x3d" + (new Date).getTime()).then(function (a) {
        return a.json()
    }).then(function (a) {
        try {
            var b = JSON.parse(a.chatStatus);
            if (b[google_tag_manager["rm"]["8297021"](40)] == null | undefined | void 0 || b[google_tag_manager["rm"]["8297021"](41)] == 1)
                window.proactiveChatRules = JSON.parse(a.proactiveChatRules),
                    initializeChat()
        } catch (c) { }
    })
}
function callLoggingApi(a) {
    a = {
        application: "chat_ava",
        error_type: "monitoring",
        error_info: a
    };
    var b = + "/v1/debug/report";
    fetch(b, {
        method: "POST",
        body: JSON.stringify(a)
    })
}
function handleFirstAmeliaMessage(a) {
    var b = a.messages[0].received
        , c = a.messages[1].received;
    b = (c - b).toFixed(2);
    b = {
        monitoring_type: "chat_startup_time",
        data: {
            startup_time: b
        }
    };
    callLoggingApi(b);
    window.firstMessageTracked = !0;
    Smooch.updateConversation(a.id, {
        metadata: {
            firstAmeliaMessageId: a.messages[1].id
        }
    });
    _analytics.trackEvent("Zendesk Web Widget", "First Message Received", void 0, {
        nonInteraction: 1,
        dimensions: {
            sunshine_conversation_chat_id: a.id
        }
    })
}
function handleFirstUserMessage(a) {
    var b = a.messages.findIndex(function (e) {
        return e.role === "user" && e.text !== "HIDDEN MESSAGE"
    });
    if (b !== -1 && a.messages[b + 1] && a.messages[b + 1].role !== "user") {
        var c = a.messages[b].received;
        b = a.messages[b + 1].received;
        c = (b - c).toFixed(2);
        c = {
            monitoring_type: "first_user_message_response_time",
            data: {
                response_time: c
            }
        };
        callLoggingApi(c);
        window.firstUserMessageTracked = !0;
        Smooch.updateConversation(a.id, {
            metadata: {
                firstUserMessageTracked: !0
            }
        })
    }
}
function initializeChat() {
    !function (a, b, c, e, g) {
        function q() {
            var d = "You must provide a supported major version.";
            try {
                if (!g)
                    throw Error(d);
                var f, h = "https://cdn.smooch.io/", k = "smooch";
                if ((f = "string" == typeof this.response ? JSON.parse(this.response) : this.response).url) {
                    var x = b.getElementsByTagName("script")[0]
                        , l = b.createElement("script");
                    l.async = !0;
                    var m = g.match(/([0-9]+).?([0-9]+)?.?([0-9]+)?/)
                        , r = m && m[1];
                    if (m && m[3])
                        l.src = h + k + "." + g + ".min.js";
                    else {
                        if (!(4 <= r && f["v" + r]))
                            throw Error(d);
                        l.src = f["v" + r]
                    }
                    x.parentNode.insertBefore(l, x)
                }
            } catch (y) {
                y.message === d && console.error(y)
            }
        }
        var t, u, v, w = [], n = [];
        a[c] = {
            init: function () {
                t = arguments;
                var d = {
                    then: function (f) {
                        return n.push({
                            type: "t",
                            next: f
                        }),
                            d
                    },
                    "catch": function (f) {
                        return n.push({
                            type: "c",
                            next: f
                        }),
                            d
                    }
                };
                return d
            },
            on: function () {
                w.push(arguments)
            },
            render: function () {
                u = arguments
            },
            destroy: function () {
                v = arguments
            }
        };
        a.__onWebMessengerHostReady__ = function (d) {
            if (delete a.__onWebMessengerHostReady__,
                a[c] = d,
                t)
                for (var f = d.init.apply(d, t), h = 0; h < n.length; h++) {
                    var k = n[h];
                    f = "t" === k.type ? f.then(k.next) : f["catch"](k.next)
                }
            u && d.render.apply(d, u);
            v && d.destroy.apply(d, v);
            for (h = 0; h < w.length; h++)
                d.on.apply(d, w[h])
        }
            ;
        var p = new XMLHttpRequest;
        p.addEventListener("load", q);
        p.open("GET", "https://" + e + ".webloader.smooch.io/", !0);
        p.responseType = "json";
        p.send()
    }(window, document, "Smooch", "8297021", "5");
    Smooch.on("message:received", function (a, b) {
        if (a && a.text === "This chat has ended due to inactivity." && a.source && a.source.type === "api")
            reInitializeChat();
        else if (a = Smooch.getConversations()[0])
            if (b = a.messages.length >= 2 && a.messages[1])
                (b = a.metadata && a.metadata.firstAmeliaMessageId) || window.firstMessageTracked !== void 0 || handleFirstAmeliaMessage(a),
                    (b = a.metadata && a.metadata.firstUserMessageTracked) || window.firstUserMessageTracked !== void 0 || handleFirstUserMessage(a)
    });
    Smooch.on("ready", function () {
        Smooch.getConversations().length === 0 && initializeProactiveChat();
        var a = document.querySelector(".zendesk-offline");
        a && a.classList.remove("zendesk-offline");
        (a = document.querySelector(".open-chat-button")) && a.addEventListener("click", function () {
            Smooch.open()
        });
        a = document.createElement("style");
        a.textContent = "@media (max-width:767px){#web-messenger-container{z-index:99999;margin-bottom:0px;}}";
        document.head.appendChild(a)
    });
    Smooch.init({
        integrationId: "8297021",
        browserStorage: "sessionStorage",
        delegate: {
            beforeSend: function (a, b) {
                a.metadata = {
                    url: location.href,
                    isChromeBrowser: /google/i.test(navigator.vendor),
                    referenceNumber: window.digitalData && window.digitalData.ref_num,
                    firstAmeliaMessageId: b.conversation.metadata.firstAmeliaMessageId,
                    borrower_dob: window.digitalData && window.digitalData.borrower_dob,
                    borrower_last_Four: window.digitalData && window.digitalData.borrower_last_Four,
                    borrower_firstname: window.digitalData && window.digitalData.borrower_first_name,
                    borrower_lastname: window.digitalData && window.digitalData.borrower_last_name,
                    borrower_email: window.digitalData && window.digitalData.borrower_email,
                    borrower_zip: window.digitalData && window.digitalData.borrower_zip,
                    cosigner_dob: window.digitalData && window.digitalData.cosigner_dob,
                    cosigner_last_Four: window.digitalData && window.digitalData.cosigner_last_Four,
                    cosigner_first_name: window.digitalData && window.digitalData.cosigner_first_name,
                    cosigner_last_name: window.digitalData && window.digitalData.cosigner_last_name,
                    cosigner_email: window.digitalData && window.digitalData.cosigner_email,
                    cosigner_zip: window.digitalData && window.digitalData.cosigner_zip !== null ? window.digitalData.cosigner_zip : "",
                    user_segment: window.digitalData && window.digitalData.user_segment,
                    step_name: window.digitalData && window.digitalData.step_name
                };
                return a
            },
            beforeDisplay: function (a, b) {
                return a && typeof a.metadata === "object" && a.metadata.isHidden === !0 ? null : a
            }
        }
    });
    Smooch.on("widget:opened", function () {
        _analytics.trackEvent("Zendesk Web Widget", "Web Widget Opened");
        removeProactiveChatElements();
        if (!(Smooch.getConversations().length > 0 || window.conversationIsBeingCreated)) {
            window.conversationIsBeingCreated = !0;
            var a = window.proactiveChatMetadata || {};
            a.isHidden = !0;
            a.url = location.href;
            a.isChromeBrowser = /google/i.test(navigator.vendor);
            a.referenceNumber = window.digitalData && window.digitalData.ref_num;
            a.borrower_dob = window.digitalData && window.digitalData.borrower_dob;
            a.borrower_last_Four = window.digitalData && window.digitalData.borrower_last_Four;
            a.borrower_firstname = window.digitalData && window.digitalData.borrower_first_name;
            a.borrower_lastname = window.digitalData && window.digitalData.borrower_last_name;
            a.borrower_email = window.digitalData && window.digitalData.borrower_email;
            a.borrower_zip = window.digitalData && window.digitalData.borrower_zip !== null ? window.digitalData.borrower_zip : "";
            a.cosigner_dob = window.digitalData && window.digitalData.cosigner_dob;
            a.cosigner_last_Four = window.digitalData && window.digitalData.cosigner_last_Four;
            a.cosigner_first_name = window.digitalData && window.digitalData.cosigner_first_name;
            a.cosigner_last_name = window.digitalData && window.digitalData.cosigner_last_name;
            a.cosigner_email = window.digitalData && window.digitalData.cosigner_email;
            a.cosigner_zip = window.digitalData && window.digitalData.cosigner_zip !== null ? window.digitalData.cosigner_zip : "";
            a.user_segment = window.digitalData && window.digitalData.user_segment;
            a.step_name = window.digitalData && window.digitalData.step_name;
            Smooch.createConversation({
                messages: [{
                    text: "HIDDEN MESSAGE",
                    type: "text",
                    metadata: a
                }]
            }).then(function (b) {
                window.conversationIsBeingCreated = !1;
                _analytics.trackEvent("Zendesk Web Widget", "Conversation Started", void 0, {
                    nonInteraction: 1
                })
            })
        }
    });
    Smooch.on("widget:closed", function () {
        _analytics.trackEvent("Zendesk Web Widget", "Web Widget Minimised")
    })
}
fetchChatConfiguration();