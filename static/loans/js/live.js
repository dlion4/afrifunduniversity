
function zync_call() {
    var b = document.createElement("script")
        , a = "college-ave-student-loans"
        , c = "{currency}"
        , d = "{custID}"
        , e = "{custType}"
        , f = "{storeID}"
        , g = "{categoryID}"
        , h = "{productID}"
        , k = "{cartID}"
        , l = "{cartTotal}"
        , m = "{cartQty}"
        , n = "{OrderID}"
        , p = "{OrderAmount}"
        , q = "{OrderQty}"
        , r = "{promoCode}"
        , t = "{Inbound_Media_Channel}"
        , u = "{Page_Referrer}"
        , v = "{e_md5}"
        , w = "{e_sha}"
        , x = "{cache_buster}"
        , y = "{PageUrl}";
    a = "https://live.rezync.com/sync?c\x3d16b6410431b6374e780104abb0443ca8\x26p\x3d333bc4d0be8c6d5343df6e0d3f6ac82e\x26k\x3dcollege-ave-student-loans-pixel-9261\x26zmpID\x3d" + a + "\x26currency\x3d" + c + "\x26custID\x3d" + d + "\x26custType\x3d" + e + "\x26storeID\x3d" + f + "\x26categoryID\x3d" + g + "\x26productID\x3d" + h + "\x26cartID\x3d" + k + "\x26cartTotal\x3d" + l + "\x26cartQty\x3d" + m + "\x26OrderID\x3d" + n + "\x26OrderAmount\x3d" + p + "\x26OrderQty\x3d" + q + "\x26promoCode\x3d" + r + "\x26custom1\x3d" + t + "\x26custom2\x3d" + u + "\x26e_md5\x3d" + v + "\x26e_sha\x3d" + w + "\x26cache_buster\x3d" + x + "\x26PageUrl\x3d" + y;
    b.setAttribute("src", a);
    document.body.appendChild(b)
}
0 <= ["complete", "interactive"].indexOf(document.readyState) ? zync_call() : window.addEventListener("DOMContentLoaded", function () {
    zync_call()
});


function li_call() {
    var l = document.createElement("img");
    cache_buster = Date.now();

    var l_src = "https://live.rezync.com/sync?c=0aa2530f29e4f4a05b5d5d9bb35d60c2&p=93c1662463a616a7155169889dd99651&k=lionly&cache_buster=" + cache_buster;
    l.setAttribute("src", l_src);
    l.setAttribute("height", "1px");
    l.setAttribute("width", "1px");
    l.setAttribute("style", "display: none;");
    document.body.appendChild(l);
}

if (["complete", "interactive"].indexOf(document.readyState) >= 0) {
    li_call();
} else {
    window.addEventListener("DOMContentLoaded", function () {
        li_call();
    });
}
