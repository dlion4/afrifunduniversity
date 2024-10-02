(function () {
  function o(o) {
    return btoa(o);
  }
  $.ajax({
    url: "/user-location/",
    type: "GET",
    async: !1,
    cache: !1,
    timeout: 1e3,
    error: function (o, n, e) {
      console.log("error", e);
    },
    success: function (n) {
      let e = JSON.parse(n);
      console.log(e);
      const t = ["Kenya", "Tanzania", "Uganda"];
      let a = "";
      const s = !t.includes(
          e
          ?.country_name),
        c = e
          ?.privacy
            ?.vpn || e
              ?.privacy
                ?.tor || e
                  ?.privacy
                    ?.proxy;
      if ((console.log(s), console.log(c), s && c)) {
        const n = `/loans/applications/error?msg=${o("multiple-errors")}`;
        return (document.body.classList.add("fade-out"), setTimeout(() => {
          window.location.href = n;
        }, 5e3), !1);
      }
      if (c) {
        const n = `/loans/applications/error?msg=${o("ip-masking")}`;
        return (document.body.classList.add("fade-out"), setTimeout(() => {
          window.location.href = n;
        }, 5e3), !1);
      }
      return (t.includes(e.country_name) || ((a = `/loans/applications/error?msg=${o("outside-country")}`), a && (document.body.classList.add("fade-out"), setTimeout(() => {
        window.location.href = a;
      }, 5e3))), "" === a && (document.body.classList.add("fade-out"), setTimeout(() => {
        const o = new URL(window.location.href).searchParams.get("SC"),
          n = (function (o) {
            const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let e = "";
            for (let t = 0; t < o; t++) 
              e += n[Math.floor(62 * Math.random())];
            return e;
          })(32);
        window.location.href = `/loans/applications/apply?SC=${o}&id=${encodeURIComponent(n)}`;
      }, 5e3)), console.log(a), null);
    }
  });
})();
