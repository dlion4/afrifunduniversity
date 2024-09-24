var _analytics = _analytics || {};
(function () {
    function p() {
        _analytics.getCookie("_ana_site_visit") || t("Site Visit");
        _analytics.setCookie("_ana_site_visit", Date.now(), {
            minutes: 30
        })
    }
    function u(b, a) {
        for (var c = [], d = 0; d < v.length; d++) {
            var f = !1, e = v[d], g = e.matchType, h = e.matchCriteria, k;
            for (k in h)
                if (b[k] && (f = new RegExp(h[k], "i"),
                    f = f.test(b[k]),
                    !f))
                    break;
            f && (a && "page" == g ? c.push(e.eventName) : a || "page" == g || c.push(e.eventName))
        }
        return c.length ? c.sort() : void 0
    }
    this.dataChannel = this.dataChannel || {};
    this.dataChannel.publishEvent = this.dataChannel.publishEvent || function (b, a) {
        window.console && console.log("WARNING: Data Channel function not defined: publishEvent")
    };
    var t = this.dataChannel.publishEvent;
    this.dataChannel.publishEvent = function (b, a) {
        p();
        t(b, a)
    };
    this.trackPageView = function (b, a) {
        p();
        a = a || {};
        this.pageURL = b;
        b = this.getTimestamp(1);
        b = {
            hit_timestamp: b,
            page_path: this.pageURL || location.pathname
        };
        var c = Object.assign({}, b, this.pageDimensions, a.dimensions, a.metrics);
        a = u(c, !0);
        if (window.gtag) {
            var d = {
                send_to: 1
            };
            Object.assign(d, c);
            d.page_path = this.pageURL;
            d.ga4_event = a ? a.join("|") : "page_view";
            gtag("event", "page_view", d)
        }
        if (window.gtag && (d = {
            send_to: 1
        },
            Object.assign(d, b),
            Object.assign(d, this.getGA4Vars(c)),
            (b = this.getUserProperties(c)) && gtag("set", "user_properties", b),
            gtag("event", "page_view", d),
            a))
            for (b = 0; b < a.length; b++)
                gtag("event", a[b], d)
    };
    this.trackEvent = function (b, a, c, d) {
        function f(h, k) {
            function l() {
                m || (m = !0,
                    h())
            }
            if (h && "function" === typeof h) {
                var m = !1;
                setTimeout(l, k || {});
                return l
            }
        }
        p();
        d = d || {};
        var e = this.getTimestamp({});
        e = {
            hit_timestamp: e,
            page_path: d.pageURL || this.pageURL || location.pathname,
            event_category: b,
            event_action: a,
            event_label: c || void 0,
            event_callback: f(d.callback)
        };
        b = Object.assign({}, e, this.pageDimensions, d.dimensions, d.metrics);
        c = u(b);
        if (window.gtag) {
            var g = {
                send_to: "",
                value: "undefined" != typeof d.value ? Math.round(d.value) : void 0,
                non_interaction: d.nonInteraction
            };
            Object.assign(g, b);
            g.page_path = this.pageURL;
            g.ga4_event = c ? c.join("|") : "custom_event";
            gtag("event", a, g)
        }
        if (window.gtag) {
            a = {
                send_to: "",
                event_value: "undefined" != typeof d.value ? Math.round(d.value) : void 0
            };
            Object.assign(a, e);
            Object.assign(a, this.getGA4Vars(b));
            (d = this.getUserProperties(b)) && gtag("set", "user_properties", d);
            if (c)
                for (d = Object.assign({}, a),
                    delete d.event_category,
                    delete d.event_action,
                    delete d.event_label,
                    e = 0; e < c.length; e++)
                    gtag("event", c[e], d);
            gtag("event", "custom_event", a)
        }
        window.VWO = window.VWO || [];
        VWO.event = VWO.event || function () {
            VWO.push(["event"].concat([].slice.call(arguments)))
        };
        VWO.event("gaCustomEvent", {
            eventCategory: b.event_category || "",
            eventAction: b.event_action || "",
            eventLabel: b.event_label || ""
        })
    };
    this.trackSocial = function (b, a, c, d) {
        d = d || {};
        d = d.eventCategory || "Global Links";
        this.trackEvent(d, "Social - " + a, b + " | " + c)
    };
    this.setContentGroup = function (b, a, c) {
        if ([1, 2, 3, 4, 5].includes(parseInt(b)) && window.gtag) {
            var d = {};
            d["content_group" + b] = a;
            gtag("set", d);
            c && gtag("set", "content_group", a);
            _analytics.setDimension("content_group" + b, a)
        }
    };
    this.pageDimensions = {};
    this.setDimension = function (b, a) {
        "undefined" != typeof b && (this.pageDimensions[b] = a)
    };
    var v = [],
        q = {};
    this.getGA4Vars = function (b) {
        if (0 == Object.keys(q).length)
            return b;
        var a = Object.assign({}, b), c = {}, d;
        for (d in b)
            for (var f in q)
                q[f] == d && (c[f] = b[d],
                    delete a[d]);
        return Object.assign(c, a)
    };
    var w = {};
    this.getUserProperties = function (b) {
        var a = {}, c;
        for (c in b)
            for (var d in w)
                w[d] == c && (a[d] = b[c]);
        return 0 != Object.keys(a).length ? a : void 0
    };
    this.getCookie = function (b) {
        var a = document.cookie
            , c = a.indexOf(" " + b + "\x3d");
        -1 == c && (c = a.indexOf(b + "\x3d"),
            1 < c && (c = -1));
        -1 == c ? a = null : (c = a.indexOf("\x3d", c) + 1,
            b = a.indexOf(";", c),
            -1 == b && (b = a.length),
            a = unescape(a.substring(c, b)));
        return a
    };
    this.setCookie = function (b, a, c) {
        function d(h) {
            23 < h ? (e.setDate(e.getDate() + 1),
                e.setHours(h % 23)) : e.setHours(h)
        }
        function f(h) {
            59 < h ? (d(e.getHours() + 1),
                e.setMinutes(h % 59)) : e.setMinutes(h)
        }
        c = c || {};
        var e = new Date;
        if (c.minutes)
            f(e.getMinutes() + c.minutes);
        else if (c.hours)
            d(e.getHours() + c.hours);
        else {
            var g = c.days || 30;
            e.setDate(e.getDate() + g)
        }
        document.cookie = b + "\x3d" + a + ";expires\x3d" + (c.sessionExpiry ? "" : e.toGMTString()) + ";path\x3d" + (c.path || "/") + ";domain\x3d" + (c.domain || this.getTopLevelDomain())
    };
    this.deleteCookie = function (b, a) {
        a = a || {};
        document.cookie = b + "\x3d;expires\x3dThu, 01-Jan-1970 00:00:01 GMT;path\x3d" + (a.path || "/") + ";domain\x3d" + (a.domain || this.getTopLevelDomain())
    };
    this.getTopLevelDomain = function () {
        for (var b = document.domain.split(".").reverse(), a = "__test__", c = b[0], d = 0; d < b.length; d++) {
            document.cookie = a + "\x3d__test__;path\x3d/;domain\x3d" + c;
            if (null != this.getCookie(a))
                return document.cookie = a + "\x3d;expires\x3dThu, 01-Jan-1970 00:00:01 GMT;path\x3d/;domain\x3d" + c,
                    c;
            c = b[d + 1] + "." + c
        }
    };
    this.getURLParameter = function (b, a) {
        a = a || {};
        var c = a.url || location.search;
        b = (RegExp("[?\x26]" + b + "\x3d([^\x26#]*)", "i").exec(c) || [, ""])[1];
        "BR_04072021_barnes%20spring%20sweeps%20email%2" === b && (b = "BR_04072021_barnes%20spring%20sweeps%20email");
        b = decodeURI(b);
        return !b && a.defaultValue ? a.defaultValue : b
    };
    this.ready = function (b) {
        /in/.test(document.readyState) ? setTimeout("_analytics.ready(" + b + ")", 9) : b()
    };
    this.jQueryReady = function (b) {
        window.jQuery ? b() : setTimeout("_analytics.jQueryReady(" + b + ")", 9)
    };
    this.createLabel = function () {
        for (var b = "|", a = [], c = 0; c < arguments.length; c++) {
            var d = arguments[c];
            a[c] = d instanceof Array ? d[0] + "\x3d" + d[1] : void 0 == d ? "undefined" : d
        }
        return a.join(b)
    };
    this.appendScript = function (b, a) {
        a = a || {};
        var c = document.createElement("script");
        c.type = "text/javascript";
        c.async = "true";
        c.src = b;
        if (a.callback) {
            var d = !1;
            c.onload = c.onreadystatechange = function () {
                d || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (d = !0,
                    a.callback(),
                    c.onload = c.onreadystatechange = null)
            }
        }
        a.scope ? a.scope.appendChild(c) : document.getElementsByTagName("head")[0].appendChild(c)
    };
    Date.stdTimezoneOffset || (Date.prototype.stdTimezoneOffset = function () {
        var b = new Date(this.getFullYear(), 0, 1)
            , a = new Date(this.getFullYear(), 6, 1);
        return Math.max(b.getTimezoneOffset(), a.getTimezoneOffset())
    }
    );
    Date.dst || (Date.prototype.dst = function () {
        return this.getTimezoneOffset() < this.stdTimezoneOffset()
    }
    );
    this.getTimestamp = function (b) {
        function a(d) {
            return ("0" + d).slice(-2)
        }
        b = isNaN(b) ? -5 : parseInt(b);
        b = (new Date).dst() ? b + 1 : b;
        var c = new Date;
        c = c.getTime() + 6E4 * c.getTimezoneOffset();
        b = new Date(c + 36E5 * b);
        return b.getFullYear() + "/" + a(b.getMonth() + 1) + "/" + a(b.getDate()) + " " + a(b.getHours()) + ":" + a(b.getMinutes()) + ":" + a(b.getSeconds()) + "." + ("00" + b.getMilliseconds()).slice(-3)
    };
    this.onEvent = function (b, a, c) {
        function d(g, h, k) {
            var l = g.target || g.srcElement;
            if (k || "function" != typeof h)
                if (h || "function" != typeof k) {
                    var m = [];
                    if ("string" == typeof h)
                        for (var x = h.split(","), n = 0; n < x.length; n++)
                            m.push(function (r) {
                                return r && r.matches && r.matches(x[n].trim())
                            });
                    else
                        m.push(h);
                    do
                        for (n = 0; n < m.length; n++)
                            if (h = m[n],
                                h(l)) {
                                k.call(l, g);
                                return
                            }
                    while (l = l && l.parentNode)
                } else
                    k.call(l, g);
            else
                h.call(l, g)
        }
        var f = document
            , e = function (g) {
                d(g, a, c)
            };
        f.addEventListener ? f.addEventListener(b, e, !0) : f.attachEvent && f.attachEvent("on" + b, e);
        return e
    };
    Date.now || (Date.now = function () {
        return (new Date).getTime()
    }
    );
    String.prototype.trim || (String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    }
    );
    Array.prototype.filter || (Array.prototype.filter = function (b, a) {
        if ("Function" !== typeof b && "function" !== typeof b || !this)
            throw new TypeError;
        var c = this.length >>> 0
            , d = Array(c)
            , f = this
            , e = 0
            , g = -1;
        if (void 0 === a)
            for (; ++g !== c;)
                if (g in this)
                    if (b(f[g], g, f))
                        d[e++] = f[g];
                    else
                        for (; ++g !== c;)
                            g in this && b.call(a, f[g], g, f) && (d[e++] = f[g]);
        d.length = e;
        return d
    }
    );
    Array.prototype.indexOf || (Array.prototype.indexOf = function (b, a) {
        if (null == this)
            throw new TypeError('"this" is null or not defined');
        var c = Object(this)
            , d = c.length >>> 0;
        if (0 === d)
            return -1;
        a = +a || 0;
        Infinity === Math.abs(a) && (a = 0);
        if (a >= d)
            return -1;
        for (a = Math.max(0 <= a ? a : d - Math.abs(a), 0); a < d;) {
            if (a in c && c[a] === b)
                return a;
            a++
        }
        return -1
    }
    );
    Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
        value: function (b, a) {
            if (null == this)
                throw new TypeError('"this" is null or not defined');
            var c = Object(this)
                , d = c.length >>> 0;
            if (0 === d)
                return !1;
            a |= 0;
            for (a = Math.max(0 <= a ? a : d - Math.abs(a), 0); a < d;) {
                var f = c[a];
                var e = b;
                if (f = f === e || "number" === typeof f && "number" === typeof e && isNaN(f) && isNaN(e))
                    return !0;
                a++
            }
            return !1
        }
    });
    String.prototype.includes || (String.prototype.includes = function (b, a) {
        "number" !== typeof a && (a = 0);
        return a + b.length > this.length ? !1 : -1 !== this.indexOf(b, a)
    }
    );
    Element.prototype.matches = Element.prototype.matches || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;
    !Element.prototype.matches && document.querySelectorAll && (Element.prototype.matches = function (b) {
        var a = this;
        b = (a.document || a.ownerDocument).querySelectorAll(b);
        for (var c = b.length; 0 <= --c && b.item(c) !== a;)
            ;
        return -1 < c
    }
    );
    "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function (b, a) {
            if (null == b)
                throw new TypeError("Cannot convert undefined or null to object");
            for (var c = Object(b), d = 1; d < arguments.length; d++) {
                var f = arguments[d];
                if (null != f)
                    for (var e in f)
                        Object.prototype.hasOwnProperty.call(f, e) && (c[e] = f[e])
            }
            return c
        },
        writable: !0,
        configurable: !0
    });
    Object.entries || (Object.entries = function (b) {
        for (var a = Object.keys(b), c = a.length, d = Array(c); c--;)
            d[c] = [a[c], b[a[c]]];
        return d
    }
    )
}
).apply(_analytics);
