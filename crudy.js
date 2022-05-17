!(function () {
  "use strict";
  function t(e) {
    return (t =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(e);
  }
  var e =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {},
    n = "object" == t(e) && e && e.Object === Object && e,
    o =
      "object" == ("undefined" == typeof self ? "undefined" : t(self)) &&
      self &&
      self.Object === Object &&
      self,
    i = (n || o || Function("return this")()).Symbol,
    r =
      (i && i.toStringTag,
      i && i.toStringTag,
      Date.now ||
        function () {
          return new Date().getTime();
        }),
    c = function (e, n, o) {
      var i = { wait: 50, multiplier: 1.1, timeout: 0 };
      o &&
        (i = (function e(n, o) {
          var i = n;
          return (
            Object.keys(o).forEach(function (n) {
              var r = o[n],
                c = i[n],
                a = c && "object" === t(c) && !(c instanceof Array);
              i[n] = a ? e(c, r) : r;
            }),
            i
          );
        })(i, o));
      for (
        var c = i,
          a = c.multiplier,
          s = c.wait,
          u = i.timeout ? new Date(r() + i.timeout) : null,
          d = [],
          l = function o(i, c, s) {
            if (u && u && r() > u) return !1;
            var l = (function (e) {
              if (!e) return !1;
              var n = {
                function: function () {
                  return e();
                },
                string: function () {
                  return document.querySelector(e);
                },
              }[t(e)];
              return !n || n();
            })(i);
            l
              ? (d.push(l), d.length === e.length && n(d))
              : setTimeout(
                  function () {
                    o(i, c * a);
                  },
                  s ? 0 : c
                );
          },
          f = 0;
        f < e.length;
        f += 1
      ) {
        if ("string" != typeof e[f] && "function" != typeof e[f])
          throw "Every item in the poller array should be a function or a string";
        l(e[f], s, !0);
      }
    },
    a = {
      trackerName: !1,
      propertyId: !1,
      analyticsReference: "ga",
      eventCache: [],
      sendEvents: !0,
      setDefaultCategory: function (t) {
        return (this.category = t), this;
      },
      setDefaultAction: function (t) {
        return (this.action = t), this;
      },
      setPropertyId: function (t) {
        this.propertyId = t;
      },
      setTrackerName: function (t) {
        this.trackerName = t;
      },
      useLegacyTracker: function () {
        this.analyticsReference = "_gaq";
      },
      sendAuto: function (t, e, n) {
        this.send(null, null, e, n, t);
      },
      sendNormalised: function (t, e) {
        this.send(null, null, t, e);
      },
      send: function (e, n, o, i) {
        var r = this,
          a =
            arguments.length > 4 && void 0 !== arguments[4]
              ? arguments[4]
              : null,
          s = i || {},
          u = o,
          d = e || this.category,
          l = n || this.action,
          f = a;
        if (
          (null != f &&
            (0 == f && (f = "Control"), (u = "Variation: " + f + " - " + o)),
          "object" === t(s) && s.sendOnce)
        ) {
          var p = "".concat(d).concat(l).concat(u);
          if (this.eventCache.indexOf(p) > -1) return !1;
          this.eventCache.push(p);
        }
        var y = this,
          g = function (t) {
            if ("_gaq" === y.analyticsReference)
              window._gaq.push([
                "_trackEvent",
                d,
                l,
                u,
                null,
                void 0 === s.nonInteraction || s.nonInteraction,
              ]);
            else {
              var e = { nonInteraction: !s.nonInteraction || s.nonInteraction };
              if (s.opts) for (var n in s.opts) e[n] = s.opts[n];
              window[y.analyticsReference](
                "".concat(t, ".send"),
                "event",
                d,
                l,
                u,
                e
              );
            }
          };
        y.trackerName
          ? 1 == this.sendEvents && g(y.trackerName)
          : c(
              [
                function () {
                  try {
                    var t = window[y.analyticsReference].getAll();
                    if (t && t.length) {
                      if (!y.propertyId)
                        return (y.trackerName = t[0].get("name")), !0;
                      for (var e = 0; e < t.length; e += 1) {
                        var n = t[e];
                        if (n.get("trackingId") === y.propertyId)
                          return (y.trackerName = n.get("name")), !0;
                      }
                    }
                  } catch (t) {}
                },
              ],
              function () {
                1 == r.sendEvents && g(y.trackerName);
              },
              { wait: 150 }
            );
      },
    },
    s = "SD-717",
    u = "1",
    d = "SportsDirect",
    l = function (t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        n = "Test ID: " + s + " Variation: " + u + " Label: " + t;
      a.sendNormalised(n, { sendOnce: e });
    };
  a.analyticsReference = "_gaUAT";
  var f = s;
  /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
    window.navigator.userAgent
  ) ||
    c(["body"], function () {
      !(function () {
        var t = s,
          e = u,
          n = d;
        a.setDefaultCategory("Experimentation"),
          a.setDefaultAction(n + " - " + t),
          (a.sendEvents = !0),
          document.documentElement.classList.add(t),
          document.documentElement.classList.add("".concat(t, "-").concat(e));
      })(),
        l("Conditions Met");
      var t = "Browse" === pageMeta_PageType,
        e = "ProductDetail" === pageMeta_PageType;
      t &&
        document.body.addEventListener("click", function (t) {
          var e = t.target,
            n = e.closest("div.s-productthumbbox");
          if (n) {
            var o = n.querySelector(".s-producttext-price");
            o &&
              o.classList.contains("s-producttext-withticket") &&
              (e.matches("a") || e.closest("a")) &&
              l("PLP - views discounted product and proceeds to PDP");
          } else if (e.closest("#hotspotModal")) {
            var i = e.closest("#hotspotModal").querySelector("#hsRefPrice"),
              r = !1,
              c = document.querySelectorAll("#hotspotModal select");
            if (c.length < 1) r = !0;
            else
              for (var a = 0; a < c.length; a++) {
                if ("" == c[a].value) {
                  r = !1;
                  break;
                }
                r = !0;
              }
            i &&
            "addHotspotToBag" == e.getAttribute("id") &&
            r &&
            e.closest("#hsAddToBagWrapper")
              ? l("PLP - views discounted product and adds to bag")
              : i &&
                e.classList.contains("innerHotSpotLine") &&
                r &&
                t.target.closest("#hsAddToBagWrapper") &&
                l("PLP - views discounted product and adds to bag");
          }
        }),
        e &&
          c(["#productDetails"], function () {
            var t = document.getElementById("aAddToBag"),
              e = document.querySelectorAll("#ulSizes li");
            t.addEventListener("click", function (t) {
              var n = !1,
                o = document.querySelector("#productDetails #TicketPriceDiv2");
              !o || o.getAttribute("style").indexOf("none") > -1 || (n = !0);
              var i = !1;
              0 == e.length
                ? (i = !0)
                : [].slice.call(e).forEach(function (t) {
                    t.classList.contains("sizeVariantHighlight") && (i = !0);
                  }),
                1 == i &&
                  n &&
                  l("PDP - views discounted product and adds to bag");
            });
          }),
        document.body.classList.add("".concat(f));
      var n = { attributes: !0, childList: !0, subtree: !0 };
      t &&
        c(["#hotspotModal"], function () {
          var t = document.querySelector("#hotspotModal");
          new MutationObserver(function (e, o) {
            o.disconnect(),
              t.querySelector("#hsRefPrice")
                ? t.classList.add("discounted-item")
                : t.classList.remove("discounted-item"),
              o.observe(t, n);
          }).observe(t, n);
        }),
        e &&
          c(["#productDetails"], function () {
            var t = document.querySelector("#TicketPriceDiv2");
            !t ||
              t.getAttribute("style").indexOf("none") > -1 ||
              document
                .querySelector("#productDetails")
                .classList.add("".concat(f, "-show-exp"));
          });
    });
})();
