/*! For license information please see scripts.js.LICENSE.txt */
(() => {
    var e,
        t,
        n = {
            782: (e, t, n) => {
                "use strict";
                function r(e, t) {
                    const n = Array.from(t).reduce((e, t, n) => (0 === n ? e : e + t.offsetHeight), 0);
                    e.style.height = n - 20 + "px";
                }
                const o = document.querySelectorAll('[data-compare-table="container"]'),
                    i = document.querySelectorAll("[data-onclick]"),
                    s = {
                        openFindMyApplication: () => {
                            console.log("opening find my application");
                        },
                        apply: () => {
                            console.log("do the apply thing");
                        },
                        removeElement: function (e) {
                            const t = e.dataset.removeElement;
                            if (!t) return;
                            const n = document.querySelector(`[data-remove-element-target=${t}]`);
                            n && n.remove();
                        },
                        printPage: function () {
                            return window.print();
                        },
                    },
                    a = (e) => new Promise((t) => setTimeout(t, e)),
                    l = (e) => {
                        if (window.eventQueue) return window.eventQueue.push(e);
                        window.eventQueue = [e];
                    },
                    c = document.querySelectorAll("[data-open-modal]"),
                    d = document.querySelectorAll("[data-close-modal]"),
                    u = "lock-body",
                    p = document.querySelector("body");
                function f(e) {
                    e && (l({ type: "event", eventAction: "Modal - close", eventLabel: e.dataset.sectionName }), e.close());
                }
                function h(e) {
                    const t = e.target.getBoundingClientRect();
                    (e.clientX < t.left || e.clientX > t.right || e.clientY < t.top || e.clientY > t.bottom) && e.target.close && (f(e.target), p.classList.remove(u));
                }
                function m(e) {
                    e && "function" == typeof e.showModal && (e.showModal(), l({ type: "event", eventAction: "Modal - open", eventLabel: e.dataset.sectionName }), p.classList.add(u), e.addEventListener("click", h));
                }
                const g = {
                    showApplyModal: function (e) {
                        if (e && 1 === e.length && "true" === e[0]) {
                            const e = document.querySelector('[data-modal="apply"]');
                            if (!e) return;
                            m(e);
                        }
                    },
                },
                    v = g,
                    // y = fetch("/api/environment-config/").then(response => response.json()).then(data => {
                    //     { API_BASE_URL: b, PREQUAL_DE: w, RATES_URL: S, ENCRYPT_KEY: x } = data.config.production
                    // }
                    // ).catch(err => console.log(err)),


                    y = {
                        production: {
                            API_BASE_URL: "http://127.0.0.1:8000/api",
                            PREQUAL_DE: "DE_PreQual_2018",
                            RATES_URL: "https://casl-web-data-storage.s3.amazonaws.com/production/rates",
                            ENCRYPT_KEY: "b226558d90684728c6c8dd9bc57e2e99",
                        }
                    },
                    { API_BASE_URL: b, PREQUAL_DE: w, RATES_URL: S, ENCRYPT_KEY: x } = y.production,
                    E = (e, t) => {
                        const n = { status: e, ...t };
                        throw new Error(t.code, { cause: n });
                    },
                    A = {
                        post: async (e, t, n) => {
                            const r = { method: "POST", ...n, body: JSON.stringify(t) },
                                o = await fetch(e, r),
                                i = await o.json();
                            return 201 !== o.status && E(o.status, i), i;
                        },
                        put: async (e, t, n) => {
                            const r = { method: "PUT", ...n, body: JSON.stringify(t) },
                                o = await fetch(e, r),
                                i = await o.json();
                            return 200 !== o.status && E(o.status, i), i;
                        },
                        get: async (e, t, n) => {
                            const r = { method: "GET", ...n },
                                o = (function (e, t) {
                                    const n = e.includes("http") ? e : `${window.location.origin}${e}`,
                                        r = new URL(n),
                                        o = Object.fromEntries(r.searchParams),
                                        i = new URLSearchParams({ ...o, ...t });
                                    return (r.search = i), /\.[^.]*$/.test(r.pathname) || (r.pathname = r.pathname.replace(/\/?$/, "/")), r;
                                })(e, t),
                                i = await fetch(o, r),
                                s = await i.json();
                            return 200 !== i.status && E(i.status, s), s;
                        },
                    };




                async function C(e) {
                    if ((e.preventDefault(), "pending" !== this.dataset.formStatus)) return;
                    this.dataset.formStatus = "submitting";
                    const t = this.querySelector("[data-form-field='email']");
                    try {
                        const e = new FormData(this).get("email");
                        !(function (e) {
                            if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)) throw new Error("Invalid email");
                        })(e),
                            t.classList.remove("form-field__error"),
                            l({ type: "event", eventAction: "Form - submit", eventLabel: this.dataset.formId }),
                            await (async function (e, t,) {
                                if (t)
                                    try {
                                        const n = { email: e, listIds: t.split(",") };
                                        return await A.post(`${b}/subscriptions/`, n, {
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                        }), "Success";
                                    } catch (e) {
                                        throw new Error("Subscribe failed");
                                    }
                            })(e, this.dataset.subscribeKeys),
                            (this.dataset.formStatus = "success"),
                            l({ type: "event", eventAction: "Form - submit success", eventLabel: this.dataset.formId }),
                            (async function (e, t) {
                                try {
                                    if (!t?.triggeredEmailKey) return;
                                    const n = { email: e, key: t.triggeredEmailKey, acctType: t.accountType ?? null };
                                    A.post(`${b}/subscription/send/notify/`, n, {
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    });
                                } catch (e) {
                                    return;
                                }
                            })(e, this.dataset),
                            (async function (e, t) {
                                try {
                                    if (!t?.dataExtension) return;
                                    const n = { 
                                        dataExtensionType: "subscribe", email: e, dataExtensionKey: t.dataExtension, acqSource: t.acqSource ?? null };
                                    A.put(`${b}/subscription/record/`, n, {
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    });
                                } catch (e) {
                                    return;
                                }
                            })(e, this.dataset);
                    } catch (e) {
                        if ("Invalid email" === e.message)
                            return (
                                (this.dataset.formStatus = "pending"), t.classList.add("form-field__error"), void l({ type: "event", eventAction: "Form Field - error", eventLabel: `${this.dataset.formId} > email > Invalid email address` })
                            );
                        "Subscribe failed" === e.message && ((this.dataset.formStatus = "pending"), window.alert("There was an error submitting your request.")), console.error(e);
                    }
                }
                async function _(e, t) {
                    const n = e.closest("section").querySelector('[data-single-form="content"]');
                    n.classList.add("fade-in-transition"),
                        (n.innerHTML = t),
                        await a(50),
                        n.classList.add("fade-in-transition__in"),
                        await a(1e3),
                        n.classList.remove("fade-in-transition", "fade-in-transition__in"),
                        (e.dataset.formStatus = "pending");
                }
                function k(e) {
                    if (!/^[a-zA-Z0-9]{1}/.test(e)) throw new Error("Invalid Code");
                }
                const O = {
                    success: function (e, t) {
                        const { dmUrl: n } = e.dataset,
                            r = `${location.origin}${n}`,
                            o = new URLSearchParams(window.location.search),
                            i = o.get("term"),
                            s = o.get("repayment"),
                            a = o.get("ACT"),
                            l = new URL(r),
                            c = Object.fromEntries(new URLSearchParams(l.search));
                        Object.assign(c, { oc: t }), i && Object.assign(c, { term: i }), s && Object.assign(c, { repayment: s }), a && Object.assign(c, { ACT: a }), (l.search = new URLSearchParams(c)), (window.location = l);
                    },
                    refi: function (e) {
                        const { dmUrl: t } = e.dataset;
                        _(
                            e,
                            `\n    <p class="p-large">You're about to apply for an undergraduate, but the code you entered is for a refinance loan.</p>\n    <h2 class="h2">What do you want to do?</h2>\n    <p class="p-large"><a href="${t}" target="_blank">Continue to Application</a> or <a href="/student-loans/refinance/" target="_blank">Learn more about Refinancing Loans</a></p>\n  `
                        );
                    },
                    parent: function (e) {
                        const { dmUrl: t } = e.dataset;
                        _(
                            e,
                            `\n    <p class="p-large">You're about to apply for an undergraduate but the code you entered is for a parent loan.</p>\n    <h2 class="h2">What do you want to do?</h2>\n    <p class="p-large"><a href="${t}" target="_blank">Continue to Application</a> or <a href="/student-loans/parent/" target="_blank">Learn more about Parent Loans</a></p>\n  `
                        );
                    },
                    expired: function (e) {
                        _(
                            e,
                            '\n    <h2 class="h2">That code is expired.</h2>\n    <p class="p-large">The priority code you entered is expired. If you received another code, you can try entering it now. Otherwise, click "proceed without my code" below.</p>\n  '
                        );
                    },
                    default: function (e) {
                        _(
                            e,
                            '\n    <h2 class="h2">Oh no! We couldn\'t find that code.</h2>\n    <p class="p-large">We looked everywhere, but we couldn\'t find the code you entered. Please double-check your email, and try entering it again.</p>\n  '
                        );
                    },
                };
                async function L(e) {
                    if ((e.preventDefault(), "pending" !== this.dataset.formStatus)) return;
                    this.dataset.formStatus = "submitting";
                    const t = this.querySelector("[data-form-field='my-code']");
                    try {
                        const e = new FormData(this).get("my-code");
                        k(e), t.classList.remove("form-field__error");
                        const n = await (async function (e) {
                            if (!e) return;
                            const t = { offerCode: e };
                            try {
                                const n = await A.get(`${b}/v1/application/offer-status`, t);
                                return "IS" == n.LOAN_PROD_TYPE && "SUCCESS" == n.status
                                    ? "success"
                                    : "RF" == n.LOAN_PROD_TYPE || (!n.LOAN_PROD_TYPE && /RF$/.test(e))
                                        ? "refi"
                                        : "PA" == n.LOAN_PROD_TYPE || (!n.LOAN_PROD_TYPE && /PA$/.test(e))
                                            ? "parent"
                                            : "EXPIRED" == n.status
                                                ? "expired"
                                                : "default";
                            } catch (e) {
                                const t = { emailCode: "credibleFormError", error: `error - ${e.cause.code}: ${e.cause.message}` };
                                return A.post(`${b}/v1/debug/email`, t), "default";
                            }
                        })(e),
                            r = O[n];
                        r && r(this, e);
                    } catch (e) {
                        if ("Invalid Code" === e.message)
                            return (this.dataset.formStatus = "pending"), t.classList.add("form-field__error"), void l({ type: "event", eventAction: "Form Field - error", eventLabel: `${this.dataset.formId} > DM Code > Invalid Code` });
                        console.error(e);
                    }
                }
                function I(e) {
                    _(e, '\n    <h2 class="h2">Oh no! We couldn\'t find that code.</h2>\n    <p class="p-large">The code provided could not be found or is no longer valid. Please check the code and try again.</p>\n  ');
                }
                const P = {
                    success: function (e, t) {
                        const { appUrl: n } = e.dataset,
                            r = `${location.origin}${n}`,
                            o = new URLSearchParams(window.location.search),
                            i = ["utm_campaign", "utm_source", "utm_medium", "utm_content", "brand", "product", "p_aff", "dclid", "PR"].reduce((e, t) => {
                                const n = o.get(t);
                                return n ? { ...e, [t]: n } : e;
                            }, {}),
                            s = new URL(r),
                            a = { ...Object.fromEntries(new URLSearchParams(s.search)), ...i, oc: t };
                        (s.search = new URLSearchParams(a)), (window.location = s);
                    },
                    invalid: I,
                    failure: I,
                };
                async function q(e) {
                    if ((e.preventDefault(), "pending" !== this.dataset.formStatus)) return;
                    this.dataset.formStatus = "submitting";
                    const t = this.querySelector("[data-form-field='code']");
                    try {
                        const e = new FormData(this).get("code");
                        k(e), t.classList.remove("form-field__error");
                        const n = await (async function (e) {
                            if (!e) return;
                            const t = { offerCode: e };
                            try {
                                return "SUCCESS" == (await A.get(`${b}/v1/application/offer-status`, t)).status ? "success" : "invalid";
                            } catch (e) {
                                const t = { emailCode: "credibleFormError", error: `error - ${e.cause.code}: ${e.cause.message}` };
                                return A.post(`${b}/v1/debug/email`, t), "failure";
                            }
                        })(e),
                            r = P[n];
                        r && r(this, e);
                    } catch (e) {
                        if ("Invalid Code" === e.message)
                            return (this.dataset.formStatus = "pending"), t.classList.add("form-field__error"), void l({ type: "event", eventAction: "Form Field - error", eventLabel: `${this.dataset.formId} > Offer Code > Invalid Code` });
                        console.error(e);
                    }
                }
                const F = {
                    subscribeForm: function (e) {
                        e.querySelector("input").addEventListener("blur", () => {
                            l({ type: "event", eventAction: "Form Field - interaction", eventLabel: `${e.dataset.formId} - email` });
                        }),
                            e.addEventListener("submit", C);
                    },
                    handleDMCodeForm: function (e) {
                        e.querySelector("input").addEventListener("blur", () => {
                            l({ type: "event", eventAction: "Form Field - Interaction", eventLabel: `${e.dataset.formId} > DM Code` });
                        }),
                            e.addEventListener("submit", L),
                            (function (e) {
                                const t = new URLSearchParams(window.location.search).get("oc");
                                t && (e.querySelector("input[name='my-code']").value = t);
                            })(e);
                    },
                    findMyApplication: function (e) {
                        const t = new URLSearchParams(window.location.search),
                            n = (function (e) {
                                const t = { borrower: "&ACT=SR", cosigner: "&ACT=CR" };
                                return t[e.get("type")] ?? t.borrower;
                            })(t),
                            r = (function (e) {
                                const t = (e.get("ref") ?? "").replace(/[^0-9.]/g, "");
                                return t ? `&ref=${t}` : "";
                            })(t),
                            o = `/application?SC=CAIS01${n}${r}`;
                        !(function (e, t) {
                            const n = e.querySelector("input");
                            n.setAttribute("value", t.replace(/[^0-9.]/g, "")), n.setAttribute("disabled", !0);
                        })(e, r),
                            (function (e, t) {
                                t && e.querySelector("a").setAttribute("href", t);
                            })(e, o);
                    },
                    handleCredibleBotSubmit: function (e) {
                        e.querySelector("input").addEventListener("blur", () => {
                            l({ type: "event", eventAction: "Form Field - Interaction", eventLabel: `${e.dataset.formId} > DM Code` });
                        }),
                            e.addEventListener("submit", q);
                    },
                },
                    N = ".accordion, .accordion_small, .accordion_medium, .accordion_large";
                function D(e) {
                    e.classList.remove("expanded");
                }
                function T(e) {
                    const t = e.closest(".accordion-group"),
                        n = e.closest(N),
                        r = n.classList.contains("expanded");
                    return (
                        t &&
                        t.querySelectorAll(N).forEach((e) => {
                            D(e);
                        }),
                        r
                            ? D(n)
                            : (function (e) {
                                e.querySelector(".accordion-content"), e.classList.add("expanded");
                            })(n)
                    );
                }
                const M = {
                    countUp: (e) => {
                        const t = parseFloat(e.dataset.duration),
                            n = parseFloat(e.dataset.countTo),
                            r = e.dataset.countTo.split(".")[1]?.length ?? 0,
                            o = parseFloat(e.dataset.incrementer),
                            i = setInterval(() => {
                                const t = parseFloat(e.innerText);
                                t >= n && clearInterval(i), (e.innerText = t + o >= n ? n.toFixed(r) : (t + o).toFixed(r));
                            }, t / (n / o));
                    },
                },
                    V = async () => {
                        const e = new TextEncoder().encode(x);
                        return crypto.subtle.importKey("raw", e, { name: "AES-GCM" }, !1, ["encrypt", "decrypt"]);
                    },
                    $ = async (e) => {
                        if (!crypto.subtle) return e;
                        const t = await V(),
                            n = new TextEncoder().encode(e),
                            r = crypto.getRandomValues(new Uint8Array(12)),
                            o = await crypto.subtle.encrypt({ name: "AES-GCM", iv: r }, t, n);
                        return { iv: Array.from(r), ciphertext: Array.from(new Uint8Array(o)) };
                    },
                    R = async (e) => {
                        try {
                            if (!crypto.subtle) return e;
                            if (!e) return;
                            const { iv: t, ciphertext: n } = e;
                            if (!n) return;
                            const r = await V(),
                                o = new Uint8Array(t),
                                i = new Uint8Array(n),
                                s = await crypto.subtle.decrypt({ name: "AES-GCM", iv: o }, r, i);
                            return new TextDecoder().decode(s);
                        } catch (e) {
                            return console.error(e), "";
                        }
                    },
                    j = {
                        set: async ({ key: e, value: t }) => {
                            try {
                                const n = await $(t),
                                    r = JSON.stringify(n);
                                return window.sessionStorage.setItem(e, r);
                            } catch (e) {
                                return console.error(`Session Storage Failure: ${e}`), null;
                            }
                        },
                        get: async ({ key: e }) => {
                            try {
                                const t = window.sessionStorage.getItem(e);
                                if (!t) return null;
                                const n = JSON.parse(t);
                                return await R(n);
                            } catch (e) {
                                return console.error(`Session Storage Failure: ${e}`), null;
                            }
                        },
                        remove: ({ key: e }) => {
                            try {
                                return window.sessionStorage.removeItem(e);
                            } catch (e) {
                                return console.error(`Session Storage Failure: ${e}`), null;
                            }
                        },
                    },
                    U = {
                        set: async ({ key: e, value: t }) => {
                            try {
                                const n = await $(t),
                                    r = JSON.stringify(n);
                                return window.localStorage.setItem(e, r);
                            } catch (e) {
                                return console.error(`Local Storage Failure: ${e}`), null;
                            }
                        },
                        get: async ({ key: e }) => {
                            try {
                                const t = window.localStorage.getItem(e);
                                if (!t) return null;
                                const n = JSON.parse(t);
                                return await R(n);
                            } catch (e) {
                                return console.error(`Local Storage Failure: ${e}`), null;
                            }
                        },
                        remove: ({ key: e }) => {
                            try {
                                return window.localStorage.removeItem(e);
                            } catch (e) {
                                return console.error(`Local Storage Failure: ${e}`), null;
                            }
                        },
                    };
                function H(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n) e[r] = n[r];
                    }
                    return e;
                }
                var z = (function e(t, n) {
                    function r(e, r, o) {
                        if ("undefined" != typeof document) {
                            "number" == typeof (o = H({}, n, o)).expires && (o.expires = new Date(Date.now() + 864e5 * o.expires)),
                                o.expires && (o.expires = o.expires.toUTCString()),
                                (e = encodeURIComponent(e)
                                    .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                                    .replace(/[()]/g, escape));
                            var i = "";
                            for (var s in o) o[s] && ((i += "; " + s), !0 !== o[s] && (i += "=" + o[s].split(";")[0]));
                            return (document.cookie = e + "=" + t.write(r, e) + i);
                        }
                    }
                    return Object.create(
                        {
                            set: r,
                            get: function (e) {
                                if ("undefined" != typeof document && (!arguments.length || e)) {
                                    for (var n = document.cookie ? document.cookie.split("; ") : [], r = {}, o = 0; o < n.length; o++) {
                                        var i = n[o].split("="),
                                            s = i.slice(1).join("=");
                                        try {
                                            var a = decodeURIComponent(i[0]);
                                            if (((r[a] = t.read(s, a)), e === a)) break;
                                        } catch (e) { }
                                    }
                                    return e ? r[e] : r;
                                }
                            },
                            remove: function (e, t) {
                                r(e, "", H({}, t, { expires: -1 }));
                            },
                            withAttributes: function (t) {
                                return e(this.converter, H({}, this.attributes, t));
                            },
                            withConverter: function (t) {
                                return e(H({}, this.converter, t), this.attributes);
                            },
                        },
                        { attributes: { value: Object.freeze(n) }, converter: { value: Object.freeze(t) } }
                    );
                })(
                    {
                        read: function (e) {
                            return '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
                        },
                        write: function (e) {
                            return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
                        },
                    },
                    { path: "/" }
                );
                const B = {
                    Session: j,
                    Local: U,
                    Cookie: {
                        set: async ({ key: e, value: t, expires: n }) => {
                            try {
                                const r = await $(t),
                                    o = JSON.stringify(r);
                                return z.set(e, o, { expires: n });
                            } catch (e) {
                                return console.error(`Cookie Failure: ${e}`), null;
                            }
                        },
                        get: async ({ key: e }) => {
                            try {
                                const t = z.get(e);
                                if (!t) return null;
                                const n = JSON.parse(t);
                                return await R(n);
                            } catch (e) {
                                return console.error(`Cookie Failure: ${e}`), null;
                            }
                        },
                        remove: ({ key: e }) => {
                            try {
                                return z.remove(e);
                            } catch (e) {
                                return console.error(`Cookie Failure: ${e}`), null;
                            }
                        },
                    },
                };
                window.Session = j;
                const K = B,
                    Y = {
                        next_session: (e) => K.Session.set({ key: e, value: "viewed" }),
                        tomorrow: (e) => K.Cookie.set({ key: e, value: "viewed", expires: 1 }),
                        one_week: (e) => K.Cookie.set({ key: e, value: "viewed", expires: 7 }),
                        one_month: (e) => K.Cookie.set({ key: e, value: "viewed", expires: 30 }),
                        one_year: (e) => K.Cookie.set({ key: e, value: "viewed", expires: 365 }),
                        none: () => null,
                    },
                    W = [{ name: "all-compare-table", activeCardClassArray: ["all-compare-table__card--active"], activeButtonClassArray: ["all-compare-table__button--active"], nonActiveButtonClassArray: [] }],
                    Q = (e) => e.querySelectorAll("[data-button-slide-button-key]"),
                    G = (e) => e.querySelectorAll("[data-button-slide-card-key]"),
                    J = (e, t, n) => {
                        var r;
                        (r = t),
                            e.classList.add(...r),
                            ((e, t) => {
                                e.classList.remove(...t);
                            })(e, n);
                    },
                    X = (e, t, n) => {
                        const r = Q(t),
                            o = e.dataset.buttonSlideButtonKey;
                        r.forEach((e) => {
                            e.dataset.buttonSlideButtonKey !== o ? J(e, n.nonActiveButtonClassArray, n.activeButtonClassArray) : J(e, n.activeButtonClassArray, n.nonActiveButtonClassArray);
                        }),
                            G(t).forEach((e) => {
                                e.dataset.buttonSlideCardKey !== o ? J(e, n.nonActiveCardClassArray, n.activeCardClassArray) : J(e, n.activeCardClassArray, n.nonActiveCardClassArray);
                            });
                    };
                function Z() {
                    const e = document.querySelector('[data-nav="container"]');
                    return e?.offsetHeight ?? 0;
                }
                const ee = (e, t) => {
                    if (!e) return;
                    const n = Z(),
                        r = t ?? n,
                        o = e.getBoundingClientRect().top + window.scrollY - r;
                    window.scrollTo({ top: o, behavior: "smooth" });
                },
                    te = () => {
                        const e = window.location.hash;
                        if (!e) return;
                        window.location.hash = "";
                        const t = `[data-scroll-id="${e.substring(1)}"]`,
                            n = document.querySelector(t);
                        ee(n);
                    };
                function ne() {
                    const e = document.querySelector('[data-contact="email-form"]');
                    e && (e.classList.add("show"), ee(e));
                }
                function re(e) {
                    if (this.closest(".zendesk-offline") || window.innerWidth > 768) return e.preventDefault();
                }
                function oe() {
                    this.closest(".zendesk-offline") || Smooch.open();
                }
                const ie = ["history-card--active"],
                    se = ["history-of-casl__button--active"],
                    ae = () => document.querySelectorAll("[data-history-button-year]"),
                    le = () => document.querySelectorAll("[data-history-card-year]"),
                    ce = (e, t) => e.classList.remove(...t),
                    de = (e, t) => e.classList.add(...t),
                    ue = (e) => {
                        const t = ae(),
                            n = e.dataset.historyButtonYear;
                        t.forEach((t) => {
                            if (t.dataset.historyButtonYear == n) return de(e, se);
                            ce(t, se);
                        }),
                            le().forEach((e) => {
                                if (e.dataset.historyCardYear === n) return de(e, ie);
                                ce(e, ie);
                            });
                    },
                    pe = "show-mobile-menu",
                    fe = "collapsed",
                    he = "collapsing",
                    me = "lock-body",
                    ge = document.querySelector(".page-wrapper"),
                    ve = document.querySelector("[data-nav='target']"),
                    ye = async () => {
                        ge.classList.remove(me), ve.classList.remove(pe), ve.classList.add(he), await a(300), ve.classList.remove(he), ve.classList.add(fe);
                    };
                async function be() {
                    return ve.classList.contains(pe)
                        ? ((this.dataset.linkName = "Open Mobile Nav"), ye())
                        : ((this.dataset.linkName = "Close Mobile Nav"),
                            (async () => {
                                xe(), ve.classList.remove(fe), await a(10), ge.classList.add(me), ve.classList.add(pe);
                            })());
                }
                const we = document.querySelector('[data-site-search="desktop-target"]'),
                    Se = document.querySelector('[data-site-search="mobile-target"]');
                async function xe() {
                    const e = document.querySelector(".show-site-search");
                    e &&
                        (e.classList.remove("show-site-search"),
                            e.classList.add("hide-site-search"),
                            await a(450),
                            e.querySelector('[data-site-search="form"]').reset(),
                            e.classList.remove("hide-site-search"),
                            window.removeEventListener("resize", xe));
                }
                function Ee(e) {
                    if (e.target.closest(".main-navigation-bar") && !document.querySelector(".show-site-search"))
                        return (
                            window.addEventListener("resize", xe),
                            (function () {
                                ye();
                                const e = window.innerWidth <= 768 ? Se : we;
                                e.classList.remove("hide-site-search"), e.classList.add("show-site-search");
                            })()
                        );
                    const t = e.target.closest('[data-site-search="container"]').querySelector('[data-site-search="form"]');
                    Ae(t) && (l({ type: "event", eventAction: "Site Search Form - submit", eventLabel: "Site Search" }), t.submit());
                }
                function Ae(e) {
                    return !!e && !!new FormData(e).get("search");
                }
                function Ce(e) {
                    e.preventDefault(), Ae(e.target) && (l({ type: "event", eventAction: "Site Search Form - submit", eventLabel: "Site Search" }), e.target.submit());
                }
                const _e = function () {
                    const e = Array.from(document.querySelectorAll("[data-nav-offset]"));
                    let t;
                    const n = document.querySelector('[data-nav="container"]');
                    new ResizeObserver((n) => {
                        n[0].target.offsetHeight !== t &&
                            ((t = n[0].target.offsetHeight),
                                (function (e, t) {
                                    e.forEach((e) => {
                                        !(function (e, t) {
                                            const n = e.dataset.navOffset,
                                                r = e.dataset.additionalOffset ?? 0,
                                                o = t + parseInt(r);
                                            e.style[n] = `${o}px`;
                                        })(e, t);
                                    });
                                })(e, t));
                    }).observe(n);
                };
                const ke = {
                    replace: function (e, t) {
                        return (e.textContent = t);
                    },
                    append: function (e, t) {
                        return e.append(` ${t}`);
                    },
                },
                    Oe = {
                        replace_picture: (e, t) => {
                            e.querySelectorAll("source").forEach((e) => {
                                e.setAttribute("srcset", t);
                            });
                        },
                        replace_img: (e, t) => e.setAttribute("src", t),
                    },
                    Le = (e, t) => e.insertAdjacentHTML("afterend", t),
                    Ie = { before: (e, t) => e.insertAdjacentHTML("beforebegin", t), after: Le, replace: (e, t) => (Le(e, t), e.remove()) },
                    Pe = {
                        url: function (e, t) {
                            return e.setAttribute("href", t);
                        },
                        label: function (e, t) {
                            return (e.textContent = t);
                        },
                    },
                    qe = {
                        text: function (e) {
                            const t = document.querySelector(e.selector);
                            if (!t) return;
                            const n = e.text,
                                r = ke[n.action];
                            return r ? r(t, n.content) : void 0;
                        },
                        image: function (e) {
                            const t = document.querySelector(e.selector);
                            if (!t) return;
                            const n = e.image,
                                r = Oe[n.action];
                            return r ? r(t, n.image) : void 0;
                        },
                        html: function (e) {
                            const t = document.querySelector(e.selector);
                            if (!t) return;
                            const n = e.html,
                                r = Ie[n.action];
                            return r ? r(t, n.content) : void 0;
                        },
                        link: function (e) {
                            const t = e.select_all ? document.querySelectorAll(e.selector) : document.querySelector(e.selector);
                            if (!t) return;
                            const n = e.link,
                                r = Pe[n.action];
                            return r
                                ? e.select_all
                                    ? t.forEach((e) => {
                                        r(e, n.content);
                                    })
                                    : r(t, n.content)
                                : void 0;
                        },
                        international_mba_rates: async function (e) {
                            try {
                                const t = document.querySelector(".compare-rates-card__rates-container");
                                if (!t) return;
                                return (function (e, t) {
                                    const n = e.querySelector(".compare-rates-card__rate-large span"),
                                        r = e.querySelector(".compare-rates-card__rate-small span");
                                    n && r && ((n.textContent = t.annual_percentage_rate), (r.textContent = t.interest_rate));
                                })(
                                    t,
                                    await (async function (e) {
                                        const { source_code: t, school_key: n } = e,
                                            r = await A.get("/wp-json/rates-api/ach", { sc: t, school_key: n });
                                        if ("failure" === r) throw new Error("No rates returned");
                                        return r;
                                    })(e.international_mba_rates)
                                );
                            } catch (e) {
                                throw e;
                            }
                        },
                    };
                const Fe = () => document.querySelector("body").classList.remove("partner-driven-content");
                var Ne, De;
                function Te(e) {
                    return "object" == typeof e && "function" == typeof e.to;
                }
                function Me(e) {
                    e.parentElement.removeChild(e);
                }
                function Ve(e) {
                    return null != e;
                }
                function $e(e) {
                    e.preventDefault();
                }
                function Re(e) {
                    return "number" == typeof e && !isNaN(e) && isFinite(e);
                }
                function je(e, t, n) {
                    n > 0 &&
                        (Be(e, t),
                            setTimeout(function () {
                                Ke(e, t);
                            }, n));
                }
                function Ue(e) {
                    return Math.max(Math.min(e, 100), 0);
                }
                function He(e) {
                    return Array.isArray(e) ? e : [e];
                }
                function ze(e) {
                    var t = (e = String(e)).split(".");
                    return t.length > 1 ? t[1].length : 0;
                }
                function Be(e, t) {
                    e.classList && !/\s/.test(t) ? e.classList.add(t) : (e.className += " " + t);
                }
                function Ke(e, t) {
                    e.classList && !/\s/.test(t) ? e.classList.remove(t) : (e.className = e.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " "));
                }
                function Ye(e) {
                    var t = void 0 !== window.pageXOffset,
                        n = "CSS1Compat" === (e.compatMode || "");
                    return { x: t ? window.pageXOffset : n ? e.documentElement.scrollLeft : e.body.scrollLeft, y: t ? window.pageYOffset : n ? e.documentElement.scrollTop : e.body.scrollTop };
                }
                function We(e, t) {
                    return 100 / (t - e);
                }
                function Qe(e, t, n) {
                    return (100 * t) / (e[n + 1] - e[n]);
                }
                function Ge(e, t) {
                    for (var n = 1; e >= t[n];) n += 1;
                    return n;
                }
                !(function (e) {
                    (e.Range = "range"), (e.Steps = "steps"), (e.Positions = "positions"), (e.Count = "count"), (e.Values = "values");
                })(Ne || (Ne = {})),
                    (function (e) {
                        (e[(e.None = -1)] = "None"), (e[(e.NoValue = 0)] = "NoValue"), (e[(e.LargeValue = 1)] = "LargeValue"), (e[(e.SmallValue = 2)] = "SmallValue");
                    })(De || (De = {}));
                var Je = (function () {
                    function e(e, t, n) {
                        var r;
                        (this.xPct = []), (this.xVal = []), (this.xSteps = []), (this.xNumSteps = []), (this.xHighestCompleteStep = []), (this.xSteps = [n || !1]), (this.xNumSteps = [!1]), (this.snap = t);
                        var o = [];
                        for (
                            Object.keys(e).forEach(function (t) {
                                o.push([He(e[t]), t]);
                            }),
                            o.sort(function (e, t) {
                                return e[0][0] - t[0][0];
                            }),
                            r = 0;
                            r < o.length;
                            r++
                        )
                            this.handleEntryPoint(o[r][1], o[r][0]);
                        for (this.xNumSteps = this.xSteps.slice(0), r = 0; r < this.xNumSteps.length; r++) this.handleStepPoint(r, this.xNumSteps[r]);
                    }
                    return (
                        (e.prototype.getDistance = function (e) {
                            for (var t = [], n = 0; n < this.xNumSteps.length - 1; n++) t[n] = Qe(this.xVal, e, n);
                            return t;
                        }),
                        (e.prototype.getAbsoluteDistance = function (e, t, n) {
                            var r,
                                o = 0;
                            if (e < this.xPct[this.xPct.length - 1]) for (; e > this.xPct[o + 1];) o++;
                            else e === this.xPct[this.xPct.length - 1] && (o = this.xPct.length - 2);
                            n || e !== this.xPct[o + 1] || o++, null === t && (t = []);
                            var i = 1,
                                s = t[o],
                                a = 0,
                                l = 0,
                                c = 0,
                                d = 0;
                            for (r = n ? (e - this.xPct[o]) / (this.xPct[o + 1] - this.xPct[o]) : (this.xPct[o + 1] - e) / (this.xPct[o + 1] - this.xPct[o]); s > 0;)
                                (a = this.xPct[o + 1 + d] - this.xPct[o + d]),
                                    t[o + d] * i + 100 - 100 * r > 100 ? ((l = a * r), (i = (s - 100 * r) / t[o + d]), (r = 1)) : ((l = ((t[o + d] * a) / 100) * i), (i = 0)),
                                    n ? ((c -= l), this.xPct.length + d >= 1 && d--) : ((c += l), this.xPct.length - d >= 1 && d++),
                                    (s = t[o + d] * i);
                            return e + c;
                        }),
                        (e.prototype.toStepping = function (e) {
                            return (function (e, t, n) {
                                if (n >= e.slice(-1)[0]) return 100;
                                var r = Ge(n, e),
                                    o = e[r - 1],
                                    i = e[r],
                                    s = t[r - 1],
                                    a = t[r];
                                return (
                                    s +
                                    (function (e, t) {
                                        return Qe(e, e[0] < 0 ? t + Math.abs(e[0]) : t - e[0], 0);
                                    })([o, i], n) /
                                    We(s, a)
                                );
                            })(this.xVal, this.xPct, e);
                        }),
                        (e.prototype.fromStepping = function (e) {
                            return (function (e, t, n) {
                                if (n >= 100) return e.slice(-1)[0];
                                var r = Ge(n, t),
                                    o = e[r - 1],
                                    i = e[r],
                                    s = t[r - 1];
                                return (function (e, t) {
                                    return (t * (e[1] - e[0])) / 100 + e[0];
                                })([o, i], (n - s) * We(s, t[r]));
                            })(this.xVal, this.xPct, e);
                        }),
                        (e.prototype.getStep = function (e) {
                            return (function (e, t, n, r) {
                                if (100 === r) return r;
                                var o = Ge(r, e),
                                    i = e[o - 1],
                                    s = e[o];
                                return n
                                    ? r - i > (s - i) / 2
                                        ? s
                                        : i
                                    : t[o - 1]
                                        ? e[o - 1] +
                                        (function (e, t) {
                                            return Math.round(e / t) * t;
                                        })(r - e[o - 1], t[o - 1])
                                        : r;
                            })(this.xPct, this.xSteps, this.snap, e);
                        }),
                        (e.prototype.getDefaultStep = function (e, t, n) {
                            var r = Ge(e, this.xPct);
                            return (100 === e || (t && e === this.xPct[r - 1])) && (r = Math.max(r - 1, 1)), (this.xVal[r] - this.xVal[r - 1]) / n;
                        }),
                        (e.prototype.getNearbySteps = function (e) {
                            var t = Ge(e, this.xPct);
                            return {
                                stepBefore: { startValue: this.xVal[t - 2], step: this.xNumSteps[t - 2], highestStep: this.xHighestCompleteStep[t - 2] },
                                thisStep: { startValue: this.xVal[t - 1], step: this.xNumSteps[t - 1], highestStep: this.xHighestCompleteStep[t - 1] },
                                stepAfter: { startValue: this.xVal[t], step: this.xNumSteps[t], highestStep: this.xHighestCompleteStep[t] },
                            };
                        }),
                        (e.prototype.countStepDecimals = function () {
                            var e = this.xNumSteps.map(ze);
                            return Math.max.apply(null, e);
                        }),
                        (e.prototype.hasNoSize = function () {
                            return this.xVal[0] === this.xVal[this.xVal.length - 1];
                        }),
                        (e.prototype.convert = function (e) {
                            return this.getStep(this.toStepping(e));
                        }),
                        (e.prototype.handleEntryPoint = function (e, t) {
                            var n;
                            if (!Re((n = "min" === e ? 0 : "max" === e ? 100 : parseFloat(e))) || !Re(t[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
                            this.xPct.push(n), this.xVal.push(t[0]);
                            var r = Number(t[1]);
                            n ? this.xSteps.push(!isNaN(r) && r) : isNaN(r) || (this.xSteps[0] = r), this.xHighestCompleteStep.push(0);
                        }),
                        (e.prototype.handleStepPoint = function (e, t) {
                            if (t)
                                if (this.xVal[e] !== this.xVal[e + 1]) {
                                    this.xSteps[e] = Qe([this.xVal[e], this.xVal[e + 1]], t, 0) / We(this.xPct[e], this.xPct[e + 1]);
                                    var n = (this.xVal[e + 1] - this.xVal[e]) / this.xNumSteps[e],
                                        r = Math.ceil(Number(n.toFixed(3)) - 1),
                                        o = this.xVal[e] + this.xNumSteps[e] * r;
                                    this.xHighestCompleteStep[e] = o;
                                } else this.xSteps[e] = this.xHighestCompleteStep[e] = this.xVal[e];
                        }),
                        e
                    );
                })(),
                    Xe = {
                        to: function (e) {
                            return void 0 === e ? "" : e.toFixed(2);
                        },
                        from: Number,
                    },
                    Ze = {
                        target: "target",
                        base: "base",
                        origin: "origin",
                        handle: "handle",
                        handleLower: "handle-lower",
                        handleUpper: "handle-upper",
                        touchArea: "touch-area",
                        horizontal: "horizontal",
                        vertical: "vertical",
                        background: "background",
                        connect: "connect",
                        connects: "connects",
                        ltr: "ltr",
                        rtl: "rtl",
                        textDirectionLtr: "txt-dir-ltr",
                        textDirectionRtl: "txt-dir-rtl",
                        draggable: "draggable",
                        drag: "state-drag",
                        tap: "state-tap",
                        active: "active",
                        tooltip: "tooltip",
                        pips: "pips",
                        pipsHorizontal: "pips-horizontal",
                        pipsVertical: "pips-vertical",
                        marker: "marker",
                        markerHorizontal: "marker-horizontal",
                        markerVertical: "marker-vertical",
                        markerNormal: "marker-normal",
                        markerLarge: "marker-large",
                        markerSub: "marker-sub",
                        value: "value",
                        valueHorizontal: "value-horizontal",
                        valueVertical: "value-vertical",
                        valueNormal: "value-normal",
                        valueLarge: "value-large",
                        valueSub: "value-sub",
                    },
                    et = ".__tooltips",
                    tt = ".__aria";
                function nt(e, t) {
                    if (!Re(t)) throw new Error("noUiSlider: 'step' is not numeric.");
                    e.singleStep = t;
                }
                function rt(e, t) {
                    if (!Re(t)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
                    e.keyboardPageMultiplier = t;
                }
                function ot(e, t) {
                    if (!Re(t)) throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
                    e.keyboardMultiplier = t;
                }
                function it(e, t) {
                    if (!Re(t)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
                    e.keyboardDefaultStep = t;
                }
                function st(e, t) {
                    if ("object" != typeof t || Array.isArray(t)) throw new Error("noUiSlider: 'range' is not an object.");
                    if (void 0 === t.min || void 0 === t.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
                    e.spectrum = new Je(t, e.snap || !1, e.singleStep);
                }
                function at(e, t) {
                    if (((t = He(t)), !Array.isArray(t) || !t.length)) throw new Error("noUiSlider: 'start' option is incorrect.");
                    (e.handles = t.length), (e.start = t);
                }
                function lt(e, t) {
                    if ("boolean" != typeof t) throw new Error("noUiSlider: 'snap' option must be a boolean.");
                    e.snap = t;
                }
                function ct(e, t) {
                    if ("boolean" != typeof t) throw new Error("noUiSlider: 'animate' option must be a boolean.");
                    e.animate = t;
                }
                function dt(e, t) {
                    if ("number" != typeof t) throw new Error("noUiSlider: 'animationDuration' option must be a number.");
                    e.animationDuration = t;
                }
                function ut(e, t) {
                    var n,
                        r = [!1];
                    if (("lower" === t ? (t = [!0, !1]) : "upper" === t && (t = [!1, !0]), !0 === t || !1 === t)) {
                        for (n = 1; n < e.handles; n++) r.push(t);
                        r.push(!1);
                    } else {
                        if (!Array.isArray(t) || !t.length || t.length !== e.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
                        r = t;
                    }
                    e.connect = r;
                }
                function pt(e, t) {
                    switch (t) {
                        case "horizontal":
                            e.ort = 0;
                            break;
                        case "vertical":
                            e.ort = 1;
                            break;
                        default:
                            throw new Error("noUiSlider: 'orientation' option is invalid.");
                    }
                }
                function ft(e, t) {
                    if (!Re(t)) throw new Error("noUiSlider: 'margin' option must be numeric.");
                    0 !== t && (e.margin = e.spectrum.getDistance(t));
                }
                function ht(e, t) {
                    if (!Re(t)) throw new Error("noUiSlider: 'limit' option must be numeric.");
                    if (((e.limit = e.spectrum.getDistance(t)), !e.limit || e.handles < 2)) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
                }
                function mt(e, t) {
                    var n;
                    if (!Re(t) && !Array.isArray(t)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
                    if (Array.isArray(t) && 2 !== t.length && !Re(t[0]) && !Re(t[1])) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
                    if (0 !== t) {
                        for (Array.isArray(t) || (t = [t, t]), e.padding = [e.spectrum.getDistance(t[0]), e.spectrum.getDistance(t[1])], n = 0; n < e.spectrum.xNumSteps.length - 1; n++)
                            if (e.padding[0][n] < 0 || e.padding[1][n] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
                        var r = t[0] + t[1],
                            o = e.spectrum.xVal[0];
                        if (r / (e.spectrum.xVal[e.spectrum.xVal.length - 1] - o) > 1) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
                    }
                }
                function gt(e, t) {
                    switch (t) {
                        case "ltr":
                            e.dir = 0;
                            break;
                        case "rtl":
                            e.dir = 1;
                            break;
                        default:
                            throw new Error("noUiSlider: 'direction' option was not recognized.");
                    }
                }
                function vt(e, t) {
                    if ("string" != typeof t) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
                    var n = t.indexOf("tap") >= 0,
                        r = t.indexOf("drag") >= 0,
                        o = t.indexOf("fixed") >= 0,
                        i = t.indexOf("snap") >= 0,
                        s = t.indexOf("hover") >= 0,
                        a = t.indexOf("unconstrained") >= 0,
                        l = t.indexOf("drag-all") >= 0,
                        c = t.indexOf("smooth-steps") >= 0;
                    if (o) {
                        if (2 !== e.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
                        ft(e, e.start[1] - e.start[0]);
                    }
                    if (a && (e.margin || e.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
                    e.events = { tap: n || i, drag: r, dragAll: l, smoothSteps: c, fixed: o, snap: i, hover: s, unconstrained: a };
                }
                function yt(e, t) {
                    if (!1 !== t)
                        if (!0 === t || Te(t)) {
                            e.tooltips = [];
                            for (var n = 0; n < e.handles; n++) e.tooltips.push(t);
                        } else {
                            if ((t = He(t)).length !== e.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
                            t.forEach(function (e) {
                                if ("boolean" != typeof e && !Te(e)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
                            }),
                                (e.tooltips = t);
                        }
                }
                function bt(e, t) {
                    if (t.length !== e.handles) throw new Error("noUiSlider: must pass a attributes for all handles.");
                    e.handleAttributes = t;
                }
                function wt(e, t) {
                    if (!Te(t)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
                    e.ariaFormat = t;
                }
                function St(e, t) {
                    if (
                        !(function (e) {
                            return Te(e) && "function" == typeof e.from;
                        })(t)
                    )
                        throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
                    e.format = t;
                }
                function xt(e, t) {
                    if ("boolean" != typeof t) throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
                    e.keyboardSupport = t;
                }
                function Et(e, t) {
                    e.documentElement = t;
                }
                function At(e, t) {
                    if ("string" != typeof t && !1 !== t) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
                    e.cssPrefix = t;
                }
                function Ct(e, t) {
                    if ("object" != typeof t) throw new Error("noUiSlider: 'cssClasses' must be an object.");
                    "string" == typeof e.cssPrefix
                        ? ((e.cssClasses = {}),
                            Object.keys(t).forEach(function (n) {
                                e.cssClasses[n] = e.cssPrefix + t[n];
                            }))
                        : (e.cssClasses = t);
                }
                function _t(e) {
                    var t = { margin: null, limit: null, padding: null, animate: !0, animationDuration: 300, ariaFormat: Xe, format: Xe },
                        n = {
                            step: { r: !1, t: nt },
                            keyboardPageMultiplier: { r: !1, t: rt },
                            keyboardMultiplier: { r: !1, t: ot },
                            keyboardDefaultStep: { r: !1, t: it },
                            start: { r: !0, t: at },
                            connect: { r: !0, t: ut },
                            direction: { r: !0, t: gt },
                            snap: { r: !1, t: lt },
                            animate: { r: !1, t: ct },
                            animationDuration: { r: !1, t: dt },
                            range: { r: !0, t: st },
                            orientation: { r: !1, t: pt },
                            margin: { r: !1, t: ft },
                            limit: { r: !1, t: ht },
                            padding: { r: !1, t: mt },
                            behaviour: { r: !0, t: vt },
                            ariaFormat: { r: !1, t: wt },
                            format: { r: !1, t: St },
                            tooltips: { r: !1, t: yt },
                            keyboardSupport: { r: !0, t: xt },
                            documentElement: { r: !1, t: Et },
                            cssPrefix: { r: !0, t: At },
                            cssClasses: { r: !0, t: Ct },
                            handleAttributes: { r: !1, t: bt },
                        },
                        r = { connect: !1, direction: "ltr", behaviour: "tap", orientation: "horizontal", keyboardSupport: !0, cssPrefix: "noUi-", cssClasses: Ze, keyboardPageMultiplier: 5, keyboardMultiplier: 1, keyboardDefaultStep: 10 };
                    e.format && !e.ariaFormat && (e.ariaFormat = e.format),
                        Object.keys(n).forEach(function (o) {
                            if (Ve(e[o]) || void 0 !== r[o]) n[o].t(t, Ve(e[o]) ? e[o] : r[o]);
                            else if (n[o].r) throw new Error("noUiSlider: '" + o + "' is required.");
                        }),
                        (t.pips = e.pips);
                    var o = document.createElement("div"),
                        i = void 0 !== o.style.msTransform,
                        s = void 0 !== o.style.transform;
                    return (
                        (t.transformRule = s ? "transform" : i ? "msTransform" : "webkitTransform"),
                        (t.style = [
                            ["left", "top"],
                            ["right", "bottom"],
                        ][t.dir][t.ort]),
                        t
                    );
                }
                function kt(e, t, n) {
                    var r,
                        o,
                        i,
                        s,
                        a,
                        l,
                        c,
                        d = window.navigator.pointerEnabled
                            ? { start: "pointerdown", move: "pointermove", end: "pointerup" }
                            : window.navigator.msPointerEnabled
                                ? { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" }
                                : { start: "mousedown touchstart", move: "mousemove touchmove", end: "mouseup touchend" },
                        u =
                            window.CSS &&
                            CSS.supports &&
                            CSS.supports("touch-action", "none") &&
                            (function () {
                                var e = !1;
                                try {
                                    var t = Object.defineProperty({}, "passive", {
                                        get: function () {
                                            e = !0;
                                        },
                                    });
                                    window.addEventListener("test", null, t);
                                } catch (e) { }
                                return e;
                            })(),
                        p = e,
                        f = t.spectrum,
                        h = [],
                        m = [],
                        g = [],
                        v = 0,
                        y = {},
                        b = e.ownerDocument,
                        w = t.documentElement || b.documentElement,
                        S = b.body,
                        x = "rtl" === b.dir || 1 === t.ort ? 0 : 100;
                    function E(e, t) {
                        var n = b.createElement("div");
                        return t && Be(n, t), e.appendChild(n), n;
                    }
                    function A(e, n) {
                        var r = E(e, t.cssClasses.origin),
                            o = E(r, t.cssClasses.handle);
                        if (
                            (E(o, t.cssClasses.touchArea),
                                o.setAttribute("data-handle", String(n)),
                                t.keyboardSupport &&
                                (o.setAttribute("tabindex", "0"),
                                    o.addEventListener("keydown", function (e) {
                                        return (function (e, n) {
                                            if (k() || O(n)) return !1;
                                            var r = ["Left", "Right"],
                                                o = ["Down", "Up"],
                                                i = ["PageDown", "PageUp"],
                                                s = ["Home", "End"];
                                            t.dir && !t.ort ? r.reverse() : t.ort && !t.dir && (o.reverse(), i.reverse());
                                            var a,
                                                l = e.key.replace("Arrow", ""),
                                                c = l === i[0],
                                                d = l === i[1],
                                                u = l === o[0] || l === r[0] || c,
                                                p = l === o[1] || l === r[1] || d,
                                                g = l === s[1];
                                            if (!(u || p || l === s[0] || g)) return !0;
                                            if ((e.preventDefault(), p || u)) {
                                                var v = u ? 0 : 1,
                                                    y = ee(n)[v];
                                                if (null === y) return !1;
                                                !1 === y && (y = f.getDefaultStep(m[n], u, t.keyboardDefaultStep)), (y *= d || c ? t.keyboardPageMultiplier : t.keyboardMultiplier), (y = Math.max(y, 1e-7)), (y *= u ? -1 : 1), (a = h[n] + y);
                                            } else a = g ? t.spectrum.xVal[t.spectrum.xVal.length - 1] : t.spectrum.xVal[0];
                                            return Q(n, f.toStepping(a), !0, !0), H("slide", n), H("update", n), H("change", n), H("set", n), !1;
                                        })(e, n);
                                    })),
                                void 0 !== t.handleAttributes)
                        ) {
                            var i = t.handleAttributes[n];
                            Object.keys(i).forEach(function (e) {
                                o.setAttribute(e, i[e]);
                            });
                        }
                        return (
                            o.setAttribute("role", "slider"),
                            o.setAttribute("aria-orientation", t.ort ? "vertical" : "horizontal"),
                            0 === n ? Be(o, t.cssClasses.handleLower) : n === t.handles - 1 && Be(o, t.cssClasses.handleUpper),
                            (r.handle = o),
                            r
                        );
                    }
                    function C(e, n) {
                        return !!n && E(e, t.cssClasses.connect);
                    }
                    function _(e, n) {
                        return !(!t.tooltips || !t.tooltips[n]) && E(e.firstChild, t.cssClasses.tooltip);
                    }
                    function k() {
                        return p.hasAttribute("disabled");
                    }
                    function O(e) {
                        return o[e].hasAttribute("disabled");
                    }
                    function L() {
                        a &&
                            (U("update" + et),
                                a.forEach(function (e) {
                                    e && Me(e);
                                }),
                                (a = null));
                    }
                    function I() {
                        L(),
                            (a = o.map(_)),
                            j("update" + et, function (e, n, r) {
                                if (a && t.tooltips && !1 !== a[n]) {
                                    var o = e[n];
                                    !0 !== t.tooltips[n] && (o = t.tooltips[n].to(r[n])), (a[n].innerHTML = o);
                                }
                            });
                    }
                    function P(e, t) {
                        return e.map(function (e) {
                            return f.fromStepping(t ? f.getStep(e) : e);
                        });
                    }
                    function q() {
                        s && (Me(s), (s = null));
                    }
                    function F(e) {
                        q();
                        var n = (function (e) {
                            var t,
                                n = (function (e) {
                                    if (e.mode === Ne.Range || e.mode === Ne.Steps) return f.xVal;
                                    if (e.mode === Ne.Count) {
                                        if (e.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
                                        for (var t = e.values - 1, n = 100 / t, r = []; t--;) r[t] = t * n;
                                        return r.push(100), P(r, e.stepped);
                                    }
                                    return e.mode === Ne.Positions
                                        ? P(e.values, e.stepped)
                                        : e.mode === Ne.Values
                                            ? e.stepped
                                                ? e.values.map(function (e) {
                                                    return f.fromStepping(f.getStep(f.toStepping(e)));
                                                })
                                                : e.values
                                            : [];
                                })(e),
                                r = {},
                                o = f.xVal[0],
                                i = f.xVal[f.xVal.length - 1],
                                s = !1,
                                a = !1,
                                l = 0;
                            return (
                                (t = n.slice().sort(function (e, t) {
                                    return e - t;
                                })),
                                (n = t.filter(function (e) {
                                    return !this[e] && (this[e] = !0);
                                }, {})),
                                n[0] !== o && (n.unshift(o), (s = !0)),
                                n[n.length - 1] !== i && (n.push(i), (a = !0)),
                                n.forEach(function (t, o) {
                                    var i,
                                        c,
                                        d,
                                        u,
                                        p,
                                        h,
                                        m,
                                        g,
                                        v,
                                        y,
                                        b = t,
                                        w = n[o + 1],
                                        S = e.mode === Ne.Steps;
                                    for (S && (i = f.xNumSteps[o]), i || (i = w - b), void 0 === w && (w = b), i = Math.max(i, 1e-7), c = b; c <= w; c = Number((c + i).toFixed(7))) {
                                        for (g = (p = (u = f.toStepping(c)) - l) / (e.density || 1), y = p / (v = Math.round(g)), d = 1; d <= v; d += 1) r[(h = l + d * y).toFixed(5)] = [f.fromStepping(h), 0];
                                        (m = n.indexOf(c) > -1 ? De.LargeValue : S ? De.SmallValue : De.NoValue), !o && s && c !== w && (m = 0), (c === w && a) || (r[u.toFixed(5)] = [c, m]), (l = u);
                                    }
                                }),
                                r
                            );
                        })(e),
                            r = e.filter,
                            o = e.format || {
                                to: function (e) {
                                    return String(Math.round(e));
                                },
                            };
                        return (s = p.appendChild(
                            (function (e, n, r) {
                                var o,
                                    i,
                                    s = b.createElement("div"),
                                    a = (((o = {})[De.None] = ""), (o[De.NoValue] = t.cssClasses.valueNormal), (o[De.LargeValue] = t.cssClasses.valueLarge), (o[De.SmallValue] = t.cssClasses.valueSub), o),
                                    l = (((i = {})[De.None] = ""), (i[De.NoValue] = t.cssClasses.markerNormal), (i[De.LargeValue] = t.cssClasses.markerLarge), (i[De.SmallValue] = t.cssClasses.markerSub), i),
                                    c = [t.cssClasses.valueHorizontal, t.cssClasses.valueVertical],
                                    d = [t.cssClasses.markerHorizontal, t.cssClasses.markerVertical];
                                function u(e, n) {
                                    var r = n === t.cssClasses.value,
                                        o = r ? a : l;
                                    return n + " " + (r ? c : d)[t.ort] + " " + o[e];
                                }
                                return (
                                    Be(s, t.cssClasses.pips),
                                    Be(s, 0 === t.ort ? t.cssClasses.pipsHorizontal : t.cssClasses.pipsVertical),
                                    Object.keys(e).forEach(function (o) {
                                        !(function (e, o, i) {
                                            if ((i = n ? n(o, i) : i) !== De.None) {
                                                var a = E(s, !1);
                                                (a.className = u(i, t.cssClasses.marker)),
                                                    (a.style[t.style] = e + "%"),
                                                    i > De.NoValue && (((a = E(s, !1)).className = u(i, t.cssClasses.value)), a.setAttribute("data-value", String(o)), (a.style[t.style] = e + "%"), (a.innerHTML = String(r.to(o))));
                                            }
                                        })(o, e[o][0], e[o][1]);
                                    }),
                                    s
                                );
                            })(n, r, o)
                        ));
                    }
                    function N() {
                        var e = r.getBoundingClientRect(),
                            n = "offset" + ["Width", "Height"][t.ort];
                        return 0 === t.ort ? e.width || r[n] : e.height || r[n];
                    }
                    function D(e, n, r, o) {
                        var i = function (i) {
                            var s,
                                a,
                                l = (function (e, t, n) {
                                    var r = 0 === e.type.indexOf("touch"),
                                        o = 0 === e.type.indexOf("mouse"),
                                        i = 0 === e.type.indexOf("pointer"),
                                        s = 0,
                                        a = 0;
                                    if ((0 === e.type.indexOf("MSPointer") && (i = !0), "mousedown" === e.type && !e.buttons && !e.touches)) return !1;
                                    if (r) {
                                        var l = function (t) {
                                            var r = t.target;
                                            return r === n || n.contains(r) || (e.composed && e.composedPath().shift() === n);
                                        };
                                        if ("touchstart" === e.type) {
                                            var c = Array.prototype.filter.call(e.touches, l);
                                            if (c.length > 1) return !1;
                                            (s = c[0].pageX), (a = c[0].pageY);
                                        } else {
                                            var d = Array.prototype.find.call(e.changedTouches, l);
                                            if (!d) return !1;
                                            (s = d.pageX), (a = d.pageY);
                                        }
                                    }
                                    return (t = t || Ye(b)), (o || i) && ((s = e.clientX + t.x), (a = e.clientY + t.y)), (e.pageOffset = t), (e.points = [s, a]), (e.cursor = o || i), e;
                                })(i, o.pageOffset, o.target || n);
                            return (
                                !!l &&
                                !(k() && !o.doNotReject) &&
                                ((s = p),
                                    (a = t.cssClasses.tap),
                                    !((s.classList ? s.classList.contains(a) : new RegExp("\\b" + a + "\\b").test(s.className)) && !o.doNotReject) &&
                                    !(e === d.start && void 0 !== l.buttons && l.buttons > 1) &&
                                    (!o.hover || !l.buttons) &&
                                    (u || l.preventDefault(), (l.calcPoint = l.points[t.ort]), void r(l, o)))
                            );
                        },
                            s = [];
                        return (
                            e.split(" ").forEach(function (e) {
                                n.addEventListener(e, i, !!u && { passive: !0 }), s.push([e, i]);
                            }),
                            s
                        );
                    }
                    function T(e) {
                        var n,
                            o,
                            i,
                            s,
                            a,
                            l,
                            c =
                                (100 *
                                    (e -
                                        ((n = r),
                                            (o = t.ort),
                                            (i = n.getBoundingClientRect()),
                                            (a = (s = n.ownerDocument).documentElement),
                                            (l = Ye(s)),
                                            /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (l.x = 0),
                                            o ? i.top + l.y - a.clientTop : i.left + l.x - a.clientLeft))) /
                                N();
                        return (c = Ue(c)), t.dir ? 100 - c : c;
                    }
                    function M(e, t) {
                        "mouseout" === e.type && "HTML" === e.target.nodeName && null === e.relatedTarget && $(e, t);
                    }
                    function V(e, n) {
                        if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === e.buttons && 0 !== n.buttonsProperty) return $(e, n);
                        var r = (t.dir ? -1 : 1) * (e.calcPoint - n.startCalcPoint);
                        K(r > 0, (100 * r) / n.baseSize, n.locations, n.handleNumbers, n.connect);
                    }
                    function $(e, n) {
                        n.handle && (Ke(n.handle, t.cssClasses.active), (v -= 1)),
                            n.listeners.forEach(function (e) {
                                w.removeEventListener(e[0], e[1]);
                            }),
                            0 === v && (Ke(p, t.cssClasses.drag), W(), e.cursor && ((S.style.cursor = ""), S.removeEventListener("selectstart", $e))),
                            t.events.smoothSteps &&
                            (n.handleNumbers.forEach(function (e) {
                                Q(e, m[e], !0, !0, !1, !1);
                            }),
                                n.handleNumbers.forEach(function (e) {
                                    H("update", e);
                                })),
                            n.handleNumbers.forEach(function (e) {
                                H("change", e), H("set", e), H("end", e);
                            });
                    }
                    function R(e, n) {
                        if (!n.handleNumbers.some(O)) {
                            var r;
                            1 === n.handleNumbers.length && ((r = o[n.handleNumbers[0]].children[0]), (v += 1), Be(r, t.cssClasses.active)), e.stopPropagation();
                            var i = [],
                                s = D(d.move, w, V, {
                                    target: e.target,
                                    handle: r,
                                    connect: n.connect,
                                    listeners: i,
                                    startCalcPoint: e.calcPoint,
                                    baseSize: N(),
                                    pageOffset: e.pageOffset,
                                    handleNumbers: n.handleNumbers,
                                    buttonsProperty: e.buttons,
                                    locations: m.slice(),
                                }),
                                a = D(d.end, w, $, { target: e.target, handle: r, listeners: i, doNotReject: !0, handleNumbers: n.handleNumbers }),
                                l = D("mouseout", w, M, { target: e.target, handle: r, listeners: i, doNotReject: !0, handleNumbers: n.handleNumbers });
                            i.push.apply(i, s.concat(a, l)),
                                e.cursor && ((S.style.cursor = getComputedStyle(e.target).cursor), o.length > 1 && Be(p, t.cssClasses.drag), S.addEventListener("selectstart", $e, !1)),
                                n.handleNumbers.forEach(function (e) {
                                    H("start", e);
                                });
                        }
                    }
                    function j(e, t) {
                        (y[e] = y[e] || []),
                            y[e].push(t),
                            "update" === e.split(".")[0] &&
                            o.forEach(function (e, t) {
                                H("update", t);
                            });
                    }
                    function U(e) {
                        var t = e && e.split(".")[0],
                            n = t ? e.substring(t.length) : e;
                        Object.keys(y).forEach(function (e) {
                            var r = e.split(".")[0],
                                o = e.substring(r.length);
                            (t && t !== r) ||
                                (n && n !== o) ||
                                ((function (e) {
                                    return e === tt || e === et;
                                })(o) &&
                                    n !== o) ||
                                delete y[e];
                        });
                    }
                    function H(e, n, r) {
                        Object.keys(y).forEach(function (o) {
                            var i = o.split(".")[0];
                            e === i &&
                                y[o].forEach(function (e) {
                                    e.call(te, h.map(t.format.to), n, h.slice(), r || !1, m.slice(), te);
                                });
                        });
                    }
                    function z(e, n, r, i, s, a, l) {
                        var c;
                        return (
                            o.length > 1 &&
                            !t.events.unconstrained &&
                            (i && n > 0 && ((c = f.getAbsoluteDistance(e[n - 1], t.margin, !1)), (r = Math.max(r, c))), s && n < o.length - 1 && ((c = f.getAbsoluteDistance(e[n + 1], t.margin, !0)), (r = Math.min(r, c)))),
                            o.length > 1 &&
                            t.limit &&
                            (i && n > 0 && ((c = f.getAbsoluteDistance(e[n - 1], t.limit, !1)), (r = Math.min(r, c))), s && n < o.length - 1 && ((c = f.getAbsoluteDistance(e[n + 1], t.limit, !0)), (r = Math.max(r, c)))),
                            t.padding && (0 === n && ((c = f.getAbsoluteDistance(0, t.padding[0], !1)), (r = Math.max(r, c))), n === o.length - 1 && ((c = f.getAbsoluteDistance(100, t.padding[1], !0)), (r = Math.min(r, c)))),
                            l || (r = f.getStep(r)),
                            !((r = Ue(r)) === e[n] && !a) && r
                        );
                    }
                    function B(e, n) {
                        var r = t.ort;
                        return (r ? n : e) + ", " + (r ? e : n);
                    }
                    function K(e, n, r, o, i) {
                        var s = r.slice(),
                            a = o[0],
                            l = t.events.smoothSteps,
                            c = [!e, e],
                            d = [e, !e];
                        (o = o.slice()),
                            e && o.reverse(),
                            o.length > 1
                                ? o.forEach(function (e, t) {
                                    var r = z(s, e, s[e] + n, c[t], d[t], !1, l);
                                    !1 === r ? (n = 0) : ((n = r - s[e]), (s[e] = r));
                                })
                                : (c = d = [!0]);
                        var u = !1;
                        o.forEach(function (e, t) {
                            u = Q(e, r[e] + n, c[t], d[t], !1, l) || u;
                        }),
                            u &&
                            (o.forEach(function (e) {
                                H("update", e), H("slide", e);
                            }),
                                null != i && H("drag", a));
                    }
                    function Y(e, n) {
                        return t.dir ? 100 - e - n : e;
                    }
                    function W() {
                        g.forEach(function (e) {
                            var t = m[e] > 50 ? -1 : 1,
                                n = 3 + (o.length + t * e);
                            o[e].style.zIndex = String(n);
                        });
                    }
                    function Q(e, n, r, i, s, a) {
                        return (
                            s || (n = z(m, e, n, r, i, !1, a)),
                            !1 !== n &&
                            ((function (e, n) {
                                (m[e] = n), (h[e] = f.fromStepping(n));
                                var r = "translate(" + B(Y(n, 0) - x + "%", "0") + ")";
                                (o[e].style[t.transformRule] = r), G(e), G(e + 1);
                            })(e, n),
                                !0)
                        );
                    }
                    function G(e) {
                        if (i[e]) {
                            var n = 0,
                                r = 100;
                            0 !== e && (n = m[e - 1]), e !== i.length - 1 && (r = m[e]);
                            var o = r - n,
                                s = "translate(" + B(Y(n, o) + "%", "0") + ")",
                                a = "scale(" + B(o / 100, "1") + ")";
                            i[e].style[t.transformRule] = s + " " + a;
                        }
                    }
                    function J(e, n) {
                        return null === e || !1 === e || void 0 === e ? m[n] : ("number" == typeof e && (e = String(e)), !1 !== (e = t.format.from(e)) && (e = f.toStepping(e)), !1 === e || isNaN(e) ? m[n] : e);
                    }
                    function X(e, n, r) {
                        var o = He(e),
                            i = void 0 === m[0];
                        (n = void 0 === n || n),
                            t.animate && !i && je(p, t.cssClasses.tap, t.animationDuration),
                            g.forEach(function (e) {
                                Q(e, J(o[e], e), !0, !1, r);
                            });
                        var s = 1 === g.length ? 0 : 1;
                        if (i && f.hasNoSize() && ((r = !0), (m[0] = 0), g.length > 1)) {
                            var a = 100 / (g.length - 1);
                            g.forEach(function (e) {
                                m[e] = e * a;
                            });
                        }
                        for (; s < g.length; ++s)
                            g.forEach(function (e) {
                                Q(e, m[e], !0, !0, r);
                            });
                        W(),
                            g.forEach(function (e) {
                                H("update", e), null !== o[e] && n && H("set", e);
                            });
                    }
                    function Z(e) {
                        if ((void 0 === e && (e = !1), e)) return 1 === h.length ? h[0] : h.slice(0);
                        var n = h.map(t.format.to);
                        return 1 === n.length ? n[0] : n;
                    }
                    function ee(e) {
                        var n = m[e],
                            r = f.getNearbySteps(n),
                            o = h[e],
                            i = r.thisStep.step,
                            s = null;
                        if (t.snap) return [o - r.stepBefore.startValue || null, r.stepAfter.startValue - o || null];
                        !1 !== i && o + i > r.stepAfter.startValue && (i = r.stepAfter.startValue - o),
                            (s = o > r.thisStep.startValue ? r.thisStep.step : !1 !== r.stepBefore.step && o - r.stepBefore.highestStep),
                            100 === n ? (i = null) : 0 === n && (s = null);
                        var a = f.countStepDecimals();
                        return null !== i && !1 !== i && (i = Number(i.toFixed(a))), null !== s && !1 !== s && (s = Number(s.toFixed(a))), [s, i];
                    }
                    Be((l = p), t.cssClasses.target),
                        0 === t.dir ? Be(l, t.cssClasses.ltr) : Be(l, t.cssClasses.rtl),
                        0 === t.ort ? Be(l, t.cssClasses.horizontal) : Be(l, t.cssClasses.vertical),
                        Be(l, "rtl" === getComputedStyle(l).direction ? t.cssClasses.textDirectionRtl : t.cssClasses.textDirectionLtr),
                        (r = E(l, t.cssClasses.base)),
                        (function (e, n) {
                            var r = E(n, t.cssClasses.connects);
                            (o = []), (i = []).push(C(r, e[0]));
                            for (var s = 0; s < t.handles; s++) o.push(A(n, s)), (g[s] = s), i.push(C(r, e[s + 1]));
                        })(t.connect, r),
                        (c = t.events).fixed ||
                        o.forEach(function (e, t) {
                            D(d.start, e.children[0], R, { handleNumbers: [t] });
                        }),
                        c.tap &&
                        D(
                            d.start,
                            r,
                            function (e) {
                                e.stopPropagation();
                                var n = T(e.calcPoint),
                                    r = (function (e) {
                                        var t = 100,
                                            n = !1;
                                        return (
                                            o.forEach(function (r, o) {
                                                if (!O(o)) {
                                                    var i = m[o],
                                                        s = Math.abs(i - e);
                                                    (s < t || (s <= t && e > i) || (100 === s && 100 === t)) && ((n = o), (t = s));
                                                }
                                            }),
                                            n
                                        );
                                    })(n);
                                !1 !== r &&
                                    (t.events.snap || je(p, t.cssClasses.tap, t.animationDuration),
                                        Q(r, n, !0, !0),
                                        W(),
                                        H("slide", r, !0),
                                        H("update", r, !0),
                                        t.events.snap ? R(e, { handleNumbers: [r] }) : (H("change", r, !0), H("set", r, !0)));
                            },
                            {}
                        ),
                        c.hover &&
                        D(
                            d.move,
                            r,
                            function (e) {
                                var t = T(e.calcPoint),
                                    n = f.getStep(t),
                                    r = f.fromStepping(n);
                                Object.keys(y).forEach(function (e) {
                                    "hover" === e.split(".")[0] &&
                                        y[e].forEach(function (e) {
                                            e.call(te, r);
                                        });
                                });
                            },
                            { hover: !0 }
                        ),
                        c.drag &&
                        i.forEach(function (e, n) {
                            if (!1 !== e && 0 !== n && n !== i.length - 1) {
                                var r = o[n - 1],
                                    s = o[n],
                                    a = [e],
                                    l = [r, s],
                                    u = [n - 1, n];
                                Be(e, t.cssClasses.draggable),
                                    c.fixed && (a.push(r.children[0]), a.push(s.children[0])),
                                    c.dragAll && ((l = o), (u = g)),
                                    a.forEach(function (t) {
                                        D(d.start, t, R, { handles: l, handleNumbers: u, connect: e });
                                    });
                            }
                        }),
                        X(t.start),
                        t.pips && F(t.pips),
                        t.tooltips && I(),
                        U("update" + tt),
                        j("update" + tt, function (e, n, r, i, s) {
                            g.forEach(function (e) {
                                var n = o[e],
                                    i = z(m, e, 0, !0, !0, !0),
                                    a = z(m, e, 100, !0, !0, !0),
                                    l = s[e],
                                    c = String(t.ariaFormat.to(r[e]));
                                (i = f.fromStepping(i).toFixed(1)),
                                    (a = f.fromStepping(a).toFixed(1)),
                                    (l = f.fromStepping(l).toFixed(1)),
                                    n.children[0].setAttribute("aria-valuemin", i),
                                    n.children[0].setAttribute("aria-valuemax", a),
                                    n.children[0].setAttribute("aria-valuenow", l),
                                    n.children[0].setAttribute("aria-valuetext", c);
                            });
                        });
                    var te = {
                        destroy: function () {
                            for (
                                U(tt),
                                U(et),
                                Object.keys(t.cssClasses).forEach(function (e) {
                                    Ke(p, t.cssClasses[e]);
                                });
                                p.firstChild;

                            )
                                p.removeChild(p.firstChild);
                            delete p.noUiSlider;
                        },
                        steps: function () {
                            return g.map(ee);
                        },
                        on: j,
                        off: U,
                        get: Z,
                        set: X,
                        setHandle: function (e, t, n, r) {
                            if (!((e = Number(e)) >= 0 && e < g.length)) throw new Error("noUiSlider: invalid handle number, got: " + e);
                            Q(e, J(t, e), !0, !0, r), H("update", e), n && H("set", e);
                        },
                        reset: function (e) {
                            X(t.start, e);
                        },
                        disable: function (e) {
                            null != e
                                ? (o[e].setAttribute("disabled", ""), o[e].handle.removeAttribute("tabindex"))
                                : (p.setAttribute("disabled", ""),
                                    o.forEach(function (e) {
                                        e.handle.removeAttribute("tabindex");
                                    }));
                        },
                        enable: function (e) {
                            null != e
                                ? (o[e].removeAttribute("disabled"), o[e].handle.setAttribute("tabindex", "0"))
                                : (p.removeAttribute("disabled"),
                                    o.forEach(function (e) {
                                        e.removeAttribute("disabled"), e.handle.setAttribute("tabindex", "0");
                                    }));
                        },
                        __moveHandles: function (e, t, n) {
                            K(e, t, m, n);
                        },
                        options: n,
                        updateOptions: function (e, r) {
                            var o = Z(),
                                i = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips"];
                            i.forEach(function (t) {
                                void 0 !== e[t] && (n[t] = e[t]);
                            });
                            var s = _t(n);
                            i.forEach(function (n) {
                                void 0 !== e[n] && (t[n] = s[n]);
                            }),
                                (f = s.spectrum),
                                (t.margin = s.margin),
                                (t.limit = s.limit),
                                (t.padding = s.padding),
                                t.pips ? F(t.pips) : q(),
                                t.tooltips ? I() : L(),
                                (m = []),
                                X(Ve(e.start) ? e.start : o, r);
                        },
                        target: p,
                        removePips: q,
                        removeTooltips: L,
                        getPositions: function () {
                            return m.slice();
                        },
                        getTooltips: function () {
                            return a;
                        },
                        getOrigins: function () {
                            return o;
                        },
                        pips: F,
                    };
                    return te;
                }
                const Ot = function (e, t) {
                    if (!e || !e.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + e);
                    if (e.noUiSlider) throw new Error("noUiSlider: Slider was already initialized.");
                    var n = kt(e, _t(t), t);
                    return (e.noUiSlider = n), n;
                };
                var Lt = n(183),
                    It = n.n(Lt);
                const Pt = {
                    onChange: function (e) {
                        e !== window.location.pathname && (window.location.href = e);
                    },
                    onInitialize: function () {
                        this.setValue(window.location.pathname);
                    },
                },
                    qt = {
                        onChange: function (e) {
                            const t = document.querySelector('[data-select-target="forSchoolsDownload"]').querySelector(".button");
                            (t.href = e), t.setAttribute("target", "_blank");
                        },
                    };
                function Ft(e) {
                    e.setAttribute("data-site-animation-element", "animated");
                }
                function Nt(e) {
                    const t = 0.5 * (window.innerHeight - Z()),
                        n = 0.3 * e.getBoundingClientRect().height;
                    return n > t ? -t : -n;
                }
                var Dt = function () {
                    return (
                        (Dt =
                            Object.assign ||
                            function (e) {
                                for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                                return e;
                            }),
                        Dt.apply(this, arguments)
                    );
                };
                function Tt(e, t, n) {
                    if (n || 2 === arguments.length) for (var r, o = 0, i = t.length; o < i; o++) (!r && o in t) || (r || (r = Array.prototype.slice.call(t, 0, o)), (r[o] = t[o]));
                    return e.concat(r || Array.prototype.slice.call(t));
                }
                function Mt(e) {
                    return Array.prototype.slice.call(e);
                }
                function Vt(e, t) {
                    var n = Math.floor(e);
                    return n === t || n + 1 === t ? e : t;
                }
                function $t() {
                    return Date.now();
                }
                function Rt(e, t, n) {
                    if (((t = "data-keen-slider-" + t), null === n)) return e.removeAttribute(t);
                    e.setAttribute(t, n || "");
                }
                function jt(e, t) {
                    return (t = t || document), "function" == typeof e && (e = e(t)), Array.isArray(e) ? e : "string" == typeof e ? Mt(t.querySelectorAll(e)) : e instanceof HTMLElement ? [e] : e instanceof NodeList ? Mt(e) : [];
                }
                function Ut(e) {
                    e.raw && (e = e.raw), e.cancelable && !e.defaultPrevented && e.preventDefault();
                }
                function Ht(e) {
                    e.raw && (e = e.raw), e.stopPropagation && e.stopPropagation();
                }
                function zt() {
                    var e = [];
                    return {
                        add: function (t, n, r, o) {
                            t.addListener ? t.addListener(r) : t.addEventListener(n, r, o), e.push([t, n, r, o]);
                        },
                        input: function (e, t, n, r) {
                            this.add(
                                e,
                                t,
                                (function (e) {
                                    return function (t) {
                                        t.nativeEvent && (t = t.nativeEvent);
                                        var n = t.changedTouches || [],
                                            r = t.targetTouches || [],
                                            o = t.detail && t.detail.x ? t.detail : null;
                                        return e({
                                            id: o ? (o.identifier ? o.identifier : "i") : r[0] ? (r[0] ? r[0].identifier : "e") : "d",
                                            idChanged: o ? (o.identifier ? o.identifier : "i") : n[0] ? (n[0] ? n[0].identifier : "e") : "d",
                                            raw: t,
                                            x: o && o.x ? o.x : r[0] ? r[0].screenX : o ? o.x : t.pageX,
                                            y: o && o.y ? o.y : r[0] ? r[0].screenY : o ? o.y : t.pageY,
                                        });
                                    };
                                })(n),
                                r
                            );
                        },
                        purge: function () {
                            e.forEach(function (e) {
                                e[0].removeListener ? e[0].removeListener(e[2]) : e[0].removeEventListener(e[1], e[2], e[3]);
                            }),
                                (e = []);
                        },
                    };
                }
                function Bt(e, t, n) {
                    return Math.min(Math.max(e, t), n);
                }
                function Kt(e) {
                    return (e > 0 ? 1 : 0) - (e < 0 ? 1 : 0) || +e;
                }
                function Yt(e) {
                    var t = e.getBoundingClientRect();
                    return { height: Vt(t.height, e.offsetHeight), width: Vt(t.width, e.offsetWidth) };
                }
                function Wt(e, t, n, r) {
                    var o = e && e[t];
                    return null == o ? n : r && "function" == typeof o ? o() : o;
                }
                function Qt(e) {
                    return Math.round(1e6 * e) / 1e6;
                }
                function Gt(e) {
                    var t,
                        n,
                        r,
                        o,
                        i,
                        s,
                        a,
                        l,
                        c,
                        d,
                        u,
                        p,
                        f,
                        h,
                        m = 1 / 0,
                        g = [],
                        v = null,
                        y = 0;
                    function b(e) {
                        O(y + e);
                    }
                    function w(e) {
                        var t = S(y + e).abs;
                        return A(t) ? t : null;
                    }
                    function S(e) {
                        var t = Math.floor(Math.abs(Qt(e / n))),
                            r = Qt(((e % n) + n) % n);
                        r === n && (r = 0);
                        var o = Kt(e),
                            i = a.indexOf(
                                Tt([], a, !0).reduce(function (e, t) {
                                    return Math.abs(t - r) < Math.abs(e - r) ? t : e;
                                })
                            ),
                            l = i;
                        return o < 0 && t++, i === s && ((l = 0), (t += o > 0 ? 1 : -1)), { abs: l + t * s * o, origin: i, rel: l };
                    }
                    function x(e, t, n) {
                        var r;
                        if (t || !_()) return E(e, n);
                        if (!A(e)) return null;
                        var o = S(null != n ? n : y),
                            i = o.abs,
                            a = e - o.rel,
                            l = i + a;
                        r = E(l);
                        var c = E(l - s * Kt(a));
                        return ((null !== c && Math.abs(c) < Math.abs(r)) || null === r) && (r = c), Qt(r);
                    }
                    function E(e, t) {
                        if ((null == t && (t = Qt(y)), !A(e) || null === e)) return null;
                        e = Math.round(e);
                        var r = S(t),
                            o = r.abs,
                            i = r.rel,
                            l = r.origin,
                            c = k(e),
                            d = ((t % n) + n) % n,
                            u = a[l],
                            p = Math.floor((e - (o - i)) / s) * n;
                        return Qt(u - d - u + a[c] + p + (l === s ? n : 0));
                    }
                    function A(e) {
                        return C(e) === e;
                    }
                    function C(e) {
                        return Bt(e, c, d);
                    }
                    function _() {
                        return o.loop;
                    }
                    function k(e) {
                        return ((e % s) + s) % s;
                    }
                    function O(t) {
                        var n;
                        (n = t - y), g.push({ distance: n, timestamp: $t() }), g.length > 6 && (g = g.slice(-6)), (y = Qt(t));
                        var r = L().abs;
                        if (r !== v) {
                            var o = null !== v;
                            (v = r), o && e.emit("slideChanged");
                        }
                    }
                    function L(a) {
                        var l = a
                            ? null
                            : (function () {
                                if (s) {
                                    var e = _(),
                                        t = e ? ((y % n) + n) % n : y,
                                        a = (e ? y % n : y) - i[0][2],
                                        l = 0 - (a < 0 && e ? n - Math.abs(a) : a),
                                        m = 0,
                                        g = S(y),
                                        v = g.abs,
                                        b = g.rel,
                                        w = i[b][2],
                                        x = i.map(function (t, r) {
                                            var i = l + m;
                                            (i < 0 - t[0] || i > 1) && (i += (Math.abs(i) > n - 1 && e ? n : 0) * Kt(-i));
                                            var a = r - b,
                                                c = Kt(a),
                                                d = a + v;
                                            e && (-1 === c && i > w && (d += s), 1 === c && i < w && (d -= s), null !== u && d < u && (i += n), null !== p && d > p && (i -= n));
                                            var f = i + t[0] + t[1],
                                                h = Math.max(i >= 0 && f <= 1 ? 1 : f < 0 || i > 1 ? 0 : i < 0 ? Math.min(1, (t[0] + i) / t[0]) : (1 - i) / t[0], 0);
                                            return (m += t[0] + t[1]), { abs: d, distance: o.rtl ? -1 * i + 1 - t[0] : i, portion: h, size: t[0] };
                                        });
                                    return (v = C(v)), (b = k(v)), { abs: C(v), length: r, max: h, maxIdx: d, min: f, minIdx: c, position: y, progress: e ? t / n : y / r, rel: b, slides: x, slidesLength: n };
                                }
                            })();
                        return (t.details = l), e.emit("detailsChanged"), l;
                    }
                    return (t = {
                        absToRel: k,
                        add: b,
                        details: null,
                        distToIdx: w,
                        idxToDist: x,
                        init: function (t) {
                            if (
                                ((function () {
                                    if (
                                        ((o = e.options),
                                            (i = (o.trackConfig || []).map(function (e) {
                                                return [Wt(e, "size", 1), Wt(e, "spacing", 0), Wt(e, "origin", 0)];
                                            })),
                                            (s = i.length))
                                    ) {
                                        n = Qt(
                                            i.reduce(function (e, t) {
                                                return e + t[0] + t[1];
                                            }, 0)
                                        );
                                        var t,
                                            c = s - 1;
                                        (r = Qt(n + i[0][2] - i[c][0] - i[c][2] - i[c][1])),
                                            (a = i.reduce(function (e, n) {
                                                if (!e) return [0];
                                                var r = i[e.length - 1],
                                                    o = e[e.length - 1] + (r[0] + r[2]) + r[1];
                                                return (o -= n[2]), e[e.length - 1] > o && (o = e[e.length - 1]), (o = Qt(o)), e.push(o), (!t || t < o) && (l = e.length - 1), (t = o), e;
                                            }, null)),
                                            0 === r && (l = 0),
                                            a.push(Qt(n));
                                    }
                                })(),
                                    !s)
                            )
                                return L(!0);
                            var g;
                            !(function () {
                                var t = e.options.range,
                                    n = e.options.loop;
                                (u = c = n ? Wt(n, "min", -1 / 0) : 0), (p = d = n ? Wt(n, "max", m) : l);
                                var r = Wt(t, "min", null),
                                    o = Wt(t, "max", null);
                                r && (c = r),
                                    o && (d = o),
                                    (f = c === -1 / 0 ? c : e.track.idxToDist(c || 0, !0, 0)),
                                    (h = d === m ? d : x(d, !0, 0)),
                                    null === o && (p = d),
                                    Wt(t, "align", !1) && d !== m && 0 === i[k(d)][2] && ((h -= 1 - i[k(d)][0]), (d = w(h - y))),
                                    (f = Qt(f)),
                                    (h = Qt(h));
                            })(),
                                (g = t),
                                Number(g) === g ? b(E(C(t))) : L();
                        },
                        to: O,
                        velocity: function () {
                            var e = $t(),
                                t = g.reduce(
                                    function (t, n) {
                                        var r = n.distance,
                                            o = n.timestamp;
                                        return (
                                            e - o > 200 ||
                                            (Kt(r) !== Kt(t.distance) && t.distance && (t = { distance: 0, lastTimestamp: 0, time: 0 }),
                                                t.time && (t.distance += r),
                                                t.lastTimestamp && (t.time += o - t.lastTimestamp),
                                                (t.lastTimestamp = o)),
                                            t
                                        );
                                    },
                                    { distance: 0, lastTimestamp: 0, time: 0 }
                                );
                            return t.distance / t.time || 0;
                        },
                    });
                }
                function Jt(e) {
                    var t, n, r, o, i, s, a, l;
                    function c(e) {
                        return 2 * e;
                    }
                    function d(e) {
                        return Bt(e, a, l);
                    }
                    function u(e) {
                        return 1 - Math.pow(1 - e, 3);
                    }
                    function p() {
                        return r ? e.track.velocity() : 0;
                    }
                    function f(e, t) {
                        void 0 === t && (t = 1e3);
                        var n = 147e-9 + (e = Math.abs(e)) / t;
                        return { dist: Math.pow(e, 2) / n, dur: e / n };
                    }
                    function h() {
                        var t = e.track.details;
                        t && ((i = t.min), (s = t.max), (a = t.minIdx), (l = t.maxIdx));
                    }
                    function m() {
                        e.animator.stop();
                    }
                    e.on("updated", h),
                        e.on("optionsChanged", h),
                        e.on("created", h),
                        e.on("dragStarted", function () {
                            (r = !1), m(), (t = n = e.track.details.abs);
                        }),
                        e.on("dragChecked", function () {
                            r = !0;
                        }),
                        e.on("dragEnded", function () {
                            var r = e.options.mode;
                            "snap" === r &&
                                (function () {
                                    var r = e.track,
                                        o = e.track.details,
                                        a = o.position,
                                        l = Kt(p());
                                    (a > s || a < i) && (l = 0);
                                    var c = t + l;
                                    0 === o.slides[r.absToRel(c)].portion && (c -= l), t !== n && (c = n), Kt(r.idxToDist(c, !0)) !== l && (c += l), (c = d(c));
                                    var u = r.idxToDist(c, !0);
                                    e.animator.start([
                                        {
                                            distance: u,
                                            duration: 500,
                                            easing: function (e) {
                                                return 1 + --e * e * e * e * e;
                                            },
                                        },
                                    ]);
                                })(),
                                ("free" !== r && "free-snap" !== r) ||
                                (function () {
                                    m();
                                    var t = "free-snap" === e.options.mode,
                                        n = e.track,
                                        r = p();
                                    o = Kt(r);
                                    var a = e.track.details,
                                        l = [];
                                    if (r || !t) {
                                        var h = f(r),
                                            g = h.dist,
                                            v = h.dur;
                                        if (((v = c(v)), (g *= o), t)) {
                                            var y = n.idxToDist(n.distToIdx(g), !0);
                                            y && (g = y);
                                        }
                                        l.push({ distance: g, duration: v, easing: u });
                                        var b = a.position,
                                            w = b + g;
                                        if (w < i || w > s) {
                                            var S = w < i ? i - b : s - b,
                                                x = 0,
                                                E = r;
                                            if (Kt(S) === o) {
                                                var A = Math.min(Math.abs(S) / Math.abs(g), 1),
                                                    C =
                                                        (function (e) {
                                                            return 1 - Math.pow(1 - e, 1 / 3);
                                                        })(A) * v;
                                                (l[0].earlyExit = C), (E = r * (1 - A));
                                            } else (l[0].earlyExit = 0), (x += S);
                                            var _ = f(E, 100),
                                                k = _.dist * o;
                                            e.options.rubberband && (l.push({ distance: k, duration: c(_.dur), easing: u }), l.push({ distance: -k + x, duration: 500, easing: u }));
                                        }
                                        e.animator.start(l);
                                    } else
                                        e.moveToIdx(d(a.abs), !0, {
                                            duration: 500,
                                            easing: function (e) {
                                                return 1 + --e * e * e * e * e;
                                            },
                                        });
                                })();
                        }),
                        e.on("dragged", function () {
                            n = e.track.details.abs;
                        });
                }
                function Xt(e) {
                    var t,
                        n,
                        r,
                        o,
                        i,
                        s,
                        a,
                        l,
                        c,
                        d,
                        u,
                        p,
                        f,
                        h,
                        m,
                        g,
                        v,
                        y,
                        b = zt();
                    function w(t) {
                        if (s && l === t.id) {
                            var f = A(t);
                            if (c) {
                                if (!E(t)) return x(t);
                                (d = f), (c = !1), e.emit("dragChecked");
                            }
                            if (g) return (d = f);
                            Ut(t);
                            var h = (function (t) {
                                if (v === -1 / 0 && y === 1 / 0) return t;
                                var r = e.track.details,
                                    s = r.length,
                                    a = r.position,
                                    l = Bt(t, v - a, y - a);
                                if (0 === s) return 0;
                                if (!e.options.rubberband) return l;
                                if (a <= y && a >= v) return t;
                                if ((a < v && n > 0) || (a > y && n < 0)) return t;
                                var c = (a < v ? a - v : a - y) / s,
                                    d = o * s,
                                    u = Math.abs(c * d),
                                    p = Math.max(0, 1 - (u / i) * 2);
                                return p * p * t;
                            })((a(d - f) / o) * r);
                            n = Kt(h);
                            var m = e.track.details.position;
                            ((m > v && m < y) || (m === v && n > 0) || (m === y && n < 0)) && Ht(t), (u += h), !p && Math.abs(u * o) > 5 && (p = !0), e.track.add(h), (d = f), e.emit("dragged");
                        }
                    }
                    function S(t) {
                        !s && e.track.details && e.track.details.length && ((u = 0), (s = !0), (p = !1), (c = !0), (l = t.id), E(t), (d = A(t)), e.emit("dragStarted"));
                    }
                    function x(t) {
                        s && l === t.idChanged && ((s = !1), e.emit("dragEnded"));
                    }
                    function E(e) {
                        var t = C(),
                            n = t ? e.y : e.x,
                            r = t ? e.x : e.y,
                            o = void 0 !== f && void 0 !== h && Math.abs(h - r) <= Math.abs(f - n);
                        return (f = n), (h = r), o;
                    }
                    function A(e) {
                        return C() ? e.y : e.x;
                    }
                    function C() {
                        return e.options.vertical;
                    }
                    function _() {
                        (o = e.size), (i = C() ? window.innerHeight : window.innerWidth);
                        var t = e.track.details;
                        t && ((v = t.min), (y = t.max));
                    }
                    function k(e) {
                        p && (Ht(e), Ut(e));
                    }
                    function O() {
                        if ((b.purge(), e.options.drag && !e.options.disabled)) {
                            var n;
                            (n = e.options.dragSpeed || 1),
                                (a =
                                    "function" == typeof n
                                        ? n
                                        : function (e) {
                                            return e * n;
                                        }),
                                (r = e.options.rtl ? -1 : 1),
                                _(),
                                (t = e.container),
                                (function () {
                                    var e = "data-keen-slider-clickable";
                                    jt("[".concat(e, "]:not([").concat(e, "=false])"), t).map(function (e) {
                                        b.add(e, "dragstart", Ht), b.add(e, "mousedown", Ht), b.add(e, "touchstart", Ht);
                                    });
                                })(),
                                b.add(t, "dragstart", function (e) {
                                    Ut(e);
                                }),
                                b.add(t, "click", k, { capture: !0 }),
                                b.input(t, "ksDragStart", S),
                                b.input(t, "ksDrag", w),
                                b.input(t, "ksDragEnd", x),
                                b.input(t, "mousedown", S),
                                b.input(t, "mousemove", w),
                                b.input(t, "mouseleave", x),
                                b.input(t, "mouseup", x),
                                b.input(t, "touchstart", S, { passive: !0 }),
                                b.input(t, "touchmove", w, { passive: !1 }),
                                b.input(t, "touchend", x),
                                b.input(t, "touchcancel", x),
                                b.add(window, "wheel", function (e) {
                                    s && Ut(e);
                                });
                            var o = "data-keen-slider-scrollable";
                            jt("[".concat(o, "]:not([").concat(o, "=false])"), e.container).map(function (e) {
                                return (function (e) {
                                    var t;
                                    b.input(
                                        e,
                                        "touchstart",
                                        function (e) {
                                            (t = A(e)), (g = !0), (m = !0);
                                        },
                                        { passive: !0 }
                                    ),
                                        b.input(e, "touchmove", function (n) {
                                            var r = C(),
                                                o = r ? e.scrollHeight - e.clientHeight : e.scrollWidth - e.clientWidth,
                                                i = t - A(n),
                                                s = r ? e.scrollTop : e.scrollLeft,
                                                a = (r && "scroll" === e.style.overflowY) || (!r && "scroll" === e.style.overflowX);
                                            if (((t = A(n)), ((i < 0 && s > 0) || (i > 0 && s < o)) && m && a)) return (g = !0);
                                            (m = !1), Ut(n), (g = !1);
                                        }),
                                        b.input(e, "touchend", function () {
                                            g = !1;
                                        });
                                })(e);
                            });
                        }
                    }
                    e.on("updated", _), e.on("optionsChanged", O), e.on("created", O), e.on("destroyed", b.purge);
                }
                function Zt(e) {
                    var t,
                        n,
                        r = null;
                    function o(t, n, r) {
                        e.animator.active
                            ? s(t, n, r)
                            : requestAnimationFrame(function () {
                                return s(t, n, r);
                            });
                    }
                    function i() {
                        o(!1, !1, n);
                    }
                    function s(n, o, i) {
                        var s = 0,
                            a = e.size,
                            d = e.track.details;
                        if (d && t) {
                            var u = d.slides;
                            t.forEach(function (e, t) {
                                if (n) !r && o && l(e, null, i), c(e, null, i);
                                else {
                                    if (!u[t]) return;
                                    var d = u[t].size * a;
                                    !r && o && l(e, d, i), c(e, u[t].distance * a - s, i), (s += d);
                                }
                            });
                        }
                    }
                    function a(t) {
                        return "performance" === e.options.renderMode ? Math.round(t) : t;
                    }
                    function l(e, t, n) {
                        var r = n ? "height" : "width";
                        null !== t && (t = a(t) + "px"), (e.style["min-" + r] = t), (e.style["max-" + r] = t);
                    }
                    function c(e, t, n) {
                        if (null !== t) {
                            t = a(t);
                            var r = n ? t : 0;
                            t = "translate3d(".concat(n ? 0 : t, "px, ").concat(r, "px, 0)");
                        }
                        (e.style.transform = t), (e.style["-webkit-transform"] = t);
                    }
                    function d() {
                        t && (s(!0, !0, n), (t = null)), e.on("detailsChanged", i, !0);
                    }
                    function u() {
                        o(!1, !0, n);
                    }
                    function p() {
                        d(), (n = e.options.vertical), e.options.disabled || "custom" === e.options.renderMode || ((r = "auto" === Wt(e.options.slides, "perView", null)), e.on("detailsChanged", i), (t = e.slides).length && u());
                    }
                    e.on("created", p),
                        e.on("optionsChanged", p),
                        e.on("beforeOptionsChanged", function () {
                            d();
                        }),
                        e.on("updated", u),
                        e.on("destroyed", d);
                }
                function en(e, t) {
                    return function (n) {
                        var r,
                            o,
                            i,
                            s,
                            a,
                            l = zt();
                        function c(e) {
                            var t;
                            Rt(n.container, "reverse", "rtl" !== ((t = n.container), window.getComputedStyle(t, null).getPropertyValue("direction")) || e ? null : ""),
                                Rt(n.container, "v", n.options.vertical && !e ? "" : null),
                                Rt(n.container, "disabled", n.options.disabled && !e ? "" : null);
                        }
                        function d() {
                            u() && g();
                        }
                        function u() {
                            var e = null;
                            if (
                                (s.forEach(function (t) {
                                    t.matches && (e = t.__media);
                                }),
                                    e === r)
                            )
                                return !1;
                            r || n.emit("beforeOptionsChanged"), (r = e);
                            var t = e ? i.breakpoints[e] : i;
                            return (n.options = Dt(Dt({}, i), t)), c(), S(), x(), y(), !0;
                        }
                        function p(e) {
                            var t = Yt(e);
                            return (n.options.vertical ? t.height : t.width) / n.size || 1;
                        }
                        function f() {
                            return n.options.trackConfig.length;
                        }
                        function h(e) {
                            for (var a in ((r = !1), (i = Dt(Dt({}, t), e)), l.purge(), (o = n.size), (s = []), i.breakpoints || [])) {
                                var c = window.matchMedia(a);
                                (c.__media = a), s.push(c), l.add(c, "change", d);
                            }
                            l.add(window, "orientationchange", w), l.add(window, "resize", b), u();
                        }
                        function m(e) {
                            n.animator.stop();
                            var t = n.track.details;
                            n.track.init(null != e ? e : t ? t.abs : 0);
                        }
                        function g(e) {
                            m(e), n.emit("optionsChanged");
                        }
                        function v(e, t) {
                            if (e) return h(e), void g(t);
                            S(), x();
                            var r = f();
                            y(), f() !== r ? g(t) : m(t), n.emit("updated");
                        }
                        function y() {
                            var e = n.options.slides;
                            if ("function" == typeof e) return (n.options.trackConfig = e(n.size, n.slides));
                            for (
                                var t = n.slides,
                                r = t.length,
                                o = "number" == typeof e ? e : Wt(e, "number", r, !0),
                                i = [],
                                s = Wt(e, "perView", 1, !0),
                                a = Wt(e, "spacing", 0, !0) / n.size || 0,
                                l = "auto" === s ? a : a / s,
                                c = Wt(e, "origin", "auto"),
                                d = 0,
                                u = 0;
                                u < o;
                                u++
                            ) {
                                var f = "auto" === s ? p(t[u]) : 1 / s - a + l,
                                    h = "center" === c ? 0.5 - f / 2 : "auto" === c ? 0 : c;
                                i.push({ origin: h, size: f, spacing: a }), (d += f);
                            }
                            if (((d += a * (o - 1)), "auto" === c && !n.options.loop && 1 !== s)) {
                                var m = 0;
                                i.map(function (e) {
                                    var t = d - m;
                                    return (m += e.size + a), t >= 1 || (e.origin = 1 - t - (d > 1 ? 0 : 1 - d)), e;
                                });
                            }
                            n.options.trackConfig = i;
                        }
                        function b() {
                            S();
                            var e = n.size;
                            n.options.disabled || e === o || ((o = e), v());
                        }
                        function w() {
                            b(), setTimeout(b, 500), setTimeout(b, 2e3);
                        }
                        function S() {
                            var e = Yt(n.container);
                            n.size = (n.options.vertical ? e.height : e.width) || 1;
                        }
                        function x() {
                            n.slides = jt(n.options.selector, n.container);
                        }
                        (n.container = (a = jt(e, document)).length ? a[0] : null),
                            (n.destroy = function () {
                                l.purge(), n.emit("destroyed"), c(!0);
                            }),
                            (n.prev = function () {
                                n.moveToIdx(n.track.details.abs - 1, !0);
                            }),
                            (n.next = function () {
                                n.moveToIdx(n.track.details.abs + 1, !0);
                            }),
                            (n.update = v),
                            h(n.options);
                    };
                }
                var tn = function (e, t, n) {
                    try {
                        return (function (e, t) {
                            var n,
                                r = {};
                            return (
                                (n = {
                                    emit: function (e) {
                                        r[e] &&
                                            r[e].forEach(function (e) {
                                                e(n);
                                            });
                                        var t = n.options && n.options[e];
                                        t && t(n);
                                    },
                                    moveToIdx: function (e, t, r) {
                                        var o = n.track.idxToDist(e, t);
                                        if (o) {
                                            var i = n.options.defaultAnimation;
                                            n.animator.start([
                                                {
                                                    distance: o,
                                                    duration: Wt(r || i, "duration", 500),
                                                    easing: Wt(r || i, "easing", function (e) {
                                                        return 1 + --e * e * e * e * e;
                                                    }),
                                                },
                                            ]);
                                        }
                                    },
                                    on: function (e, t, n) {
                                        void 0 === n && (n = !1), r[e] || (r[e] = []);
                                        var o = r[e].indexOf(t);
                                        o > -1 ? n && delete r[e][o] : n || r[e].push(t);
                                    },
                                    options: e,
                                }),
                                (function () {
                                    if (
                                        ((n.track = Gt(n)),
                                            (n.animator = (function (e) {
                                                var t, n, r, o, i, s;
                                                function a(t) {
                                                    s || (s = t), l(!0);
                                                    var i = t - s;
                                                    i > r && (i = r);
                                                    var u = o[n];
                                                    if (u[3] < i) return n++, a(t);
                                                    var p = u[2],
                                                        f = u[4],
                                                        h = u[0],
                                                        m = u[1] * (0, u[5])(0 === f ? 1 : (i - p) / f);
                                                    if ((m && e.track.to(h + m), i < r)) return d();
                                                    (s = null), l(!1), c(null), e.emit("animationEnded");
                                                }
                                                function l(e) {
                                                    t.active = e;
                                                }
                                                function c(e) {
                                                    t.targetIdx = e;
                                                }
                                                function d() {
                                                    var e;
                                                    (e = a), (i = window.requestAnimationFrame(e));
                                                }
                                                function u() {
                                                    var t;
                                                    (t = i), window.cancelAnimationFrame(t), l(!1), c(null), s && e.emit("animationStopped"), (s = null);
                                                }
                                                return (t = {
                                                    active: !1,
                                                    start: function (t) {
                                                        if ((u(), e.track.details)) {
                                                            var i = 0,
                                                                s = e.track.details.position;
                                                            (n = 0),
                                                                (r = 0),
                                                                (o = t.map(function (e) {
                                                                    var t,
                                                                        n = Number(s),
                                                                        o = null !== (t = e.earlyExit) && void 0 !== t ? t : e.duration,
                                                                        a = e.easing,
                                                                        l = e.distance * a(o / e.duration) || 0;
                                                                    s += l;
                                                                    var c = r;
                                                                    return (r += o), (i += l), [n, e.distance, c, r, e.duration, a];
                                                                })),
                                                                c(e.track.distToIdx(i)),
                                                                d(),
                                                                e.emit("animationStarted");
                                                        }
                                                    },
                                                    stop: u,
                                                    targetIdx: null,
                                                });
                                            })(n)),
                                            t)
                                    )
                                        for (var e = 0, r = t; e < r.length; e++) (0, r[e])(n);
                                    n.track.init(n.options.initial || 0), n.emit("created");
                                })(),
                                n
                            );
                        })(t, Tt([en(e, { drag: !0, mode: "snap", renderMode: "precision", rubberband: !0, selector: ".keen-slider__slide" }), Zt, Xt, Jt], n || [], !0));
                    } catch (e) {
                        console.error(e);
                    }
                };
                const nn = function (e) {
                    let t, n, r, o;
                    function i(i, c) {
                        !(function (n) {
                            if (n && t) {
                                for (var r = t.parentNode; t.firstChild;) r.insertBefore(t.firstChild, t);
                                s(t);
                            } else (t = l("keen-slider__navigation-wrapper")), e?.container?.parentNode?.appendChild(t), t.appendChild(e.container);
                        })(i),
                            (function (r, o) {
                                !1 !== o &&
                                    (r
                                        ? s(n)
                                        : ((n = l("dots")),
                                            e.track.details.slides.forEach((t, r) => {
                                                var o = l("dot");
                                                o.addEventListener("click", () => e.moveToIdx(r)), n.appendChild(o);
                                            }),
                                            t.appendChild(n)));
                            })(i, c?.dots),
                            (function (n, i) {
                                if (!1 !== i) n ? (s(r), s(o)) : ((r = a("left")), r.addEventListener("click", () => e.prev()), (o = a("right")), o.addEventListener("click", () => e.next()), t.appendChild(r), t.appendChild(o));
                            })(i, c?.arrows);
                    }
                    function s(e) {
                        e?.parentNode?.removeChild(e);
                    }
                    function a(e) {
                        const t = document.createElement("button"),
                            n = ["arrow", `arrow--${e}`];
                        return t.classList.add(...n), t.setAttribute("tabindex", 0), (t.dataset.linkName = `${e} arrow`), t;
                    }
                    function l(e) {
                        var t = document.createElement("div");
                        return e.split(" ").forEach((e) => t.classList.add(e)), t;
                    }
                    function c(t) {
                        var i = e.track.details.rel;
                        !1 !== t?.arrows &&
                            (0 === i ? r.classList.add("arrow--disabled") : r.classList.remove("arrow--disabled"), i === e.track.details.slides.length - 1 ? o.classList.add("arrow--disabled") : o.classList.remove("arrow--disabled")),
                            !1 !== t?.dots &&
                            Array.from(n.children).forEach(function (e, t) {
                                t === i ? e.classList.add("dot--active") : e.classList.remove("dot--active");
                            });
                    }
                    e.on("created", () => {
                        (e.options?.navigation?.condition && !e.options?.navigation?.condition()) || (i(!1, e.options?.navigation), c(e.options?.navigation));
                    }),
                        e.on("optionsChanged", () => {
                            i(!0), (e.options?.navigation?.condition && !e.options?.navigation?.condition()) || (i(!1, e.options?.navigation), c(e.options?.navigation));
                        }),
                        e.on("slideChanged", () => {
                            c(e.options?.navigation);
                        }),
                        e.on("destroyed", () => {
                            i(!0);
                        });
                };
                function rn(e) {
                    const t = "data-slider-selector-index",
                        n = "active-selector-card",
                        r = "data-slider-selector",
                        o = "data-slider-selector-key";
                    let i = null,
                        s = null;
                    const a = (e, t) => {
                        if (!t && s) return s;
                        const n = document.querySelectorAll(`[${r}]`);
                        if (!n || 0 == n.length) throw new Error(`No selectors were found searching for: ${r}`);
                        const o = u(e).sliderName;
                        return (s = [...n].filter((e) => e.getAttribute(r) === o)), s;
                    },
                        l = (e) => {
                            if (!e?.options || !e.options.selectors) return console.warn("Slider is not configured properly, options and selectors sections are required."), !1;
                            if (!e.options.selectors.sliderName) throw new Error("sliderName is required to identify the slider.");
                            if (((e.options.selectors.events = e.options.selectors.events ?? {}), !e.slides || !e.slides.length > 0)) return console.warn("Slider does not have slides."), !1;
                            const t = e.options.selectors.events;
                            if (t.onSelectorDeactivates && "function" != typeof t.onSelectorDeactivates) throw new Error("onSelectorDeactivates is required to be a function");
                            if (t.onSelectorActivates && "function" != typeof t.onSelectorActivates) throw new Error("onSelectorActivates is required to be a function");
                            return !0;
                        },
                        c = (e, t) => {
                            const r = u(t).events;
                            i && (r.onSelectorDeactivates && r.onSelectorDeactivates(i, p(t)), i.classList.remove(n), (i = null)), e && ((i = e), i.classList.add(n), r.onSelectorActivates && r.onSelectorActivates(i, p(t)));
                        },
                        d = (e) => e.track.details.rel,
                        u = (e) => e.options.selectors;
                    e.on("created", () => {
                        l(e) &&
                            ((e) => {
                                const n = a(e, !0);
                                if (!n) return;
                                const r = d(e);
                                e.slides.forEach((i, s) => {
                                    const a = i.getAttribute(o);
                                    if (!a) throw new Error(`Slide Key attribute: ${o} not found on slide`);
                                    const l = n.find((e) => e.getAttribute(o) === a);
                                    l &&
                                        (l.setAttribute(t, s),
                                            r === s && c(l, e),
                                            l.addEventListener("click", () => {
                                                e.moveToIdx(s);
                                            }));
                                });
                            })(e);
                    }),
                        e.on("slideChanged", () => {
                            l(e) &&
                                ((e) => {
                                    const n = d(e),
                                        r = a(e);
                                    if (!r) return;
                                    const o = r.find((e) => parseInt(e.getAttribute(t)) === n);
                                    c(o, e);
                                })(e);
                        }),
                        e.on("destroyed", () => {
                            l(e) && (c(null, e), (s = null));
                        });
                    const p = (e) => ({ getActiveSlideIndex: () => d(e), getSelectorsArray: () => a(e) });
                }
                const on = [
                    {
                        selector: '[data-slider="product-cards"]',
                        options: {
                            breakpoints: { "(min-width: 769px)": { disabled: !0 } },
                            mode: "free-snap",
                            slides: { perView: () => window.innerWidth / 320, spacing: 20 },
                            navigation: { condition: () => window.innerWidth < 769, arrows: !1 },
                        },
                        plugins: [nn],
                    },
                    {
                        selector: '[data-slider="resource-cards"]',
                        options: { loop: !0, slides: { perView: () => document.querySelector('[data-slider="resource-cards"]').offsetWidth / (document.querySelector(".resource-card").offsetWidth + 20) } },
                        plugins: [nn],
                    },
                    {
                        selector: '[data-slider="badge-slider"]',
                        options: {
                            breakpoints: { "(min-width: 577px)": { disabled: !0 } },
                            slides: {
                                perView: () => {
                                    const e = document.querySelector('[data-slider="badge-slider"]');
                                    return e.offsetWidth / (e.querySelector(".award-badge").offsetWidth + 20);
                                },
                            },
                            navigation: { condition: () => window.innerWidth < 577, arrows: !1 },
                        },
                        plugins: [nn],
                    },
                    {
                        selector: '[data-slider="review-cards"]',
                        options: { breakpoints: { "(min-width: 1400px)": { disabled: !0 } }, loop: !0, mode: "snap", slides: { perView: "auto", spacing: 20 }, navigation: { arrows: !1 } },
                        plugins: [nn],
                    },
                    {
                        selector: '[data-slider="icon-link-cards"]',
                        options: { breakpoints: { "(min-width: 1370px)": { disabled: !0 } }, loop: !0, mode: "snap", slides: { perView: "auto", spacing: 20 }, navigation: { arrows: !1 } },
                        plugins: [nn],
                    },
                    { selector: '[data-slider="winner-promo-cards"]', options: { slides: { perView: "auto", spacing: 20 }, loop: !0, mode: "free-snap", navigation: { arrows: !0 } }, plugins: [nn] },
                    {
                        selector: '[data-slider="news-link-cards"]',
                        options: { breakpoints: { "(min-width: 768px)": { disabled: !0 } }, loop: !0, mode: "free-snap", slides: { perView: "auto", spacing: 20 }, navigation: { arrows: !1, dots: !0 } },
                        plugins: [nn],
                    },
                    { selector: '[data-slider="team-member-cards"]', options: { slides: { perView: 1, spacing: 20 }, loop: !0, mode: "free-snap", navigation: { arrows: !0, dots: !0 } }, plugins: [nn] },
                    {
                        selector: '[data-slider="text-and-selector-carousel"]',
                        options: {
                            slides: { perView: 1, spacing: 20 },
                            loop: !0,
                            mode: "free-snap",
                            navigation: { arrows: !0, dots: !1 },
                            selectors: {
                                sliderName: "text-and-selector-carousel",
                                events: {
                                    onSelectorActivates: (e) => {
                                        e.classList.add("background-color__blue"), e.classList.remove("background-color__light-gray");
                                    },
                                    onSelectorDeactivates: (e) => {
                                        e.classList.remove("background-color__blue"), e.classList.add("background-color__light-gray");
                                    },
                                },
                            },
                        },
                        plugins: [nn, rn],
                    },
                    {
                        selector: '[data-slider="color-with-icon-cards"]',
                        options: { breakpoints: { "(min-width: 1400px)": { disabled: !0 } }, slides: { perView: "auto", spacing: 20 }, loop: !0, mode: "free-snap", navigation: { arrows: !1, dots: !0 } },
                        plugins: [nn],
                    },
                    {
                        selector: '[data-slider="promo-hub-cards"]',
                        options: { slides: { perView: "3", spacing: 0 }, loop: !0, mode: "free-snap", navigation: { arrows: !0, dots: !1 } },
                        plugins: [
                            nn,
                            function (e) {
                                const t = "highlight-slide-card__active",
                                    n = "highlight-slide-card__left",
                                    r = "highlight-slide-card__right",
                                    o = (e) => e.slides,
                                    i = (e, t) => (e === t - 1 ? 0 : e + 1),
                                    s = (e) => {
                                        const s = o(e),
                                            a = ((e) => {
                                                const t = o(e),
                                                    n = ((e) => e.track.absToRel(e.track.details.abs))(e);
                                                return i(n, t.length);
                                            })(e),
                                            l = ((c = a), (d = s.length), 0 === c ? d - 1 : c - 1);
                                        var c, d;
                                        const u = i(a, s.length);
                                        s.forEach((e, o) => {
                                            e.classList.remove(n, t, r), o !== l ? (o !== a ? o !== u || e.classList.add(r) : e.classList.add(t)) : e.classList.add(n);
                                        });
                                    };
                                e.on("created", () => {
                                    ((e) => {
                                        s(e);
                                    })(e);
                                }),
                                    e.on("slideChanged", () => {
                                        s(e);
                                    });
                            },
                        ],
                    },
                    {
                        selector: '[data-slider="vertical-scrollbar-mobile"]',
                        options: {
                            breakpoints: { "(min-width: 768px)": { disabled: !0 } },
                            slides: { perView: "1", spacing: 20 },
                            loop: !0,
                            mode: "snap",
                            navigation: { arrows: !0, dots: !1 },
                            selectors: {
                                sliderName: "vertical-scrollbar-mobile-slider",
                                events: {
                                    onSelectorActivates: (e, t) => {
                                        const n = t.getSelectorsArray(),
                                            r = parseInt(e.dataset.sliderSelectorKey);
                                        (e.parentNode.querySelector(".vertical-scrollbar-mobile-slider__fill-bar").style.width = ((r - 1) / (n.length - 1)) * 100 + "%"),
                                            n.forEach((e) => {
                                                parseInt(e.dataset.sliderSelectorKey) <= r ? e.classList.add("background-color__teal") : e.classList.remove("background-color__teal");
                                            });
                                    },
                                },
                            },
                        },
                        plugins: [
                            nn,
                            rn,
                            function (e) {
                                async function t() {
                                    await a(50);
                                    const t = `${e.slides[e.track.details.rel].offsetHeight}px`;
                                    e.container.style.height = t;
                                }
                                e.on("created", t), e.on("slideChanged", t);
                            },
                        ],
                    },
                    { selector: '[data-slider="full-width-numbered-cards"]', options: { slides: { perView: 1, spacing: 20 }, loop: !0, mode: "snap", navigation: { arrows: !0, dots: !0 } }, plugins: [nn] },
                ];
                function sn(e) {
                    if (!e) return;
                    const t = e.getBoundingClientRect(),
                        n = e.querySelector('[data-tooltip="content"]');
                    if (!n) return;
                    (n.style.left = null), (n.style.right = null);
                    const r = n.getBoundingClientRect(),
                        o = window.innerWidth;
                    t.right + r.width / 2 > o ? (n.style.right = "-10px") : t.left - r.width / 2 < 0 ? (n.style.left = "-10px") : (n.style.left = `-${r.width / 2 - 10}px`);
                }
                const an = (e, t) => {
                    const n = e.parentNode.getBoundingClientRect().y,
                        r = t.getBoundingClientRect().y,
                        o = Math.floor(t.offsetHeight / 2),
                        i = Math.floor(r - n + o);
                    e.style.top = `${i}px`;
                };
                !(function () {
                    const e = document.querySelector("[data-ada-skip]"),
                        t = document.querySelector("[data-main-content]");
                    e &&
                        t &&
                        e.addEventListener("keypress", (e) => {
                            ["Enter", "Space"].includes(e.key) && t.focus();
                        });
                })(),
                    o.forEach((e) => {
                        e.querySelectorAll('[data-compare-table="toggle"]').forEach((t) => {
                            t.addEventListener("click", function () {
                                !(function (e, t) {
                                    if (e.classList.contains("active")) return;
                                    const n = e.dataset.tableOption;
                                    t.querySelectorAll("[data-table-option]").forEach((e) => (e.dataset.tableOption === n ? e.classList.add("active") : e.classList.remove("active")));
                                })(this, e);
                            });
                        }),
                            (function (e) {
                                const t = e.querySelector('[data-compare-table="overlay"]');
                                if (!t) return;
                                const n = e.querySelectorAll('[data-compare-table="row"]');
                                r(t, n), window.addEventListener("resize", () => r(t, n));
                            })(e);
                    }),
                    i.forEach((e) => {
                        e.addEventListener("click", function () {
                            const e = s[this.dataset.onclick];
                            if (e) return e(this);
                        });
                    }),
                    c.forEach((e) => {
                        e.addEventListener("click", function () {
                            const e = this.dataset.openModal;
                            m(document.querySelector(`[data-modal="${e}"]`));
                        });
                    }),
                    d.forEach((e) => {
                        e.addEventListener("click", function () {
                            const e = this.dataset.closeModal;
                            f(document.querySelector(`[data-modal="${e}"]`)), p.classList.remove(u);
                        });
                    }),
                    (function () {
                        if (!1 in window) return;
                        const e = new URLSearchParams(window.location.search);
                        if (e && 0 !== e.size)
                            for (const t of Object.keys(v)) {
                                const n = e.getAll(t);
                                if (!n || 0 === n.length || "function" != typeof v[t]) return;
                                v[t](n);
                            }
                    })(),
                    (function () {
                        const e = document.querySelectorAll("[data-form-type]");
                        0 !== e.length &&
                            e.forEach((e) => {
                                const t = F[e.dataset.formType];
                                t && t(e);
                            });
                    })(),
                    document.querySelectorAll(".accordion-toggle").forEach((e) => {
                        e.addEventListener("click", (e) => T(e.target)),
                            e.addEventListener("keydown", (e) => {
                                if (32 === e.keyCode) return e.preventDefault(), T(e.target);
                            });
                    }),
                    (() => {
                        const e = new IntersectionObserver(
                            (e) => {
                                e.forEach((e) => {
                                    if (e.isIntersecting) {
                                        const t = M[e.target.dataset.animation];
                                        if (!t) return;
                                        t(e.target);
                                    }
                                });
                            },
                            { threshold: [1] }
                        ),
                            t = document.querySelectorAll("[data-animation]");
                        0 !== t.length && t.forEach((t) => e.observe(t));
                    })(),
                    (async function () {
                        const e = document.querySelectorAll("[data-banner-name]");
                        e &&
                            (await (async function (e) {
                                for await (const t of e) {
                                    const { bannerName: e } = t.dataset,
                                        { bannerClose: n } = t.querySelector("[data-banner-close]").dataset;
                                    if ("none" === n) return void t.classList.remove("hidden");
                                    if ("next_session" === n) return void ((await K.Session.get({ key: e })) || t.classList.remove("hidden"));
                                    (await K.Cookie.get({ key: e })) || t.classList.remove("hidden");
                                }
                            })(e),
                                (function (e) {
                                    e.forEach((e) => {
                                        const { bannerName: t } = e.dataset,
                                            n = e.querySelector("[data-banner-close]");
                                        n.addEventListener("click", function () {
                                            const r = n.dataset.bannerClose,
                                                o = Y[r];
                                            o && (o(t), e.remove());
                                        });
                                    });
                                })(e));
                    })(),
                    document.querySelectorAll("[data-button-slide]").forEach((e) => {
                        const t = W.find((t) => t.name === e.dataset.buttonSlide);
                        t &&
                            ((e, t) => {
                                if (
                                    !((e) => {
                                        if (!e) throw new Error("Config is required to init a button-slide");
                                        if (!e.name) throw new Error("Config.name is a required for a button-slide");
                                        return (
                                            (e.activeCardClassArray ??= ["button-slide__card--active"]),
                                            (e.nonActiveCardClassArray ??= []),
                                            (e.activeButtonClassArray ??= ["button-slide__button--active"]),
                                            (e.nonActiveButtonClassArray ??= []),
                                            !0
                                        );
                                    })(t)
                                )
                                    return !1;
                                const n = Q(e);
                                if (!n || 0 === n.length) return;
                                const r = G(e);
                                r && 0 !== r.length && n.forEach((n) => n.addEventListener("click", () => X(n, e, t)));
                            })(e, t);
                    }),
                    (function () {
                        const e = document.querySelectorAll("[data-contact-button]");
                        if (0 === e.length) return;
                        const t = { email: ne, sms: re, chat: oe };
                        e.forEach((e) => {
                            const n = e.dataset.contactButton,
                                r = t[n];
                            r && e.addEventListener("click", r);
                        });
                    })(),
                    (function () {
                        const e = document.querySelectorAll('[data-equal-height="section"]');
                        function t() {
                            e.forEach((e) => {
                                const t = e.querySelectorAll('[data-equal-height="target"]');
                                if (window.innerWidth < e.dataset.equalHeightBreakpoint) return t.forEach((e) => (e.style.minHeight = "unset"));
                                const n = Array.from(t).reduce((e, t) => ((t.style.minHeight = 0), t.offsetHeight > e ? t.offsetHeight : e), 0);
                                t.forEach((e) => (e.style.minHeight = `${n}px`));
                            });
                        }
                        e && (window.addEventListener("load", t), window.addEventListener("resize", t));
                    })(),
                    (() => {
                        const e = ae();
                        if (!e || 0 === e.length) return;
                        const t = le();
                        if (!t || 0 === t.length) return;
                        e.forEach((e) => e.addEventListener("click", () => ue(e)));
                        const n = document.querySelectorAll("[data-history-arrow]");
                        n &&
                            0 !== n.length &&
                            n.forEach((e) =>
                                e.addEventListener("click", () =>
                                    ((e) => {
                                        const t = [...ae()],
                                            n = t.findIndex((e) => e.classList.contains(...se));
                                        !e || ("previous" !== e && "next" !== e) || ("previous" === e && 0 === n) || ("next" === e && n === t.length - 1) || ue(t["previous" === e ? n - 1 : n + 1]);
                                    })(e.dataset.historyArrow)
                                )
                            );
                    })(),
                    (function () {
                        const e = document.querySelectorAll("[data-leadership]");
                        if (!e || 0 === e.length) return;
                        const t = document.querySelector("[data-modal='leadership']"),
                            n = Array.from(t.querySelectorAll("[data-leadership-modal]")).reduce((e, t) => ({ ...e, [t.dataset.leadershipModal]: t }), {});
                        e.forEach((e) => {
                            e.addEventListener("click", function () {
                                const e = this.dataset.leadership,
                                    r = window.leadership.find((t) => t.content.name === e);
                                if (!r) return;
                                const o = this.querySelector("img").src;
                                (n.image.src = o), (n.name.innerText = r.content.name), (n.title.innerText = r.content.job_title);
                                const i = r.content.paragraphs.map((e) => `<p class="p-large">${e.paragraph}</p>`);
                                (n.content.innerHTML = i.join("")), m(t);
                            });
                        });
                    })(),
                    document.querySelector('[data-nav="container"]') &&
                    (_e(),
                        (function () {
                            const e = document.querySelector("[data-nav='toggle']");
                            e && e.addEventListener("click", be);
                        })(),
                        (function () {
                            const e = document.querySelectorAll('[data-site-search="handleSearch"]'),
                                t = document.querySelectorAll('[data-site-search="closeSearch"]');
                            e.forEach((e) => {
                                e.addEventListener("click", Ee);
                            }),
                                t.forEach((e) => {
                                    e.addEventListener("click", xe);
                                }),
                                document.querySelectorAll('[data-site-search="form"]').forEach((e) => {
                                    e.querySelector("input").addEventListener("blur", () => {
                                        l({ type: "event", eventAction: "Form Field - interaction", eventLabel: "Site Search > Search" });
                                    }),
                                        e.addEventListener("submit", Ce);
                                });
                        })(),
                        document.querySelectorAll("[data-nav-hover='target']").forEach((e) => {
                            e.addEventListener("mouseover", () => {
                                const t = e.querySelector("[data-nav-hover='menu']");
                                if (!t) return;
                                const n = document.querySelector("[data-nav='container']"),
                                    r = window.innerHeight - n.offsetHeight;
                                t.style.maxHeight = `${r}px`;
                            });
                        }),
                        document.querySelectorAll("[data-top-nav-dropdown='trigger']").forEach((e) => {
                            e.addEventListener("click", () =>
                                (function (e) {
                                    var t, n;
                                    window.innerWidth < 992 && ((n = "top-nav-link__dropdown--show-menu"), (t = e).classList.contains(n) ? t.classList.remove(n) : t.classList.add(n));
                                })(e)
                            );
                        })),
                    (function () {
                        const e = document.querySelectorAll("[data-range-slider]");
                        e &&
                            e.forEach((e) =>
                                (function (e) {
                                    const t = (function (e) {
                                        if (!e) return;
                                        const t = e.querySelectorAll("[data-range-slider-option]");
                                        return Array.from(t).map((e) => {
                                            const t = e.dataset.rangeSliderOption.split("|");
                                            return { value: t[0], content: t[1] };
                                        });
                                    })(document.querySelector(`[data-range-slider-options="${e.dataset.rangeSlider}"]`)),
                                        n = {
                                            to: function (e) {
                                                return t[Math.round(e)].value;
                                            },
                                            from: function (e) {
                                                return t.findIndex((t) => t.value === e);
                                            },
                                        };
                                    Ot(e, {
                                        start: ["0"],
                                        range: { min: 0, max: t.length - 1 },
                                        step: 1,
                                        tooltips: [!0],
                                        format: {
                                            to: function (e) {
                                                return e.toFixed(0);
                                            },
                                            from: function (e) {
                                                return Number(e);
                                            },
                                        },
                                        pips: { mode: "steps", format: n, density: 50 },
                                    }),
                                        e.noUiSlider.on("update", function (n, r) {
                                            const o = e.querySelector(".noUi-tooltip"),
                                                i = t.length;
                                            (o.innerHTML = t[n[0]].content),
                                                o.style.setProperty("--before-left", "45%"),
                                                (o.style.left = "50%"),
                                                0 === parseInt(n[r]) && ((o.style.left = "85px"), o.style.setProperty("--before-left", "16px")),
                                                parseInt(n[r]) === i - 1 && ((o.style.left = "-60px"), o.style.setProperty("--before-left", "161px"));
                                        });
                                })(e)
                            );
                    })(),
                    (async function () {
                        if (!window.paramContentOptions || !window.location.search) return document.querySelector("body").classList.remove("parameter-driven-content");
                        const e = new URLSearchParams(window.location.search),
                            t = window.paramContentOptions.find((t) =>
                                (function (e, t) {
                                    return !!e && e.every((e) => e.value === t.get(e.parameter));
                                })(t.parameters, e)
                            );
                        if (t)
                            for await (const e of t.actions) {
                                const t = qe[e.type];
                                if (t)
                                    try {
                                        await t(e);
                                    } catch (e) { }
                            }
                        document.querySelector("body").classList.remove("parameter-driven-content");
                    })(),
                    (async function () {
                        if (!window.partnerOptions) return Fe();
                        const e = new URLSearchParams(window.location.search),
                            { defaults: t, partners: n } = window.partnerOptions,
                            r = (function (e, t) {
                                const n = e.find((e) => {
                                    const n = (function (e, t) {
                                        return !e || e.every((e) => e.value === t.get(e.parameter));
                                    })(e.option?.parameters, t);
                                    return n;
                                });
                                return n;
                            })(n, e);
                        r
                            ? ((function ({ defaults: e, partner: t }) {
                                const n = e.banner_info[t.banner_info?.banner_content] ?? t.banner_info?.custom_content,
                                    r = { logoUrl: t.image, backgroundColor: t.banner_info?.background_color, banner_content: n };
                                !(function (e) {
                                    const t = `\n    <div class="partner-nav-logo__divider"></div>\n    <img class="partner-nav-logo__logo" src="${e}" alt="partner logo">\n  `;
                                    document.querySelector(".main-navigation-bar__logo").insertAdjacentHTML("afterend", t);
                                })(r.logoUrl),
                                    (function ({ backgroundColor: e, banner_content: t, logoUrl: n }) {
                                        if (!t) return;
                                        const r = `\n    <section class="partner-banner background-color__${e ?? "gray"
                                            }">\n      <div class="section-container">\n        <div class="partner-banner__container">\n          <div class="partner-banner__logo-container">\n            <img class="partner-banner__logo" src="${n}" alt="partner logo">\n          </div>\n          <div class="partner-banner__text-container">\n            ${t}\n          </div>\n        </div>\n      </div>\n    </section>\n  `;
                                        document.querySelector(".page-wrapper").insertAdjacentHTML("afterbegin", r);
                                    })(r);
                            })({ defaults: t, partner: r }),
                                await (async function (e) {
                                    if (e.option?.actions)
                                        for await (const t of e.option.actions) {
                                            const e = qe[t.type];
                                            if (e)
                                                try {
                                                    await e(t);
                                                } catch (e) { }
                                        }
                                })(r),
                                Fe())
                            : Fe();
                    })(),
                    (function () {
                        const e = document.querySelectorAll("[data-promo-status]");
                        e.length > 0 &&
                            ((e) => {
                                const t = ["ongoing", "open", "archived"];
                                e.forEach((e) => {
                                    t.includes(e.dataset.promoStatus) || e.remove();
                                });
                            })(e);
                    })(),
                    (function (e) {
                        const t = new IntersectionObserver(
                            (e) => {
                                const t = document.querySelector("body"),
                                    n = document.querySelectorAll("[data-lock-image]");
                                for (let r = e.length - 1; r >= 0; r--) {
                                    const o = e[r],
                                        i = `${Math.floor(100 * o.intersectionRatio)}`;
                                    if ((t.style.setProperty(`--opacity-content-${o.target.dataset.lockImageShow}`, Math.min(o.intersectionRatio)), o.isIntersecting && 100 == i)) {
                                        const e = o.target.dataset.lockImageShow;
                                        n.forEach((t) => {
                                            if (t.dataset.lockImage === e) return t.classList.add("show"), void t.classList.remove("hide");
                                            t.classList.add("hide"), t.classList.remove("show");
                                        });
                                        break;
                                    }
                                }
                            },
                            { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
                        );
                        document.querySelectorAll("[data-lock-image-show]").forEach((e) => {
                            t.observe(e);
                        });
                    })(),
                    (function () {
                        const e = { calculator: Pt, forSchoolsDownload: qt };
                        document.querySelectorAll("[data-select]").forEach((t) => {
                            const n = {
                                optionClass: "custom-selector-control__item-option",
                                itemClass: "custom-selector-control__item",
                                onBlur: () =>
                                    ((e) => {
                                        l({ type: "event", eventAction: "Form Field - interaction", eventLabel: `Select - ${e.dataset.select}` });
                                    })(t),
                            },
                                r = { ...n, ...(e[t.dataset.select] ?? {}) };
                            new (It())(t, r);
                        });
                    })(),
                    document.querySelectorAll("[data-show-more='section']").forEach((e) =>
                        (function (e) {
                            const t = e.querySelector("[data-show-more='button']");
                            if (!t) return;
                            const n = parseInt(e.dataset.showMoreNumber);
                            t.addEventListener("click", () =>
                                (function (e, t, n) {
                                    const r = Array.from(t.querySelectorAll('[data-show-more="item"].hidden'));
                                    (r.length <= n || 0 === n) && e.remove(),
                                        0 !== n && (r.length = n),
                                        r.forEach((e) => {
                                            e.classList.remove("hidden");
                                        });
                                })(t, e, n)
                            );
                        })(e)
                    ),
                    (async function () {
                        const e = document.querySelector("[data-sign-up-banner='container']");
                        if (e) {
                            const t = "signUpBanner",
                                n = await K.Session.get({ key: t }),
                                r = await K.Cookie.get({ key: t });
                            if (n || r) return;
                            e.classList.remove("close-sign-up-form");
                            const o = e.querySelector('[data-sign-up-banner="trigger"]'),
                                i = e.querySelectorAll('[data-sign-up-banner="close"]');
                            o.addEventListener("click", function () {
                                e.classList.add("show-sign-up-form");
                            }),
                                i.forEach((n) => {
                                    n.addEventListener("click", function () {
                                        e.classList.add("close-sign-up-form"), K.Session.set({ key: t, value: "viewed" });
                                    });
                                });
                        }
                    })(),
                    (function (e) {
                        const t = document.querySelectorAll("[data-site-animation]");
                        if (0 === t.length) return;
                        const n = window.innerWidth;
                        t.forEach((e) => {
                            const t = { rootMargin: `0px 0px ${Nt(e)}px 0px` };
                            new IntersectionObserver((e) => {
                                e.forEach((e, t) => {
                                    (function (e) {
                                        return "animated" === e.target.dataset.siteAnimation;
                                    })(e) ||
                                        (e.target.querySelectorAll("[data-site-animation-order]").forEach((t) => {
                                            (function (e) {
                                                return parseInt(e.target.getAttribute("data-site-animation-breakpoint"));
                                            })(e) >= n && Ft(t),
                                                e.boundingClientRect.top < 0 && Ft(t),
                                                e.isIntersecting &&
                                                (function (e) {
                                                    setTimeout(() => {
                                                        e.setAttribute("data-site-animation-element", "animate");
                                                    }, 100 * e.dataset.siteAnimationOrder);
                                                })(t);
                                        }),
                                            e.isIntersecting &&
                                            (function (e) {
                                                e.target.setAttribute("data-site-animation", "animated");
                                            })(e));
                                });
                            }, t).observe(e);
                        });
                    })(),
                    on.forEach((e) =>
                        (function (e) {
                            document.querySelector(e.selector) && new tn(e.selector, e.options, e.plugins);
                        })(e)
                    ),
                    window.addEventListener("hashchange", function () {
                        if ("" === window.location.hash) return !1;
                        te();
                    }),
                    window.addEventListener("load", te),
                    (function () {
                        const e = document.querySelector('[data-tooltip="container"]');
                        e &&
                            (((e) => {
                                e.addEventListener("mouseover", () => {
                                    sn(e);
                                });
                            })(e),
                                ((e) => {
                                    document.addEventListener("DOMContentLoaded", () => {
                                        sn(e);
                                    });
                                })(e),
                                ((e) => {
                                    window.addEventListener("resize", () => {
                                        sn(e);
                                    });
                                })(e));
                    })(),
                    (function () {
                        const e = document.querySelector("[data-vertical-scrollbar='container']");
                        if (!e) return;
                        const t = document.querySelectorAll("[data-vertical-scrollbar='checkmark']");
                        document.querySelector("[data-vertical-scrollbar='success']"), an(e, t[0]), window.addEventListener("resize", () => an(e, t[0]));
                        const n = 0.5 * window.innerHeight,
                            r = e.offsetHeight,
                            o = e.querySelector(".vertical-scrollbar__fill"),
                            i = Array(100)
                                .fill()
                                .map((e, t) => (t + 1) / 100),
                            s = `${r}px 0px -${n}px 0px`;
                        new IntersectionObserver(
                            (t) => {
                                t.forEach((t) => {
                                    const r = e.getBoundingClientRect().y,
                                        i = n - r;
                                    (o.style.maxHeight = `${i}px`), t.isIntersecting || (o.style.maxHeight = 0);
                                });
                            },
                            { rootMargin: s, threshold: i }
                        ).observe(e);
                        const a = new IntersectionObserver(
                            (e) => {
                                e.forEach((e) => {
                                    if (e.isIntersecting) return (e.target.style.opacity = 1);
                                    e.target.style.opacity = 0;
                                });
                            },
                            { rootMargin: s, threshold: 0.3 }
                        );
                        t.forEach((e) => {
                            a.observe(e);
                        });
                    })(),
                    n(982);
            },
            783: (e, t, n) => {
                "use strict";
                var r = n(618),
                    o = Object.create(null),
                    i = "undefined" == typeof document,
                    s = Array.prototype.forEach;
                function a() { }
                function l(e, t) {
                    if (!t) {
                        if (!e.href) return;
                        t = e.href.split("?")[0];
                    }
                    if (d(t) && !1 !== e.isLoaded && t && t.indexOf(".css") > -1) {
                        e.visited = !0;
                        var n = e.cloneNode();
                        (n.isLoaded = !1),
                            n.addEventListener("load", function () {
                                n.isLoaded || ((n.isLoaded = !0), e.parentNode.removeChild(e));
                            }),
                            n.addEventListener("error", function () {
                                n.isLoaded || ((n.isLoaded = !0), e.parentNode.removeChild(e));
                            }),
                            (n.href = "".concat(t, "?").concat(Date.now())),
                            e.nextSibling ? e.parentNode.insertBefore(n, e.nextSibling) : e.parentNode.appendChild(n);
                    }
                }
                function c() {
                    var e = document.querySelectorAll("link");
                    s.call(e, function (e) {
                        !0 !== e.visited && l(e);
                    });
                }
                function d(e) {
                    return !!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(e);
                }
                e.exports = function (e, t) {
                    if (i) return console.log("no window.document found, will not HMR CSS"), a;
                    var n,
                        u,
                        p = (function (e) {
                            var t = o[e];
                            if (!t) {
                                if (document.currentScript) t = document.currentScript.src;
                                else {
                                    var n = document.getElementsByTagName("script"),
                                        i = n[n.length - 1];
                                    i && (t = i.src);
                                }
                                o[e] = t;
                            }
                            return function (e) {
                                if (!t) return null;
                                var n = t.split(/([^\\/]+)\.js$/),
                                    o = n && n[1];
                                return o && e
                                    ? e.split(",").map(function (e) {
                                        var n = new RegExp("".concat(o, "\\.js$"), "g");
                                        return r(t.replace(n, "".concat(e.replace(/{fileName}/g, o), ".css")));
                                    })
                                    : [t.replace(".js", ".css")];
                            };
                        })(e);
                    return (
                        (n = function () {
                            var e = p(t.filename),
                                n = (function (e) {
                                    if (!e) return !1;
                                    var t = document.querySelectorAll("link"),
                                        n = !1;
                                    return (
                                        s.call(t, function (t) {
                                            if (t.href) {
                                                var o = (function (e, t) {
                                                    var n;
                                                    return (
                                                        (e = r(e)),
                                                        t.some(function (r) {
                                                            e.indexOf(t) > -1 && (n = r);
                                                        }),
                                                        n
                                                    );
                                                })(t.href, e);
                                                d(o) && !0 !== t.visited && o && (l(t, o), (n = !0));
                                            }
                                        }),
                                        n
                                    );
                                })(e);
                            if (t.locals) return console.log("[HMR] Detected local css modules. Reload all css"), void c();
                            n ? console.log("[HMR] css reload %s", e.join(" ")) : (console.log("[HMR] Reload all css"), c());
                        }),
                        50,
                        (u = 0),
                        function () {
                            var e = this,
                                t = arguments;
                            clearTimeout(u),
                                (u = setTimeout(function () {
                                    return n.apply(e, t);
                                }, 50));
                        }
                    );
                };
            },
            618: (e) => {
                "use strict";
                e.exports = function (e) {
                    if (((e = e.trim()), /^data:/i.test(e))) return e;
                    var t = -1 !== e.indexOf("//") ? e.split("//")[0] + "//" : "",
                        n = e.replace(new RegExp(t, "i"), "").split("/"),
                        r = n[0].toLowerCase().replace(/\.$/, "");
                    return (
                        (n[0] = ""),
                        t +
                        r +
                        n
                            .reduce(function (e, t) {
                                switch (t) {
                                    case "..":
                                        e.pop();
                                        break;
                                    case ".":
                                        break;
                                    default:
                                        e.push(t);
                                }
                                return e;
                            }, [])
                            .join("/")
                    );
                };
            },
            982: (e, t, n) => {
                "use strict";
                var r = n(783)(e.id, { locals: !1 });
                e.hot.dispose(r), e.hot.accept(void 0, r);
            },
            183: function (e) {
                e.exports = (function () {
                    "use strict";
                    function e(e, t) {
                        e.split(/\s+/).forEach((e) => {
                            t(e);
                        });
                    }
                    class t {
                        constructor() {
                            (this._events = void 0), (this._events = {});
                        }
                        on(t, n) {
                            e(t, (e) => {
                                const t = this._events[e] || [];
                                t.push(n), (this._events[e] = t);
                            });
                        }
                        off(t, n) {
                            var r = arguments.length;
                            0 !== r
                                ? e(t, (e) => {
                                    if (1 === r) return void delete this._events[e];
                                    const t = this._events[e];
                                    void 0 !== t && (t.splice(t.indexOf(n), 1), (this._events[e] = t));
                                })
                                : (this._events = {});
                        }
                        trigger(t, ...n) {
                            var r = this;
                            e(t, (e) => {
                                const t = r._events[e];
                                void 0 !== t &&
                                    t.forEach((e) => {
                                        e.apply(r, n);
                                    });
                            });
                        }
                    }
                    const n = (e) => ((e = e.filter(Boolean)).length < 2 ? e[0] || "" : 1 == a(e) ? "[" + e.join("") + "]" : "(?:" + e.join("|") + ")"),
                        r = (e) => {
                            if (!i(e)) return e.join("");
                            let t = "",
                                n = 0;
                            const r = () => {
                                n > 1 && (t += "{" + n + "}");
                            };
                            return (
                                e.forEach((o, i) => {
                                    o !== e[i - 1] ? (r(), (t += o), (n = 1)) : n++;
                                }),
                                r(),
                                t
                            );
                        },
                        o = (e) => {
                            let t = c(e);
                            return n(t);
                        },
                        i = (e) => new Set(e).size !== e.length,
                        s = (e) => (e + "").replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu, "\\$1"),
                        a = (e) => e.reduce((e, t) => Math.max(e, l(t)), 0),
                        l = (e) => c(e).length,
                        c = (e) => Array.from(e),
                        d = (e) => {
                            if (1 === e.length) return [[e]];
                            let t = [];
                            const n = e.substring(1);
                            return (
                                d(n).forEach(function (n) {
                                    let r = n.slice(0);
                                    (r[0] = e.charAt(0) + r[0]), t.push(r), (r = n.slice(0)), r.unshift(e.charAt(0)), t.push(r);
                                }),
                                t
                            );
                        },
                        u = [[0, 65535]];
                    let p, f;
                    const h = {},
                        m = {
                            "/": "⁄∕",
                            0: "߀",
                            a: "ⱥɐɑ",
                            aa: "ꜳ",
                            ae: "æǽǣ",
                            ao: "ꜵ",
                            au: "ꜷ",
                            av: "ꜹꜻ",
                            ay: "ꜽ",
                            b: "ƀɓƃ",
                            c: "ꜿƈȼↄ",
                            d: "đɗɖᴅƌꮷԁɦ",
                            e: "ɛǝᴇɇ",
                            f: "ꝼƒ",
                            g: "ǥɠꞡᵹꝿɢ",
                            h: "ħⱨⱶɥ",
                            i: "ɨı",
                            j: "ɉȷ",
                            k: "ƙⱪꝁꝃꝅꞣ",
                            l: "łƚɫⱡꝉꝇꞁɭ",
                            m: "ɱɯϻ",
                            n: "ꞥƞɲꞑᴎлԉ",
                            o: "øǿɔɵꝋꝍᴑ",
                            oe: "œ",
                            oi: "ƣ",
                            oo: "ꝏ",
                            ou: "ȣ",
                            p: "ƥᵽꝑꝓꝕρ",
                            q: "ꝗꝙɋ",
                            r: "ɍɽꝛꞧꞃ",
                            s: "ßȿꞩꞅʂ",
                            t: "ŧƭʈⱦꞇ",
                            th: "þ",
                            tz: "ꜩ",
                            u: "ʉ",
                            v: "ʋꝟʌ",
                            vy: "ꝡ",
                            w: "ⱳ",
                            y: "ƴɏỿ",
                            z: "ƶȥɀⱬꝣ",
                            hv: "ƕ",
                        };
                    for (let e in m) {
                        let t = m[e] || "";
                        for (let n = 0; n < t.length; n++) {
                            let r = t.substring(n, n + 1);
                            h[r] = e;
                        }
                    }
                    const g = new RegExp(Object.keys(h).join("|") + "|[̀-ͯ·ʾʼ]", "gu"),
                        v = (e, t = "NFKD") => e.normalize(t),
                        y = (e) => c(e).reduce((e, t) => e + b(t), ""),
                        b = (e) => (
                            (e = v(e)
                                .toLowerCase()
                                .replace(g, (e) => h[e] || "")),
                            v(e, "NFC")
                        );
                    const w = (e) => {
                        const t = {},
                            n = (e, n) => {
                                const r = t[e] || new Set(),
                                    i = new RegExp("^" + o(r) + "$", "iu");
                                n.match(i) || (r.add(s(n)), (t[e] = r));
                            };
                        for (let t of (function* (e) {
                            for (const [t, n] of e)
                                for (let e = t; e <= n; e++) {
                                    let t = String.fromCharCode(e),
                                        n = y(t);
                                    n != t.toLowerCase() && (n.length > 3 || (0 != n.length && (yield { folded: n, composed: t, code_point: e })));
                                }
                        })(e))
                            n(t.folded, t.folded), n(t.folded, t.composed);
                        return t;
                    },
                        S = (e) => {
                            const t = w(e),
                                r = {};
                            let i = [];
                            for (let e in t) {
                                let n = t[e];
                                n && (r[e] = o(n)), e.length > 1 && i.push(s(e));
                            }
                            i.sort((e, t) => t.length - e.length);
                            const a = n(i);
                            return (f = new RegExp("^" + a, "u")), r;
                        },
                        x = (e, t = 1) => (
                            (t = Math.max(t, e.length - 1)),
                            n(
                                d(e).map((e) =>
                                    ((e, t = 1) => {
                                        let n = 0;
                                        return (e = e.map((e) => (p[e] && (n += e.length), p[e] || e))), n >= t ? r(e) : "";
                                    })(e, t)
                                )
                            )
                        ),
                        E = (e, t = !0) => {
                            let o = e.length > 1 ? 1 : 0;
                            return n(
                                e.map((e) => {
                                    let n = [];
                                    const i = t ? e.length() : e.length() - 1;
                                    for (let t = 0; t < i; t++) n.push(x(e.substrs[t] || "", o));
                                    return r(n);
                                })
                            );
                        },
                        A = (e, t) => {
                            for (const n of t) {
                                if (n.start != e.start || n.end != e.end) continue;
                                if (n.substrs.join("") !== e.substrs.join("")) continue;
                                let t = e.parts;
                                const r = (e) => {
                                    for (const n of t) {
                                        if (n.start === e.start && n.substr === e.substr) return !1;
                                        if (1 != e.length && 1 != n.length) {
                                            if (e.start < n.start && e.end > n.start) return !0;
                                            if (n.start < e.start && n.end > e.start) return !0;
                                        }
                                    }
                                    return !1;
                                };
                                if (!(n.parts.filter(r).length > 0)) return !0;
                            }
                            return !1;
                        };
                    class C {
                        constructor() {
                            (this.parts = []), (this.substrs = []), (this.start = 0), (this.end = 0);
                        }
                        add(e) {
                            e && (this.parts.push(e), this.substrs.push(e.substr), (this.start = Math.min(e.start, this.start)), (this.end = Math.max(e.end, this.end)));
                        }
                        last() {
                            return this.parts[this.parts.length - 1];
                        }
                        length() {
                            return this.parts.length;
                        }
                        clone(e, t) {
                            let n = new C(),
                                r = JSON.parse(JSON.stringify(this.parts)),
                                o = r.pop();
                            for (const e of r) n.add(e);
                            let i = t.substr.substring(0, e - o.start),
                                s = i.length;
                            return n.add({ start: o.start, end: o.start + s, length: s, substr: i }), n;
                        }
                    }
                    const _ = (e) => {
                        var t;
                        void 0 === p && (p = S(t || u)), (e = y(e));
                        let n = "",
                            r = [new C()];
                        for (let t = 0; t < e.length; t++) {
                            let o = e.substring(t).match(f);
                            const i = e.substring(t, t + 1),
                                s = o ? o[0] : null;
                            let a = [],
                                l = new Set();
                            for (const e of r) {
                                const n = e.last();
                                if (!n || 1 == n.length || n.end <= t)
                                    if (s) {
                                        const n = s.length;
                                        e.add({ start: t, end: t + n, length: n, substr: s }), l.add("1");
                                    } else e.add({ start: t, end: t + 1, length: 1, substr: i }), l.add("2");
                                else if (s) {
                                    let r = e.clone(t, n);
                                    const o = s.length;
                                    r.add({ start: t, end: t + o, length: o, substr: s }), a.push(r);
                                } else l.add("3");
                            }
                            if (a.length > 0) {
                                a = a.sort((e, t) => e.length() - t.length());
                                for (let e of a) A(e, r) || r.push(e);
                            } else if (t > 0 && 1 == l.size && !l.has("3")) {
                                n += E(r, !1);
                                let e = new C();
                                const t = r[0];
                                t && e.add(t.last()), (r = [e]);
                            }
                        }
                        return (n += E(r, !0)), n;
                    },
                        k = (e, t) => {
                            if (e) return e[t];
                        },
                        O = (e, t) => {
                            if (e) {
                                for (var n, r = t.split("."); (n = r.shift()) && (e = e[n]););
                                return e;
                            }
                        },
                        L = (e, t, n) => {
                            var r, o;
                            return e ? ((e += ""), null == t.regex || -1 === (o = e.search(t.regex)) ? 0 : ((r = t.string.length / e.length), 0 === o && (r += 0.5), r * n)) : 0;
                        },
                        I = (e, t) => {
                            var n = e[t];
                            if ("function" == typeof n) return n;
                            n && !Array.isArray(n) && (e[t] = [n]);
                        },
                        P = (e, t) => {
                            if (Array.isArray(e)) e.forEach(t);
                            else for (var n in e) e.hasOwnProperty(n) && t(e[n], n);
                        },
                        q = (e, t) => ("number" == typeof e && "number" == typeof t ? (e > t ? 1 : e < t ? -1 : 0) : (e = y(e + "").toLowerCase()) > (t = y(t + "").toLowerCase()) ? 1 : t > e ? -1 : 0);
                    class F {
                        constructor(e, t) {
                            (this.items = void 0), (this.settings = void 0), (this.items = e), (this.settings = t || { diacritics: !0 });
                        }
                        tokenize(e, t, n) {
                            if (!e || !e.length) return [];
                            const r = [],
                                o = e.split(/\s+/);
                            var i;
                            return (
                                n && (i = new RegExp("^(" + Object.keys(n).map(s).join("|") + "):(.*)$")),
                                o.forEach((e) => {
                                    let n,
                                        o = null,
                                        a = null;
                                    i && (n = e.match(i)) && ((o = n[1]), (e = n[2])),
                                        e.length > 0 && ((a = this.settings.diacritics ? _(e) || null : s(e)), a && t && (a = "\\b" + a)),
                                        r.push({ string: e, regex: a ? new RegExp(a, "iu") : null, field: o });
                                }),
                                r
                            );
                        }
                        getScoreFunction(e, t) {
                            var n = this.prepareSearch(e, t);
                            return this._getScoreFunction(n);
                        }
                        _getScoreFunction(e) {
                            const t = e.tokens,
                                n = t.length;
                            if (!n)
                                return function () {
                                    return 0;
                                };
                            const r = e.options.fields,
                                o = e.weights,
                                i = r.length,
                                s = e.getAttrFn;
                            if (!i)
                                return function () {
                                    return 1;
                                };
                            const a =
                                1 === i
                                    ? function (e, t) {
                                        const n = r[0].field;
                                        return L(s(t, n), e, o[n] || 1);
                                    }
                                    : function (e, t) {
                                        var n = 0;
                                        if (e.field) {
                                            const r = s(t, e.field);
                                            !e.regex && r ? (n += 1 / i) : (n += L(r, e, 1));
                                        } else
                                            P(o, (r, o) => {
                                                n += L(s(t, o), e, r);
                                            });
                                        return n / i;
                                    };
                            return 1 === n
                                ? function (e) {
                                    return a(t[0], e);
                                }
                                : "and" === e.options.conjunction
                                    ? function (e) {
                                        var r,
                                            o = 0;
                                        for (let n of t) {
                                            if ((r = a(n, e)) <= 0) return 0;
                                            o += r;
                                        }
                                        return o / n;
                                    }
                                    : function (e) {
                                        var r = 0;
                                        return (
                                            P(t, (t) => {
                                                r += a(t, e);
                                            }),
                                            r / n
                                        );
                                    };
                        }
                        getSortFunction(e, t) {
                            var n = this.prepareSearch(e, t);
                            return this._getSortFunction(n);
                        }
                        _getSortFunction(e) {
                            var t,
                                n = [];
                            const r = this,
                                o = e.options,
                                i = !e.query && o.sort_empty ? o.sort_empty : o.sort;
                            if ("function" == typeof i) return i.bind(this);
                            const s = function (t, n) {
                                return "$score" === t ? n.score : e.getAttrFn(r.items[n.id], t);
                            };
                            if (i) for (let t of i) (e.query || "$score" !== t.field) && n.push(t);
                            if (e.query) {
                                t = !0;
                                for (let e of n)
                                    if ("$score" === e.field) {
                                        t = !1;
                                        break;
                                    }
                                t && n.unshift({ field: "$score", direction: "desc" });
                            } else n = n.filter((e) => "$score" !== e.field);
                            return n.length
                                ? function (e, t) {
                                    var r, o;
                                    for (let i of n) if (((o = i.field), (r = ("desc" === i.direction ? -1 : 1) * q(s(o, e), s(o, t))))) return r;
                                    return 0;
                                }
                                : null;
                        }
                        prepareSearch(e, t) {
                            const n = {};
                            var r = Object.assign({}, t);
                            if ((I(r, "sort"), I(r, "sort_empty"), r.fields)) {
                                I(r, "fields");
                                const e = [];
                                r.fields.forEach((t) => {
                                    "string" == typeof t && (t = { field: t, weight: 1 }), e.push(t), (n[t.field] = "weight" in t ? t.weight : 1);
                                }),
                                    (r.fields = e);
                            }
                            return { options: r, query: e.toLowerCase().trim(), tokens: this.tokenize(e, r.respect_word_boundaries, n), total: 0, items: [], weights: n, getAttrFn: r.nesting ? O : k };
                        }
                        search(e, t) {
                            var n,
                                r,
                                o = this;
                            (r = this.prepareSearch(e, t)), (t = r.options), (e = r.query);
                            const i = t.score || o._getScoreFunction(r);
                            e.length
                                ? P(o.items, (e, o) => {
                                    (n = i(e)), (!1 === t.filter || n > 0) && r.items.push({ score: n, id: o });
                                })
                                : P(o.items, (e, t) => {
                                    r.items.push({ score: 1, id: t });
                                });
                            const s = o._getSortFunction(r);
                            return s && r.items.sort(s), (r.total = r.items.length), "number" == typeof t.limit && (r.items = r.items.slice(0, t.limit)), r;
                        }
                    }
                    const N = (e, t) => {
                        if (Array.isArray(e)) e.forEach(t);
                        else for (var n in e) e.hasOwnProperty(n) && t(e[n], n);
                    },
                        D = (e) => {
                            if (e.jquery) return e[0];
                            if (e instanceof HTMLElement) return e;
                            if (T(e)) {
                                var t = document.createElement("template");
                                return (t.innerHTML = e.trim()), t.content.firstChild;
                            }
                            return document.querySelector(e);
                        },
                        T = (e) => "string" == typeof e && e.indexOf("<") > -1,
                        M = (e, t) => {
                            var n = document.createEvent("HTMLEvents");
                            n.initEvent(t, !0, !1), e.dispatchEvent(n);
                        },
                        V = (e, t) => {
                            Object.assign(e.style, t);
                        },
                        R = (e, ...t) => {
                            var n = U(t);
                            (e = H(e)).map((e) => {
                                n.map((t) => {
                                    e.classList.add(t);
                                });
                            });
                        },
                        j = (e, ...t) => {
                            var n = U(t);
                            (e = H(e)).map((e) => {
                                n.map((t) => {
                                    e.classList.remove(t);
                                });
                            });
                        },
                        U = (e) => {
                            var t = [];
                            return (
                                N(e, (e) => {
                                    "string" == typeof e && (e = e.trim().split(/[\11\12\14\15\40]/)), Array.isArray(e) && (t = t.concat(e));
                                }),
                                t.filter(Boolean)
                            );
                        },
                        H = (e) => (Array.isArray(e) || (e = [e]), e),
                        z = (e, t, n) => {
                            if (!n || n.contains(e))
                                for (; e && e.matches;) {
                                    if (e.matches(t)) return e;
                                    e = e.parentNode;
                                }
                        },
                        B = (e, t = 0) => (t > 0 ? e[e.length - 1] : e[0]),
                        K = (e, t) => {
                            if (!e) return -1;
                            t = t || e.nodeName;
                            for (var n = 0; (e = e.previousElementSibling);) e.matches(t) && n++;
                            return n;
                        },
                        Y = (e, t) => {
                            N(t, (t, n) => {
                                null == t ? e.removeAttribute(n) : e.setAttribute(n, "" + t);
                            });
                        },
                        W = (e, t) => {
                            e.parentNode && e.parentNode.replaceChild(t, e);
                        },
                        Q = (e, t) => {
                            if (null === t) return;
                            if ("string" == typeof t) {
                                if (!t.length) return;
                                t = new RegExp(t, "i");
                            }
                            const n = (e) =>
                                3 === e.nodeType
                                    ? ((e) => {
                                        var n = e.data.match(t);
                                        if (n && e.data.length > 0) {
                                            var r = document.createElement("span");
                                            r.className = "highlight";
                                            var o = e.splitText(n.index);
                                            o.splitText(n[0].length);
                                            var i = o.cloneNode(!0);
                                            return r.appendChild(i), W(o, r), 1;
                                        }
                                        return 0;
                                    })(e)
                                    : (((e) => {
                                        1 !== e.nodeType ||
                                            !e.childNodes ||
                                            /(script|style)/i.test(e.tagName) ||
                                            ("highlight" === e.className && "SPAN" === e.tagName) ||
                                            Array.from(e.childNodes).forEach((e) => {
                                                n(e);
                                            });
                                    })(e),
                                        0);
                            n(e);
                        },
                        G = "undefined" != typeof navigator && /Mac/.test(navigator.userAgent) ? "metaKey" : "ctrlKey";
                    var J = {
                        options: [],
                        optgroups: [],
                        plugins: [],
                        delimiter: ",",
                        splitOn: null,
                        persist: !0,
                        diacritics: !0,
                        create: null,
                        createOnBlur: !1,
                        createFilter: null,
                        highlight: !0,
                        openOnFocus: !0,
                        shouldOpen: null,
                        maxOptions: 50,
                        maxItems: null,
                        hideSelected: null,
                        duplicates: !1,
                        addPrecedence: !1,
                        selectOnTab: !1,
                        preload: null,
                        allowEmptyOption: !1,
                        loadThrottle: 300,
                        loadingClass: "loading",
                        dataAttr: null,
                        optgroupField: "optgroup",
                        valueField: "value",
                        labelField: "text",
                        disabledField: "disabled",
                        optgroupLabelField: "label",
                        optgroupValueField: "value",
                        lockOptgroupOrder: !1,
                        sortField: "$order",
                        searchField: ["text"],
                        searchConjunction: "and",
                        mode: null,
                        wrapperClass: "ts-wrapper",
                        controlClass: "ts-control",
                        dropdownClass: "ts-dropdown",
                        dropdownContentClass: "ts-dropdown-content",
                        itemClass: "item",
                        optionClass: "option",
                        dropdownParent: null,
                        controlInput: '<input type="text" autocomplete="off" size="1" />',
                        copyClassesToDropdown: !1,
                        placeholder: null,
                        hidePlaceholder: null,
                        shouldLoad: function (e) {
                            return e.length > 0;
                        },
                        render: {},
                    };
                    const X = (e) => (null == e ? null : Z(e)),
                        Z = (e) => ("boolean" == typeof e ? (e ? "1" : "0") : e + ""),
                        ee = (e) => (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"),
                        te = (e, t) => {
                            var n;
                            return function (r, o) {
                                var i = this;
                                n && ((i.loading = Math.max(i.loading - 1, 0)), clearTimeout(n)),
                                    (n = setTimeout(function () {
                                        (n = null), (i.loadedSearches[r] = !0), e.call(i, r, o);
                                    }, t));
                            };
                        },
                        ne = (e, t, n) => {
                            var r,
                                o = e.trigger,
                                i = {};
                            for (r of ((e.trigger = function () {
                                var n = arguments[0];
                                if (-1 === t.indexOf(n)) return o.apply(e, arguments);
                                i[n] = arguments;
                            }),
                                n.apply(e, []),
                                (e.trigger = o),
                                t))
                                r in i && o.apply(e, i[r]);
                        },
                        re = (e, t = !1) => {
                            e && (e.preventDefault(), t && e.stopPropagation());
                        },
                        oe = (e, t, n, r) => {
                            e.addEventListener(t, n, r);
                        },
                        ie = (e, t) => !!t && !!t[e] && 1 == (t.altKey ? 1 : 0) + (t.ctrlKey ? 1 : 0) + (t.shiftKey ? 1 : 0) + (t.metaKey ? 1 : 0),
                        se = (e, t) => e.getAttribute("id") || (e.setAttribute("id", t), t),
                        ae = (e) => e.replace(/[\\"']/g, "\\$&"),
                        le = (e, t) => {
                            t && e.append(t);
                        };
                    function ce(e, t) {
                        var n = Object.assign({}, J, t),
                            r = n.dataAttr,
                            o = n.labelField,
                            i = n.valueField,
                            s = n.disabledField,
                            a = n.optgroupField,
                            l = n.optgroupLabelField,
                            c = n.optgroupValueField,
                            d = e.tagName.toLowerCase(),
                            u = e.getAttribute("placeholder") || e.getAttribute("data-placeholder");
                        if (!u && !n.allowEmptyOption) {
                            let t = e.querySelector('option[value=""]');
                            t && (u = t.textContent);
                        }
                        var p,
                            f,
                            h,
                            m,
                            g,
                            v,
                            y,
                            b = { placeholder: u, options: [], optgroups: [], items: [], maxItems: null };
                        return (
                            "select" === d
                                ? ((f = b.options),
                                    (h = {}),
                                    (m = 1),
                                    (g = (e) => {
                                        var t = Object.assign({}, e.dataset),
                                            n = r && t[r];
                                        return "string" == typeof n && n.length && (t = Object.assign(t, JSON.parse(n))), t;
                                    }),
                                    (v = (e, t) => {
                                        var r = X(e.value);
                                        if (null != r && (r || n.allowEmptyOption)) {
                                            if (h.hasOwnProperty(r)) {
                                                if (t) {
                                                    var l = h[r][a];
                                                    l ? (Array.isArray(l) ? l.push(t) : (h[r][a] = [l, t])) : (h[r][a] = t);
                                                }
                                            } else {
                                                var c = g(e);
                                                (c[o] = c[o] || e.textContent), (c[i] = c[i] || r), (c[s] = c[s] || e.disabled), (c[a] = c[a] || t), (c.$option = e), (h[r] = c), f.push(c);
                                            }
                                            e.selected && b.items.push(r);
                                        }
                                    }),
                                    (y = (e) => {
                                        var t, n;
                                        ((n = g(e))[l] = n[l] || e.getAttribute("label") || ""),
                                            (n[c] = n[c] || m++),
                                            (n[s] = n[s] || e.disabled),
                                            b.optgroups.push(n),
                                            (t = n[c]),
                                            N(e.children, (e) => {
                                                v(e, t);
                                            });
                                    }),
                                    (b.maxItems = e.hasAttribute("multiple") ? null : 1),
                                    N(e.children, (e) => {
                                        "optgroup" === (p = e.tagName.toLowerCase()) ? y(e) : "option" === p && v(e);
                                    }))
                                : (() => {
                                    const t = e.getAttribute(r);
                                    if (t)
                                        (b.options = JSON.parse(t)),
                                            N(b.options, (e) => {
                                                b.items.push(e[i]);
                                            });
                                    else {
                                        var s = e.value.trim() || "";
                                        if (!n.allowEmptyOption && !s.length) return;
                                        const t = s.split(n.delimiter);
                                        N(t, (e) => {
                                            const t = {};
                                            (t[o] = e), (t[i] = e), b.options.push(t);
                                        }),
                                            (b.items = t);
                                    }
                                })(),
                            Object.assign({}, J, b, t)
                        );
                    }
                    var de = 0;
                    class ue extends (function (e) {
                        return (
                            (e.plugins = {}),
                            class extends e {
                                constructor(...e) {
                                    super(...e), (this.plugins = { names: [], settings: {}, requested: {}, loaded: {} });
                                }
                                static define(t, n) {
                                    e.plugins[t] = { name: t, fn: n };
                                }
                                initializePlugins(e) {
                                    var t, n;
                                    const r = this,
                                        o = [];
                                    if (Array.isArray(e))
                                        e.forEach((e) => {
                                            "string" == typeof e ? o.push(e) : ((r.plugins.settings[e.name] = e.options), o.push(e.name));
                                        });
                                    else if (e) for (t in e) e.hasOwnProperty(t) && ((r.plugins.settings[t] = e[t]), o.push(t));
                                    for (; (n = o.shift());) r.require(n);
                                }
                                loadPlugin(t) {
                                    var n = this,
                                        r = n.plugins,
                                        o = e.plugins[t];
                                    if (!e.plugins.hasOwnProperty(t)) throw new Error('Unable to find "' + t + '" plugin');
                                    (r.requested[t] = !0), (r.loaded[t] = o.fn.apply(n, [n.plugins.settings[t] || {}])), r.names.push(t);
                                }
                                require(e) {
                                    var t = this,
                                        n = t.plugins;
                                    if (!t.plugins.loaded.hasOwnProperty(e)) {
                                        if (n.requested[e]) throw new Error('Plugin has circular dependency ("' + e + '")');
                                        t.loadPlugin(e);
                                    }
                                    return n.loaded[e];
                                }
                            }
                        );
                    })(t) {
                        constructor(e, t) {
                            var n;
                            super(),
                                (this.control_input = void 0),
                                (this.wrapper = void 0),
                                (this.dropdown = void 0),
                                (this.control = void 0),
                                (this.dropdown_content = void 0),
                                (this.focus_node = void 0),
                                (this.order = 0),
                                (this.settings = void 0),
                                (this.input = void 0),
                                (this.tabIndex = void 0),
                                (this.is_select_tag = void 0),
                                (this.rtl = void 0),
                                (this.inputId = void 0),
                                (this._destroy = void 0),
                                (this.sifter = void 0),
                                (this.isOpen = !1),
                                (this.isDisabled = !1),
                                (this.isRequired = void 0),
                                (this.isInvalid = !1),
                                (this.isValid = !0),
                                (this.isLocked = !1),
                                (this.isFocused = !1),
                                (this.isInputHidden = !1),
                                (this.isSetup = !1),
                                (this.ignoreFocus = !1),
                                (this.ignoreHover = !1),
                                (this.hasOptions = !1),
                                (this.currentResults = void 0),
                                (this.lastValue = ""),
                                (this.caretPos = 0),
                                (this.loading = 0),
                                (this.loadedSearches = {}),
                                (this.activeOption = null),
                                (this.activeItems = []),
                                (this.optgroups = {}),
                                (this.options = {}),
                                (this.userOptions = {}),
                                (this.items = []),
                                de++;
                            var r = D(e);
                            if (r.tomselect) throw new Error("Tom Select already initialized on this element");
                            (r.tomselect = this), (n = (window.getComputedStyle && window.getComputedStyle(r, null)).getPropertyValue("direction"));
                            const o = ce(r, t);
                            (this.settings = o),
                                (this.input = r),
                                (this.tabIndex = r.tabIndex || 0),
                                (this.is_select_tag = "select" === r.tagName.toLowerCase()),
                                (this.rtl = /rtl/i.test(n)),
                                (this.inputId = se(r, "tomselect-" + de)),
                                (this.isRequired = r.required),
                                (this.sifter = new F(this.options, { diacritics: o.diacritics })),
                                (o.mode = o.mode || (1 === o.maxItems ? "single" : "multi")),
                                "boolean" != typeof o.hideSelected && (o.hideSelected = "multi" === o.mode),
                                "boolean" != typeof o.hidePlaceholder && (o.hidePlaceholder = "multi" !== o.mode);
                            var i = o.createFilter;
                            "function" != typeof i && ("string" == typeof i && (i = new RegExp(i)), i instanceof RegExp ? (o.createFilter = (e) => i.test(e)) : (o.createFilter = (e) => this.settings.duplicates || !this.options[e])),
                                this.initializePlugins(o.plugins),
                                this.setupCallbacks(),
                                this.setupTemplates();
                            const s = D("<div>"),
                                a = D("<div>"),
                                l = this._render("dropdown"),
                                c = D('<div role="listbox" tabindex="-1">'),
                                d = this.input.getAttribute("class") || "",
                                u = o.mode;
                            var p;
                            R(s, o.wrapperClass, d, u),
                                R(a, o.controlClass),
                                le(s, a),
                                R(l, o.dropdownClass, u),
                                o.copyClassesToDropdown && R(l, d),
                                R(c, o.dropdownContentClass),
                                le(l, c),
                                D(o.dropdownParent || s).appendChild(l),
                                T(o.controlInput)
                                    ? ((p = D(o.controlInput)),
                                        P(["autocorrect", "autocapitalize", "autocomplete"], (e) => {
                                            r.getAttribute(e) && Y(p, { [e]: r.getAttribute(e) });
                                        }),
                                        (p.tabIndex = -1),
                                        a.appendChild(p),
                                        (this.focus_node = p))
                                    : o.controlInput
                                        ? ((p = D(o.controlInput)), (this.focus_node = p))
                                        : ((p = D("<input/>")), (this.focus_node = a)),
                                (this.wrapper = s),
                                (this.dropdown = l),
                                (this.dropdown_content = c),
                                (this.control = a),
                                (this.control_input = p),
                                this.setup();
                        }
                        setup() {
                            const e = this,
                                t = e.settings,
                                n = e.control_input,
                                r = e.dropdown,
                                o = e.dropdown_content,
                                i = e.wrapper,
                                a = e.control,
                                l = e.input,
                                c = e.focus_node,
                                d = { passive: !0 },
                                u = e.inputId + "-ts-dropdown";
                            Y(o, { id: u }), Y(c, { role: "combobox", "aria-haspopup": "listbox", "aria-expanded": "false", "aria-controls": u });
                            const p = se(c, e.inputId + "-ts-control"),
                                f = "label[for='" + ((e) => e.replace(/['"\\]/g, "\\$&"))(e.inputId) + "']",
                                h = document.querySelector(f),
                                m = e.focus.bind(e);
                            if (h) {
                                oe(h, "click", m), Y(h, { for: p });
                                const t = se(h, e.inputId + "-ts-label");
                                Y(c, { "aria-labelledby": t }), Y(o, { "aria-labelledby": t });
                            }
                            if (((i.style.width = l.style.width), e.plugins.names.length)) {
                                const t = "plugin-" + e.plugins.names.join(" plugin-");
                                R([i, r], t);
                            }
                            (null === t.maxItems || t.maxItems > 1) && e.is_select_tag && Y(l, { multiple: "multiple" }),
                                t.placeholder && Y(n, { placeholder: t.placeholder }),
                                !t.splitOn && t.delimiter && (t.splitOn = new RegExp("\\s*" + s(t.delimiter) + "+\\s*")),
                                t.load && t.loadThrottle && (t.load = te(t.load, t.loadThrottle)),
                                (e.control_input.type = l.type),
                                oe(r, "mousemove", () => {
                                    e.ignoreHover = !1;
                                }),
                                oe(
                                    r,
                                    "mouseenter",
                                    (t) => {
                                        var n = z(t.target, "[data-selectable]", r);
                                        n && e.onOptionHover(t, n);
                                    },
                                    { capture: !0 }
                                ),
                                oe(r, "click", (t) => {
                                    const n = z(t.target, "[data-selectable]");
                                    n && (e.onOptionSelect(t, n), re(t, !0));
                                }),
                                oe(a, "click", (t) => {
                                    var r = z(t.target, "[data-ts-item]", a);
                                    r && e.onItemSelect(t, r) ? re(t, !0) : "" == n.value && (e.onClick(), re(t, !0));
                                }),
                                oe(c, "keydown", (t) => e.onKeyDown(t)),
                                oe(n, "keypress", (t) => e.onKeyPress(t)),
                                oe(n, "input", (t) => e.onInput(t)),
                                oe(c, "blur", (t) => e.onBlur(t)),
                                oe(c, "focus", (t) => e.onFocus(t)),
                                oe(n, "paste", (t) => e.onPaste(t));
                            const g = (t) => {
                                const o = t.composedPath()[0];
                                if (!i.contains(o) && !r.contains(o)) return e.isFocused && e.blur(), void e.inputState();
                                o == n && e.isOpen ? t.stopPropagation() : re(t, !0);
                            },
                                v = () => {
                                    e.isOpen && e.positionDropdown();
                                };
                            oe(document, "mousedown", g),
                                oe(window, "scroll", v, d),
                                oe(window, "resize", v, d),
                                (this._destroy = () => {
                                    document.removeEventListener("mousedown", g), window.removeEventListener("scroll", v), window.removeEventListener("resize", v), h && h.removeEventListener("click", m);
                                }),
                                (this.revertSettings = { innerHTML: l.innerHTML, tabIndex: l.tabIndex }),
                                (l.tabIndex = -1),
                                l.insertAdjacentElement("afterend", e.wrapper),
                                e.sync(!1),
                                (t.items = []),
                                delete t.optgroups,
                                delete t.options,
                                oe(l, "invalid", () => {
                                    e.isValid && ((e.isValid = !1), (e.isInvalid = !0), e.refreshState());
                                }),
                                e.updateOriginalInput(),
                                e.refreshItems(),
                                e.close(!1),
                                e.inputState(),
                                (e.isSetup = !0),
                                l.disabled ? e.disable() : e.enable(),
                                e.on("change", this.onChange),
                                R(l, "tomselected", "ts-hidden-accessible"),
                                e.trigger("initialize"),
                                !0 === t.preload && e.preload();
                        }
                        setupOptions(e = [], t = []) {
                            this.addOptions(e),
                                P(t, (e) => {
                                    this.registerOptionGroup(e);
                                });
                        }
                        setupTemplates() {
                            var e = this,
                                t = e.settings.labelField,
                                n = e.settings.optgroupLabelField,
                                r = {
                                    optgroup: (e) => {
                                        let t = document.createElement("div");
                                        return (t.className = "optgroup"), t.appendChild(e.options), t;
                                    },
                                    optgroup_header: (e, t) => '<div class="optgroup-header">' + t(e[n]) + "</div>",
                                    option: (e, n) => "<div>" + n(e[t]) + "</div>",
                                    item: (e, n) => "<div>" + n(e[t]) + "</div>",
                                    option_create: (e, t) => '<div class="create">Add <strong>' + t(e.input) + "</strong>&hellip;</div>",
                                    no_results: () => '<div class="no-results">No results found</div>',
                                    loading: () => '<div class="spinner"></div>',
                                    not_loading: () => { },
                                    dropdown: () => "<div></div>",
                                };
                            e.settings.render = Object.assign({}, r, e.settings.render);
                        }
                        setupCallbacks() {
                            var e,
                                t,
                                n = {
                                    initialize: "onInitialize",
                                    change: "onChange",
                                    item_add: "onItemAdd",
                                    item_remove: "onItemRemove",
                                    item_select: "onItemSelect",
                                    clear: "onClear",
                                    option_add: "onOptionAdd",
                                    option_remove: "onOptionRemove",
                                    option_clear: "onOptionClear",
                                    optgroup_add: "onOptionGroupAdd",
                                    optgroup_remove: "onOptionGroupRemove",
                                    optgroup_clear: "onOptionGroupClear",
                                    dropdown_open: "onDropdownOpen",
                                    dropdown_close: "onDropdownClose",
                                    type: "onType",
                                    load: "onLoad",
                                    focus: "onFocus",
                                    blur: "onBlur",
                                };
                            for (e in n) (t = this.settings[n[e]]) && this.on(e, t);
                        }
                        sync(e = !0) {
                            const t = this,
                                n = e ? ce(t.input, { delimiter: t.settings.delimiter }) : t.settings;
                            t.setupOptions(n.options, n.optgroups), t.setValue(n.items || [], !0), (t.lastQuery = null);
                        }
                        onClick() {
                            var e = this;
                            if (e.activeItems.length > 0) return e.clearActiveItems(), void e.focus();
                            e.isFocused && e.isOpen ? e.blur() : e.focus();
                        }
                        onMouseDown() { }
                        onChange() {
                            M(this.input, "input"), M(this.input, "change");
                        }
                        onPaste(e) {
                            var t = this;
                            t.isInputHidden || t.isLocked
                                ? re(e)
                                : t.settings.splitOn &&
                                setTimeout(() => {
                                    var e = t.inputValue();
                                    if (e.match(t.settings.splitOn)) {
                                        var n = e.trim().split(t.settings.splitOn);
                                        P(n, (e) => {
                                            X(e) && (this.options[e] ? t.addItem(e) : t.createItem(e));
                                        });
                                    }
                                }, 0);
                        }
                        onKeyPress(e) {
                            var t = this;
                            if (!t.isLocked) {
                                var n = String.fromCharCode(e.keyCode || e.which);
                                return t.settings.create && "multi" === t.settings.mode && n === t.settings.delimiter ? (t.createItem(), void re(e)) : void 0;
                            }
                            re(e);
                        }
                        onKeyDown(e) {
                            var t = this;
                            if (((t.ignoreHover = !0), t.isLocked)) 9 !== e.keyCode && re(e);
                            else {
                                switch (e.keyCode) {
                                    case 65:
                                        if (ie(G, e) && "" == t.control_input.value) return re(e), void t.selectAll();
                                        break;
                                    case 27:
                                        return t.isOpen && (re(e, !0), t.close()), void t.clearActiveItems();
                                    case 40:
                                        if (!t.isOpen && t.hasOptions) t.open();
                                        else if (t.activeOption) {
                                            let e = t.getAdjacent(t.activeOption, 1);
                                            e && t.setActiveOption(e);
                                        }
                                        return void re(e);
                                    case 38:
                                        if (t.activeOption) {
                                            let e = t.getAdjacent(t.activeOption, -1);
                                            e && t.setActiveOption(e);
                                        }
                                        return void re(e);
                                    case 13:
                                        return void (t.canSelect(t.activeOption) ? (t.onOptionSelect(e, t.activeOption), re(e)) : ((t.settings.create && t.createItem()) || (document.activeElement == t.control_input && t.isOpen)) && re(e));
                                    case 37:
                                        return void t.advanceSelection(-1, e);
                                    case 39:
                                        return void t.advanceSelection(1, e);
                                    case 9:
                                        return void (t.settings.selectOnTab && (t.canSelect(t.activeOption) && (t.onOptionSelect(e, t.activeOption), re(e)), t.settings.create && t.createItem() && re(e)));
                                    case 8:
                                    case 46:
                                        return void t.deleteSelection(e);
                                }
                                t.isInputHidden && !ie(G, e) && re(e);
                            }
                        }
                        onInput(e) {
                            var t = this;
                            if (!t.isLocked) {
                                var n = t.inputValue();
                                t.lastValue !== n && ((t.lastValue = n), t.settings.shouldLoad.call(t, n) && t.load(n), t.refreshOptions(), t.trigger("type", n));
                            }
                        }
                        onOptionHover(e, t) {
                            this.ignoreHover || this.setActiveOption(t, !1);
                        }
                        onFocus(e) {
                            var t = this,
                                n = t.isFocused;
                            if (t.isDisabled) return t.blur(), void re(e);
                            t.ignoreFocus ||
                                ((t.isFocused = !0), "focus" === t.settings.preload && t.preload(), n || t.trigger("focus"), t.activeItems.length || (t.showInput(), t.refreshOptions(!!t.settings.openOnFocus)), t.refreshState());
                        }
                        onBlur(e) {
                            if (!1 !== document.hasFocus()) {
                                var t = this;
                                if (t.isFocused) {
                                    (t.isFocused = !1), (t.ignoreFocus = !1);
                                    var n = () => {
                                        t.close(), t.setActiveItem(), t.setCaret(t.items.length), t.trigger("blur");
                                    };
                                    t.settings.create && t.settings.createOnBlur ? t.createItem(null, n) : n();
                                }
                            }
                        }
                        onOptionSelect(e, t) {
                            var n,
                                r = this;
                            (t.parentElement && t.parentElement.matches("[data-disabled]")) ||
                                (t.classList.contains("create")
                                    ? r.createItem(null, () => {
                                        r.settings.closeAfterSelect && r.close();
                                    })
                                    : void 0 !== (n = t.dataset.value) && ((r.lastQuery = null), r.addItem(n), r.settings.closeAfterSelect && r.close(), !r.settings.hideSelected && e.type && /click/.test(e.type) && r.setActiveOption(t)));
                        }
                        canSelect(e) {
                            return !!(this.isOpen && e && this.dropdown_content.contains(e));
                        }
                        onItemSelect(e, t) {
                            var n = this;
                            return !n.isLocked && "multi" === n.settings.mode && (re(e), n.setActiveItem(t, e), !0);
                        }
                        canLoad(e) {
                            return !!this.settings.load && !this.loadedSearches.hasOwnProperty(e);
                        }
                        load(e) {
                            const t = this;
                            if (!t.canLoad(e)) return;
                            R(t.wrapper, t.settings.loadingClass), t.loading++;
                            const n = t.loadCallback.bind(t);
                            t.settings.load.call(t, e, n);
                        }
                        loadCallback(e, t) {
                            const n = this;
                            (n.loading = Math.max(n.loading - 1, 0)),
                                (n.lastQuery = null),
                                n.clearActiveOption(),
                                n.setupOptions(e, t),
                                n.refreshOptions(n.isFocused && !n.isInputHidden),
                                n.loading || j(n.wrapper, n.settings.loadingClass),
                                n.trigger("load", e, t);
                        }
                        preload() {
                            var e = this.wrapper.classList;
                            e.contains("preloaded") || (e.add("preloaded"), this.load(""));
                        }
                        setTextboxValue(e = "") {
                            var t = this.control_input;
                            t.value !== e && ((t.value = e), M(t, "update"), (this.lastValue = e));
                        }
                        getValue() {
                            return this.is_select_tag && this.input.hasAttribute("multiple") ? this.items : this.items.join(this.settings.delimiter);
                        }
                        setValue(e, t) {
                            ne(this, t ? [] : ["change"], () => {
                                this.clear(t), this.addItems(e, t);
                            });
                        }
                        setMaxItems(e) {
                            0 === e && (e = null), (this.settings.maxItems = e), this.refreshState();
                        }
                        setActiveItem(e, t) {
                            var n,
                                r,
                                o,
                                i,
                                s,
                                a,
                                l = this;
                            if ("single" !== l.settings.mode) {
                                if (!e) return l.clearActiveItems(), void (l.isFocused && l.showInput());
                                if ("click" === (n = t && t.type.toLowerCase()) && ie("shiftKey", t) && l.activeItems.length) {
                                    for (a = l.getLastActive(), (o = Array.prototype.indexOf.call(l.control.children, a)) > (i = Array.prototype.indexOf.call(l.control.children, e)) && ((s = o), (o = i), (i = s)), r = o; r <= i; r++)
                                        (e = l.control.children[r]), -1 === l.activeItems.indexOf(e) && l.setActiveItemClass(e);
                                    re(t);
                                } else
                                    ("click" === n && ie(G, t)) || ("keydown" === n && ie("shiftKey", t))
                                        ? e.classList.contains("active")
                                            ? l.removeActiveItem(e)
                                            : l.setActiveItemClass(e)
                                        : (l.clearActiveItems(), l.setActiveItemClass(e));
                                l.hideInput(), l.isFocused || l.focus();
                            }
                        }
                        setActiveItemClass(e) {
                            const t = this,
                                n = t.control.querySelector(".last-active");
                            n && j(n, "last-active"), R(e, "active last-active"), t.trigger("item_select", e), -1 == t.activeItems.indexOf(e) && t.activeItems.push(e);
                        }
                        removeActiveItem(e) {
                            var t = this.activeItems.indexOf(e);
                            this.activeItems.splice(t, 1), j(e, "active");
                        }
                        clearActiveItems() {
                            j(this.activeItems, "active"), (this.activeItems = []);
                        }
                        setActiveOption(e, t = !0) {
                            e !== this.activeOption &&
                                (this.clearActiveOption(),
                                    e && ((this.activeOption = e), Y(this.focus_node, { "aria-activedescendant": e.getAttribute("id") }), Y(e, { "aria-selected": "true" }), R(e, "active"), t && this.scrollToOption(e)));
                        }
                        scrollToOption(e, t) {
                            if (!e) return;
                            const n = this.dropdown_content,
                                r = n.clientHeight,
                                o = n.scrollTop || 0,
                                i = e.offsetHeight,
                                s = e.getBoundingClientRect().top - n.getBoundingClientRect().top + o;
                            s + i > r + o ? this.scroll(s - r + i, t) : s < o && this.scroll(s, t);
                        }
                        scroll(e, t) {
                            const n = this.dropdown_content;
                            t && (n.style.scrollBehavior = t), (n.scrollTop = e), (n.style.scrollBehavior = "");
                        }
                        clearActiveOption() {
                            this.activeOption && (j(this.activeOption, "active"), Y(this.activeOption, { "aria-selected": null })), (this.activeOption = null), Y(this.focus_node, { "aria-activedescendant": null });
                        }
                        selectAll() {
                            const e = this;
                            if ("single" === e.settings.mode) return;
                            const t = e.controlChildren();
                            t.length &&
                                (e.hideInput(),
                                    e.close(),
                                    (e.activeItems = t),
                                    P(t, (t) => {
                                        e.setActiveItemClass(t);
                                    }));
                        }
                        inputState() {
                            var e = this;
                            e.control.contains(e.control_input) &&
                                (Y(e.control_input, { placeholder: e.settings.placeholder }),
                                    e.activeItems.length > 0 || (!e.isFocused && e.settings.hidePlaceholder && e.items.length > 0)
                                        ? (e.setTextboxValue(), (e.isInputHidden = !0))
                                        : (e.settings.hidePlaceholder && e.items.length > 0 && Y(e.control_input, { placeholder: "" }), (e.isInputHidden = !1)),
                                    e.wrapper.classList.toggle("input-hidden", e.isInputHidden));
                        }
                        hideInput() {
                            this.inputState();
                        }
                        showInput() {
                            this.inputState();
                        }
                        inputValue() {
                            return this.control_input.value.trim();
                        }
                        focus() {
                            var e = this;
                            e.isDisabled ||
                                ((e.ignoreFocus = !0),
                                    e.control_input.offsetWidth ? e.control_input.focus() : e.focus_node.focus(),
                                    setTimeout(() => {
                                        (e.ignoreFocus = !1), e.onFocus();
                                    }, 0));
                        }
                        blur() {
                            this.focus_node.blur(), this.onBlur();
                        }
                        getScoreFunction(e) {
                            return this.sifter.getScoreFunction(e, this.getSearchOptions());
                        }
                        getSearchOptions() {
                            var e = this.settings,
                                t = e.sortField;
                            return "string" == typeof e.sortField && (t = [{ field: e.sortField }]), { fields: e.searchField, conjunction: e.searchConjunction, sort: t, nesting: e.nesting };
                        }
                        search(e) {
                            var t,
                                n,
                                r = this,
                                o = this.getSearchOptions();
                            if (r.settings.score && "function" != typeof (n = r.settings.score.call(r, e))) throw new Error('Tom Select "score" setting must be a function that returns a function');
                            return (
                                e !== r.lastQuery ? ((r.lastQuery = e), (t = r.sifter.search(e, Object.assign(o, { score: n }))), (r.currentResults = t)) : (t = Object.assign({}, r.currentResults)),
                                r.settings.hideSelected &&
                                (t.items = t.items.filter((e) => {
                                    let t = X(e.id);
                                    return !(t && -1 !== r.items.indexOf(t));
                                })),
                                t
                            );
                        }
                        refreshOptions(e = !0) {
                            var t, n, r, o, i, s, a, l, c, d;
                            const u = {},
                                p = [];
                            var f = this,
                                h = f.inputValue();
                            const m = h === f.lastQuery || ("" == h && null == f.lastQuery);
                            var g,
                                v = f.search(h),
                                y = null,
                                b = f.settings.shouldOpen || !1,
                                w = f.dropdown_content;
                            for (m && (y = f.activeOption) && (c = y.closest("[data-group]")), o = v.items.length, "number" == typeof f.settings.maxOptions && (o = Math.min(o, f.settings.maxOptions)), o > 0 && (b = !0), t = 0; t < o; t++) {
                                let e = v.items[t];
                                if (!e) continue;
                                let o = e.id,
                                    a = f.options[o];
                                if (void 0 === a) continue;
                                let l = Z(o),
                                    d = f.getOption(l, !0);
                                for (f.settings.hideSelected || d.classList.toggle("selected", f.items.includes(l)), i = a[f.settings.optgroupField] || "", n = 0, r = (s = Array.isArray(i) ? i : [i]) && s.length; n < r; n++) {
                                    (i = s[n]), f.optgroups.hasOwnProperty(i) || (i = "");
                                    let e = u[i];
                                    void 0 === e && ((e = document.createDocumentFragment()), p.push(i)),
                                        n > 0 &&
                                        ((d = d.cloneNode(!0)),
                                            Y(d, { id: a.$id + "-clone-" + n, "aria-selected": null }),
                                            d.classList.add("ts-cloned"),
                                            j(d, "active"),
                                            f.activeOption && f.activeOption.dataset.value == o && c && c.dataset.group === i.toString() && (y = d)),
                                        e.appendChild(d),
                                        (u[i] = e);
                                }
                            }
                            f.settings.lockOptgroupOrder &&
                                p.sort((e, t) => {
                                    const n = f.optgroups[e],
                                        r = f.optgroups[t];
                                    return ((n && n.$order) || 0) - ((r && r.$order) || 0);
                                }),
                                (a = document.createDocumentFragment()),
                                P(p, (e) => {
                                    let t = u[e];
                                    if (!t || !t.children.length) return;
                                    let n = f.optgroups[e];
                                    if (void 0 !== n) {
                                        let e = document.createDocumentFragment(),
                                            r = f.render("optgroup_header", n);
                                        le(e, r), le(e, t);
                                        let o = f.render("optgroup", { group: n, options: e });
                                        le(a, o);
                                    } else le(a, t);
                                }),
                                (w.innerHTML = ""),
                                le(w, a),
                                f.settings.highlight &&
                                ((g = w.querySelectorAll("span.highlight")),
                                    Array.prototype.forEach.call(g, function (e) {
                                        var t = e.parentNode;
                                        t.replaceChild(e.firstChild, e), t.normalize();
                                    }),
                                    v.query.length &&
                                    v.tokens.length &&
                                    P(v.tokens, (e) => {
                                        Q(w, e.regex);
                                    }));
                            var S = (e) => {
                                let t = f.render(e, { input: h });
                                return t && ((b = !0), w.insertBefore(t, w.firstChild)), t;
                            };
                            if (
                                (f.loading ? S("loading") : f.settings.shouldLoad.call(f, h) ? 0 === v.items.length && S("no_results") : S("not_loading"),
                                    (l = f.canCreate(h)) && (d = S("option_create")),
                                    (f.hasOptions = v.items.length > 0 || l),
                                    b)
                            ) {
                                if (v.items.length > 0) {
                                    if ((y || "single" !== f.settings.mode || null == f.items[0] || (y = f.getOption(f.items[0])), !w.contains(y))) {
                                        let e = 0;
                                        d && !f.settings.addPrecedence && (e = 1), (y = f.selectable()[e]);
                                    }
                                } else d && (y = d);
                                e && !f.isOpen && (f.open(), f.scrollToOption(y, "auto")), f.setActiveOption(y);
                            } else f.clearActiveOption(), e && f.isOpen && f.close(!1);
                        }
                        selectable() {
                            return this.dropdown_content.querySelectorAll("[data-selectable]");
                        }
                        addOption(e, t = !1) {
                            const n = this;
                            if (Array.isArray(e)) return n.addOptions(e, t), !1;
                            const r = X(e[n.settings.valueField]);
                            return (
                                null !== r &&
                                !n.options.hasOwnProperty(r) &&
                                ((e.$order = e.$order || ++n.order), (e.$id = n.inputId + "-opt-" + e.$order), (n.options[r] = e), (n.lastQuery = null), t && ((n.userOptions[r] = t), n.trigger("option_add", r, e)), r)
                            );
                        }
                        addOptions(e, t = !1) {
                            P(e, (e) => {
                                this.addOption(e, t);
                            });
                        }
                        registerOption(e) {
                            return this.addOption(e);
                        }
                        registerOptionGroup(e) {
                            var t = X(e[this.settings.optgroupValueField]);
                            return null !== t && ((e.$order = e.$order || ++this.order), (this.optgroups[t] = e), t);
                        }
                        addOptionGroup(e, t) {
                            var n;
                            (t[this.settings.optgroupValueField] = e), (n = this.registerOptionGroup(t)) && this.trigger("optgroup_add", n, t);
                        }
                        removeOptionGroup(e) {
                            this.optgroups.hasOwnProperty(e) && (delete this.optgroups[e], this.clearCache(), this.trigger("optgroup_remove", e));
                        }
                        clearOptionGroups() {
                            (this.optgroups = {}), this.clearCache(), this.trigger("optgroup_clear");
                        }
                        updateOption(e, t) {
                            const n = this;
                            var r, o;
                            const i = X(e),
                                s = X(t[n.settings.valueField]);
                            if (null === i) return;
                            const a = n.options[i];
                            if (null == a) return;
                            if ("string" != typeof s) throw new Error("Value must be set in option data");
                            const l = n.getOption(i),
                                c = n.getItem(i);
                            if (((t.$order = t.$order || a.$order), delete n.options[i], n.uncacheValue(s), (n.options[s] = t), l)) {
                                if (n.dropdown_content.contains(l)) {
                                    const e = n._render("option", t);
                                    W(l, e), n.activeOption === l && n.setActiveOption(e);
                                }
                                l.remove();
                            }
                            c && (-1 !== (o = n.items.indexOf(i)) && n.items.splice(o, 1, s), (r = n._render("item", t)), c.classList.contains("active") && R(r, "active"), W(c, r)), (n.lastQuery = null);
                        }
                        removeOption(e, t) {
                            const n = this;
                            (e = Z(e)), n.uncacheValue(e), delete n.userOptions[e], delete n.options[e], (n.lastQuery = null), n.trigger("option_remove", e), n.removeItem(e, t);
                        }
                        clearOptions(e) {
                            const t = (e || this.clearFilter).bind(this);
                            (this.loadedSearches = {}), (this.userOptions = {}), this.clearCache();
                            const n = {};
                            P(this.options, (e, r) => {
                                t(e, r) && (n[r] = e);
                            }),
                                (this.options = this.sifter.items = n),
                                (this.lastQuery = null),
                                this.trigger("option_clear");
                        }
                        clearFilter(e, t) {
                            return this.items.indexOf(t) >= 0;
                        }
                        getOption(e, t = !1) {
                            const n = X(e);
                            if (null === n) return null;
                            const r = this.options[n];
                            if (null != r) {
                                if (r.$div) return r.$div;
                                if (t) return this._render("option", r);
                            }
                            return null;
                        }
                        getAdjacent(e, t, n = "option") {
                            var r;
                            if (!e) return null;
                            r = "item" == n ? this.controlChildren() : this.dropdown_content.querySelectorAll("[data-selectable]");
                            for (let n = 0; n < r.length; n++) if (r[n] == e) return t > 0 ? r[n + 1] : r[n - 1];
                            return null;
                        }
                        getItem(e) {
                            if ("object" == typeof e) return e;
                            var t = X(e);
                            return null !== t ? this.control.querySelector(`[data-value="${ae(t)}"]`) : null;
                        }
                        addItems(e, t) {
                            var n = this,
                                r = Array.isArray(e) ? e : [e];
                            const o = (r = r.filter((e) => -1 === n.items.indexOf(e)))[r.length - 1];
                            r.forEach((e) => {
                                (n.isPending = e !== o), n.addItem(e, t);
                            });
                        }
                        addItem(e, t) {
                            ne(this, t ? [] : ["change", "dropdown_close"], () => {
                                var n, r;
                                const o = this,
                                    i = o.settings.mode,
                                    s = X(e);
                                if (
                                    (!s || -1 === o.items.indexOf(s) || ("single" === i && o.close(), "single" !== i && o.settings.duplicates)) &&
                                    null !== s &&
                                    o.options.hasOwnProperty(s) &&
                                    ("single" === i && o.clear(t), "multi" !== i || !o.isFull())
                                ) {
                                    if (((n = o._render("item", o.options[s])), o.control.contains(n) && (n = n.cloneNode(!0)), (r = o.isFull()), o.items.splice(o.caretPos, 0, s), o.insertAtCaret(n), o.isSetup)) {
                                        if (!o.isPending && o.settings.hideSelected) {
                                            let e = o.getOption(s),
                                                t = o.getAdjacent(e, 1);
                                            t && o.setActiveOption(t);
                                        }
                                        o.isPending || o.settings.closeAfterSelect || o.refreshOptions(o.isFocused && "single" !== i),
                                            0 != o.settings.closeAfterSelect && o.isFull() ? o.close() : o.isPending || o.positionDropdown(),
                                            o.trigger("item_add", s, n),
                                            o.isPending || o.updateOriginalInput({ silent: t });
                                    }
                                    (!o.isPending || (!r && o.isFull())) && (o.inputState(), o.refreshState());
                                }
                            });
                        }
                        removeItem(e = null, t) {
                            const n = this;
                            if (!(e = n.getItem(e))) return;
                            var r, o;
                            const i = e.dataset.value;
                            (r = K(e)),
                                e.remove(),
                                e.classList.contains("active") && ((o = n.activeItems.indexOf(e)), n.activeItems.splice(o, 1), j(e, "active")),
                                n.items.splice(r, 1),
                                (n.lastQuery = null),
                                !n.settings.persist && n.userOptions.hasOwnProperty(i) && n.removeOption(i, t),
                                r < n.caretPos && n.setCaret(n.caretPos - 1),
                                n.updateOriginalInput({ silent: t }),
                                n.refreshState(),
                                n.positionDropdown(),
                                n.trigger("item_remove", i, e);
                        }
                        createItem(e = null, t = () => { }) {
                            3 === arguments.length && (t = arguments[2]), "function" != typeof t && (t = () => { });
                            var n,
                                r = this,
                                o = r.caretPos;
                            if (((e = e || r.inputValue()), !r.canCreate(e))) return t(), !1;
                            r.lock();
                            var i = !1,
                                s = (e) => {
                                    if ((r.unlock(), !e || "object" != typeof e)) return t();
                                    var n = X(e[r.settings.valueField]);
                                    if ("string" != typeof n) return t();
                                    r.setTextboxValue(), r.addOption(e, !0), r.setCaret(o), r.addItem(n), t(e), (i = !0);
                                };
                            return (n = "function" == typeof r.settings.create ? r.settings.create.call(this, e, s) : { [r.settings.labelField]: e, [r.settings.valueField]: e }), i || s(n), !0;
                        }
                        refreshItems() {
                            var e = this;
                            (e.lastQuery = null), e.isSetup && e.addItems(e.items), e.updateOriginalInput(), e.refreshState();
                        }
                        refreshState() {
                            const e = this;
                            e.refreshValidityState();
                            const t = e.isFull(),
                                n = e.isLocked;
                            e.wrapper.classList.toggle("rtl", e.rtl);
                            const r = e.wrapper.classList;
                            var o;
                            r.toggle("focus", e.isFocused),
                                r.toggle("disabled", e.isDisabled),
                                r.toggle("required", e.isRequired),
                                r.toggle("invalid", !e.isValid),
                                r.toggle("locked", n),
                                r.toggle("full", t),
                                r.toggle("input-active", e.isFocused && !e.isInputHidden),
                                r.toggle("dropdown-active", e.isOpen),
                                r.toggle("has-options", ((o = e.options), 0 === Object.keys(o).length)),
                                r.toggle("has-items", e.items.length > 0);
                        }
                        refreshValidityState() {
                            var e = this;
                            e.input.validity && ((e.isValid = e.input.validity.valid), (e.isInvalid = !e.isValid));
                        }
                        isFull() {
                            return null !== this.settings.maxItems && this.items.length >= this.settings.maxItems;
                        }
                        updateOriginalInput(e = {}) {
                            const t = this;
                            var n, r;
                            const o = t.input.querySelector('option[value=""]');
                            if (t.is_select_tag) {
                                const i = [],
                                    s = t.input.querySelectorAll("option:checked").length;
                                function a(e, n, r) {
                                    return e || (e = D('<option value="' + ee(n) + '">' + ee(r) + "</option>")), e != o && t.input.append(e), i.push(e), (e != o || s > 0) && (e.selected = !0), e;
                                }
                                t.input.querySelectorAll("option:checked").forEach((e) => {
                                    e.selected = !1;
                                }),
                                    0 == t.items.length && "single" == t.settings.mode
                                        ? a(o, "", "")
                                        : t.items.forEach((e) => {
                                            (n = t.options[e]), (r = n[t.settings.labelField] || ""), i.includes(n.$option) ? a(t.input.querySelector(`option[value="${ae(e)}"]:not(:checked)`), e, r) : (n.$option = a(n.$option, e, r));
                                        });
                            } else t.input.value = t.getValue();
                            t.isSetup && (e.silent || t.trigger("change", t.getValue()));
                        }
                        open() {
                            var e = this;
                            e.isLocked ||
                                e.isOpen ||
                                ("multi" === e.settings.mode && e.isFull()) ||
                                ((e.isOpen = !0),
                                    Y(e.focus_node, { "aria-expanded": "true" }),
                                    e.refreshState(),
                                    V(e.dropdown, { visibility: "hidden", display: "block" }),
                                    e.positionDropdown(),
                                    V(e.dropdown, { visibility: "visible", display: "block" }),
                                    e.focus(),
                                    e.trigger("dropdown_open", e.dropdown));
                        }
                        close(e = !0) {
                            var t = this,
                                n = t.isOpen;
                            e && (t.setTextboxValue(), "single" === t.settings.mode && t.items.length && t.hideInput()),
                                (t.isOpen = !1),
                                Y(t.focus_node, { "aria-expanded": "false" }),
                                V(t.dropdown, { display: "none" }),
                                t.settings.hideSelected && t.clearActiveOption(),
                                t.refreshState(),
                                n && t.trigger("dropdown_close", t.dropdown);
                        }
                        positionDropdown() {
                            if ("body" === this.settings.dropdownParent) {
                                var e = this.control,
                                    t = e.getBoundingClientRect(),
                                    n = e.offsetHeight + t.top + window.scrollY,
                                    r = t.left + window.scrollX;
                                V(this.dropdown, { width: t.width + "px", top: n + "px", left: r + "px" });
                            }
                        }
                        clear(e) {
                            var t = this;
                            if (t.items.length) {
                                var n = t.controlChildren();
                                P(n, (e) => {
                                    t.removeItem(e, !0);
                                }),
                                    t.showInput(),
                                    e || t.updateOriginalInput(),
                                    t.trigger("clear");
                            }
                        }
                        insertAtCaret(e) {
                            const t = this,
                                n = t.caretPos,
                                r = t.control;
                            r.insertBefore(e, r.children[n] || null), t.setCaret(n + 1);
                        }
                        deleteSelection(e) {
                            var t,
                                n,
                                r,
                                o,
                                i,
                                s = this;
                            (t = e && 8 === e.keyCode ? -1 : 1), (n = { start: (i = s.control_input).selectionStart || 0, length: (i.selectionEnd || 0) - (i.selectionStart || 0) });
                            const a = [];
                            if (s.activeItems.length) (o = B(s.activeItems, t)), (r = K(o)), t > 0 && r++, P(s.activeItems, (e) => a.push(e));
                            else if ((s.isFocused || "single" === s.settings.mode) && s.items.length) {
                                const e = s.controlChildren();
                                let r;
                                t < 0 && 0 === n.start && 0 === n.length ? (r = e[s.caretPos - 1]) : t > 0 && n.start === s.inputValue().length && (r = e[s.caretPos]), void 0 !== r && a.push(r);
                            }
                            if (!s.shouldDelete(a, e)) return !1;
                            for (re(e, !0), void 0 !== r && s.setCaret(r); a.length;) s.removeItem(a.pop());
                            return s.showInput(), s.positionDropdown(), s.refreshOptions(!1), !0;
                        }
                        shouldDelete(e, t) {
                            const n = e.map((e) => e.dataset.value);
                            return !(!n.length || ("function" == typeof this.settings.onDelete && !1 === this.settings.onDelete(n, t)));
                        }
                        advanceSelection(e, t) {
                            var n,
                                r,
                                o = this;
                            o.rtl && (e *= -1),
                                o.inputValue().length ||
                                (ie(G, t) || ie("shiftKey", t)
                                    ? (r = (n = o.getLastActive(e)) ? (n.classList.contains("active") ? o.getAdjacent(n, e, "item") : n) : e > 0 ? o.control_input.nextElementSibling : o.control_input.previousElementSibling) &&
                                    (r.classList.contains("active") && o.removeActiveItem(n), o.setActiveItemClass(r))
                                    : o.moveCaret(e));
                        }
                        moveCaret(e) { }
                        getLastActive(e) {
                            let t = this.control.querySelector(".last-active");
                            if (t) return t;
                            var n = this.control.querySelectorAll(".active");
                            return n ? B(n, e) : void 0;
                        }
                        setCaret(e) {
                            this.caretPos = this.items.length;
                        }
                        controlChildren() {
                            return Array.from(this.control.querySelectorAll("[data-ts-item]"));
                        }
                        lock() {
                            (this.isLocked = !0), this.refreshState();
                        }
                        unlock() {
                            (this.isLocked = !1), this.refreshState();
                        }
                        disable() {
                            var e = this;
                            (e.input.disabled = !0), (e.control_input.disabled = !0), (e.focus_node.tabIndex = -1), (e.isDisabled = !0), this.close(), e.lock();
                        }
                        enable() {
                            var e = this;
                            (e.input.disabled = !1), (e.control_input.disabled = !1), (e.focus_node.tabIndex = e.tabIndex), (e.isDisabled = !1), e.unlock();
                        }
                        destroy() {
                            var e = this,
                                t = e.revertSettings;
                            e.trigger("destroy"),
                                e.off(),
                                e.wrapper.remove(),
                                e.dropdown.remove(),
                                (e.input.innerHTML = t.innerHTML),
                                (e.input.tabIndex = t.tabIndex),
                                j(e.input, "tomselected", "ts-hidden-accessible"),
                                e._destroy(),
                                delete e.input.tomselect;
                        }
                        render(e, t) {
                            var n, r;
                            const o = this;
                            if ("function" != typeof this.settings.render[e]) return null;
                            if (!(r = o.settings.render[e].call(this, t, ee))) return null;
                            if (
                                ((r = D(r)),
                                    "option" === e || "option_create" === e
                                        ? t[o.settings.disabledField]
                                            ? Y(r, { "aria-disabled": "true" })
                                            : Y(r, { "data-selectable": "" })
                                        : "optgroup" === e && ((n = t.group[o.settings.optgroupValueField]), Y(r, { "data-group": n }), t.group[o.settings.disabledField] && Y(r, { "data-disabled": "" })),
                                    "option" === e || "item" === e)
                            ) {
                                const n = Z(t[o.settings.valueField]);
                                Y(r, { "data-value": n }), "item" === e ? (R(r, o.settings.itemClass), Y(r, { "data-ts-item": "" })) : (R(r, o.settings.optionClass), Y(r, { role: "option", id: t.$id }), (t.$div = r), (o.options[n] = t));
                            }
                            return r;
                        }
                        _render(e, t) {
                            const n = this.render(e, t);
                            if (null == n) throw "HTMLElement expected";
                            return n;
                        }
                        clearCache() {
                            P(this.options, (e) => {
                                e.$div && (e.$div.remove(), delete e.$div);
                            });
                        }
                        uncacheValue(e) {
                            const t = this.getOption(e);
                            t && t.remove();
                        }
                        canCreate(e) {
                            return this.settings.create && e.length > 0 && this.settings.createFilter.call(this, e);
                        }
                        hook(e, t, n) {
                            var r = this,
                                o = r[t];
                            r[t] = function () {
                                var t, i;
                                return "after" === e && (t = o.apply(r, arguments)), (i = n.apply(r, arguments)), "instead" === e ? i : ("before" === e && (t = o.apply(r, arguments)), t);
                            };
                        }
                    }
                    return (
                        ue.define("change_listener", function () {
                            oe(this.input, "change", () => {
                                this.sync();
                            });
                        }),
                        ue.define("checkbox_options", function () {
                            var e = this,
                                t = e.onOptionSelect;
                            e.settings.hideSelected = !1;
                            var n = function (e) {
                                setTimeout(() => {
                                    var t = e.querySelector("input");
                                    t instanceof HTMLInputElement && (e.classList.contains("selected") ? (t.checked = !0) : (t.checked = !1));
                                }, 1);
                            };
                            e.hook("after", "setupTemplates", () => {
                                var t = e.settings.render.option;
                                e.settings.render.option = (n, r) => {
                                    var o = D(t.call(e, n, r)),
                                        i = document.createElement("input");
                                    i.addEventListener("click", function (e) {
                                        re(e);
                                    }),
                                        (i.type = "checkbox");
                                    const s = X(n[e.settings.valueField]);
                                    return s && e.items.indexOf(s) > -1 && (i.checked = !0), o.prepend(i), o;
                                };
                            }),
                                e.on("item_remove", (t) => {
                                    var r = e.getOption(t);
                                    r && (r.classList.remove("selected"), n(r));
                                }),
                                e.on("item_add", (t) => {
                                    var r = e.getOption(t);
                                    r && n(r);
                                }),
                                e.hook("instead", "onOptionSelect", (r, o) => {
                                    if (o.classList.contains("selected")) return o.classList.remove("selected"), e.removeItem(o.dataset.value), e.refreshOptions(), void re(r, !0);
                                    t.call(e, r, o), n(o);
                                });
                        }),
                        ue.define("clear_button", function (e) {
                            const t = this,
                                n = Object.assign({ className: "clear-button", title: "Clear All", html: (e) => `<div class="${e.className}" title="${e.title}">&#10799;</div>` }, e);
                            t.on("initialize", () => {
                                var e = D(n.html(n));
                                e.addEventListener("click", (e) => {
                                    t.isDisabled || (t.clear(), "single" === t.settings.mode && t.settings.allowEmptyOption && t.addItem(""), e.preventDefault(), e.stopPropagation());
                                }),
                                    t.control.appendChild(e);
                            });
                        }),
                        ue.define("drag_drop", function () {
                            var e = this;
                            if (!$.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
                            if ("multi" === e.settings.mode) {
                                var t = e.lock,
                                    n = e.unlock;
                                e.hook("instead", "lock", () => {
                                    var n = $(e.control).data("sortable");
                                    return n && n.disable(), t.call(e);
                                }),
                                    e.hook("instead", "unlock", () => {
                                        var t = $(e.control).data("sortable");
                                        return t && t.enable(), n.call(e);
                                    }),
                                    e.on("initialize", () => {
                                        var t = $(e.control).sortable({
                                            items: "[data-value]",
                                            forcePlaceholderSize: !0,
                                            disabled: e.isLocked,
                                            start: (e, n) => {
                                                n.placeholder.css("width", n.helper.css("width")), t.css({ overflow: "visible" });
                                            },
                                            stop: () => {
                                                t.css({ overflow: "hidden" });
                                                var n = [];
                                                t.children("[data-value]").each(function () {
                                                    this.dataset.value && n.push(this.dataset.value);
                                                }),
                                                    e.setValue(n);
                                            },
                                        });
                                    });
                            }
                        }),
                        ue.define("dropdown_header", function (e) {
                            const t = this,
                                n = Object.assign(
                                    {
                                        title: "Untitled",
                                        headerClass: "dropdown-header",
                                        titleRowClass: "dropdown-header-title",
                                        labelClass: "dropdown-header-label",
                                        closeClass: "dropdown-header-close",
                                        html: (e) => '<div class="' + e.headerClass + '"><div class="' + e.titleRowClass + '"><span class="' + e.labelClass + '">' + e.title + '</span><a class="' + e.closeClass + '">&times;</a></div></div>',
                                    },
                                    e
                                );
                            t.on("initialize", () => {
                                var e = D(n.html(n)),
                                    r = e.querySelector("." + n.closeClass);
                                r &&
                                    r.addEventListener("click", (e) => {
                                        re(e, !0), t.close();
                                    }),
                                    t.dropdown.insertBefore(e, t.dropdown.firstChild);
                            });
                        }),
                        ue.define("caret_position", function () {
                            var e = this;
                            e.hook("instead", "setCaret", (t) => {
                                "single" !== e.settings.mode && e.control.contains(e.control_input)
                                    ? (t = Math.max(0, Math.min(e.items.length, t))) == e.caretPos ||
                                    e.isPending ||
                                    e.controlChildren().forEach((n, r) => {
                                        r < t ? e.control_input.insertAdjacentElement("beforebegin", n) : e.control.appendChild(n);
                                    })
                                    : (t = e.items.length),
                                    (e.caretPos = t);
                            }),
                                e.hook("instead", "moveCaret", (t) => {
                                    if (!e.isFocused) return;
                                    const n = e.getLastActive(t);
                                    if (n) {
                                        const r = K(n);
                                        e.setCaret(t > 0 ? r + 1 : r), e.setActiveItem(), j(n, "last-active");
                                    } else e.setCaret(e.caretPos + t);
                                });
                        }),
                        ue.define("dropdown_input", function () {
                            const e = this;
                            (e.settings.shouldOpen = !0),
                                e.hook("before", "setup", () => {
                                    (e.focus_node = e.control), R(e.control_input, "dropdown-input");
                                    const t = D('<div class="dropdown-input-wrap">');
                                    t.append(e.control_input), e.dropdown.insertBefore(t, e.dropdown.firstChild);
                                    const n = D('<input class="items-placeholder" tabindex="-1" />');
                                    (n.placeholder = e.settings.placeholder || ""), e.control.append(n);
                                }),
                                e.on("initialize", () => {
                                    e.control_input.addEventListener("keydown", (t) => {
                                        switch (t.keyCode) {
                                            case 27:
                                                return e.isOpen && (re(t, !0), e.close()), void e.clearActiveItems();
                                            case 9:
                                                e.focus_node.tabIndex = -1;
                                        }
                                        return e.onKeyDown.call(e, t);
                                    }),
                                        e.on("blur", () => {
                                            e.focus_node.tabIndex = e.isDisabled ? -1 : e.tabIndex;
                                        }),
                                        e.on("dropdown_open", () => {
                                            e.control_input.focus();
                                        });
                                    const t = e.onBlur;
                                    e.hook("instead", "onBlur", (n) => {
                                        if (!n || n.relatedTarget != e.control_input) return t.call(e);
                                    }),
                                        oe(e.control_input, "blur", () => e.onBlur()),
                                        e.hook("before", "close", () => {
                                            e.isOpen && e.focus_node.focus({ preventScroll: !0 });
                                        });
                                });
                        }),
                        ue.define("input_autogrow", function () {
                            var e = this;
                            e.on("initialize", () => {
                                var t = document.createElement("span"),
                                    n = e.control_input;
                                (t.style.cssText = "position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; "), e.wrapper.appendChild(t);
                                for (const e of ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"]) t.style[e] = n.style[e];
                                var r = () => {
                                    (t.textContent = n.value), (n.style.width = t.clientWidth + "px");
                                };
                                r(), e.on("update item_add item_remove", r), oe(n, "input", r), oe(n, "keyup", r), oe(n, "blur", r), oe(n, "update", r);
                            });
                        }),
                        ue.define("no_backspace_delete", function () {
                            var e = this,
                                t = e.deleteSelection;
                            this.hook("instead", "deleteSelection", (n) => !!e.activeItems.length && t.call(e, n));
                        }),
                        ue.define("no_active_items", function () {
                            this.hook("instead", "setActiveItem", () => { }), this.hook("instead", "selectAll", () => { });
                        }),
                        ue.define("optgroup_columns", function () {
                            var e = this,
                                t = e.onKeyDown;
                            e.hook("instead", "onKeyDown", (n) => {
                                var r, o, i, s;
                                if (!e.isOpen || (37 !== n.keyCode && 39 !== n.keyCode)) return t.call(e, n);
                                (e.ignoreHover = !0),
                                    (s = z(e.activeOption, "[data-group]")),
                                    (r = K(e.activeOption, "[data-selectable]")),
                                    s && (s = 37 === n.keyCode ? s.previousSibling : s.nextSibling) && (o = (i = s.querySelectorAll("[data-selectable]"))[Math.min(i.length - 1, r)]) && e.setActiveOption(o);
                            });
                        }),
                        ue.define("remove_button", function (e) {
                            const t = Object.assign({ label: "&times;", title: "Remove", className: "remove", append: !0 }, e);
                            var n = this;
                            if (t.append) {
                                var r = '<a href="javascript:void(0)" class="' + t.className + '" tabindex="-1" title="' + ee(t.title) + '">' + t.label + "</a>";
                                n.hook("after", "setupTemplates", () => {
                                    var e = n.settings.render.item;
                                    n.settings.render.item = (t, o) => {
                                        var i = D(e.call(n, t, o)),
                                            s = D(r);
                                        return (
                                            i.appendChild(s),
                                            oe(s, "mousedown", (e) => {
                                                re(e, !0);
                                            }),
                                            oe(s, "click", (e) => {
                                                re(e, !0), n.isLocked || (n.shouldDelete([i], e) && (n.removeItem(i), n.refreshOptions(!1), n.inputState()));
                                            }),
                                            i
                                        );
                                    };
                                });
                            }
                        }),
                        ue.define("restore_on_backspace", function (e) {
                            const t = this,
                                n = Object.assign({ text: (e) => e[t.settings.labelField] }, e);
                            t.on("item_remove", function (e) {
                                if (t.isFocused && "" === t.control_input.value.trim()) {
                                    var r = t.options[e];
                                    r && t.setTextboxValue(n.text.call(t, r));
                                }
                            });
                        }),
                        ue.define("virtual_scroll", function () {
                            const e = this,
                                t = e.canLoad,
                                n = e.clearActiveOption,
                                r = e.loadCallback;
                            var o,
                                i,
                                s = {},
                                a = !1,
                                l = [];
                            if (
                                (e.settings.shouldLoadMore ||
                                    (e.settings.shouldLoadMore = () => {
                                        if (o.clientHeight / (o.scrollHeight - o.scrollTop) > 0.9) return !0;
                                        if (e.activeOption) {
                                            var t = e.selectable();
                                            if (Array.from(t).indexOf(e.activeOption) >= t.length - 2) return !0;
                                        }
                                        return !1;
                                    }),
                                    !e.settings.firstUrl)
                            )
                                throw "virtual_scroll plugin requires a firstUrl() method";
                            e.settings.sortField = [{ field: "$order" }, { field: "$score" }];
                            const c = (t) => !(("number" == typeof e.settings.maxOptions && o.children.length >= e.settings.maxOptions) || !(t in s) || !s[t]),
                                d = (t, n) => e.items.indexOf(n) >= 0 || l.indexOf(n) >= 0;
                            (e.setNextUrl = (e, t) => {
                                s[e] = t;
                            }),
                                (e.getUrl = (t) => {
                                    if (t in s) {
                                        const e = s[t];
                                        return (s[t] = !1), e;
                                    }
                                    return (s = {}), e.settings.firstUrl.call(e, t);
                                }),
                                e.hook("instead", "clearActiveOption", () => {
                                    if (!a) return n.call(e);
                                }),
                                e.hook("instead", "canLoad", (n) => (n in s ? c(n) : t.call(e, n))),
                                e.hook("instead", "loadCallback", (t, n) => {
                                    if (a) {
                                        if (i) {
                                            const n = t[0];
                                            void 0 !== n && (i.dataset.value = n[e.settings.valueField]);
                                        }
                                    } else e.clearOptions(d);
                                    r.call(e, t, n), (a = !1);
                                }),
                                e.hook("after", "refreshOptions", () => {
                                    const t = e.lastValue;
                                    var n;
                                    c(t) ? (n = e.render("loading_more", { query: t })) && (n.setAttribute("data-selectable", ""), (i = n)) : t in s && !o.querySelector(".no-results") && (n = e.render("no_more_results", { query: t })),
                                        n && (R(n, e.settings.optionClass), o.append(n));
                                }),
                                e.on("initialize", () => {
                                    (l = Object.keys(e.options)),
                                        (o = e.dropdown_content),
                                        (e.settings.render = Object.assign(
                                            {},
                                            { loading_more: () => '<div class="loading-more-results">Loading more results ... </div>', no_more_results: () => '<div class="no-more-results">No more results</div>' },
                                            e.settings.render
                                        )),
                                        o.addEventListener("scroll", () => {
                                            e.settings.shouldLoadMore.call(e) && c(e.lastValue) && (a || ((a = !0), e.load.call(e, e.lastValue)));
                                        });
                                });
                        }),
                        ue
                    );
                })();
            },
        },
        r = {};
    function o(e) {
        var t = r[e];
        if (void 0 !== t) {
            if (void 0 !== t.error) throw t.error;
            return t.exports;
        }
        var i = (r[e] = { id: e, exports: {} });
        try {
            var s = { id: e, module: i, factory: n[e], require: o };
            o.i.forEach(function (e) {
                e(s);
            }),
                (i = s.module),
                s.factory.call(i.exports, i, i.exports, s.require);
        } catch (e) {
            throw ((i.error = e), e);
        }
        return i.exports;
    }
    (o.m = n),
        (o.c = r),
        (o.i = []),
        (o.n = (e) => {
            var t = e && e.__esModule ? () => e.default : () => e;
            return o.d(t, { a: t }), t;
        }),
        (o.d = (e, t) => {
            for (var n in t) o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        }),
        (o.hu = (e) => e + "." + o.h() + ".hot-update.js"),
        (o.miniCssF = (e) => { }),
        (o.hmrF = () => "main." + o.h() + ".hot-update.json"),
        (o.h = () => "8268b38b7be0997f2050"),
        (o.g = (function () {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if ("object" == typeof window) return window;
            }
        })()),
        (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
        (e = {}),
        (t = "college-ave-website-2023:"),
        (o.l = (n, r, i, s) => {
            if (e[n]) e[n].push(r);
            else {
                var a, l;
                if (void 0 !== i)
                    for (var c = document.getElementsByTagName("script"), d = 0; d < c.length; d++) {
                        var u = c[d];
                        if (u.getAttribute("src") == n || u.getAttribute("data-webpack") == t + i) {
                            a = u;
                            break;
                        }
                    }
                a || ((l = !0), ((a = document.createElement("script")).charset = "utf-8"), (a.timeout = 120), o.nc && a.setAttribute("nonce", o.nc), a.setAttribute("data-webpack", t + i), (a.src = n)), (e[n] = [r]);
                var p = (t, r) => {
                    (a.onerror = a.onload = null), clearTimeout(f);
                    var o = e[n];
                    if ((delete e[n], a.parentNode && a.parentNode.removeChild(a), o && o.forEach((e) => e(r)), t)) return t(r);
                },
                    f = setTimeout(p.bind(null, void 0, { type: "timeout", target: a }), 12e4);
                (a.onerror = p.bind(null, a.onerror)), (a.onload = p.bind(null, a.onload)), l && document.head.appendChild(a);
            }
        }),
        (() => {
            var e,
                t,
                n,
                r = {},
                i = o.c,
                s = [],
                a = [],
                l = "idle",
                c = 0,
                d = [];
            function u(e) {
                l = e;
                for (var t = [], n = 0; n < a.length; n++) t[n] = a[n].call(null, e);
                return Promise.all(t);
            }
            function p() {
                0 == --c &&
                    u("ready").then(function () {
                        if (0 === c) {
                            var e = d;
                            d = [];
                            for (var t = 0; t < e.length; t++) e[t]();
                        }
                    });
            }
            function f(e) {
                if ("idle" !== l) throw new Error("check() is only allowed in idle status");
                return u("check")
                    .then(o.hmrM)
                    .then(function (n) {
                        return n
                            ? u("prepare").then(function () {
                                var r = [];
                                return (
                                    (t = []),
                                    Promise.all(
                                        Object.keys(o.hmrC).reduce(function (e, i) {
                                            return o.hmrC[i](n.c, n.r, n.m, e, t, r), e;
                                        }, [])
                                    ).then(function () {
                                        return (
                                            (t = function () {
                                                return e
                                                    ? m(e)
                                                    : u("ready").then(function () {
                                                        return r;
                                                    });
                                            }),
                                            0 === c
                                                ? t()
                                                : new Promise(function (e) {
                                                    d.push(function () {
                                                        e(t());
                                                    });
                                                })
                                        );
                                        var t;
                                    })
                                );
                            })
                            : u(g() ? "ready" : "idle").then(function () {
                                return null;
                            });
                    });
            }
            function h(e) {
                return "ready" !== l
                    ? Promise.resolve().then(function () {
                        throw new Error("apply() is only allowed in ready status (state: " + l + ")");
                    })
                    : m(e);
            }
            function m(e) {
                (e = e || {}), g();
                var r = t.map(function (t) {
                    return t(e);
                });
                t = void 0;
                var o = r
                    .map(function (e) {
                        return e.error;
                    })
                    .filter(Boolean);
                if (o.length > 0)
                    return u("abort").then(function () {
                        throw o[0];
                    });
                var i = u("dispose");
                r.forEach(function (e) {
                    e.dispose && e.dispose();
                });
                var s,
                    a = u("apply"),
                    l = function (e) {
                        s || (s = e);
                    },
                    c = [];
                return (
                    r.forEach(function (e) {
                        if (e.apply) {
                            var t = e.apply(l);
                            if (t) for (var n = 0; n < t.length; n++) c.push(t[n]);
                        }
                    }),
                    Promise.all([i, a]).then(function () {
                        return s
                            ? u("fail").then(function () {
                                throw s;
                            })
                            : n
                                ? m(e).then(function (e) {
                                    return (
                                        c.forEach(function (t) {
                                            e.indexOf(t) < 0 && e.push(t);
                                        }),
                                        e
                                    );
                                })
                                : u("idle").then(function () {
                                    return c;
                                });
                    })
                );
            }
            function g() {
                if (n)
                    return (
                        t || (t = []),
                        Object.keys(o.hmrI).forEach(function (e) {
                            n.forEach(function (n) {
                                o.hmrI[e](n, t);
                            });
                        }),
                        (n = void 0),
                        !0
                    );
            }
            (o.hmrD = r),
                o.i.push(function (d) {
                    var m,
                        g,
                        v,
                        y,
                        b = d.module,
                        w = (function (t, n) {
                            var r = i[n];
                            if (!r) return t;
                            var o = function (o) {
                                if (r.hot.active) {
                                    if (i[o]) {
                                        var a = i[o].parents;
                                        -1 === a.indexOf(n) && a.push(n);
                                    } else (s = [n]), (e = o);
                                    -1 === r.children.indexOf(o) && r.children.push(o);
                                } else console.warn("[HMR] unexpected require(" + o + ") from disposed module " + n), (s = []);
                                return t(o);
                            },
                                a = function (e) {
                                    return {
                                        configurable: !0,
                                        enumerable: !0,
                                        get: function () {
                                            return t[e];
                                        },
                                        set: function (n) {
                                            t[e] = n;
                                        },
                                    };
                                };
                            for (var d in t) Object.prototype.hasOwnProperty.call(t, d) && "e" !== d && Object.defineProperty(o, d, a(d));
                            return (
                                (o.e = function (e) {
                                    return (function (e) {
                                        switch (l) {
                                            case "ready":
                                                u("prepare");
                                            case "prepare":
                                                return c++, e.then(p, p), e;
                                            default:
                                                return e;
                                        }
                                    })(t.e(e));
                                }),
                                o
                            );
                        })(d.require, d.id);
                    (b.hot =
                        ((m = d.id),
                            (g = b),
                            (y = {
                                _acceptedDependencies: {},
                                _acceptedErrorHandlers: {},
                                _declinedDependencies: {},
                                _selfAccepted: !1,
                                _selfDeclined: !1,
                                _selfInvalidated: !1,
                                _disposeHandlers: [],
                                _main: (v = e !== m),
                                _requireSelf: function () {
                                    (s = g.parents.slice()), (e = v ? void 0 : m), o(m);
                                },
                                active: !0,
                                accept: function (e, t, n) {
                                    if (void 0 === e) y._selfAccepted = !0;
                                    else if ("function" == typeof e) y._selfAccepted = e;
                                    else if ("object" == typeof e && null !== e) for (var r = 0; r < e.length; r++) (y._acceptedDependencies[e[r]] = t || function () { }), (y._acceptedErrorHandlers[e[r]] = n);
                                    else (y._acceptedDependencies[e] = t || function () { }), (y._acceptedErrorHandlers[e] = n);
                                },
                                decline: function (e) {
                                    if (void 0 === e) y._selfDeclined = !0;
                                    else if ("object" == typeof e && null !== e) for (var t = 0; t < e.length; t++) y._declinedDependencies[e[t]] = !0;
                                    else y._declinedDependencies[e] = !0;
                                },
                                dispose: function (e) {
                                    y._disposeHandlers.push(e);
                                },
                                addDisposeHandler: function (e) {
                                    y._disposeHandlers.push(e);
                                },
                                removeDisposeHandler: function (e) {
                                    var t = y._disposeHandlers.indexOf(e);
                                    t >= 0 && y._disposeHandlers.splice(t, 1);
                                },
                                invalidate: function () {
                                    switch (((this._selfInvalidated = !0), l)) {
                                        case "idle":
                                            (t = []),
                                                Object.keys(o.hmrI).forEach(function (e) {
                                                    o.hmrI[e](m, t);
                                                }),
                                                u("ready");
                                            break;
                                        case "ready":
                                            Object.keys(o.hmrI).forEach(function (e) {
                                                o.hmrI[e](m, t);
                                            });
                                            break;
                                        case "prepare":
                                        case "check":
                                        case "dispose":
                                        case "apply":
                                            (n = n || []).push(m);
                                    }
                                },
                                check: f,
                                apply: h,
                                status: function (e) {
                                    if (!e) return l;
                                    a.push(e);
                                },
                                addStatusHandler: function (e) {
                                    a.push(e);
                                },
                                removeStatusHandler: function (e) {
                                    var t = a.indexOf(e);
                                    t >= 0 && a.splice(t, 1);
                                },
                                data: r[m],
                            }),
                            (e = void 0),
                            y)),
                        (b.parents = s),
                        (b.children = []),
                        (s = []),
                        (d.require = w);
                }),
                (o.hmrC = {}),
                (o.hmrI = {});
        })(),
        (() => {
            var e;
            o.g.importScripts && (e = o.g.location + "");
            var t = o.g.document;
            if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
                var n = t.getElementsByTagName("script");
                n.length && (e = n[n.length - 1].src);
            }
            if (!e) throw new Error("Automatic publicPath is not supported in this browser");
            (e = e
                .replace(/#.*$/, "")
                .replace(/\?.*$/, "")
                .replace(/\/[^\/]+$/, "/")),
                (o.p = e);
        })(),
        (() => {
            if ("undefined" != typeof document) {
                var e = [],
                    t = [],
                    n = (n) => ({
                        dispose: () => {
                            for (var t = 0; t < e.length; t++) {
                                var n = e[t];
                                n.parentNode && n.parentNode.removeChild(n);
                            }
                            e.length = 0;
                        },
                        apply: () => {
                            for (var e = 0; e < t.length; e++) t[e].rel = "stylesheet";
                            t.length = 0;
                        },
                    });
                o.hmrC.miniCss = (r, i, s, a, l, c) => {
                    l.push(n),
                        r.forEach((n) => {
                            var r = o.miniCssF(n),
                                i = o.p + r,
                                s = ((e, t) => {
                                    for (var n = document.getElementsByTagName("link"), r = 0; r < n.length; r++) {
                                        var o = (s = n[r]).getAttribute("data-href") || s.getAttribute("href");
                                        if ("stylesheet" === s.rel && (o === e || o === t)) return s;
                                    }
                                    var i = document.getElementsByTagName("style");
                                    for (r = 0; r < i.length; r++) {
                                        var s;
                                        if ((o = (s = i[r]).getAttribute("data-href")) === e || o === t) return s;
                                    }
                                })(r, i);
                            s &&
                                a.push(
                                    new Promise((r, o) => {
                                        var a = ((e, t, n, r, o) => {
                                            var i = document.createElement("link");
                                            return (
                                                (i.rel = "stylesheet"),
                                                (i.type = "text/css"),
                                                (i.onerror = i.onload = (n) => {
                                                    if (((i.onerror = i.onload = null), "load" === n.type)) r();
                                                    else {
                                                        var s = n && ("load" === n.type ? "missing" : n.type),
                                                            a = (n && n.target && n.target.href) || t,
                                                            l = new Error("Loading CSS chunk " + e + " failed.\n(" + a + ")");
                                                        (l.code = "CSS_CHUNK_LOAD_FAILED"), (l.type = s), (l.request = a), i.parentNode && i.parentNode.removeChild(i), o(l);
                                                    }
                                                }),
                                                (i.href = t),
                                                n ? n.parentNode.insertBefore(i, n.nextSibling) : document.head.appendChild(i),
                                                i
                                            );
                                        })(
                                            n,
                                            i,
                                            s,
                                            () => {
                                                (a.as = "style"), (a.rel = "preload"), r();
                                            },
                                            o
                                        );
                                        e.push(s), t.push(a);
                                    })
                                );
                        });
                };
            }
        })(),
        (() => {
            var e,
                t,
                n,
                r,
                i,
                s = (o.hmrS_jsonp = o.hmrS_jsonp || { 179: 0 }),
                a = {};
            function l(t, n) {
                return (
                    (e = n),
                    new Promise((e, n) => {
                        a[t] = e;
                        var r = o.p + o.hu(t),
                            i = new Error();
                        o.l(r, (e) => {
                            if (a[t]) {
                                a[t] = void 0;
                                var r = e && ("load" === e.type ? "missing" : e.type),
                                    o = e && e.target && e.target.src;
                                (i.message = "Loading hot update chunk " + t + " failed.\n(" + r + ": " + o + ")"), (i.name = "ChunkLoadError"), (i.type = r), (i.request = o), n(i);
                            }
                        });
                    })
                );
            }
            function c(e) {
                function a(e) {
                    for (
                        var t = [e],
                        n = {},
                        r = t.map(function (e) {
                            return { chain: [e], id: e };
                        });
                        r.length > 0;

                    ) {
                        var i = r.pop(),
                            s = i.id,
                            a = i.chain,
                            c = o.c[s];
                        if (c && (!c.hot._selfAccepted || c.hot._selfInvalidated)) {
                            if (c.hot._selfDeclined) return { type: "self-declined", chain: a, moduleId: s };
                            if (c.hot._main) return { type: "unaccepted", chain: a, moduleId: s };
                            for (var d = 0; d < c.parents.length; d++) {
                                var u = c.parents[d],
                                    p = o.c[u];
                                if (p) {
                                    if (p.hot._declinedDependencies[s]) return { type: "declined", chain: a.concat([u]), moduleId: s, parentId: u };
                                    -1 === t.indexOf(u) && (p.hot._acceptedDependencies[s] ? (n[u] || (n[u] = []), l(n[u], [s])) : (delete n[u], t.push(u), r.push({ chain: a.concat([u]), id: u })));
                                }
                            }
                        }
                    }
                    return { type: "accepted", moduleId: e, outdatedModules: t, outdatedDependencies: n };
                }
                function l(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        -1 === e.indexOf(r) && e.push(r);
                    }
                }
                o.f && delete o.f.jsonpHmr, (t = void 0);
                var c = {},
                    d = [],
                    u = {},
                    p = function (e) {
                        console.warn("[HMR] unexpected require(" + e.id + ") to disposed module");
                    };
                for (var f in n)
                    if (o.o(n, f)) {
                        var h,
                            m = n[f],
                            g = !1,
                            v = !1,
                            y = !1,
                            b = "";
                        switch (((h = m ? a(f) : { type: "disposed", moduleId: f }).chain && (b = "\nUpdate propagation: " + h.chain.join(" -> ")), h.type)) {
                            case "self-declined":
                                e.onDeclined && e.onDeclined(h), e.ignoreDeclined || (g = new Error("Aborted because of self decline: " + h.moduleId + b));
                                break;
                            case "declined":
                                e.onDeclined && e.onDeclined(h), e.ignoreDeclined || (g = new Error("Aborted because of declined dependency: " + h.moduleId + " in " + h.parentId + b));
                                break;
                            case "unaccepted":
                                e.onUnaccepted && e.onUnaccepted(h), e.ignoreUnaccepted || (g = new Error("Aborted because " + f + " is not accepted" + b));
                                break;
                            case "accepted":
                                e.onAccepted && e.onAccepted(h), (v = !0);
                                break;
                            case "disposed":
                                e.onDisposed && e.onDisposed(h), (y = !0);
                                break;
                            default:
                                throw new Error("Unexception type " + h.type);
                        }
                        if (g) return { error: g };
                        if (v) for (f in ((u[f] = m), l(d, h.outdatedModules), h.outdatedDependencies)) o.o(h.outdatedDependencies, f) && (c[f] || (c[f] = []), l(c[f], h.outdatedDependencies[f]));
                        y && (l(d, [h.moduleId]), (u[f] = p));
                    }
                n = void 0;
                for (var w, S = [], x = 0; x < d.length; x++) {
                    var E = d[x],
                        A = o.c[E];
                    A && (A.hot._selfAccepted || A.hot._main) && u[E] !== p && !A.hot._selfInvalidated && S.push({ module: E, require: A.hot._requireSelf, errorHandler: A.hot._selfAccepted });
                }
                return {
                    dispose: function () {
                        var e;
                        r.forEach(function (e) {
                            delete s[e];
                        }),
                            (r = void 0);
                        for (var t, n = d.slice(); n.length > 0;) {
                            var i = n.pop(),
                                a = o.c[i];
                            if (a) {
                                var l = {},
                                    u = a.hot._disposeHandlers;
                                for (x = 0; x < u.length; x++) u[x].call(null, l);
                                for (o.hmrD[i] = l, a.hot.active = !1, delete o.c[i], delete c[i], x = 0; x < a.children.length; x++) {
                                    var p = o.c[a.children[x]];
                                    p && (e = p.parents.indexOf(i)) >= 0 && p.parents.splice(e, 1);
                                }
                            }
                        }
                        for (var f in c) if (o.o(c, f) && (a = o.c[f])) for (w = c[f], x = 0; x < w.length; x++) (t = w[x]), (e = a.children.indexOf(t)) >= 0 && a.children.splice(e, 1);
                    },
                    apply: function (t) {
                        for (var n in u) o.o(u, n) && (o.m[n] = u[n]);
                        for (var r = 0; r < i.length; r++) i[r](o);
                        for (var s in c)
                            if (o.o(c, s)) {
                                var a = o.c[s];
                                if (a) {
                                    w = c[s];
                                    for (var l = [], p = [], f = [], h = 0; h < w.length; h++) {
                                        var m = w[h],
                                            g = a.hot._acceptedDependencies[m],
                                            v = a.hot._acceptedErrorHandlers[m];
                                        if (g) {
                                            if (-1 !== l.indexOf(g)) continue;
                                            l.push(g), p.push(v), f.push(m);
                                        }
                                    }
                                    for (var y = 0; y < l.length; y++)
                                        try {
                                            l[y].call(null, w);
                                        } catch (n) {
                                            if ("function" == typeof p[y])
                                                try {
                                                    p[y](n, { moduleId: s, dependencyId: f[y] });
                                                } catch (r) {
                                                    e.onErrored && e.onErrored({ type: "accept-error-handler-errored", moduleId: s, dependencyId: f[y], error: r, originalError: n }), e.ignoreErrored || (t(r), t(n));
                                                }
                                            else e.onErrored && e.onErrored({ type: "accept-errored", moduleId: s, dependencyId: f[y], error: n }), e.ignoreErrored || t(n);
                                        }
                                }
                            }
                        for (var b = 0; b < S.length; b++) {
                            var x = S[b],
                                E = x.module;
                            try {
                                x.require(E);
                            } catch (n) {
                                if ("function" == typeof x.errorHandler)
                                    try {
                                        x.errorHandler(n, { moduleId: E, module: o.c[E] });
                                    } catch (r) {
                                        e.onErrored && e.onErrored({ type: "self-accept-error-handler-errored", moduleId: E, error: r, originalError: n }), e.ignoreErrored || (t(r), t(n));
                                    }
                                else e.onErrored && e.onErrored({ type: "self-accept-errored", moduleId: E, error: n }), e.ignoreErrored || t(n);
                            }
                        }
                        return d;
                    },
                };
            }
            (self.webpackHotUpdatecollege_ave_website_2023 = (t, r, s) => {
                for (var l in r) o.o(r, l) && ((n[l] = r[l]), e && e.push(l));
                s && i.push(s), a[t] && (a[t](), (a[t] = void 0));
            }),
                (o.hmrI.jsonp = function (e, t) {
                    n || ((n = {}), (i = []), (r = []), t.push(c)), o.o(n, e) || (n[e] = o.m[e]);
                }),
                (o.hmrC.jsonp = function (e, a, d, u, p, f) {
                    p.push(c),
                        (t = {}),
                        (r = a),
                        (n = d.reduce(function (e, t) {
                            return (e[t] = !1), e;
                        }, {})),
                        (i = []),
                        e.forEach(function (e) {
                            o.o(s, e) && void 0 !== s[e] ? (u.push(l(e, f)), (t[e] = !0)) : (t[e] = !1);
                        }),
                        o.f &&
                        (o.f.jsonpHmr = function (e, n) {
                            t && o.o(t, e) && !t[e] && (n.push(l(e)), (t[e] = !0))
                        });
                }),
                (o.hmrM = () => {
                    if ("undefined" == typeof fetch) throw new Error("No browser support: need fetch API");
                    return fetch(o.p + o.hmrF()).then((e) => {
                        if (404 !== e.status) {
                            if (!e.ok) throw new Error("Failed to fetch update manifest " + e.statusText);
                            return e.json();
                        }
                    });
                });
        })(),
        o(782);
})();
