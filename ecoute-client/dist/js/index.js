(() => {
  // output/Affjax/foreign.js
  function _ajax(platformSpecificDriver, timeoutErrorMessageIdent, requestFailedMessageIdent, mkHeader, options2) {
    return function(errback, callback) {
      var xhr = platformSpecificDriver.newXHR();
      var fixedUrl = platformSpecificDriver.fixupUrl(options2.url, xhr);
      xhr.open(options2.method || "GET", fixedUrl, true, options2.username, options2.password);
      if (options2.headers) {
        try {
          for (var i = 0, header; (header = options2.headers[i]) != null; i++) {
            xhr.setRequestHeader(header.field, header.value);
          }
        } catch (e) {
          errback(e);
        }
      }
      var onerror = function(msgIdent) {
        return function() {
          errback(new Error(msgIdent));
        };
      };
      xhr.onerror = onerror(requestFailedMessageIdent);
      xhr.ontimeout = onerror(timeoutErrorMessageIdent);
      xhr.onload = function() {
        callback({
          status: xhr.status,
          statusText: xhr.statusText,
          headers: xhr.getAllResponseHeaders().split("\r\n").filter(function(header2) {
            return header2.length > 0;
          }).map(function(header2) {
            var i2 = header2.indexOf(":");
            return mkHeader(header2.substring(0, i2))(header2.substring(i2 + 2));
          }),
          body: xhr.response
        });
      };
      xhr.responseType = options2.responseType;
      xhr.withCredentials = options2.withCredentials;
      xhr.timeout = options2.timeout;
      xhr.send(options2.content);
      return function(error5, cancelErrback, cancelCallback) {
        try {
          xhr.abort();
        } catch (e) {
          return cancelErrback(e);
        }
        return cancelCallback();
      };
    };
  }

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var on = function(f) {
    return function(g) {
      return function(x) {
        return function(y) {
          return f(g(x))(g(y));
        };
      };
    };
  };
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map18 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map18(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidLeft = function(dictFunctor) {
    var map18 = map(dictFunctor);
    return function(f) {
      return function(x) {
        return map18($$const(x))(f);
      };
    };
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Data.Semigroup/foreign.js
  var concatString = function(s1) {
    return function(s2) {
      return s1 + s2;
    };
  };
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0) return ys;
      if (ys.length === 0) return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupString = {
    append: concatString
  };
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var apply = function(dict) {
    return dict.apply;
  };
  var applyFirst = function(dictApply) {
    var apply1 = apply(dictApply);
    var map18 = map(dictApply.Functor0());
    return function(a) {
      return function(b) {
        return apply1(map18($$const)(a))(b);
      };
    };
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map18 = map(dictApply.Functor0());
    return function(a) {
      return function(b) {
        return apply1(map18($$const(identity2))(a))(b);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply5 = apply(dictApplicative.Apply0());
    var pure12 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply5(pure12(f))(a);
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq5) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq5 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordCharImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqCharImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eqChar = {
    eq: eqCharImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eq2 = /* @__PURE__ */ eq(eqBoolean);
  var notEq = function(dictEq) {
    var eq33 = eq(dictEq);
    return function(x) {
      return function(y) {
        return eq2(eq33(x)(y))(false);
      };
    };
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };
  var numSub = function(n1) {
    return function(n2) {
      return n1 - n2;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };
  var numAdd = function(n1) {
    return function(n2) {
      return n1 + n2;
    };
  };
  var numMul = function(n1) {
    return function(n2) {
      return n1 * n2;
    };
  };

  // output/Data.Semiring/index.js
  var zero = function(dict) {
    return dict.zero;
  };
  var semiringNumber = {
    add: numAdd,
    zero: 0,
    mul: numMul,
    one: 1
  };
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };

  // output/Data.Ring/index.js
  var sub = function(dict) {
    return dict.sub;
  };
  var ringNumber = {
    sub: numSub,
    Semiring0: function() {
      return semiringNumber;
    }
  };
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };
  var negate = function(dictRing) {
    var sub1 = sub(dictRing);
    var zero2 = zero(dictRing.Semiring0());
    return function(a) {
      return sub1(zero2)(a);
    };
  };

  // output/Data.Ord/index.js
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var ordChar = /* @__PURE__ */ function() {
    return {
      compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqChar;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var greaterThan = function(dictOrd) {
    var compare32 = compare(dictOrd);
    return function(a1) {
      return function(a2) {
        var v = compare32(a1)(a2);
        if (v instanceof GT) {
          return true;
        }
        ;
        return false;
      };
    };
  };
  var greaterThanOrEq = function(dictOrd) {
    var compare32 = compare(dictOrd);
    return function(a1) {
      return function(a2) {
        var v = compare32(a1)(a2);
        if (v instanceof LT) {
          return false;
        }
        ;
        return true;
      };
    };
  };
  var max = function(dictOrd) {
    var compare32 = compare(dictOrd);
    return function(x) {
      return function(y) {
        var v = compare32(x)(y);
        if (v instanceof LT) {
          return y;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return x;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 181, column 3 - line 184, column 12): " + [v.constructor.name]);
      };
    };
  };
  var abs = function(dictOrd) {
    var greaterThanOrEq1 = greaterThanOrEq(dictOrd);
    return function(dictRing) {
      var zero2 = zero(dictRing.Semiring0());
      var negate1 = negate(dictRing);
      return function(x) {
        var $99 = greaterThanOrEq1(x)(zero2);
        if ($99) {
          return x;
        }
        ;
        return negate1(x);
      };
    };
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var boundedChar = {
    top: topChar,
    bottom: bottomChar,
    Ord0: function() {
      return ordChar;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showNumberImpl = function(n) {
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };
  var showCharImpl = function(c) {
    var code = c.charCodeAt(0);
    if (code < 32 || code === 127) {
      switch (c) {
        case "\x07":
          return "'\\a'";
        case "\b":
          return "'\\b'";
        case "\f":
          return "'\\f'";
        case "\n":
          return "'\\n'";
        case "\r":
          return "'\\r'";
        case "	":
          return "'\\t'";
        case "\v":
          return "'\\v'";
      }
      return "'\\" + code.toString(10) + "'";
    }
    return c === "'" || c === "\\" ? "'\\" + c + "'" : "'" + c + "'";
  };
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(
      /[\0-\x1F\x7F"\\]/g,
      // eslint-disable-line no-control-regex
      function(c, i) {
        switch (c) {
          case '"':
          case "\\":
            return "\\" + c;
          case "\x07":
            return "\\a";
          case "\b":
            return "\\b";
          case "\f":
            return "\\f";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "	":
            return "\\t";
          case "\v":
            return "\\v";
        }
        var k = i + 1;
        var empty5 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
        return "\\" + c.charCodeAt(0).toString(10) + empty5;
      }
    ) + '"';
  };
  var showArrayImpl = function(f) {
    return function(xs) {
      var ss = [];
      for (var i = 0, l = xs.length; i < l; i++) {
        ss[i] = f(xs[i]);
      }
      return "[" + ss.join(",") + "]";
    };
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var showNumber = {
    show: showNumberImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var showChar = {
    show: showCharImpl
  };
  var show = function(dict) {
    return dict.show;
  };
  var showArray = function(dictShow) {
    return {
      show: showArrayImpl(show(dictShow))
    };
  };

  // output/Data.Maybe/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a) {
    return maybe(a)(identity3);
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };
  var eqMaybe = function(dictEq) {
    var eq5 = eq(dictEq);
    return {
      eq: function(x) {
        return function(y) {
          if (x instanceof Nothing && y instanceof Nothing) {
            return true;
          }
          ;
          if (x instanceof Just && y instanceof Just) {
            return eq5(x.value0)(y.value0);
          }
          ;
          return false;
        };
      }
    };
  };
  var ordMaybe = function(dictOrd) {
    var compare4 = compare(dictOrd);
    var eqMaybe1 = eqMaybe(dictOrd.Eq0());
    return {
      compare: function(x) {
        return function(y) {
          if (x instanceof Nothing && y instanceof Nothing) {
            return EQ.value;
          }
          ;
          if (x instanceof Nothing) {
            return LT.value;
          }
          ;
          if (y instanceof Nothing) {
            return GT.value;
          }
          ;
          if (x instanceof Just && y instanceof Just) {
            return compare4(x.value0)(y.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Maybe (line 0, column 0 - line 0, column 0): " + [x.constructor.name, y.constructor.name]);
        };
      },
      Eq0: function() {
        return eqMaybe1;
      }
    };
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };
  var applicativeMaybe = /* @__PURE__ */ function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  }();

  // output/Data.MediaType.Common/index.js
  var applicationJSON = "application/json";
  var applicationFormURLEncoded = "application/x-www-form-urlencoded";

  // output/Affjax.RequestBody/index.js
  var ArrayView = /* @__PURE__ */ function() {
    function ArrayView2(value0) {
      this.value0 = value0;
    }
    ;
    ArrayView2.create = function(value0) {
      return new ArrayView2(value0);
    };
    return ArrayView2;
  }();
  var Blob = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var $$String = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var FormData = /* @__PURE__ */ function() {
    function FormData2(value0) {
      this.value0 = value0;
    }
    ;
    FormData2.create = function(value0) {
      return new FormData2(value0);
    };
    return FormData2;
  }();
  var FormURLEncoded = /* @__PURE__ */ function() {
    function FormURLEncoded2(value0) {
      this.value0 = value0;
    }
    ;
    FormURLEncoded2.create = function(value0) {
      return new FormURLEncoded2(value0);
    };
    return FormURLEncoded2;
  }();
  var Json = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var toMediaType = function(v) {
    if (v instanceof FormURLEncoded) {
      return new Just(applicationFormURLEncoded);
    }
    ;
    if (v instanceof Json) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };
  var json = /* @__PURE__ */ function() {
    return Json.create;
  }();

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };
  var over = function() {
    return function() {
      return function(v) {
        return coerce2;
      };
    };
  };
  var alaF = function() {
    return function() {
      return function() {
        return function() {
          return function(v) {
            return coerce2;
          };
        };
      };
    };
  };

  // output/Affjax.RequestHeader/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var Accept = /* @__PURE__ */ function() {
    function Accept2(value0) {
      this.value0 = value0;
    }
    ;
    Accept2.create = function(value0) {
      return new Accept2(value0);
    };
    return Accept2;
  }();
  var ContentType = /* @__PURE__ */ function() {
    function ContentType2(value0) {
      this.value0 = value0;
    }
    ;
    ContentType2.create = function(value0) {
      return new ContentType2(value0);
    };
    return ContentType2;
  }();
  var RequestHeader = /* @__PURE__ */ function() {
    function RequestHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RequestHeader2.create = function(value0) {
      return function(value1) {
        return new RequestHeader2(value0, value1);
      };
    };
    return RequestHeader2;
  }();
  var value = function(v) {
    if (v instanceof Accept) {
      return unwrap2(v.value0);
    }
    ;
    if (v instanceof ContentType) {
      return unwrap2(v.value0);
    }
    ;
    if (v instanceof RequestHeader) {
      return v.value1;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 26, column 1 - line 26, column 33): " + [v.constructor.name]);
  };
  var name = function(v) {
    if (v instanceof Accept) {
      return "Accept";
    }
    ;
    if (v instanceof ContentType) {
      return "Content-Type";
    }
    ;
    if (v instanceof RequestHeader) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 21, column 1 - line 21, column 32): " + [v.constructor.name]);
  };

  // output/Affjax.ResponseFormat/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var $$ArrayBuffer = /* @__PURE__ */ function() {
    function $$ArrayBuffer2(value0) {
      this.value0 = value0;
    }
    ;
    $$ArrayBuffer2.create = function(value0) {
      return new $$ArrayBuffer2(value0);
    };
    return $$ArrayBuffer2;
  }();
  var Blob2 = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document2 = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var Json2 = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var $$String2 = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var Ignore = /* @__PURE__ */ function() {
    function Ignore2(value0) {
      this.value0 = value0;
    }
    ;
    Ignore2.create = function(value0) {
      return new Ignore2(value0);
    };
    return Ignore2;
  }();
  var toResponseType = function(v) {
    if (v instanceof $$ArrayBuffer) {
      return "arraybuffer";
    }
    ;
    if (v instanceof Blob2) {
      return "blob";
    }
    ;
    if (v instanceof Document2) {
      return "document";
    }
    ;
    if (v instanceof Json2) {
      return "text";
    }
    ;
    if (v instanceof $$String2) {
      return "text";
    }
    ;
    if (v instanceof Ignore) {
      return "";
    }
    ;
    throw new Error("Failed pattern match at Affjax.ResponseFormat (line 44, column 3 - line 50, column 19): " + [v.constructor.name]);
  };
  var toMediaType2 = function(v) {
    if (v instanceof Json2) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };
  var string = /* @__PURE__ */ function() {
    return new $$String2(identity4);
  }();
  var json2 = /* @__PURE__ */ function() {
    return new Json2(identity4);
  }();
  var ignore = /* @__PURE__ */ function() {
    return new Ignore(identity4);
  }();

  // output/Affjax.ResponseHeader/index.js
  var ResponseHeader = /* @__PURE__ */ function() {
    function ResponseHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseHeader2.create = function(value0) {
      return function(value1) {
        return new ResponseHeader2(value0, value1);
      };
    };
    return ResponseHeader2;
  }();

  // output/Control.Bind/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    var bindFlipped1 = bindFlipped(dictBind);
    return function(f) {
      return function(g) {
        return function(a) {
          return bindFlipped1(f)(g(a));
        };
      };
    };
  };
  var join = function(dictBind) {
    var bind1 = bind(dictBind);
    return function(m) {
      return bind1(m)(identity5);
    };
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var note = function(a) {
    return maybe(new Left(a))(Right.create);
  };
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var fromRight = function(v) {
    return function(v1) {
      if (v1 instanceof Right) {
        return v1.value0;
      }
      ;
      return v;
    };
  };
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind8 = bind(dictMonad.Bind1());
    var pure9 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind8(f)(function(f$prime) {
          return bind8(a)(function(a$prime) {
            return pure9(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0) return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0) return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };
  var div = function(dict) {
    return dict.div;
  };

  // output/Data.Monoid/index.js
  var monoidString = {
    mempty: "",
    Semigroup0: function() {
      return semigroupString;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

  // output/Effect.Exception/foreign.js
  function message(e) {
    return e.message;
  }

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    var catchError1 = catchError(dictMonadError);
    var Monad0 = dictMonadError.MonadThrow0().Monad0();
    var map18 = map(Monad0.Bind1().Apply0().Functor0());
    var pure9 = pure(Monad0.Applicative0());
    return function(a) {
      return catchError1(map18(Right.create)(a))(function($52) {
        return pure9(Left.create($52));
      });
    };
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Control.Monad.Rec.Class/index.js
  var Loop = /* @__PURE__ */ function() {
    function Loop2(value0) {
      this.value0 = value0;
    }
    ;
    Loop2.create = function(value0) {
      return new Loop2(value0);
    };
    return Loop2;
  }();
  var Done = /* @__PURE__ */ function() {
    function Done2(value0) {
      this.value0 = value0;
    }
    ;
    Done2.create = function(value0) {
      return new Done2(value0);
    };
    return Done2;
  }();
  var tailRecM = function(dict) {
    return dict.tailRecM;
  };
  var tailRec = function(f) {
    var go2 = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Loop) {
          $copy_v = f(v.value0);
          return;
        }
        ;
        if (v instanceof Done) {
          $tco_done = true;
          return v.value0;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 103, column 3 - line 103, column 25): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return function($85) {
      return go2(f($85));
    };
  };
  var monadRecIdentity = {
    tailRecM: function(f) {
      var runIdentity = function(v) {
        return v;
      };
      var $86 = tailRec(function($88) {
        return runIdentity(f($88));
      });
      return function($87) {
        return Identity($86($87));
      };
    },
    Monad0: function() {
      return monadIdentity;
    }
  };

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a) {
      return function() {
        return f(a());
      };
    };
  };
  var pure_ = function(a) {
    return function() {
      return a;
    };
  };
  var bind_ = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };
  var foreach = function(as) {
    return function(f) {
      return function() {
        for (var i = 0, l = as.length; i < l; i++) {
          f(as[i])();
        }
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var $runtime_lazy2 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var functorST = {
    map: map_
  };
  var monadST = {
    Applicative0: function() {
      return applicativeST;
    },
    Bind1: function() {
      return bindST;
    }
  };
  var bindST = {
    bind: bind_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var applicativeST = {
    pure: pure_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var $lazy_applyST = /* @__PURE__ */ $runtime_lazy2("applyST", "Control.Monad.ST.Internal", function() {
    return {
      apply: ap(monadST),
      Functor0: function() {
        return functorST;
      }
    };
  });

  // output/Control.Lazy/index.js
  var defer = function(dict) {
    return dict.defer;
  };

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b) {
    return !b;
  };

  // output/Data.HeytingAlgebra/index.js
  var tt = function(dict) {
    return dict.tt;
  };
  var not = function(dict) {
    return dict.not;
  };
  var implies = function(dict) {
    return dict.implies;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a) {
      return function(b) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };
  var conj = function(dict) {
    return dict.conj;
  };
  var heytingAlgebraFunction = function(dictHeytingAlgebra) {
    var ff1 = ff(dictHeytingAlgebra);
    var tt1 = tt(dictHeytingAlgebra);
    var implies1 = implies(dictHeytingAlgebra);
    var conj1 = conj(dictHeytingAlgebra);
    var disj1 = disj(dictHeytingAlgebra);
    var not1 = not(dictHeytingAlgebra);
    return {
      ff: function(v) {
        return ff1;
      },
      tt: function(v) {
        return tt1;
      },
      implies: function(f) {
        return function(g) {
          return function(a) {
            return implies1(f(a))(g(a));
          };
        };
      },
      conj: function(f) {
        return function(g) {
          return function(a) {
            return conj1(f(a))(g(a));
          };
        };
      },
      disj: function(f) {
        return function(g) {
          return function(a) {
            return disj1(f(a))(g(a));
          };
        };
      },
      not: function(f) {
        return function(a) {
          return not1(f(a));
        };
      }
    };
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var snd = function(v) {
    return v.value1;
  };
  var fst = function(v) {
    return v.value0;
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Except.Trans/index.js
  var map3 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x) {
    return x;
  };
  var runExceptT = function(v) {
    return v;
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map18 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map18(map3(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind8 = bind(dictMonad.Bind1());
    var pure9 = pure(dictMonad.Applicative0());
    return {
      bind: function(v) {
        return function(k) {
          return bind8(v)(either(function($193) {
            return pure9(Left.create($193));
          })(function(a) {
            var v1 = k(a);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $194 = pure(dictMonad.Applicative0());
        return function($195) {
          return ExceptT($194(Right.create($195)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: function() {
        var $204 = pure(dictMonad.Applicative0());
        return function($205) {
          return ExceptT($204(Left.create($205)));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };
  var altExceptT = function(dictSemigroup) {
    var append3 = append(dictSemigroup);
    return function(dictMonad) {
      var Bind1 = dictMonad.Bind1();
      var bind8 = bind(Bind1);
      var pure9 = pure(dictMonad.Applicative0());
      var functorExceptT1 = functorExceptT(Bind1.Apply0().Functor0());
      return {
        alt: function(v) {
          return function(v1) {
            return bind8(v)(function(rm) {
              if (rm instanceof Right) {
                return pure9(new Right(rm.value0));
              }
              ;
              if (rm instanceof Left) {
                return bind8(v1)(function(rn) {
                  if (rn instanceof Right) {
                    return pure9(new Right(rn.value0));
                  }
                  ;
                  if (rn instanceof Left) {
                    return pure9(new Left(append3(rm.value0)(rn.value0)));
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 87, column 9 - line 89, column 49): " + [rn.constructor.name]);
                });
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 83, column 5 - line 89, column 49): " + [rm.constructor.name]);
            });
          };
        },
        Functor0: function() {
          return functorExceptT1;
        }
      };
    };
  };

  // output/Control.Monad.Except/index.js
  var unwrap3 = /* @__PURE__ */ unwrap();
  var runExcept = function($3) {
    return unwrap3(runExceptT($3));
  };

  // output/Data.Argonaut.Core/foreign.js
  function id(x) {
    return x;
  }
  var jsonNull = null;
  function stringify(j) {
    return JSON.stringify(j);
  }
  function _caseJson(isNull3, isBool, isNum, isStr, isArr, isObj, j) {
    if (j == null) return isNull3();
    else if (typeof j === "boolean") return isBool(j);
    else if (typeof j === "number") return isNum(j);
    else if (typeof j === "string") return isStr(j);
    else if (Object.prototype.toString.call(j) === "[object Array]")
      return isArr(j);
    else return isObj(j);
  }

  // output/Foreign.Object/foreign.js
  var empty = {};
  function runST(f) {
    return f();
  }
  function all(f) {
    return function(m) {
      for (var k in m) {
        if (hasOwnProperty.call(m, k) && !f(k)(m[k])) return false;
      }
      return true;
    };
  }
  function _lookup(no, yes, k, m) {
    return k in m ? yes(m[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Data.Array/foreign.js
  var rangeImpl = function(start2, end) {
    var step3 = start2 > end ? -1 : 1;
    var result = new Array(step3 * (end - start2) + 1);
    var i = start2, n = 0;
    while (i !== end) {
      result[n++] = i;
      i += step3;
    }
    result[n] = i;
    return result;
  };
  var replicateFill = function(count, value13) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value13);
  };
  var replicatePolyfill = function(count, value13) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count; i++) {
      result[n++] = value13;
    }
    return result;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = /* @__PURE__ */ function() {
    function Cons3(head5, tail2) {
      this.head = head5;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head5) {
      return function(tail2) {
        return new Cons3(head5, tail2);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr3, xs) {
      return listToArray(foldr3(curryCons)(emptyList)(xs));
    };
  }();
  var length = function(xs) {
    return xs.length;
  };
  var unconsImpl = function(empty5, next, xs) {
    return xs.length === 0 ? empty5({}) : next(xs[0])(xs.slice(1));
  };
  var indexImpl = function(just, nothing, xs, i) {
    return i < 0 || i >= xs.length ? nothing : just(xs[i]);
  };
  var findIndexImpl = function(just, nothing, f, xs) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (f(xs[i])) return just(i);
    }
    return nothing;
  };
  var reverse = function(l) {
    return l.slice().reverse();
  };
  var filterImpl = function(f, xs) {
    return xs.filter(f);
  };

  // output/Data.Array.ST/foreign.js
  function unsafeFreezeThawImpl(xs) {
    return xs;
  }
  var unsafeFreezeImpl = unsafeFreezeThawImpl;
  function copyImpl(xs) {
    return xs.slice();
  }
  var thawImpl = copyImpl;
  var pushImpl = function(a, xs) {
    return xs.push(a);
  };

  // output/Control.Monad.ST.Uncurried/foreign.js
  var runSTFn1 = function runSTFn12(fn) {
    return function(a) {
      return function() {
        return fn(a);
      };
    };
  };
  var runSTFn2 = function runSTFn22(fn) {
    return function(a) {
      return function(b) {
        return function() {
          return fn(a, b);
        };
      };
    };
  };

  // output/Data.Array.ST/index.js
  var unsafeFreeze = /* @__PURE__ */ runSTFn1(unsafeFreezeImpl);
  var thaw = /* @__PURE__ */ runSTFn1(thawImpl);
  var withArray = function(f) {
    return function(xs) {
      return function __do4() {
        var result = thaw(xs)();
        f(result)();
        return unsafeFreeze(result)();
      };
    };
  };
  var push = /* @__PURE__ */ runSTFn2(pushImpl);

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var empty2 = function(dict) {
    return dict.empty;
  };

  // output/Data.Bifunctor/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var bimap = function(dict) {
    return dict.bimap;
  };
  var lmap = function(dictBifunctor) {
    var bimap1 = bimap(dictBifunctor);
    return function(f) {
      return bimap1(f)(identity6);
    };
  };
  var bifunctorEither = {
    bimap: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return new Left(v(v2.value0));
          }
          ;
          if (v2 instanceof Right) {
            return new Right(v1(v2.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Bifunctor (line 32, column 1 - line 34, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    }
  };

  // output/Data.Monoid.Disj/index.js
  var Disj = function(x) {
    return x;
  };
  var semigroupDisj = function(dictHeytingAlgebra) {
    var disj2 = disj(dictHeytingAlgebra);
    return {
      append: function(v) {
        return function(v1) {
          return disj2(v)(v1);
        };
      }
    };
  };
  var monoidDisj = function(dictHeytingAlgebra) {
    var semigroupDisj1 = semigroupDisj(dictHeytingAlgebra);
    return {
      mempty: ff(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupDisj1;
      }
    };
  };

  // output/Data.Foldable/index.js
  var alaF2 = /* @__PURE__ */ alaF()()()();
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond2 = applySecond(dictApplicative.Apply0());
    var pure9 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond2(f($454));
        })(pure9(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_1 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_1(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty2 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty2;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append3 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append3(f(x))(acc);
          };
        })(mempty2);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };
  var any = function(dictFoldable) {
    var foldMap22 = foldMap(dictFoldable);
    return function(dictHeytingAlgebra) {
      return alaF2(Disj)(foldMap22(monoidDisj(dictHeytingAlgebra)));
    };
  };

  // output/Data.Function.Uncurried/foreign.js
  var mkFn5 = function(fn) {
    return function(a, b, c, d, e) {
      return fn(a)(b)(c)(d)(e);
    };
  };
  var runFn2 = function(fn) {
    return function(a) {
      return function(b) {
        return fn(a, b);
      };
    };
  };
  var runFn3 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return fn(a, b, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function(d) {
            return fn(a, b, c, d);
          };
        };
      };
    };
  };

  // output/Data.FunctorWithIndex/foreign.js
  var mapWithIndexArray = function(f) {
    return function(xs) {
      var l = xs.length;
      var result = Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(i)(xs[i]);
      }
      return result;
    };
  };

  // output/Data.FunctorWithIndex/index.js
  var mapWithIndex = function(dict) {
    return dict.mapWithIndex;
  };
  var functorWithIndexArray = {
    mapWithIndex: mapWithIndexArray,
    Functor0: function() {
      return functorArray;
    }
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = /* @__PURE__ */ function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply5) {
      return function(map18) {
        return function(pure9) {
          return function(f) {
            return function(array) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure9([]);
                  case 1:
                    return map18(array1)(f(array[bot]));
                  case 2:
                    return apply5(map18(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply5(apply5(map18(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply5(map18(concat2)(go2(bot, pivot)))(go2(pivot, top3));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var traversableMaybe = {
    traverse: function(dictApplicative) {
      var pure9 = pure(dictApplicative);
      var map18 = map(dictApplicative.Apply0().Functor0());
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return pure9(Nothing.value);
          }
          ;
          if (v1 instanceof Just) {
            return map18(Just.create)(v(v1.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Traversable (line 115, column 1 - line 119, column 33): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    },
    sequence: function(dictApplicative) {
      var pure9 = pure(dictApplicative);
      var map18 = map(dictApplicative.Apply0().Functor0());
      return function(v) {
        if (v instanceof Nothing) {
          return pure9(Nothing.value);
        }
        ;
        if (v instanceof Just) {
          return map18(Just.create)(v.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Traversable (line 115, column 1 - line 119, column 33): " + [v.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    },
    Foldable1: function() {
      return foldableMaybe;
    }
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse22 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse22(dictApplicative)(identity7);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };
  var sequence = function(dict) {
    return dict.sequence;
  };
  var $$for = function(dictApplicative) {
    return function(dictTraversable) {
      var traverse22 = traverse(dictTraversable)(dictApplicative);
      return function(x) {
        return function(f) {
          return traverse22(f)(x);
        };
      };
    };
  };

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust7) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b) {
              var result = [];
              var value13 = b;
              while (true) {
                var maybe2 = f(value13);
                if (isNothing2(maybe2)) return result;
                var tuple = fromJust7(maybe2);
                result.push(fst2(tuple));
                value13 = snd2(tuple);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl = function(isNothing2) {
    return function(fromJust7) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b) {
              var result = [];
              var value13 = b;
              while (true) {
                var tuple = f(value13);
                result.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing2(maybe2)) return result;
                value13 = fromJust7(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
  };

  // output/Data.Unfoldable/index.js
  var fromJust3 = /* @__PURE__ */ fromJust();
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };

  // output/Data.Array/index.js
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var uncons = /* @__PURE__ */ function() {
    return runFn3(unconsImpl)($$const(Nothing.value))(function(x) {
      return function(xs) {
        return new Just({
          head: x,
          tail: xs
        });
      };
    });
  }();
  var snoc = function(xs) {
    return function(x) {
      return withArray(push(x))(xs)();
    };
  };
  var range2 = /* @__PURE__ */ runFn2(rangeImpl);
  var index = /* @__PURE__ */ function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index(xs)(length(xs) - 1 | 0);
  };
  var head = function(xs) {
    return index(xs)(0);
  };
  var fromFoldable = function(dictFoldable) {
    return runFn2(fromFoldableImpl)(foldr(dictFoldable));
  };
  var foldM = function(dictMonad) {
    var pure12 = pure(dictMonad.Applicative0());
    var bind1 = bind(dictMonad.Bind1());
    return function(f) {
      return function(b) {
        return runFn3(unconsImpl)(function(v) {
          return pure12(b);
        })(function(a) {
          return function(as) {
            return bind1(f(b)(a))(function(b$prime) {
              return foldM(dictMonad)(f)(b$prime)(as);
            });
          };
        });
      };
    };
  };
  var findIndex = /* @__PURE__ */ function() {
    return runFn4(findIndexImpl)(Just.create)(Nothing.value);
  }();
  var filter = /* @__PURE__ */ runFn2(filterImpl);
  var elemIndex = function(dictEq) {
    var eq24 = eq(dictEq);
    return function(x) {
      return findIndex(function(v) {
        return eq24(v)(x);
      });
    };
  };
  var notElem2 = function(dictEq) {
    var elemIndex1 = elemIndex(dictEq);
    return function(a) {
      return function(arr) {
        return isNothing(elemIndex1(a)(arr));
      };
    };
  };
  var elem2 = function(dictEq) {
    var elemIndex1 = elemIndex(dictEq);
    return function(a) {
      return function(arr) {
        return isJust(elemIndex1(a)(arr));
      };
    };
  };
  var cons = function(x) {
    return function(xs) {
      return append2([x])(xs);
    };
  };
  var some = function(dictAlternative) {
    var apply1 = apply(dictAlternative.Applicative0().Apply0());
    var map32 = map(dictAlternative.Plus1().Alt0().Functor0());
    return function(dictLazy) {
      var defer5 = defer(dictLazy);
      return function(v) {
        return apply1(map32(cons)(v))(defer5(function(v1) {
          return many(dictAlternative)(dictLazy)(v);
        }));
      };
    };
  };
  var many = function(dictAlternative) {
    var alt7 = alt(dictAlternative.Plus1().Alt0());
    var pure12 = pure(dictAlternative.Applicative0());
    return function(dictLazy) {
      return function(v) {
        return alt7(some(dictAlternative)(dictLazy)(v))(pure12([]));
      };
    };
  };

  // output/Data.FoldableWithIndex/index.js
  var foldr8 = /* @__PURE__ */ foldr(foldableArray);
  var mapWithIndex2 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var foldl8 = /* @__PURE__ */ foldl(foldableArray);
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };
  var foldMapWithIndexDefaultR = function(dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    return function(dictMonoid) {
      var append3 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldrWithIndex1(function(i) {
          return function(x) {
            return function(acc) {
              return append3(f(i)(x))(acc);
            };
          };
        })(mempty2);
      };
    };
  };
  var foldableWithIndexArray = {
    foldrWithIndex: function(f) {
      return function(z) {
        var $291 = foldr8(function(v) {
          return function(y) {
            return f(v.value0)(v.value1)(y);
          };
        })(z);
        var $292 = mapWithIndex2(Tuple.create);
        return function($293) {
          return $291($292($293));
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        var $294 = foldl8(function(y) {
          return function(v) {
            return f(v.value0)(y)(v.value1);
          };
        })(z);
        var $295 = mapWithIndex2(Tuple.create);
        return function($296) {
          return $294($295($296));
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
    },
    Foldable0: function() {
      return foldableArray;
    }
  };

  // output/Data.TraversableWithIndex/index.js
  var traverseWithIndexDefault = function(dictTraversableWithIndex) {
    var sequence2 = sequence(dictTraversableWithIndex.Traversable2());
    var mapWithIndex4 = mapWithIndex(dictTraversableWithIndex.FunctorWithIndex0());
    return function(dictApplicative) {
      var sequence12 = sequence2(dictApplicative);
      return function(f) {
        var $174 = mapWithIndex4(f);
        return function($175) {
          return sequence12($174($175));
        };
      };
    };
  };
  var traverseWithIndex = function(dict) {
    return dict.traverseWithIndex;
  };
  var traversableWithIndexArray = {
    traverseWithIndex: function(dictApplicative) {
      return traverseWithIndexDefault(traversableWithIndexArray)(dictApplicative);
    },
    FunctorWithIndex0: function() {
      return functorWithIndexArray;
    },
    FoldableWithIndex1: function() {
      return foldableWithIndexArray;
    },
    Traversable2: function() {
      return traversableArray;
    }
  };

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };
  function poke2(k) {
    return function(v) {
      return function(m) {
        return function() {
          m[k] = v;
          return m;
        };
      };
    };
  }

  // output/Foreign.Object/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindST);
  var $$void2 = /* @__PURE__ */ $$void(functorST);
  var singleton2 = function(k) {
    return function(v) {
      return runST(bindFlipped2(poke2(k)(v))(newImpl));
    };
  };
  var lookup = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();
  var isEmpty = /* @__PURE__ */ all(function(v) {
    return function(v1) {
      return false;
    };
  });
  var fromFoldable2 = function(dictFoldable) {
    var fromFoldable1 = fromFoldable(dictFoldable);
    return function(l) {
      return runST(function __do4() {
        var s = newImpl();
        foreach(fromFoldable1(l))(function(v) {
          return $$void2(poke2(v.value0)(v.value1)(s));
        })();
        return s;
      });
    };
  };

  // output/Data.Argonaut.Core/index.js
  var verbJsonType = function(def) {
    return function(f) {
      return function(g) {
        return g(def)(f);
      };
    };
  };
  var toJsonType = /* @__PURE__ */ function() {
    return verbJsonType(Nothing.value)(Just.create);
  }();
  var jsonEmptyString = /* @__PURE__ */ id("");
  var jsonEmptyObject = /* @__PURE__ */ id(empty);
  var jsonEmptyArray = /* @__PURE__ */ id([]);
  var isJsonType = /* @__PURE__ */ verbJsonType(false)(/* @__PURE__ */ $$const(true));
  var caseJsonString = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), f, $$const(d), $$const(d), j);
      };
    };
  };
  var toString = /* @__PURE__ */ toJsonType(caseJsonString);
  var caseJsonObject = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), $$const(d), f, j);
      };
    };
  };
  var toObject = /* @__PURE__ */ toJsonType(caseJsonObject);
  var caseJsonNumber = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), f, $$const(d), $$const(d), $$const(d), j);
      };
    };
  };
  var toNumber = /* @__PURE__ */ toJsonType(caseJsonNumber);
  var caseJsonNull = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson(f, $$const(d), $$const(d), $$const(d), $$const(d), $$const(d), j);
      };
    };
  };
  var isNull = /* @__PURE__ */ isJsonType(caseJsonNull);
  var caseJsonArray = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), f, $$const(d), j);
      };
    };
  };
  var toArray = /* @__PURE__ */ toJsonType(caseJsonArray);

  // output/Data.Argonaut.Parser/foreign.js
  function _jsonParser(fail4, succ4, s) {
    try {
      return succ4(JSON.parse(s));
    } catch (e) {
      return fail4(e.message);
    }
  }

  // output/Data.Argonaut.Parser/index.js
  var jsonParser = function(j) {
    return _jsonParser(Left.create, Right.create, j);
  };

  // output/Data.String.Common/foreign.js
  var split = function(sep) {
    return function(s) {
      return s.split(sep);
    };
  };
  var trim = function(s) {
    return s.trim();
  };
  var joinWith = function(s) {
    return function(xs) {
      return xs.join(s);
    };
  };

  // output/Data.String.Common/index.js
  var $$null = function(s) {
    return s === "";
  };

  // output/JSURI/foreign.js
  function encodeURIComponent_to_RFC3986(input) {
    return input.replace(/[!'()*]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16);
    });
  }
  function _encodeFormURLComponent(fail4, succeed, input) {
    try {
      return succeed(encodeURIComponent_to_RFC3986(encodeURIComponent(input)).replace(/%20/g, "+"));
    } catch (err) {
      return fail4(err);
    }
  }

  // output/JSURI/index.js
  var encodeFormURLComponent = /* @__PURE__ */ function() {
    return runFn3(_encodeFormURLComponent)($$const(Nothing.value))(Just.create);
  }();

  // output/Data.FormURLEncoded/index.js
  var apply2 = /* @__PURE__ */ apply(applyMaybe);
  var map4 = /* @__PURE__ */ map(functorMaybe);
  var traverse2 = /* @__PURE__ */ traverse(traversableArray)(applicativeMaybe);
  var toArray2 = function(v) {
    return v;
  };
  var encode = /* @__PURE__ */ function() {
    var encodePart = function(v) {
      if (v.value1 instanceof Nothing) {
        return encodeFormURLComponent(v.value0);
      }
      ;
      if (v.value1 instanceof Just) {
        return apply2(map4(function(key) {
          return function(val) {
            return key + ("=" + val);
          };
        })(encodeFormURLComponent(v.value0)))(encodeFormURLComponent(v.value1.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.FormURLEncoded (line 37, column 16 - line 39, column 114): " + [v.constructor.name]);
    };
    var $37 = map4(joinWith("&"));
    var $38 = traverse2(encodePart);
    return function($39) {
      return $37($38(toArray2($39)));
    };
  }();

  // output/Data.HTTP.Method/index.js
  var OPTIONS = /* @__PURE__ */ function() {
    function OPTIONS2() {
    }
    ;
    OPTIONS2.value = new OPTIONS2();
    return OPTIONS2;
  }();
  var GET = /* @__PURE__ */ function() {
    function GET2() {
    }
    ;
    GET2.value = new GET2();
    return GET2;
  }();
  var HEAD = /* @__PURE__ */ function() {
    function HEAD2() {
    }
    ;
    HEAD2.value = new HEAD2();
    return HEAD2;
  }();
  var POST = /* @__PURE__ */ function() {
    function POST2() {
    }
    ;
    POST2.value = new POST2();
    return POST2;
  }();
  var PUT = /* @__PURE__ */ function() {
    function PUT2() {
    }
    ;
    PUT2.value = new PUT2();
    return PUT2;
  }();
  var DELETE = /* @__PURE__ */ function() {
    function DELETE2() {
    }
    ;
    DELETE2.value = new DELETE2();
    return DELETE2;
  }();
  var TRACE = /* @__PURE__ */ function() {
    function TRACE2() {
    }
    ;
    TRACE2.value = new TRACE2();
    return TRACE2;
  }();
  var CONNECT = /* @__PURE__ */ function() {
    function CONNECT2() {
    }
    ;
    CONNECT2.value = new CONNECT2();
    return CONNECT2;
  }();
  var PROPFIND = /* @__PURE__ */ function() {
    function PROPFIND2() {
    }
    ;
    PROPFIND2.value = new PROPFIND2();
    return PROPFIND2;
  }();
  var PROPPATCH = /* @__PURE__ */ function() {
    function PROPPATCH2() {
    }
    ;
    PROPPATCH2.value = new PROPPATCH2();
    return PROPPATCH2;
  }();
  var MKCOL = /* @__PURE__ */ function() {
    function MKCOL2() {
    }
    ;
    MKCOL2.value = new MKCOL2();
    return MKCOL2;
  }();
  var COPY = /* @__PURE__ */ function() {
    function COPY2() {
    }
    ;
    COPY2.value = new COPY2();
    return COPY2;
  }();
  var MOVE = /* @__PURE__ */ function() {
    function MOVE2() {
    }
    ;
    MOVE2.value = new MOVE2();
    return MOVE2;
  }();
  var LOCK = /* @__PURE__ */ function() {
    function LOCK2() {
    }
    ;
    LOCK2.value = new LOCK2();
    return LOCK2;
  }();
  var UNLOCK = /* @__PURE__ */ function() {
    function UNLOCK2() {
    }
    ;
    UNLOCK2.value = new UNLOCK2();
    return UNLOCK2;
  }();
  var PATCH = /* @__PURE__ */ function() {
    function PATCH2() {
    }
    ;
    PATCH2.value = new PATCH2();
    return PATCH2;
  }();
  var unCustomMethod = function(v) {
    return v;
  };
  var showMethod = {
    show: function(v) {
      if (v instanceof OPTIONS) {
        return "OPTIONS";
      }
      ;
      if (v instanceof GET) {
        return "GET";
      }
      ;
      if (v instanceof HEAD) {
        return "HEAD";
      }
      ;
      if (v instanceof POST) {
        return "POST";
      }
      ;
      if (v instanceof PUT) {
        return "PUT";
      }
      ;
      if (v instanceof DELETE) {
        return "DELETE";
      }
      ;
      if (v instanceof TRACE) {
        return "TRACE";
      }
      ;
      if (v instanceof CONNECT) {
        return "CONNECT";
      }
      ;
      if (v instanceof PROPFIND) {
        return "PROPFIND";
      }
      ;
      if (v instanceof PROPPATCH) {
        return "PROPPATCH";
      }
      ;
      if (v instanceof MKCOL) {
        return "MKCOL";
      }
      ;
      if (v instanceof COPY) {
        return "COPY";
      }
      ;
      if (v instanceof MOVE) {
        return "MOVE";
      }
      ;
      if (v instanceof LOCK) {
        return "LOCK";
      }
      ;
      if (v instanceof UNLOCK) {
        return "UNLOCK";
      }
      ;
      if (v instanceof PATCH) {
        return "PATCH";
      }
      ;
      throw new Error("Failed pattern match at Data.HTTP.Method (line 43, column 1 - line 59, column 23): " + [v.constructor.name]);
    }
  };
  var print = /* @__PURE__ */ either(/* @__PURE__ */ show(showMethod))(unCustomMethod);

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var singleton3 = function(dictPlus) {
    var empty5 = empty2(dictPlus);
    return function(a) {
      return new NonEmpty(a, empty5);
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons3.create = function(value0) {
      return function(value1) {
        return new Cons3(value0, value1);
      };
    };
    return Cons3;
  }();
  var NonEmptyList = function(x) {
    return x;
  };
  var toList = function(v) {
    return new Cons(v.value0, v.value1);
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
            $tco_var_v = new Cons(v1, v);
            $copy_v1 = v1.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v2) {
            if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
              return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
            }
            ;
            if (v2 instanceof Cons && v2.value1 instanceof Nil) {
              return new Cons(f(v2.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v2) {
            return function($copy_v3) {
              var $tco_var_v2 = $copy_v2;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v2, v3) {
                if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v2 = v2.value1;
                  $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                  return;
                }
                ;
                $tco_done1 = true;
                return v3;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(v)(unrolledMap(v1));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var foldableList = {
    foldr: function(f) {
      return function(b) {
        var rev3 = function() {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return v;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = new Cons(v1.value0, v);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        }();
        var $284 = foldl(foldableList)(flip(f))(b);
        return function($285) {
          return $284(rev3($285));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append22(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty2);
      };
    }
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var semigroupNonEmptyList = {
    append: function(v) {
      return function(as$prime) {
        return new NonEmpty(v.value0, append1(v.value1)(toList(as$prime)));
      };
    }
  };
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Data.List/index.js
  var some2 = function(dictAlternative) {
    var apply5 = apply(dictAlternative.Applicative0().Apply0());
    var map18 = map(dictAlternative.Plus1().Alt0().Functor0());
    return function(dictLazy) {
      var defer5 = defer(dictLazy);
      return function(v) {
        return apply5(map18(Cons.create)(v))(defer5(function(v1) {
          return many2(dictAlternative)(dictLazy)(v);
        }));
      };
    };
  };
  var many2 = function(dictAlternative) {
    var alt7 = alt(dictAlternative.Plus1().Alt0());
    var pure9 = pure(dictAlternative.Applicative0());
    return function(dictLazy) {
      return function(v) {
        return alt7(some2(dictAlternative)(dictLazy)(v))(pure9(Nil.value));
      };
    };
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Data.List.NonEmpty/index.js
  var singleton4 = /* @__PURE__ */ function() {
    var $200 = singleton3(plusList);
    return function($201) {
      return NonEmptyList($200($201));
    };
  }();
  var head2 = function(v) {
    return v.value0;
  };

  // output/Data.Nullable/foreign.js
  var nullImpl = null;
  function nullable(a, r, f) {
    return a == null ? r : f(a);
  }
  function notNull(x) {
    return x;
  }

  // output/Data.Nullable/index.js
  var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error5) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error5) {
        setTimeout(function() {
          throw error5;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error5) {
        return left(error5);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error5) {
        k(left(error5))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size5 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size5 !== 0) {
          size5--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i, tmp;
          if (size5 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size5) % limit] = cb;
          size5++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error5) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step3 = aff;
      var fail4 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run3(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step3 = bhead(step3);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail4 = util.left(e);
                step3 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step3)) {
                status = RETURN;
                fail4 = step3;
                step3 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step3 = util.fromRight(step3);
              }
              break;
            case CONTINUE:
              switch (step3.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step3._2;
                  status = CONTINUE;
                  step3 = step3._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step3 = util.right(step3._1);
                  } else {
                    status = STEP_BIND;
                    step3 = step3._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step3 = runSync(util.left, util.right, step3._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step3 = runAsync(util.left, step3._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step3 = result2;
                        run3(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail4 = util.left(step3._1);
                  step3 = null;
                  break;
                // Enqueue the Catch so that we can call the error handler later on
                // in case of an exception.
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step3, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step3, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step3 = step3._1;
                  break;
                // Enqueue the Bracket so that we can call the appropriate handlers
                // after resource acquisition.
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step3, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step3, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step3 = step3._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step3._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step3._1) {
                    tmp.run();
                  }
                  step3 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step3 = sequential2(util, supervisor, step3._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step3 = interrupt || fail4 || step3;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  // We cannot recover from an unmasked interrupt. Otherwise we should
                  // continue stepping, or run the exception handler if an exception
                  // was raised.
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail4) {
                      status = CONTINUE;
                      step3 = attempt._2(util.fromLeft(fail4));
                      fail4 = null;
                    }
                    break;
                  // We cannot resume from an unmasked interrupt or exception.
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail4) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step3 = util.fromRight(step3);
                    }
                    break;
                  // If we have a bracket, we should enqueue the handlers,
                  // and continue with the success branch only if the fiber has
                  // not been interrupted. If the bracket acquisition failed, we
                  // should not run either.
                  case BRACKET:
                    bracketCount--;
                    if (fail4 === null) {
                      result = util.fromRight(step3);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step3 = attempt._3(result);
                      }
                    }
                    break;
                  // Enqueue the appropriate handler. We increase the bracket count
                  // because it should not be cancelled.
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step3, fail4), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step3 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail4) {
                      step3 = attempt._1.failed(util.fromLeft(fail4))(attempt._2);
                    } else {
                      step3 = attempt._1.completed(util.fromRight(step3))(attempt._2);
                    }
                    fail4 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step3, fail4), attempts, interrupt);
                    status = CONTINUE;
                    step3 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step3 = attempt._1;
                    fail4 = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step3));
                }
              }
              joins = null;
              if (interrupt && fail4) {
                setTimeout(function() {
                  throw util.fromLeft(fail4);
                }, 0);
              } else if (util.isLeft(step3) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step3);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join4) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join4.rethrow;
            join4.handler(step3)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join4;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill(error5, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error5);
              status = COMPLETED;
              step3 = interrupt;
              run3(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error5);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step3(error5)), attempts, interrupt);
                }
                status = RETURN;
                step3 = null;
                fail4 = null;
                run3(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error5);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step3 = null;
                fail4 = null;
              }
          }
          return canceler;
        };
      }
      function join3(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run3(runTick);
          }
          return canceler;
        };
      }
      return {
        kill,
        join: join3,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run3(runTick);
              });
            } else {
              run3(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill(error5, par2, cb2) {
        var step3 = par2;
        var head5 = null;
        var tail2 = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop: while (true) {
          tmp = null;
          switch (step3.tag) {
            case FORKED:
              if (step3._3 === EMPTY) {
                tmp = fibers[step3._1];
                kills2[count++] = tmp.kill(error5, function(result) {
                  return function() {
                    count--;
                    if (count === 0) {
                      cb2(result)();
                    }
                  };
                });
              }
              if (head5 === null) {
                break loop;
              }
              step3 = head5._2;
              if (tail2 === null) {
                head5 = null;
              } else {
                head5 = tail2._1;
                tail2 = tail2._2;
              }
              break;
            case MAP:
              step3 = step3._2;
              break;
            case APPLY:
            case ALT:
              if (head5) {
                tail2 = new Aff2(CONS, head5, tail2);
              }
              head5 = step3;
              step3 = step3._1;
              break;
          }
        }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join3(result, head5, tail2) {
        var fail4, step3, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail4 = result;
          step3 = null;
        } else {
          step3 = result;
          fail4 = null;
        }
        loop: while (true) {
          lhs = null;
          rhs = null;
          tmp = null;
          kid = null;
          if (interrupt !== null) {
            return;
          }
          if (head5 === null) {
            cb(fail4 || step3)();
            return;
          }
          if (head5._3 !== EMPTY) {
            return;
          }
          switch (head5.tag) {
            case MAP:
              if (fail4 === null) {
                head5._3 = util.right(head5._1(util.fromRight(step3)));
                step3 = head5._3;
              } else {
                head5._3 = fail4;
              }
              break;
            case APPLY:
              lhs = head5._1._3;
              rhs = head5._2._3;
              if (fail4) {
                head5._3 = fail4;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, fail4 === lhs ? head5._2 : head5._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join3(fail4, null, null);
                    } else {
                      join3(fail4, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              } else if (lhs === EMPTY || rhs === EMPTY) {
                return;
              } else {
                step3 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                head5._3 = step3;
              }
              break;
            case ALT:
              lhs = head5._1._3;
              rhs = head5._2._3;
              if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                return;
              }
              if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                fail4 = step3 === lhs ? rhs : lhs;
                step3 = null;
                head5._3 = fail4;
              } else {
                head5._3 = step3;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, step3 === lhs ? head5._2 : head5._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join3(step3, null, null);
                    } else {
                      join3(step3, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              }
              break;
          }
          if (tail2 === null) {
            head5 = null;
          } else {
            head5 = tail2._1;
            tail2 = tail2._2;
          }
        }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join3(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run3() {
        var status = CONTINUE;
        var step3 = par;
        var head5 = null;
        var tail2 = null;
        var tmp, fid;
        loop: while (true) {
          tmp = null;
          fid = null;
          switch (status) {
            case CONTINUE:
              switch (step3.tag) {
                case MAP:
                  if (head5) {
                    tail2 = new Aff2(CONS, head5, tail2);
                  }
                  head5 = new Aff2(MAP, step3._1, EMPTY, EMPTY);
                  step3 = step3._2;
                  break;
                case APPLY:
                  if (head5) {
                    tail2 = new Aff2(CONS, head5, tail2);
                  }
                  head5 = new Aff2(APPLY, EMPTY, step3._2, EMPTY);
                  step3 = step3._1;
                  break;
                case ALT:
                  if (head5) {
                    tail2 = new Aff2(CONS, head5, tail2);
                  }
                  head5 = new Aff2(ALT, EMPTY, step3._2, EMPTY);
                  step3 = step3._1;
                  break;
                default:
                  fid = fiberId++;
                  status = RETURN;
                  tmp = step3;
                  step3 = new Aff2(FORKED, fid, new Aff2(CONS, head5, tail2), EMPTY);
                  tmp = Fiber(util, supervisor, tmp);
                  tmp.onComplete({
                    rethrow: false,
                    handler: resolve(step3)
                  })();
                  fibers[fid] = tmp;
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
              }
              break;
            case RETURN:
              if (head5 === null) {
                break loop;
              }
              if (head5._1 === EMPTY) {
                head5._1 = step3;
                status = CONTINUE;
                step3 = head5._2;
                head5._2 = EMPTY;
              } else {
                head5._2 = step3;
                step3 = head5;
                if (tail2 === null) {
                  head5 = null;
                } else {
                  head5 = tail2._1;
                  tail2 = tail2._2;
                }
              }
          }
        }
        root = step3;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error5, cb2) {
        interrupt = util.left(error5);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill(error5, root, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run3();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential2(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value13) {
          return Aff.Pure(f(value13));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  var _liftEffect = Aff.Sync;
  var makeAff = Aff.Async;
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _sequential = Aff.Seq;

  // output/Data.Time.Duration/index.js
  var over2 = /* @__PURE__ */ over()();
  var negate2 = /* @__PURE__ */ negate(ringNumber);
  var Minutes = function(x) {
    return x;
  };
  var Milliseconds = function(x) {
    return x;
  };
  var toDuration = function(dict) {
    return dict.toDuration;
  };
  var fromDuration = function(dict) {
    return dict.fromDuration;
  };
  var negateDuration = function(dictDuration) {
    var $57 = toDuration(dictDuration);
    var $58 = over2(Milliseconds)(negate2);
    var $59 = fromDuration(dictDuration);
    return function($60) {
      return $57($58($59($60)));
    };
  };
  var durationMinutes = {
    fromDuration: /* @__PURE__ */ over2(Minutes)(function(v) {
      return v * 6e4;
    }),
    toDuration: /* @__PURE__ */ over2(Milliseconds)(function(v) {
      return v / 6e4;
    })
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy3 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var functorAff = {
    map: _map
  };
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do4() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy3("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var pure2 = /* @__PURE__ */ pure(applicativeAff);
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindAff);
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
  var runAff = function(k) {
    return function(aff) {
      return launchAff(bindFlipped3(function($83) {
        return liftEffect2(k($83));
      })($$try2(aff)));
    };
  };
  var runAff_ = function(k) {
    return function(aff) {
      return $$void3(runAff(k)(aff));
    };
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure2(unit));

  // output/Effect.Aff.Compat/index.js
  var fromEffectFnAff = function(v) {
    return makeAff(function(k) {
      return function __do4() {
        var v1 = v(function($9) {
          return k(Left.create($9))();
        }, function($10) {
          return k(Right.create($10))();
        });
        return function(e) {
          return makeAff(function(k2) {
            return function __do5() {
              v1(e, function($11) {
                return k2(Left.create($11))();
              }, function($12) {
                return k2(Right.create($12))();
              });
              return nonCanceler;
            };
          });
        };
      };
    });
  };

  // output/Foreign/foreign.js
  function tagOf(value13) {
    return Object.prototype.toString.call(value13).slice(8, -1);
  }
  var isArray = Array.isArray || function(value13) {
    return Object.prototype.toString.call(value13) === "[object Array]";
  };

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber2 = function(n) {
    return n;
  };
  var fromStringAsImpl = function(just) {
    return function(nothing) {
      return function(radix) {
        var digits;
        if (radix < 11) {
          digits = "[0-" + (radix - 1).toString() + "]";
        } else if (radix === 11) {
          digits = "[0-9a]";
        } else {
          digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
        }
        var pattern2 = new RegExp("^[\\+\\-]?" + digits + "+$", "i");
        return function(s) {
          if (pattern2.test(s)) {
            var i = parseInt(s, radix);
            return (i | 0) === i ? just(i) : nothing;
          } else {
            return nothing;
          }
        };
      };
    };
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  function fromStringImpl(str, isFinite2, just, nothing) {
    var num = parseFloat(str);
    if (isFinite2(num)) {
      return just(num);
    } else {
      return nothing;
    }
  }
  var abs2 = Math.abs;
  var floor = Math.floor;
  var log = Math.log;
  var pow = function(n) {
    return function(p) {
      return Math.pow(n, p);
    };
  };
  var round = Math.round;

  // output/Data.Number/index.js
  var ln10 = 2.302585092994046;
  var fromString = function(str) {
    return fromStringImpl(str, isFiniteImpl, Just.create, Nothing.value);
  };

  // output/Data.Int/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var fromStringAs = /* @__PURE__ */ function() {
    return fromStringAsImpl(Just.create)(Nothing.value);
  }();
  var fromString2 = /* @__PURE__ */ fromStringAs(10);
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber2(top2)) {
      return top2;
    }
    ;
    if (x <= toNumber2(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var round2 = function($37) {
    return unsafeClamp(round($37));
  };
  var floor2 = function($39) {
    return unsafeClamp(floor($39));
  };

  // output/Data.String.CodeUnits/foreign.js
  var fromCharArray = function(a) {
    return a.join("");
  };
  var toCharArray = function(s) {
    return s.split("");
  };
  var singleton5 = function(c) {
    return c;
  };
  var length3 = function(s) {
    return s.length;
  };
  var _indexOf = function(just) {
    return function(nothing) {
      return function(x) {
        return function(s) {
          var i = s.indexOf(x);
          return i === -1 ? nothing : just(i);
        };
      };
    };
  };
  var take2 = function(n) {
    return function(s) {
      return s.substr(0, n);
    };
  };
  var drop2 = function(n) {
    return function(s) {
      return s.substring(n);
    };
  };
  var splitAt = function(i) {
    return function(s) {
      return { before: s.substring(0, i), after: s.substring(i) };
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i) {
    return function(s) {
      if (i >= 0 && i < s.length) return s.charAt(i);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Data.String.CodeUnits/index.js
  var stripSuffix = function(v) {
    return function(str) {
      var v1 = splitAt(length3(str) - length3(v) | 0)(str);
      var $14 = v1.after === v;
      if ($14) {
        return new Just(v1.before);
      }
      ;
      return Nothing.value;
    };
  };
  var stripPrefix = function(v) {
    return function(str) {
      var v1 = splitAt(length3(v))(str);
      var $20 = v1.before === v;
      if ($20) {
        return new Just(v1.after);
      }
      ;
      return Nothing.value;
    };
  };
  var indexOf = /* @__PURE__ */ function() {
    return _indexOf(Just.create)(Nothing.value);
  }();

  // output/Foreign/index.js
  var show2 = /* @__PURE__ */ show(showString);
  var show1 = /* @__PURE__ */ show(showInt);
  var ForeignError = /* @__PURE__ */ function() {
    function ForeignError2(value0) {
      this.value0 = value0;
    }
    ;
    ForeignError2.create = function(value0) {
      return new ForeignError2(value0);
    };
    return ForeignError2;
  }();
  var TypeMismatch = /* @__PURE__ */ function() {
    function TypeMismatch2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TypeMismatch2.create = function(value0) {
      return function(value1) {
        return new TypeMismatch2(value0, value1);
      };
    };
    return TypeMismatch2;
  }();
  var ErrorAtIndex = /* @__PURE__ */ function() {
    function ErrorAtIndex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtIndex2.create = function(value0) {
      return function(value1) {
        return new ErrorAtIndex2(value0, value1);
      };
    };
    return ErrorAtIndex2;
  }();
  var ErrorAtProperty = /* @__PURE__ */ function() {
    function ErrorAtProperty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtProperty2.create = function(value0) {
      return function(value1) {
        return new ErrorAtProperty2(value0, value1);
      };
    };
    return ErrorAtProperty2;
  }();
  var unsafeToForeign = unsafeCoerce2;
  var unsafeFromForeign = unsafeCoerce2;
  var renderForeignError = function(v) {
    if (v instanceof ForeignError) {
      return v.value0;
    }
    ;
    if (v instanceof ErrorAtIndex) {
      return "Error at array index " + (show1(v.value0) + (": " + renderForeignError(v.value1)));
    }
    ;
    if (v instanceof ErrorAtProperty) {
      return "Error at property " + (show2(v.value0) + (": " + renderForeignError(v.value1)));
    }
    ;
    if (v instanceof TypeMismatch) {
      return "Type mismatch: expected " + (v.value0 + (", found " + v.value1));
    }
    ;
    throw new Error("Failed pattern match at Foreign (line 78, column 1 - line 78, column 45): " + [v.constructor.name]);
  };
  var fail = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton4($154));
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    var pure12 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(tag) {
      return function(value13) {
        if (tagOf(value13) === tag) {
          return pure12(unsafeFromForeign(value13));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch(tag, tagOf(value13)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value13.constructor.name]);
      };
    };
  };

  // output/Affjax/index.js
  var pure3 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeExceptT(monadIdentity));
  var fail2 = /* @__PURE__ */ fail(monadIdentity);
  var unsafeReadTagged2 = /* @__PURE__ */ unsafeReadTagged(monadIdentity);
  var alt2 = /* @__PURE__ */ alt(/* @__PURE__ */ altExceptT(semigroupNonEmptyList)(monadIdentity));
  var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
  var map5 = /* @__PURE__ */ map(functorMaybe);
  var any2 = /* @__PURE__ */ any(foldableArray)(heytingAlgebraBoolean);
  var eq3 = /* @__PURE__ */ eq(eqString);
  var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var map1 = /* @__PURE__ */ map(functorArray);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorAff);
  var $$try3 = /* @__PURE__ */ $$try(monadErrorAff);
  var pure1 = /* @__PURE__ */ pure(applicativeAff);
  var RequestContentError = /* @__PURE__ */ function() {
    function RequestContentError2(value0) {
      this.value0 = value0;
    }
    ;
    RequestContentError2.create = function(value0) {
      return new RequestContentError2(value0);
    };
    return RequestContentError2;
  }();
  var ResponseBodyError = /* @__PURE__ */ function() {
    function ResponseBodyError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseBodyError2.create = function(value0) {
      return function(value1) {
        return new ResponseBodyError2(value0, value1);
      };
    };
    return ResponseBodyError2;
  }();
  var TimeoutError = /* @__PURE__ */ function() {
    function TimeoutError2() {
    }
    ;
    TimeoutError2.value = new TimeoutError2();
    return TimeoutError2;
  }();
  var RequestFailedError = /* @__PURE__ */ function() {
    function RequestFailedError2() {
    }
    ;
    RequestFailedError2.value = new RequestFailedError2();
    return RequestFailedError2;
  }();
  var XHROtherError = /* @__PURE__ */ function() {
    function XHROtherError2(value0) {
      this.value0 = value0;
    }
    ;
    XHROtherError2.create = function(value0) {
      return new XHROtherError2(value0);
    };
    return XHROtherError2;
  }();
  var request = function(driver2) {
    return function(req) {
      var parseJSON = function(v2) {
        if (v2 === "") {
          return pure3(jsonEmptyObject);
        }
        ;
        return either(function($74) {
          return fail2(ForeignError.create($74));
        })(pure3)(jsonParser(v2));
      };
      var fromResponse = function() {
        if (req.responseFormat instanceof $$ArrayBuffer) {
          return unsafeReadTagged2("ArrayBuffer");
        }
        ;
        if (req.responseFormat instanceof Blob2) {
          return unsafeReadTagged2("Blob");
        }
        ;
        if (req.responseFormat instanceof Document2) {
          return function(x) {
            return alt2(unsafeReadTagged2("Document")(x))(alt2(unsafeReadTagged2("XMLDocument")(x))(unsafeReadTagged2("HTMLDocument")(x)));
          };
        }
        ;
        if (req.responseFormat instanceof Json2) {
          return composeKleisliFlipped2(function($75) {
            return req.responseFormat.value0(parseJSON($75));
          })(unsafeReadTagged2("String"));
        }
        ;
        if (req.responseFormat instanceof $$String2) {
          return unsafeReadTagged2("String");
        }
        ;
        if (req.responseFormat instanceof Ignore) {
          return $$const(req.responseFormat.value0(pure3(unit)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 274, column 18 - line 283, column 57): " + [req.responseFormat.constructor.name]);
      }();
      var extractContent = function(v2) {
        if (v2 instanceof ArrayView) {
          return new Right(v2.value0(unsafeToForeign));
        }
        ;
        if (v2 instanceof Blob) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof Document) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof $$String) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof FormData) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof FormURLEncoded) {
          return note("Body contains values that cannot be encoded as application/x-www-form-urlencoded")(map5(unsafeToForeign)(encode(v2.value0)));
        }
        ;
        if (v2 instanceof Json) {
          return new Right(unsafeToForeign(stringify(v2.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 235, column 20 - line 250, column 69): " + [v2.constructor.name]);
      };
      var addHeader = function(mh) {
        return function(hs) {
          if (mh instanceof Just && !any2(on(eq3)(name)(mh.value0))(hs)) {
            return snoc(hs)(mh.value0);
          }
          ;
          return hs;
        };
      };
      var headers = function(reqContent) {
        return addHeader(map5(ContentType.create)(bindFlipped4(toMediaType)(reqContent)))(addHeader(map5(Accept.create)(toMediaType2(req.responseFormat)))(req.headers));
      };
      var ajaxRequest = function(v2) {
        return {
          method: print(req.method),
          url: req.url,
          headers: map1(function(h) {
            return {
              field: name(h),
              value: value(h)
            };
          })(headers(req.content)),
          content: v2,
          responseType: toResponseType(req.responseFormat),
          username: toNullable(req.username),
          password: toNullable(req.password),
          withCredentials: req.withCredentials,
          timeout: fromMaybe(0)(map5(function(v1) {
            return v1;
          })(req.timeout))
        };
      };
      var send = function(content3) {
        return mapFlipped2($$try3(fromEffectFnAff(_ajax(driver2, "AffjaxTimeoutErrorMessageIdent", "AffjaxRequestFailedMessageIdent", ResponseHeader.create, ajaxRequest(content3)))))(function(v2) {
          if (v2 instanceof Right) {
            var v1 = runExcept(fromResponse(v2.value0.body));
            if (v1 instanceof Left) {
              return new Left(new ResponseBodyError(head2(v1.value0), v2.value0));
            }
            ;
            if (v1 instanceof Right) {
              return new Right({
                headers: v2.value0.headers,
                status: v2.value0.status,
                statusText: v2.value0.statusText,
                body: v1.value0
              });
            }
            ;
            throw new Error("Failed pattern match at Affjax (line 209, column 9 - line 211, column 52): " + [v1.constructor.name]);
          }
          ;
          if (v2 instanceof Left) {
            return new Left(function() {
              var message2 = message(v2.value0);
              var $61 = message2 === "AffjaxTimeoutErrorMessageIdent";
              if ($61) {
                return TimeoutError.value;
              }
              ;
              var $62 = message2 === "AffjaxRequestFailedMessageIdent";
              if ($62) {
                return RequestFailedError.value;
              }
              ;
              return new XHROtherError(v2.value0);
            }());
          }
          ;
          throw new Error("Failed pattern match at Affjax (line 207, column 144 - line 219, column 28): " + [v2.constructor.name]);
        });
      };
      if (req.content instanceof Nothing) {
        return send(toNullable(Nothing.value));
      }
      ;
      if (req.content instanceof Just) {
        var v = extractContent(req.content.value0);
        if (v instanceof Right) {
          return send(toNullable(new Just(v.value0)));
        }
        ;
        if (v instanceof Left) {
          return pure1(new Left(new RequestContentError(v.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 199, column 7 - line 203, column 48): " + [v.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Affjax (line 195, column 3 - line 203, column 48): " + [req.content.constructor.name]);
    };
  };
  var printError = function(v) {
    if (v instanceof RequestContentError) {
      return "There was a problem with the request content: " + v.value0;
    }
    ;
    if (v instanceof ResponseBodyError) {
      return "There was a problem with the response body: " + renderForeignError(v.value0);
    }
    ;
    if (v instanceof TimeoutError) {
      return "There was a problem making the request: timeout";
    }
    ;
    if (v instanceof RequestFailedError) {
      return "There was a problem making the request: request failed";
    }
    ;
    if (v instanceof XHROtherError) {
      return "There was a problem making the request: " + message(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Affjax (line 113, column 14 - line 123, column 66): " + [v.constructor.name]);
  };
  var defaultRequest = /* @__PURE__ */ function() {
    return {
      method: new Left(GET.value),
      url: "/",
      headers: [],
      content: Nothing.value,
      username: Nothing.value,
      password: Nothing.value,
      withCredentials: false,
      responseFormat: ignore,
      timeout: Nothing.value
    };
  }();
  var get = function(driver2) {
    return function(rf) {
      return function(u) {
        return request(driver2)({
          method: defaultRequest.method,
          headers: defaultRequest.headers,
          content: defaultRequest.content,
          username: defaultRequest.username,
          password: defaultRequest.password,
          withCredentials: defaultRequest.withCredentials,
          timeout: defaultRequest.timeout,
          url: u,
          responseFormat: rf
        });
      };
    };
  };
  var post = function(driver2) {
    return function(rf) {
      return function(u) {
        return function(c) {
          return request(driver2)({
            headers: defaultRequest.headers,
            username: defaultRequest.username,
            password: defaultRequest.password,
            withCredentials: defaultRequest.withCredentials,
            timeout: defaultRequest.timeout,
            method: new Left(POST.value),
            url: u,
            content: c,
            responseFormat: rf
          });
        };
      };
    };
  };

  // output/Affjax.Web/foreign.js
  var driver = {
    newXHR: function() {
      return new XMLHttpRequest();
    },
    fixupUrl: function(url2) {
      return url2 || "/";
    }
  };

  // output/Affjax.Web/index.js
  var post2 = /* @__PURE__ */ post(driver);
  var get2 = /* @__PURE__ */ get(driver);

  // output/Data.Date/foreign.js
  var createDate = function(y, m, d) {
    var date2 = new Date(Date.UTC(y, m, d));
    if (y >= 0 && y < 100) {
      date2.setUTCFullYear(y);
    }
    return date2;
  };
  function canonicalDateImpl(ctor, y, m, d) {
    var date2 = createDate(y, m - 1, d);
    return ctor(date2.getUTCFullYear())(date2.getUTCMonth() + 1)(date2.getUTCDate());
  }
  function calcWeekday(y, m, d) {
    return createDate(y, m - 1, d).getUTCDay();
  }

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }

  // output/Data.Enum/index.js
  var bottom1 = /* @__PURE__ */ bottom(boundedChar);
  var top1 = /* @__PURE__ */ top(boundedChar);
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var succ = function(dict) {
    return dict.succ;
  };
  var pred = function(dict) {
    return dict.pred;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var toEnumWithDefaults = function(dictBoundedEnum) {
    var toEnum15 = toEnum(dictBoundedEnum);
    var fromEnum15 = fromEnum(dictBoundedEnum);
    var bottom22 = bottom(dictBoundedEnum.Bounded0());
    return function(low2) {
      return function(high2) {
        return function(x) {
          var v = toEnum15(x);
          if (v instanceof Just) {
            return v.value0;
          }
          ;
          if (v instanceof Nothing) {
            var $140 = x < fromEnum15(bottom22);
            if ($140) {
              return low2;
            }
            ;
            return high2;
          }
          ;
          throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
        };
      };
    };
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a) {
        return toEnum$prime(fromEnum$prime(a) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a) {
        return toEnum$prime(fromEnum$prime(a) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v) {
    if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
      return new Just(fromCharCode(v));
    }
    ;
    return Nothing.value;
  };
  var enumChar = {
    succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
    pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
    Ord0: function() {
      return ordChar;
    }
  };
  var boundedEnumChar = /* @__PURE__ */ function() {
    return {
      cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
      toEnum: charToEnum,
      fromEnum: toCharCode,
      Bounded0: function() {
        return boundedChar;
      },
      Enum1: function() {
        return enumChar;
      }
    };
  }();

  // output/Data.Date.Component/index.js
  var $runtime_lazy4 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var Monday = /* @__PURE__ */ function() {
    function Monday2() {
    }
    ;
    Monday2.value = new Monday2();
    return Monday2;
  }();
  var Tuesday = /* @__PURE__ */ function() {
    function Tuesday2() {
    }
    ;
    Tuesday2.value = new Tuesday2();
    return Tuesday2;
  }();
  var Wednesday = /* @__PURE__ */ function() {
    function Wednesday2() {
    }
    ;
    Wednesday2.value = new Wednesday2();
    return Wednesday2;
  }();
  var Thursday = /* @__PURE__ */ function() {
    function Thursday2() {
    }
    ;
    Thursday2.value = new Thursday2();
    return Thursday2;
  }();
  var Friday = /* @__PURE__ */ function() {
    function Friday2() {
    }
    ;
    Friday2.value = new Friday2();
    return Friday2;
  }();
  var Saturday = /* @__PURE__ */ function() {
    function Saturday2() {
    }
    ;
    Saturday2.value = new Saturday2();
    return Saturday2;
  }();
  var Sunday = /* @__PURE__ */ function() {
    function Sunday2() {
    }
    ;
    Sunday2.value = new Sunday2();
    return Sunday2;
  }();
  var January = /* @__PURE__ */ function() {
    function January2() {
    }
    ;
    January2.value = new January2();
    return January2;
  }();
  var February = /* @__PURE__ */ function() {
    function February2() {
    }
    ;
    February2.value = new February2();
    return February2;
  }();
  var March = /* @__PURE__ */ function() {
    function March2() {
    }
    ;
    March2.value = new March2();
    return March2;
  }();
  var April = /* @__PURE__ */ function() {
    function April2() {
    }
    ;
    April2.value = new April2();
    return April2;
  }();
  var May = /* @__PURE__ */ function() {
    function May2() {
    }
    ;
    May2.value = new May2();
    return May2;
  }();
  var June = /* @__PURE__ */ function() {
    function June2() {
    }
    ;
    June2.value = new June2();
    return June2;
  }();
  var July = /* @__PURE__ */ function() {
    function July2() {
    }
    ;
    July2.value = new July2();
    return July2;
  }();
  var August = /* @__PURE__ */ function() {
    function August2() {
    }
    ;
    August2.value = new August2();
    return August2;
  }();
  var September = /* @__PURE__ */ function() {
    function September2() {
    }
    ;
    September2.value = new September2();
    return September2;
  }();
  var October = /* @__PURE__ */ function() {
    function October2() {
    }
    ;
    October2.value = new October2();
    return October2;
  }();
  var November = /* @__PURE__ */ function() {
    function November2() {
    }
    ;
    November2.value = new November2();
    return November2;
  }();
  var December = /* @__PURE__ */ function() {
    function December2() {
    }
    ;
    December2.value = new December2();
    return December2;
  }();
  var showWeekday = {
    show: function(v) {
      if (v instanceof Monday) {
        return "Monday";
      }
      ;
      if (v instanceof Tuesday) {
        return "Tuesday";
      }
      ;
      if (v instanceof Wednesday) {
        return "Wednesday";
      }
      ;
      if (v instanceof Thursday) {
        return "Thursday";
      }
      ;
      if (v instanceof Friday) {
        return "Friday";
      }
      ;
      if (v instanceof Saturday) {
        return "Saturday";
      }
      ;
      if (v instanceof Sunday) {
        return "Sunday";
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 184, column 1 - line 191, column 25): " + [v.constructor.name]);
    }
  };
  var showMonth = {
    show: function(v) {
      if (v instanceof January) {
        return "January";
      }
      ;
      if (v instanceof February) {
        return "February";
      }
      ;
      if (v instanceof March) {
        return "March";
      }
      ;
      if (v instanceof April) {
        return "April";
      }
      ;
      if (v instanceof May) {
        return "May";
      }
      ;
      if (v instanceof June) {
        return "June";
      }
      ;
      if (v instanceof July) {
        return "July";
      }
      ;
      if (v instanceof August) {
        return "August";
      }
      ;
      if (v instanceof September) {
        return "September";
      }
      ;
      if (v instanceof October) {
        return "October";
      }
      ;
      if (v instanceof November) {
        return "November";
      }
      ;
      if (v instanceof December) {
        return "December";
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 101, column 1 - line 113, column 29): " + [v.constructor.name]);
    }
  };
  var ordYear = ordInt;
  var ordDay = ordInt;
  var eqYear = eqInt;
  var eqWeekday = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Monday && y instanceof Monday) {
          return true;
        }
        ;
        if (x instanceof Tuesday && y instanceof Tuesday) {
          return true;
        }
        ;
        if (x instanceof Wednesday && y instanceof Wednesday) {
          return true;
        }
        ;
        if (x instanceof Thursday && y instanceof Thursday) {
          return true;
        }
        ;
        if (x instanceof Friday && y instanceof Friday) {
          return true;
        }
        ;
        if (x instanceof Saturday && y instanceof Saturday) {
          return true;
        }
        ;
        if (x instanceof Sunday && y instanceof Sunday) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var ordWeekday = {
    compare: function(x) {
      return function(y) {
        if (x instanceof Monday && y instanceof Monday) {
          return EQ.value;
        }
        ;
        if (x instanceof Monday) {
          return LT.value;
        }
        ;
        if (y instanceof Monday) {
          return GT.value;
        }
        ;
        if (x instanceof Tuesday && y instanceof Tuesday) {
          return EQ.value;
        }
        ;
        if (x instanceof Tuesday) {
          return LT.value;
        }
        ;
        if (y instanceof Tuesday) {
          return GT.value;
        }
        ;
        if (x instanceof Wednesday && y instanceof Wednesday) {
          return EQ.value;
        }
        ;
        if (x instanceof Wednesday) {
          return LT.value;
        }
        ;
        if (y instanceof Wednesday) {
          return GT.value;
        }
        ;
        if (x instanceof Thursday && y instanceof Thursday) {
          return EQ.value;
        }
        ;
        if (x instanceof Thursday) {
          return LT.value;
        }
        ;
        if (y instanceof Thursday) {
          return GT.value;
        }
        ;
        if (x instanceof Friday && y instanceof Friday) {
          return EQ.value;
        }
        ;
        if (x instanceof Friday) {
          return LT.value;
        }
        ;
        if (y instanceof Friday) {
          return GT.value;
        }
        ;
        if (x instanceof Saturday && y instanceof Saturday) {
          return EQ.value;
        }
        ;
        if (x instanceof Saturday) {
          return LT.value;
        }
        ;
        if (y instanceof Saturday) {
          return GT.value;
        }
        ;
        if (x instanceof Sunday && y instanceof Sunday) {
          return EQ.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Date.Component (line 0, column 0 - line 0, column 0): " + [x.constructor.name, y.constructor.name]);
      };
    },
    Eq0: function() {
      return eqWeekday;
    }
  };
  var eqMonth = {
    eq: function(x) {
      return function(y) {
        if (x instanceof January && y instanceof January) {
          return true;
        }
        ;
        if (x instanceof February && y instanceof February) {
          return true;
        }
        ;
        if (x instanceof March && y instanceof March) {
          return true;
        }
        ;
        if (x instanceof April && y instanceof April) {
          return true;
        }
        ;
        if (x instanceof May && y instanceof May) {
          return true;
        }
        ;
        if (x instanceof June && y instanceof June) {
          return true;
        }
        ;
        if (x instanceof July && y instanceof July) {
          return true;
        }
        ;
        if (x instanceof August && y instanceof August) {
          return true;
        }
        ;
        if (x instanceof September && y instanceof September) {
          return true;
        }
        ;
        if (x instanceof October && y instanceof October) {
          return true;
        }
        ;
        if (x instanceof November && y instanceof November) {
          return true;
        }
        ;
        if (x instanceof December && y instanceof December) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var ordMonth = {
    compare: function(x) {
      return function(y) {
        if (x instanceof January && y instanceof January) {
          return EQ.value;
        }
        ;
        if (x instanceof January) {
          return LT.value;
        }
        ;
        if (y instanceof January) {
          return GT.value;
        }
        ;
        if (x instanceof February && y instanceof February) {
          return EQ.value;
        }
        ;
        if (x instanceof February) {
          return LT.value;
        }
        ;
        if (y instanceof February) {
          return GT.value;
        }
        ;
        if (x instanceof March && y instanceof March) {
          return EQ.value;
        }
        ;
        if (x instanceof March) {
          return LT.value;
        }
        ;
        if (y instanceof March) {
          return GT.value;
        }
        ;
        if (x instanceof April && y instanceof April) {
          return EQ.value;
        }
        ;
        if (x instanceof April) {
          return LT.value;
        }
        ;
        if (y instanceof April) {
          return GT.value;
        }
        ;
        if (x instanceof May && y instanceof May) {
          return EQ.value;
        }
        ;
        if (x instanceof May) {
          return LT.value;
        }
        ;
        if (y instanceof May) {
          return GT.value;
        }
        ;
        if (x instanceof June && y instanceof June) {
          return EQ.value;
        }
        ;
        if (x instanceof June) {
          return LT.value;
        }
        ;
        if (y instanceof June) {
          return GT.value;
        }
        ;
        if (x instanceof July && y instanceof July) {
          return EQ.value;
        }
        ;
        if (x instanceof July) {
          return LT.value;
        }
        ;
        if (y instanceof July) {
          return GT.value;
        }
        ;
        if (x instanceof August && y instanceof August) {
          return EQ.value;
        }
        ;
        if (x instanceof August) {
          return LT.value;
        }
        ;
        if (y instanceof August) {
          return GT.value;
        }
        ;
        if (x instanceof September && y instanceof September) {
          return EQ.value;
        }
        ;
        if (x instanceof September) {
          return LT.value;
        }
        ;
        if (y instanceof September) {
          return GT.value;
        }
        ;
        if (x instanceof October && y instanceof October) {
          return EQ.value;
        }
        ;
        if (x instanceof October) {
          return LT.value;
        }
        ;
        if (y instanceof October) {
          return GT.value;
        }
        ;
        if (x instanceof November && y instanceof November) {
          return EQ.value;
        }
        ;
        if (x instanceof November) {
          return LT.value;
        }
        ;
        if (y instanceof November) {
          return GT.value;
        }
        ;
        if (x instanceof December && y instanceof December) {
          return EQ.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Date.Component (line 0, column 0 - line 0, column 0): " + [x.constructor.name, y.constructor.name]);
      };
    },
    Eq0: function() {
      return eqMonth;
    }
  };
  var eqDay = eqInt;
  var boundedYear = /* @__PURE__ */ function() {
    return {
      bottom: -271820 | 0,
      top: 275759,
      Ord0: function() {
        return ordYear;
      }
    };
  }();
  var boundedWeekday = /* @__PURE__ */ function() {
    return {
      bottom: Monday.value,
      top: Sunday.value,
      Ord0: function() {
        return ordWeekday;
      }
    };
  }();
  var boundedMonth = /* @__PURE__ */ function() {
    return {
      bottom: January.value,
      top: December.value,
      Ord0: function() {
        return ordMonth;
      }
    };
  }();
  var boundedEnumYear = {
    cardinality: 547580,
    toEnum: function(n) {
      if (n >= (-271820 | 0) && n <= 275759) {
        return new Just(n);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 35, column 1 - line 40, column 24): " + [n.constructor.name]);
    },
    fromEnum: function(v) {
      return v;
    },
    Bounded0: function() {
      return boundedYear;
    },
    Enum1: function() {
      return $lazy_enumYear(0);
    }
  };
  var $lazy_enumYear = /* @__PURE__ */ $runtime_lazy4("enumYear", "Data.Date.Component", function() {
    return {
      succ: function() {
        var $55 = toEnum(boundedEnumYear);
        var $56 = fromEnum(boundedEnumYear);
        return function($57) {
          return $55(function(v) {
            return v + 1 | 0;
          }($56($57)));
        };
      }(),
      pred: function() {
        var $58 = toEnum(boundedEnumYear);
        var $59 = fromEnum(boundedEnumYear);
        return function($60) {
          return $58(function(v) {
            return v - 1 | 0;
          }($59($60)));
        };
      }(),
      Ord0: function() {
        return ordYear;
      }
    };
  });
  var enumYear = /* @__PURE__ */ $lazy_enumYear(31);
  var boundedEnumWeekday = {
    cardinality: 7,
    toEnum: function(v) {
      if (v === 1) {
        return new Just(Monday.value);
      }
      ;
      if (v === 2) {
        return new Just(Tuesday.value);
      }
      ;
      if (v === 3) {
        return new Just(Wednesday.value);
      }
      ;
      if (v === 4) {
        return new Just(Thursday.value);
      }
      ;
      if (v === 5) {
        return new Just(Friday.value);
      }
      ;
      if (v === 6) {
        return new Just(Saturday.value);
      }
      ;
      if (v === 7) {
        return new Just(Sunday.value);
      }
      ;
      return Nothing.value;
    },
    fromEnum: function(v) {
      if (v instanceof Monday) {
        return 1;
      }
      ;
      if (v instanceof Tuesday) {
        return 2;
      }
      ;
      if (v instanceof Wednesday) {
        return 3;
      }
      ;
      if (v instanceof Thursday) {
        return 4;
      }
      ;
      if (v instanceof Friday) {
        return 5;
      }
      ;
      if (v instanceof Saturday) {
        return 6;
      }
      ;
      if (v instanceof Sunday) {
        return 7;
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 175, column 14 - line 182, column 16): " + [v.constructor.name]);
    },
    Bounded0: function() {
      return boundedWeekday;
    },
    Enum1: function() {
      return $lazy_enumWeekday(0);
    }
  };
  var $lazy_enumWeekday = /* @__PURE__ */ $runtime_lazy4("enumWeekday", "Data.Date.Component", function() {
    return {
      succ: function() {
        var $61 = toEnum(boundedEnumWeekday);
        var $62 = fromEnum(boundedEnumWeekday);
        return function($63) {
          return $61(function(v) {
            return v + 1 | 0;
          }($62($63)));
        };
      }(),
      pred: function() {
        var $64 = toEnum(boundedEnumWeekday);
        var $65 = fromEnum(boundedEnumWeekday);
        return function($66) {
          return $64(function(v) {
            return v - 1 | 0;
          }($65($66)));
        };
      }(),
      Ord0: function() {
        return ordWeekday;
      }
    };
  });
  var boundedEnumMonth = {
    cardinality: 12,
    toEnum: function(v) {
      if (v === 1) {
        return new Just(January.value);
      }
      ;
      if (v === 2) {
        return new Just(February.value);
      }
      ;
      if (v === 3) {
        return new Just(March.value);
      }
      ;
      if (v === 4) {
        return new Just(April.value);
      }
      ;
      if (v === 5) {
        return new Just(May.value);
      }
      ;
      if (v === 6) {
        return new Just(June.value);
      }
      ;
      if (v === 7) {
        return new Just(July.value);
      }
      ;
      if (v === 8) {
        return new Just(August.value);
      }
      ;
      if (v === 9) {
        return new Just(September.value);
      }
      ;
      if (v === 10) {
        return new Just(October.value);
      }
      ;
      if (v === 11) {
        return new Just(November.value);
      }
      ;
      if (v === 12) {
        return new Just(December.value);
      }
      ;
      return Nothing.value;
    },
    fromEnum: function(v) {
      if (v instanceof January) {
        return 1;
      }
      ;
      if (v instanceof February) {
        return 2;
      }
      ;
      if (v instanceof March) {
        return 3;
      }
      ;
      if (v instanceof April) {
        return 4;
      }
      ;
      if (v instanceof May) {
        return 5;
      }
      ;
      if (v instanceof June) {
        return 6;
      }
      ;
      if (v instanceof July) {
        return 7;
      }
      ;
      if (v instanceof August) {
        return 8;
      }
      ;
      if (v instanceof September) {
        return 9;
      }
      ;
      if (v instanceof October) {
        return 10;
      }
      ;
      if (v instanceof November) {
        return 11;
      }
      ;
      if (v instanceof December) {
        return 12;
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 87, column 14 - line 99, column 19): " + [v.constructor.name]);
    },
    Bounded0: function() {
      return boundedMonth;
    },
    Enum1: function() {
      return $lazy_enumMonth(0);
    }
  };
  var $lazy_enumMonth = /* @__PURE__ */ $runtime_lazy4("enumMonth", "Data.Date.Component", function() {
    return {
      succ: function() {
        var $67 = toEnum(boundedEnumMonth);
        var $68 = fromEnum(boundedEnumMonth);
        return function($69) {
          return $67(function(v) {
            return v + 1 | 0;
          }($68($69)));
        };
      }(),
      pred: function() {
        var $70 = toEnum(boundedEnumMonth);
        var $71 = fromEnum(boundedEnumMonth);
        return function($72) {
          return $70(function(v) {
            return v - 1 | 0;
          }($71($72)));
        };
      }(),
      Ord0: function() {
        return ordMonth;
      }
    };
  });
  var enumMonth = /* @__PURE__ */ $lazy_enumMonth(67);
  var boundedDay = {
    bottom: 1,
    top: 31,
    Ord0: function() {
      return ordDay;
    }
  };
  var boundedEnumDay = {
    cardinality: 31,
    toEnum: function(n) {
      if (n >= 1 && n <= 31) {
        return new Just(n);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 133, column 1 - line 138, column 23): " + [n.constructor.name]);
    },
    fromEnum: function(v) {
      return v;
    },
    Bounded0: function() {
      return boundedDay;
    },
    Enum1: function() {
      return $lazy_enumDay(0);
    }
  };
  var $lazy_enumDay = /* @__PURE__ */ $runtime_lazy4("enumDay", "Data.Date.Component", function() {
    return {
      succ: function() {
        var $73 = toEnum(boundedEnumDay);
        var $74 = fromEnum(boundedEnumDay);
        return function($75) {
          return $73(function(v) {
            return v + 1 | 0;
          }($74($75)));
        };
      }(),
      pred: function() {
        var $76 = toEnum(boundedEnumDay);
        var $77 = fromEnum(boundedEnumDay);
        return function($78) {
          return $76(function(v) {
            return v - 1 | 0;
          }($77($78)));
        };
      }(),
      Ord0: function() {
        return ordDay;
      }
    };
  });
  var enumDay = /* @__PURE__ */ $lazy_enumDay(129);

  // output/Data.Date/index.js
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
  var fromJust4 = /* @__PURE__ */ fromJust();
  var toEnum2 = /* @__PURE__ */ toEnum(boundedEnumWeekday);
  var fromEnum1 = /* @__PURE__ */ fromEnum(boundedEnumYear);
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var toEnum1 = /* @__PURE__ */ toEnum(boundedEnumDay);
  var eq12 = /* @__PURE__ */ eq(eqYear);
  var eq22 = /* @__PURE__ */ eq(eqMonth);
  var eq32 = /* @__PURE__ */ eq(eqDay);
  var compare2 = /* @__PURE__ */ compare(ordYear);
  var compare12 = /* @__PURE__ */ compare(ordMonth);
  var compare22 = /* @__PURE__ */ compare(ordDay);
  var succ2 = /* @__PURE__ */ succ(enumMonth);
  var succ1 = /* @__PURE__ */ succ(enumDay);
  var greaterThan2 = /* @__PURE__ */ greaterThan(/* @__PURE__ */ ordMaybe(ordDay));
  var succ22 = /* @__PURE__ */ succ(enumYear);
  var apply3 = /* @__PURE__ */ apply(applyMaybe);
  var map6 = /* @__PURE__ */ map(functorMaybe);
  var pure4 = /* @__PURE__ */ pure(applicativeMaybe);
  var pred2 = /* @__PURE__ */ pred(enumMonth);
  var pred1 = /* @__PURE__ */ pred(enumDay);
  var pred22 = /* @__PURE__ */ pred(enumYear);
  var toEnum22 = /* @__PURE__ */ toEnum(boundedEnumMonth);
  var fromEnum22 = /* @__PURE__ */ fromEnum(boundedEnumDay);
  var bindFlipped5 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var bind2 = /* @__PURE__ */ bind(bindMaybe);
  var $$Date = /* @__PURE__ */ function() {
    function $$Date2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    $$Date2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new $$Date2(value0, value1, value22);
        };
      };
    };
    return $$Date2;
  }();
  var year = function(v) {
    return v.value0;
  };
  var weekday = function(v) {
    var n = calcWeekday(v.value0, fromEnum2(v.value1), v.value2);
    var $86 = n === 0;
    if ($86) {
      return fromJust4(toEnum2(7));
    }
    ;
    return fromJust4(toEnum2(n));
  };
  var month = function(v) {
    return v.value1;
  };
  var isLeapYear = function(y) {
    var y$prime = fromEnum1(y);
    return mod2(y$prime)(4) === 0 && (mod2(y$prime)(400) === 0 || !(mod2(y$prime)(100) === 0));
  };
  var lastDayOfMonth = function(y) {
    return function(m) {
      var unsafeDay = function($154) {
        return fromJust4(toEnum1($154));
      };
      if (m instanceof January) {
        return unsafeDay(31);
      }
      ;
      if (m instanceof February) {
        if (isLeapYear(y)) {
          return unsafeDay(29);
        }
        ;
        if (otherwise) {
          return unsafeDay(28);
        }
        ;
      }
      ;
      if (m instanceof March) {
        return unsafeDay(31);
      }
      ;
      if (m instanceof April) {
        return unsafeDay(30);
      }
      ;
      if (m instanceof May) {
        return unsafeDay(31);
      }
      ;
      if (m instanceof June) {
        return unsafeDay(30);
      }
      ;
      if (m instanceof July) {
        return unsafeDay(31);
      }
      ;
      if (m instanceof August) {
        return unsafeDay(31);
      }
      ;
      if (m instanceof September) {
        return unsafeDay(30);
      }
      ;
      if (m instanceof October) {
        return unsafeDay(31);
      }
      ;
      if (m instanceof November) {
        return unsafeDay(30);
      }
      ;
      if (m instanceof December) {
        return unsafeDay(31);
      }
      ;
      throw new Error("Failed pattern match at Data.Date (line 127, column 22 - line 141, column 27): " + [m.constructor.name]);
    };
  };
  var eqDate = {
    eq: function(x) {
      return function(y) {
        return eq12(x.value0)(y.value0) && eq22(x.value1)(y.value1) && eq32(x.value2)(y.value2);
      };
    }
  };
  var eq4 = /* @__PURE__ */ eq(eqDate);
  var ordDate = {
    compare: function(x) {
      return function(y) {
        var v = compare2(x.value0)(y.value0);
        if (v instanceof LT) {
          return LT.value;
        }
        ;
        if (v instanceof GT) {
          return GT.value;
        }
        ;
        var v1 = compare12(x.value1)(y.value1);
        if (v1 instanceof LT) {
          return LT.value;
        }
        ;
        if (v1 instanceof GT) {
          return GT.value;
        }
        ;
        return compare22(x.value2)(y.value2);
      };
    },
    Eq0: function() {
      return eqDate;
    }
  };
  var enumDate = {
    succ: function(v) {
      var sm = succ2(v.value1);
      var l = lastDayOfMonth(v.value0)(v.value1);
      var sd = function() {
        var v1 = succ1(v.value2);
        var $118 = greaterThan2(v1)(new Just(l));
        if ($118) {
          return Nothing.value;
        }
        ;
        return v1;
      }();
      var m$prime = function() {
        var $119 = isNothing(sd);
        if ($119) {
          return fromMaybe(January.value)(sm);
        }
        ;
        return v.value1;
      }();
      var y$prime = function() {
        var $120 = isNothing(sd) && isNothing(sm);
        if ($120) {
          return succ22(v.value0);
        }
        ;
        return new Just(v.value0);
      }();
      var d$prime = function() {
        var $121 = isNothing(sd);
        if ($121) {
          return toEnum1(1);
        }
        ;
        return sd;
      }();
      return apply3(apply3(map6($$Date.create)(y$prime))(pure4(m$prime)))(d$prime);
    },
    pred: function(v) {
      var pm = pred2(v.value1);
      var pd = pred1(v.value2);
      var y$prime = function() {
        var $126 = isNothing(pd) && isNothing(pm);
        if ($126) {
          return pred22(v.value0);
        }
        ;
        return new Just(v.value0);
      }();
      var m$prime = function() {
        var $127 = isNothing(pd);
        if ($127) {
          return fromMaybe(December.value)(pm);
        }
        ;
        return v.value1;
      }();
      var l = lastDayOfMonth(v.value0)(m$prime);
      var d$prime = function() {
        var $128 = isNothing(pd);
        if ($128) {
          return new Just(l);
        }
        ;
        return pd;
      }();
      return apply3(apply3(map6($$Date.create)(y$prime))(pure4(m$prime)))(d$prime);
    },
    Ord0: function() {
      return ordDate;
    }
  };
  var pred3 = /* @__PURE__ */ pred(enumDate);
  var succ3 = /* @__PURE__ */ succ(enumDate);
  var day = function(v) {
    return v.value2;
  };
  var canonicalDate = function(y) {
    return function(m) {
      return function(d) {
        var mkDate = function(y$prime) {
          return function(m$prime) {
            return function(d$prime) {
              return new $$Date(y$prime, fromJust4(toEnum22(m$prime)), d$prime);
            };
          };
        };
        return canonicalDateImpl(mkDate, y, fromEnum2(m), d);
      };
    };
  };
  var exactDate = function(y) {
    return function(m) {
      return function(d) {
        var dt = new $$Date(y, m, d);
        var $144 = eq4(canonicalDate(y)(m)(d))(dt);
        if ($144) {
          return new Just(dt);
        }
        ;
        return Nothing.value;
      };
    };
  };
  var adjust = function(v) {
    return function(date2) {
      var adj = function(v1) {
        return function(v2) {
          if (v1 === 0) {
            return new Just(v2);
          }
          ;
          var j = v1 + fromEnum22(v2.value2) | 0;
          var low2 = j < 1;
          var l = lastDayOfMonth(v2.value0)(function() {
            if (low2) {
              return fromMaybe(December.value)(pred2(v2.value1));
            }
            ;
            return v2.value1;
          }());
          var hi = j > fromEnum22(l);
          var i$prime = function() {
            if (low2) {
              return j;
            }
            ;
            if (hi) {
              return (j - fromEnum22(l) | 0) - 1 | 0;
            }
            ;
            if (otherwise) {
              return 0;
            }
            ;
            throw new Error("Failed pattern match at Data.Date (line 101, column 9 - line 103, column 28): ");
          }();
          var dt$prime = function() {
            if (low2) {
              return bindFlipped5(pred3)(map6($$Date.create(v2.value0)(v2.value1))(toEnum1(1)));
            }
            ;
            if (hi) {
              return succ3(new $$Date(v2.value0, v2.value1, l));
            }
            ;
            if (otherwise) {
              return map6($$Date.create(v2.value0)(v2.value1))(toEnum1(j));
            }
            ;
            throw new Error("Failed pattern match at Data.Date (line 104, column 9 - line 106, column 48): ");
          }();
          return bindFlipped5(adj(i$prime))(dt$prime);
        };
      };
      return bind2(fromNumber(v))(flip(adj)(date2));
    };
  };

  // output/Data.DateTime/foreign.js
  var createUTC = function(y, mo, d, h, m, s, ms) {
    var date2 = new Date(Date.UTC(y, mo, d, h, m, s, ms));
    if (y >= 0 && y < 100) {
      date2.setUTCFullYear(y);
    }
    return date2.getTime();
  };
  function adjustImpl(just) {
    return function(nothing) {
      return function(offset) {
        return function(rec) {
          var msUTC = createUTC(rec.year, rec.month - 1, rec.day, rec.hour, rec.minute, rec.second, rec.millisecond);
          var dt = new Date(msUTC + offset);
          return isNaN(dt.getTime()) ? nothing : just({
            year: dt.getUTCFullYear(),
            month: dt.getUTCMonth() + 1,
            day: dt.getUTCDate(),
            hour: dt.getUTCHours(),
            minute: dt.getUTCMinutes(),
            second: dt.getUTCSeconds(),
            millisecond: dt.getUTCMilliseconds()
          });
        };
      };
    };
  }

  // output/Data.Time.Component/index.js
  var $runtime_lazy5 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var ordSecond = ordInt;
  var ordMinute = ordInt;
  var ordMillisecond = ordInt;
  var ordHour = ordInt;
  var eqHour = eqInt;
  var boundedSecond = {
    bottom: 0,
    top: 59,
    Ord0: function() {
      return ordSecond;
    }
  };
  var boundedMinute = {
    bottom: 0,
    top: 59,
    Ord0: function() {
      return ordMinute;
    }
  };
  var boundedMillisecond = {
    bottom: 0,
    top: 999,
    Ord0: function() {
      return ordMillisecond;
    }
  };
  var boundedHour = {
    bottom: 0,
    top: 23,
    Ord0: function() {
      return ordHour;
    }
  };
  var boundedEnumSecond = {
    cardinality: 60,
    toEnum: function(n) {
      if (n >= 0 && n <= 59) {
        return new Just(n);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Time.Component (line 90, column 1 - line 95, column 26): " + [n.constructor.name]);
    },
    fromEnum: function(v) {
      return v;
    },
    Bounded0: function() {
      return boundedSecond;
    },
    Enum1: function() {
      return $lazy_enumSecond(0);
    }
  };
  var $lazy_enumSecond = /* @__PURE__ */ $runtime_lazy5("enumSecond", "Data.Time.Component", function() {
    return {
      succ: function() {
        var $36 = toEnum(boundedEnumSecond);
        var $37 = fromEnum(boundedEnumSecond);
        return function($38) {
          return $36(function(v) {
            return v + 1 | 0;
          }($37($38)));
        };
      }(),
      pred: function() {
        var $39 = toEnum(boundedEnumSecond);
        var $40 = fromEnum(boundedEnumSecond);
        return function($41) {
          return $39(function(v) {
            return v - 1 | 0;
          }($40($41)));
        };
      }(),
      Ord0: function() {
        return ordSecond;
      }
    };
  });
  var boundedEnumMinute = {
    cardinality: 60,
    toEnum: function(n) {
      if (n >= 0 && n <= 59) {
        return new Just(n);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Time.Component (line 61, column 1 - line 66, column 26): " + [n.constructor.name]);
    },
    fromEnum: function(v) {
      return v;
    },
    Bounded0: function() {
      return boundedMinute;
    },
    Enum1: function() {
      return $lazy_enumMinute(0);
    }
  };
  var $lazy_enumMinute = /* @__PURE__ */ $runtime_lazy5("enumMinute", "Data.Time.Component", function() {
    return {
      succ: function() {
        var $42 = toEnum(boundedEnumMinute);
        var $43 = fromEnum(boundedEnumMinute);
        return function($44) {
          return $42(function(v) {
            return v + 1 | 0;
          }($43($44)));
        };
      }(),
      pred: function() {
        var $45 = toEnum(boundedEnumMinute);
        var $46 = fromEnum(boundedEnumMinute);
        return function($47) {
          return $45(function(v) {
            return v - 1 | 0;
          }($46($47)));
        };
      }(),
      Ord0: function() {
        return ordMinute;
      }
    };
  });
  var boundedEnumMillisecond = {
    cardinality: 1e3,
    toEnum: function(n) {
      if (n >= 0 && n <= 999) {
        return new Just(n);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Time.Component (line 120, column 1 - line 125, column 31): " + [n.constructor.name]);
    },
    fromEnum: function(v) {
      return v;
    },
    Bounded0: function() {
      return boundedMillisecond;
    },
    Enum1: function() {
      return $lazy_enumMillisecond(0);
    }
  };
  var $lazy_enumMillisecond = /* @__PURE__ */ $runtime_lazy5("enumMillisecond", "Data.Time.Component", function() {
    return {
      succ: function() {
        var $48 = toEnum(boundedEnumMillisecond);
        var $49 = fromEnum(boundedEnumMillisecond);
        return function($50) {
          return $48(function(v) {
            return v + 1 | 0;
          }($49($50)));
        };
      }(),
      pred: function() {
        var $51 = toEnum(boundedEnumMillisecond);
        var $52 = fromEnum(boundedEnumMillisecond);
        return function($53) {
          return $51(function(v) {
            return v - 1 | 0;
          }($52($53)));
        };
      }(),
      Ord0: function() {
        return ordMillisecond;
      }
    };
  });
  var boundedEnumHour = {
    cardinality: 24,
    toEnum: function(n) {
      if (n >= 0 && n <= 23) {
        return new Just(n);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Time.Component (line 32, column 1 - line 37, column 24): " + [n.constructor.name]);
    },
    fromEnum: function(v) {
      return v;
    },
    Bounded0: function() {
      return boundedHour;
    },
    Enum1: function() {
      return $lazy_enumHour(0);
    }
  };
  var $lazy_enumHour = /* @__PURE__ */ $runtime_lazy5("enumHour", "Data.Time.Component", function() {
    return {
      succ: function() {
        var $54 = toEnum(boundedEnumHour);
        var $55 = fromEnum(boundedEnumHour);
        return function($56) {
          return $54(function(v) {
            return v + 1 | 0;
          }($55($56)));
        };
      }(),
      pred: function() {
        var $57 = toEnum(boundedEnumHour);
        var $58 = fromEnum(boundedEnumHour);
        return function($59) {
          return $57(function(v) {
            return v - 1 | 0;
          }($58($59)));
        };
      }(),
      Ord0: function() {
        return ordHour;
      }
    };
  });

  // output/Data.Time/index.js
  var Time = /* @__PURE__ */ function() {
    function Time2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Time2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Time2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Time2;
  }();
  var second = function(v) {
    return v.value2;
  };
  var minute = function(v) {
    return v.value1;
  };
  var millisecond = function(v) {
    return v.value3;
  };
  var hour = function(v) {
    return v.value0;
  };

  // output/Data.DateTime/index.js
  var fromEnum3 = /* @__PURE__ */ fromEnum(boundedEnumYear);
  var fromEnum12 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
  var fromEnum23 = /* @__PURE__ */ fromEnum(boundedEnumDay);
  var fromEnum32 = /* @__PURE__ */ fromEnum(boundedEnumHour);
  var fromEnum4 = /* @__PURE__ */ fromEnum(boundedEnumMinute);
  var fromEnum5 = /* @__PURE__ */ fromEnum(boundedEnumSecond);
  var fromEnum6 = /* @__PURE__ */ fromEnum(boundedEnumMillisecond);
  var bind3 = /* @__PURE__ */ bind(bindMaybe);
  var apply4 = /* @__PURE__ */ apply(applyMaybe);
  var map7 = /* @__PURE__ */ map(functorMaybe);
  var join2 = /* @__PURE__ */ join(bindMaybe);
  var toEnum3 = /* @__PURE__ */ toEnum(boundedEnumYear);
  var toEnum12 = /* @__PURE__ */ toEnum(boundedEnumMonth);
  var toEnum23 = /* @__PURE__ */ toEnum(boundedEnumDay);
  var toEnum32 = /* @__PURE__ */ toEnum(boundedEnumHour);
  var toEnum4 = /* @__PURE__ */ toEnum(boundedEnumMinute);
  var toEnum5 = /* @__PURE__ */ toEnum(boundedEnumSecond);
  var toEnum6 = /* @__PURE__ */ toEnum(boundedEnumMillisecond);
  var DateTime = /* @__PURE__ */ function() {
    function DateTime2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    DateTime2.create = function(value0) {
      return function(value1) {
        return new DateTime2(value0, value1);
      };
    };
    return DateTime2;
  }();
  var toRecord = function(v) {
    return {
      year: fromEnum3(year(v.value0)),
      month: fromEnum12(month(v.value0)),
      day: fromEnum23(day(v.value0)),
      hour: fromEnum32(hour(v.value1)),
      minute: fromEnum4(minute(v.value1)),
      second: fromEnum5(second(v.value1)),
      millisecond: fromEnum6(millisecond(v.value1))
    };
  };
  var date = function(v) {
    return v.value0;
  };
  var adjust2 = function(dictDuration) {
    var fromDuration2 = fromDuration(dictDuration);
    return function(d) {
      return function(dt) {
        return bind3(adjustImpl(Just.create)(Nothing.value)(fromDuration2(d))(toRecord(dt)))(function(rec) {
          return apply4(map7(DateTime.create)(join2(apply4(apply4(map7(exactDate)(toEnum3(rec.year)))(toEnum12(rec.month)))(toEnum23(rec.day)))))(apply4(apply4(apply4(map7(Time.create)(toEnum32(rec.hour)))(toEnum4(rec.minute)))(toEnum5(rec.second)))(toEnum6(rec.millisecond)));
        });
      };
    };
  };

  // output/Data.Formatter.Number/foreign.js
  function showNumberAsInt(n) {
    return Math.round(n).toString();
  }

  // output/Data.Formatter.Internal/index.js
  var repeat = function(dictMonoid) {
    var append3 = append(dictMonoid.Semigroup0());
    var repeat$prime = function($copy_v) {
      return function($copy_v1) {
        return function($copy_v2) {
          var $tco_var_v = $copy_v;
          var $tco_var_v1 = $copy_v1;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v, v1, v2) {
            if (v2 < 1) {
              $tco_done = true;
              return v;
            }
            ;
            $tco_var_v = append3(v)(v1);
            $tco_var_v1 = v1;
            $copy_v2 = v2 - 1 | 0;
            return;
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
          }
          ;
          return $tco_result;
        };
      };
    };
    return repeat$prime(mempty(dictMonoid));
  };

  // output/Data.Lazy/foreign.js
  var defer2 = function(thunk) {
    var v = null;
    return function() {
      if (thunk === void 0) return v;
      v = thunk();
      thunk = void 0;
      return v;
    };
  };
  var force = function(l) {
    return l();
  };

  // output/Parsing/index.js
  var unwrap4 = /* @__PURE__ */ unwrap();
  var ParseState = /* @__PURE__ */ function() {
    function ParseState2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    ParseState2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new ParseState2(value0, value1, value22);
        };
      };
    };
    return ParseState2;
  }();
  var ParseError = /* @__PURE__ */ function() {
    function ParseError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ParseError2.create = function(value0) {
      return function(value1) {
        return new ParseError2(value0, value1);
      };
    };
    return ParseError2;
  }();
  var More = /* @__PURE__ */ function() {
    function More2(value0) {
      this.value0 = value0;
    }
    ;
    More2.create = function(value0) {
      return new More2(value0);
    };
    return More2;
  }();
  var Lift = /* @__PURE__ */ function() {
    function Lift2(value0) {
      this.value0 = value0;
    }
    ;
    Lift2.create = function(value0) {
      return new Lift2(value0);
    };
    return Lift2;
  }();
  var Stop = /* @__PURE__ */ function() {
    function Stop2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Stop2.create = function(value0) {
      return function(value1) {
        return new Stop2(value0, value1);
      };
    };
    return Stop2;
  }();
  var lazyParserT = {
    defer: function(f) {
      var m = defer2(f);
      return function(state1, more, lift1, $$throw, done) {
        var v = force(m);
        return v(state1, more, lift1, $$throw, done);
      };
    }
  };
  var functorParserT = {
    map: function(f) {
      return function(v) {
        return function(state1, more, lift1, $$throw, done) {
          return more(function(v1) {
            return v(state1, more, lift1, $$throw, function(state22, a) {
              return more(function(v2) {
                return done(state22, f(a));
              });
            });
          });
        };
      };
    }
  };
  var applyParserT = {
    apply: function(v) {
      return function(v1) {
        return function(state1, more, lift1, $$throw, done) {
          return more(function(v2) {
            return v(state1, more, lift1, $$throw, function(state22, f) {
              return more(function(v3) {
                return v1(state22, more, lift1, $$throw, function(state3, a) {
                  return more(function(v4) {
                    return done(state3, f(a));
                  });
                });
              });
            });
          });
        };
      };
    },
    Functor0: function() {
      return functorParserT;
    }
  };
  var bindParserT = {
    bind: function(v) {
      return function(next) {
        return function(state1, more, lift1, $$throw, done) {
          return more(function(v1) {
            return v(state1, more, lift1, $$throw, function(state22, a) {
              return more(function(v2) {
                var v3 = next(a);
                return v3(state22, more, lift1, $$throw, done);
              });
            });
          });
        };
      };
    },
    Apply0: function() {
      return applyParserT;
    }
  };
  var bindFlipped6 = /* @__PURE__ */ bindFlipped(bindParserT);
  var applicativeParserT = {
    pure: function(a) {
      return function(state1, v, v1, v2, done) {
        return done(state1, a);
      };
    },
    Apply0: function() {
      return applyParserT;
    }
  };
  var monadParserT = {
    Applicative0: function() {
      return applicativeParserT;
    },
    Bind1: function() {
      return bindParserT;
    }
  };
  var monadThrowParseErrorParse = {
    throwError: function(err) {
      return function(state1, v, v1, $$throw, v2) {
        return $$throw(state1, err);
      };
    },
    Monad0: function() {
      return monadParserT;
    }
  };
  var throwError2 = /* @__PURE__ */ throwError(monadThrowParseErrorParse);
  var altParserT = {
    alt: function(v) {
      return function(v1) {
        return function(v2, more, lift1, $$throw, done) {
          return more(function(v3) {
            return v(new ParseState(v2.value0, v2.value1, false), more, lift1, function(v4, err) {
              return more(function(v5) {
                if (v4.value2) {
                  return $$throw(v4, err);
                }
                ;
                return v1(v2, more, lift1, $$throw, done);
              });
            }, done);
          });
        };
      };
    },
    Functor0: function() {
      return functorParserT;
    }
  };
  var stateParserT = function(k) {
    return function(state1, v, v1, v2, done) {
      var v3 = k(state1);
      return done(v3.value1, v3.value0);
    };
  };
  var runParserT$prime = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map18 = map(Monad0.Bind1().Apply0().Functor0());
    var pure12 = pure(Monad0.Applicative0());
    var tailRecM3 = tailRecM(dictMonadRec);
    return function(state1) {
      return function(v) {
        var go2 = function($copy_step) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(step3) {
            var v1 = step3(unit);
            if (v1 instanceof More) {
              $copy_step = v1.value0;
              return;
            }
            ;
            if (v1 instanceof Lift) {
              $tco_done = true;
              return map18(Loop.create)(v1.value0);
            }
            ;
            if (v1 instanceof Stop) {
              $tco_done = true;
              return pure12(new Done(new Tuple(v1.value1, v1.value0)));
            }
            ;
            throw new Error("Failed pattern match at Parsing (line 152, column 13 - line 158, column 32): " + [v1.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_step);
          }
          ;
          return $tco_result;
        };
        return tailRecM3(go2)(function(v1) {
          return v(state1, More.create, Lift.create, function(state22, err) {
            return new Stop(state22, new Left(err));
          }, function(state22, res) {
            return new Stop(state22, new Right(res));
          });
        });
      };
    };
  };
  var position = /* @__PURE__ */ stateParserT(function(v) {
    return new Tuple(v.value1, v);
  });
  var parseErrorPosition = function(v) {
    return v.value1;
  };
  var parseErrorMessage = function(v) {
    return v.value0;
  };
  var initialPos = {
    index: 0,
    line: 1,
    column: 1
  };
  var runParserT = function(dictMonadRec) {
    var map18 = map(dictMonadRec.Monad0().Bind1().Apply0().Functor0());
    var runParserT$prime1 = runParserT$prime(dictMonadRec);
    return function(s) {
      return function(p) {
        var initialState = new ParseState(s, initialPos, false);
        return map18(fst)(runParserT$prime1(initialState)(p));
      };
    };
  };
  var runParserT1 = /* @__PURE__ */ runParserT(monadRecIdentity);
  var runParser = function(s) {
    var $281 = runParserT1(s);
    return function($282) {
      return unwrap4($281($282));
    };
  };
  var failWithPosition = function(message2) {
    return function(pos) {
      return throwError2(new ParseError(message2, pos));
    };
  };
  var fail3 = function(message2) {
    return bindFlipped6(failWithPosition(message2))(position);
  };
  var plusParserT = {
    empty: /* @__PURE__ */ fail3("No alternative"),
    Alt0: function() {
      return altParserT;
    }
  };
  var alternativeParserT = {
    Applicative0: function() {
      return applicativeParserT;
    },
    Plus1: function() {
      return plusParserT;
    }
  };

  // output/Parsing.Combinators/index.js
  var alt3 = /* @__PURE__ */ alt(altParserT);
  var defer3 = /* @__PURE__ */ defer(lazyParserT);
  var pure5 = /* @__PURE__ */ pure(applicativeParserT);
  var map8 = /* @__PURE__ */ map(functorParserT);
  var empty3 = /* @__PURE__ */ empty2(plusParserT);
  var withLazyErrorMessage = function(p) {
    return function(msg) {
      return alt3(p)(defer3(function(v) {
        return fail3("Expected " + msg(unit));
      }));
    };
  };
  var $$try4 = function(v) {
    return function(v1, more, lift3, $$throw, done) {
      return v(v1, more, lift3, function(v2, err) {
        return $$throw(new ParseState(v2.value0, v2.value1, v1.value2), err);
      }, done);
    };
  };
  var option = function(a) {
    return function(p) {
      return alt3(p)(pure5(a));
    };
  };
  var optionMaybe = function(p) {
    return option(Nothing.value)(map8(Just.create)(p));
  };
  var choice = function(dictFoldable) {
    var go2 = function(p1) {
      return function(v) {
        if (v instanceof Nothing) {
          return new Just(p1);
        }
        ;
        if (v instanceof Just) {
          return new Just(alt3(p1)(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Parsing.Combinators (line 358, column 11 - line 360, column 32): " + [v.constructor.name]);
      };
    };
    var $95 = fromMaybe(empty3);
    var $96 = foldr(dictFoldable)(go2)(Nothing.value);
    return function($97) {
      return $95($96($97));
    };
  };

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _unsafeCodePointAt0 = function(fallback) {
    return hasCodePointAt ? function(str) {
      return str.codePointAt(0);
    } : fallback;
  };
  var _codePointAt = function(fallback) {
    return function(Just2) {
      return function(Nothing2) {
        return function(unsafeCodePointAt02) {
          return function(index5) {
            return function(str) {
              var length8 = str.length;
              if (index5 < 0 || index5 >= length8) return Nothing2;
              if (hasStringIterator) {
                var iter = str[Symbol.iterator]();
                for (var i = index5; ; --i) {
                  var o = iter.next();
                  if (o.done) return Nothing2;
                  if (i === 0) return Just2(unsafeCodePointAt02(o.value));
                }
              }
              return fallback(index5)(str);
            };
          };
        };
      };
    };
  };
  var _singleton = function(fallback) {
    return hasFromCodePoint ? String.fromCodePoint : fallback;
  };
  var _take = function(fallback) {
    return function(n) {
      if (hasStringIterator) {
        return function(str) {
          var accum = "";
          var iter = str[Symbol.iterator]();
          for (var i = 0; i < n; ++i) {
            var o = iter.next();
            if (o.done) return accum;
            accum += o.value;
          }
          return accum;
        };
      }
      return fallback(n);
    };
  };
  var _toCodePointArray = function(fallback) {
    return function(unsafeCodePointAt02) {
      if (hasArrayFrom) {
        return function(str) {
          return Array.from(str, unsafeCodePointAt02);
        };
      }
      return fallback;
    };
  };

  // output/Data.String.CodePoints/index.js
  var $runtime_lazy6 = function(name16, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var fromEnum7 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var map9 = /* @__PURE__ */ map(functorMaybe);
  var unfoldr2 = /* @__PURE__ */ unfoldr(unfoldableArray);
  var div2 = /* @__PURE__ */ div(euclideanRingInt);
  var mod3 = /* @__PURE__ */ mod(euclideanRingInt);
  var compare3 = /* @__PURE__ */ compare(ordInt);
  var unsurrogate = function(lead) {
    return function(trail) {
      return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
  };
  var isTrail = function(cu) {
    return 56320 <= cu && cu <= 57343;
  };
  var isLead = function(cu) {
    return 55296 <= cu && cu <= 56319;
  };
  var uncons3 = function(s) {
    var v = length3(s);
    if (v === 0) {
      return Nothing.value;
    }
    ;
    if (v === 1) {
      return new Just({
        head: fromEnum7(charAt(0)(s)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum7(charAt(1)(s));
    var cu0 = fromEnum7(charAt(0)(s));
    var $43 = isLead(cu0) && isTrail(cu1);
    if ($43) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop2(2)(s)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop2(1)(s)
    });
  };
  var unconsButWithTuple = function(s) {
    return map9(function(v) {
      return new Tuple(v.head, v.tail);
    })(uncons3(s));
  };
  var toCodePointArrayFallback = function(s) {
    return unfoldr2(unconsButWithTuple)(s);
  };
  var unsafeCodePointAt0Fallback = function(s) {
    var cu0 = fromEnum7(charAt(0)(s));
    var $47 = isLead(cu0) && length3(s) > 1;
    if ($47) {
      var cu1 = fromEnum7(charAt(1)(s));
      var $48 = isTrail(cu1);
      if ($48) {
        return unsurrogate(cu0)(cu1);
      }
      ;
      return cu0;
    }
    ;
    return cu0;
  };
  var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
  var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
  var length4 = function($74) {
    return length(toCodePointArray($74));
  };
  var indexOf2 = function(p) {
    return function(s) {
      return map9(function(i) {
        return length4(take2(i)(s));
      })(indexOf(p)(s));
    };
  };
  var fromCharCode2 = /* @__PURE__ */ function() {
    var $75 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
    return function($76) {
      return singleton5($75($76));
    };
  }();
  var singletonFallback = function(v) {
    if (v <= 65535) {
      return fromCharCode2(v);
    }
    ;
    var lead = div2(v - 65536 | 0)(1024) + 55296 | 0;
    var trail = mod3(v - 65536 | 0)(1024) + 56320 | 0;
    return fromCharCode2(lead) + fromCharCode2(trail);
  };
  var singleton7 = /* @__PURE__ */ _singleton(singletonFallback);
  var takeFallback = function(v) {
    return function(v1) {
      if (v < 1) {
        return "";
      }
      ;
      var v2 = uncons3(v1);
      if (v2 instanceof Just) {
        return singleton7(v2.value0.head) + takeFallback(v - 1 | 0)(v2.value0.tail);
      }
      ;
      return v1;
    };
  };
  var take4 = /* @__PURE__ */ _take(takeFallback);
  var splitAt3 = function(i) {
    return function(s) {
      var before = take4(i)(s);
      return {
        before,
        after: drop2(length3(before))(s)
      };
    };
  };
  var eqCodePoint = {
    eq: function(x) {
      return function(y) {
        return x === y;
      };
    }
  };
  var ordCodePoint = {
    compare: function(x) {
      return function(y) {
        return compare3(x)(y);
      };
    },
    Eq0: function() {
      return eqCodePoint;
    }
  };
  var drop4 = function(n) {
    return function(s) {
      return drop2(length3(take4(n)(s)))(s);
    };
  };
  var codePointAtFallback = function($copy_n) {
    return function($copy_s) {
      var $tco_var_n = $copy_n;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(n, s) {
        var v = uncons3(s);
        if (v instanceof Just) {
          var $66 = n === 0;
          if ($66) {
            $tco_done = true;
            return new Just(v.value0.head);
          }
          ;
          $tco_var_n = n - 1 | 0;
          $copy_s = v.value0.tail;
          return;
        }
        ;
        $tco_done = true;
        return Nothing.value;
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_n, $copy_s);
      }
      ;
      return $tco_result;
    };
  };
  var codePointAt = function(v) {
    return function(v1) {
      if (v < 0) {
        return Nothing.value;
      }
      ;
      if (v === 0 && v1 === "") {
        return Nothing.value;
      }
      ;
      if (v === 0) {
        return new Just(unsafeCodePointAt0(v1));
      }
      ;
      return _codePointAt(codePointAtFallback)(Just.create)(Nothing.value)(unsafeCodePointAt0)(v)(v1);
    };
  };
  var boundedCodePoint = {
    bottom: 0,
    top: 1114111,
    Ord0: function() {
      return ordCodePoint;
    }
  };
  var boundedEnumCodePoint = /* @__PURE__ */ function() {
    return {
      cardinality: 1114111 + 1 | 0,
      fromEnum: function(v) {
        return v;
      },
      toEnum: function(n) {
        if (n >= 0 && n <= 1114111) {
          return new Just(n);
        }
        ;
        if (otherwise) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.String.CodePoints (line 63, column 1 - line 68, column 26): " + [n.constructor.name]);
      },
      Bounded0: function() {
        return boundedCodePoint;
      },
      Enum1: function() {
        return $lazy_enumCodePoint(0);
      }
    };
  }();
  var $lazy_enumCodePoint = /* @__PURE__ */ $runtime_lazy6("enumCodePoint", "Data.String.CodePoints", function() {
    return {
      succ: defaultSucc(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      pred: defaultPred(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      Ord0: function() {
        return ordCodePoint;
      }
    };
  });

  // output/Parsing.String/index.js
  var fromEnum8 = /* @__PURE__ */ fromEnum(boundedEnumCodePoint);
  var mod4 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromJust5 = /* @__PURE__ */ fromJust();
  var toEnum7 = /* @__PURE__ */ toEnum(boundedEnumChar);
  var show12 = /* @__PURE__ */ show(showString);
  var updatePosSingle = function(v) {
    return function(cp) {
      return function(after) {
        var v1 = fromEnum8(cp);
        if (v1 === 10) {
          return {
            index: v.index + 1 | 0,
            line: v.line + 1 | 0,
            column: 1
          };
        }
        ;
        if (v1 === 13) {
          var v2 = codePointAt(0)(after);
          if (v2 instanceof Just && fromEnum8(v2.value0) === 10) {
            return {
              index: v.index + 1 | 0,
              line: v.line,
              column: v.column
            };
          }
          ;
          return {
            index: v.index + 1 | 0,
            line: v.line + 1 | 0,
            column: 1
          };
        }
        ;
        if (v1 === 9) {
          return {
            index: v.index + 1 | 0,
            line: v.line,
            column: (v.column + 8 | 0) - mod4(v.column - 1 | 0)(8) | 0
          };
        }
        ;
        return {
          index: v.index + 1 | 0,
          line: v.line,
          column: v.column + 1 | 0
        };
      };
    };
  };
  var updatePosString = function($copy_pos) {
    return function($copy_before) {
      return function($copy_after) {
        var $tco_var_pos = $copy_pos;
        var $tco_var_before = $copy_before;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(pos, before, after) {
          var v = uncons3(before);
          if (v instanceof Nothing) {
            $tco_done = true;
            return pos;
          }
          ;
          if (v instanceof Just) {
            var newPos = function() {
              if ($$null(v.value0.tail)) {
                return updatePosSingle(pos)(v.value0.head)(after);
              }
              ;
              if (otherwise) {
                return updatePosSingle(pos)(v.value0.head)(v.value0.tail);
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 165, column 7 - line 167, column 52): ");
            }();
            $tco_var_pos = newPos;
            $tco_var_before = v.value0.tail;
            $copy_after = after;
            return;
          }
          ;
          throw new Error("Failed pattern match at Parsing.String (line 161, column 36 - line 168, column 38): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_pos, $tco_var_before, $copy_after);
        }
        ;
        return $tco_result;
      };
    };
  };
  var satisfy = function(f) {
    return mkFn5(function(v) {
      return function(v1) {
        return function(v2) {
          return function($$throw) {
            return function(done) {
              var v3 = uncons3(v.value0);
              if (v3 instanceof Nothing) {
                return $$throw(v, new ParseError("Unexpected EOF", v.value1));
              }
              ;
              if (v3 instanceof Just) {
                var cp = fromEnum8(v3.value0.head);
                var $85 = cp < 0 || cp > 65535;
                if ($85) {
                  return $$throw(v, new ParseError("Expected Char", v.value1));
                }
                ;
                var ch = fromJust5(toEnum7(cp));
                var $86 = f(ch);
                if ($86) {
                  return done(new ParseState(v3.value0.tail, updatePosSingle(v.value1)(v3.value0.head)(v3.value0.tail), true), ch);
                }
                ;
                return $$throw(v, new ParseError("Predicate unsatisfied", v.value1));
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 114, column 7 - line 129, column 75): " + [v3.constructor.name]);
            };
          };
        };
      };
    });
  };
  var eof = /* @__PURE__ */ mkFn5(function(v) {
    return function(v1) {
      return function(v2) {
        return function($$throw) {
          return function(done) {
            var $133 = $$null(v.value0);
            if ($133) {
              return done(new ParseState(v.value0, v.value1, true), unit);
            }
            ;
            return $$throw(v, new ParseError("Expected EOF", v.value1));
          };
        };
      };
    };
  });
  var consumeWith = function(f) {
    return mkFn5(function(v) {
      return function(v1) {
        return function(v2) {
          return function($$throw) {
            return function(done) {
              var v3 = f(v.value0);
              if (v3 instanceof Left) {
                return $$throw(v, new ParseError(v3.value0, v.value1));
              }
              ;
              if (v3 instanceof Right) {
                return done(new ParseState(v3.value0.remainder, updatePosString(v.value1)(v3.value0.consumed)(v3.value0.remainder), !$$null(v3.value0.consumed)), v3.value0.value);
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 286, column 7 - line 290, column 121): " + [v3.constructor.name]);
            };
          };
        };
      };
    });
  };
  var string2 = function(str) {
    return consumeWith(function(input) {
      var v = stripPrefix(str)(input);
      if (v instanceof Just) {
        return new Right({
          value: str,
          consumed: str,
          remainder: v.value0
        });
      }
      ;
      return new Left("Expected " + show12(str));
    });
  };

  // output/Data.Formatter.Parser.Utils/index.js
  var show3 = /* @__PURE__ */ show(showInt);
  var lmap2 = /* @__PURE__ */ lmap(bifunctorEither);
  var applyFirst2 = /* @__PURE__ */ applyFirst(applyParserT);
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorParserT);
  var printPosition = function(v) {
    return "(line " + (show3(v.line) + (", col " + (show3(v.column) + ")")));
  };
  var printError2 = function(err) {
    return parseErrorMessage(err) + (" " + printPosition(parseErrorPosition(err)));
  };
  var runP = function(p) {
    return function(s) {
      return lmap2(printError2)(runParser(s)(applyFirst2(p)(eof)));
    };
  };
  var oneOfAs = function(dictFunctor) {
    var map18 = map(dictFunctor);
    return function(dictFoldable) {
      var choice2 = choice(dictFoldable);
      return function(dictMonad) {
        return function(p) {
          return function(xs) {
            return choice2(map18(function(v) {
              return voidLeft2(p(v.value0))(v.value1);
            })(xs));
          };
        };
      };
    };
  };

  // output/Parsing.String.Basic/index.js
  var show13 = /* @__PURE__ */ show(/* @__PURE__ */ showArray(showChar));
  var notElem1 = /* @__PURE__ */ notElem2(eqChar);
  var noneOf = function(ss) {
    return withLazyErrorMessage(satisfy(flip(notElem1)(ss)))(function(v) {
      return "none of " + show13(ss);
    });
  };

  // output/Data.Formatter.Number/index.js
  var bind4 = /* @__PURE__ */ bind(bindParserT);
  var pure6 = /* @__PURE__ */ pure(applicativeParserT);
  var some3 = /* @__PURE__ */ some(alternativeParserT)(lazyParserT);
  var many3 = /* @__PURE__ */ many(alternativeParserT)(lazyParserT);
  var repeat2 = /* @__PURE__ */ repeat(monoidString);
  var $$for2 = /* @__PURE__ */ $$for(applicativeParserT)(traversableMaybe);
  var map12 = /* @__PURE__ */ map(functorMaybe);
  var max3 = /* @__PURE__ */ max(ordInt);
  var div1 = /* @__PURE__ */ div(euclideanRingInt);
  var show4 = /* @__PURE__ */ show(showInt);
  var mapFlipped3 = /* @__PURE__ */ mapFlipped(functorEither);
  var formatParser = /* @__PURE__ */ bind4(/* @__PURE__ */ optionMaybe(/* @__PURE__ */ $$try4(/* @__PURE__ */ string2("+"))))(function(sign2) {
    return bind4(some3(string2("0")))(function(before) {
      return bind4(optionMaybe($$try4(string2(",0"))))(function(comma) {
        return bind4(optionMaybe($$try4(string2("."))))(function(dot) {
          return bind4($$for2(dot)(function(v) {
            return $$try4(many3(string2("0")));
          }))(function(after) {
            return bind4(optionMaybe($$try4(string2("a"))))(function(abbreviations) {
              return pure6({
                sign: isJust(sign2),
                before: length(before),
                comma: isJust(comma),
                after: fromMaybe(0)(map12(length)(after)),
                abbreviations: isJust(abbreviations)
              });
            });
          });
        });
      });
    });
  });
  var parseFormatString = /* @__PURE__ */ runP(formatParser);
  var format = function(v) {
    return function(num) {
      var absed = abs2(num);
      var tens = function() {
        if (absed > 0) {
          return max3(floor2(log(absed) / ln10))(0);
        }
        ;
        if (otherwise) {
          return 0;
        }
        ;
        throw new Error("Failed pattern match at Data.Formatter.Number (line 100, column 5 - line 102, column 22): ");
      }();
      if (v.abbreviations) {
        var thousands = div1(tens)(3);
        var newNum = function() {
          var $118 = thousands < 1;
          if ($118) {
            return num;
          }
          ;
          return num / pow(1e3)(toNumber2(thousands));
        }();
        var abbr2 = function() {
          if (thousands === 0) {
            return "";
          }
          ;
          if (thousands === 1) {
            return "K";
          }
          ;
          if (thousands === 2) {
            return "M";
          }
          ;
          if (thousands === 3) {
            return "G";
          }
          ;
          if (thousands === 4) {
            return "T";
          }
          ;
          if (thousands === 5) {
            return "P";
          }
          ;
          if (thousands === 6) {
            return "E";
          }
          ;
          if (thousands === 7) {
            return "Z";
          }
          ;
          if (thousands === 8) {
            return "Y";
          }
          ;
          if (otherwise) {
            return "10e+" + show4(thousands * 3 | 0);
          }
          ;
          throw new Error("Failed pattern match at Data.Formatter.Number (line 107, column 7 - line 117, column 53): ");
        }();
        return format({
          comma: v.comma,
          before: v.before,
          after: v.after,
          sign: v.sign,
          abbreviations: false
        })(newNum) + abbr2;
      }
      ;
      var zeros = (v.before - tens | 0) - 1 | 0;
      var factor = pow(10)(toNumber2(max3(0)(v.after)));
      var rounded = round(absed * factor) / factor;
      var integer = floor(rounded);
      var leftoverDecimal = rounded - integer;
      var leftover = round(leftoverDecimal * factor);
      var leftoverWithZeros = function() {
        var leftoverString = showNumberAsInt(leftover);
        var leftoverLength = length4(leftoverString);
        var zeros$prime = repeat2("0")(v.after - leftoverLength | 0);
        return zeros$prime + leftoverString;
      }();
      var leftovers = function() {
        var $119 = v.after < 1;
        if ($119) {
          return "";
        }
        ;
        return "." + (function() {
          var $120 = leftover === 0;
          if ($120) {
            return repeat2("0")(v.after);
          }
          ;
          return "";
        }() + function() {
          var $121 = leftover > 0;
          if ($121) {
            return leftoverWithZeros;
          }
          ;
          return "";
        }());
      }();
      var addCommas = function($copy_acc) {
        return function($copy_counter) {
          return function($copy_input) {
            var $tco_var_acc = $copy_acc;
            var $tco_var_counter = $copy_counter;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(acc, counter, input) {
              var v1 = uncons(input);
              if (v1 instanceof Nothing) {
                $tco_done = true;
                return fromCharArray(acc);
              }
              ;
              if (v1 instanceof Just && counter < 3) {
                $tco_var_acc = cons(v1.value0.head)(acc);
                $tco_var_counter = counter + 1 | 0;
                $copy_input = v1.value0.tail;
                return;
              }
              ;
              $tco_var_acc = cons(",")(acc);
              $tco_var_counter = 0;
              $copy_input = input;
              return;
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_acc, $tco_var_counter, $copy_input);
            }
            ;
            return $tco_result;
          };
        };
      };
      var shownInt = function() {
        if (v.comma) {
          return addCommas([])(0)(reverse(toCharArray(repeat2("0")(zeros) + showNumberAsInt(integer))));
        }
        ;
        return repeat2("0")(zeros) + showNumberAsInt(integer);
      }();
      return function() {
        var $127 = num < 0;
        if ($127) {
          return "-";
        }
        ;
        var $128 = num > 0 && v.sign;
        if ($128) {
          return "+";
        }
        ;
        return "";
      }() + (shownInt + leftovers);
    };
  };
  var formatNumber = function(pattern2) {
    return function(number) {
      return mapFlipped3(parseFormatString(pattern2))(flip(format)(number));
    };
  };

  // output/Data.HashMap/foreign.js
  function MapNode(datamap, nodemap, content3) {
    this.datamap = datamap;
    this.nodemap = nodemap;
    this.content = content3;
  }
  MapNode.prototype.lookup = function lookup2(Nothing2, Just2, keyEquals, key, keyHash, shift) {
    var bit = mask(keyHash, shift);
    if ((this.datamap & bit) !== 0) {
      var i = index3(this.datamap, bit);
      if (keyEquals(key)(this.content[i * 2]))
        return Just2(this.content[i * 2 + 1]);
      return Nothing2;
    }
    if ((this.nodemap & bit) !== 0) {
      return this.content[this.content.length - 1 - index3(this.nodemap, bit)].lookup(Nothing2, Just2, keyEquals, key, keyHash, shift + 5);
    }
    return Nothing2;
  };
  function remove2insert1Mut(a, removeIndex, insertIndex, v1) {
    for (var i = removeIndex; i < insertIndex; i++) a[i] = a[i + 2];
    a[i++] = v1;
    for (; i < a.length - 1; i++) a[i] = a[i + 1];
    a.length = a.length - 1;
  }
  MapNode.prototype.insertMut = function insertMut(keyEquals, hashFunction, key, keyHash, value13, shift) {
    var bit = mask(keyHash, shift);
    var i = index3(this.datamap, bit);
    if ((this.datamap & bit) !== 0) {
      var k = this.content[i * 2];
      if (keyEquals(k)(key)) {
        this.content[i * 2 + 1] = value13;
      } else {
        var newNode = binaryNode(k, hashFunction(k), this.content[i * 2 + 1], key, keyHash, value13, shift + 5);
        this.datamap = this.datamap ^ bit;
        this.nodemap = this.nodemap | bit;
        remove2insert1Mut(this.content, i * 2, this.content.length - index3(this.nodemap, bit) - 2, newNode);
      }
    } else if ((this.nodemap & bit) !== 0) {
      var n = this.content.length - 1 - index3(this.nodemap, bit);
      this.content[n].insertMut(keyEquals, hashFunction, key, keyHash, value13, shift + 5);
    } else {
      this.datamap = this.datamap | bit;
      this.content.splice(i * 2, 0, key, value13);
    }
  };
  MapNode.prototype.insert = function insert2(keyEquals, hashFunction, key, keyHash, value13, shift) {
    var bit = mask(keyHash, shift);
    var i = index3(this.datamap, bit);
    if ((this.datamap & bit) !== 0) {
      var k = this.content[i * 2];
      if (keyEquals(k)(key))
        return new MapNode(this.datamap, this.nodemap, overwriteTwoElements(this.content, i * 2, key, value13));
      var newNode = binaryNode(k, hashFunction(k), this.content[i * 2 + 1], key, keyHash, value13, shift + 5);
      return new MapNode(this.datamap ^ bit, this.nodemap | bit, remove2insert1(this.content, i * 2, this.content.length - index3(this.nodemap, bit) - 2, newNode));
    }
    if ((this.nodemap & bit) !== 0) {
      var n = this.content.length - 1 - index3(this.nodemap, bit);
      return new MapNode(
        this.datamap,
        this.nodemap,
        copyAndOverwriteOrExtend1(
          this.content,
          n,
          this.content[n].insert(keyEquals, hashFunction, key, keyHash, value13, shift + 5)
        )
      );
    }
    return new MapNode(this.datamap | bit, this.nodemap, insert22(this.content, i * 2, key, value13));
  };
  MapNode.prototype.insertWith = function insertWith(keyEquals, hashFunction, f, key, keyHash, value13, shift) {
    var bit = mask(keyHash, shift);
    var i = index3(this.datamap, bit);
    if ((this.datamap & bit) !== 0) {
      var k = this.content[i * 2];
      if (keyEquals(k)(key))
        return new MapNode(this.datamap, this.nodemap, overwriteTwoElements(this.content, i * 2, key, f(this.content[i * 2 + 1])(value13)));
      var newNode = binaryNode(k, hashFunction(k), this.content[i * 2 + 1], key, keyHash, value13, shift + 5);
      return new MapNode(this.datamap ^ bit, this.nodemap | bit, remove2insert1(this.content, i * 2, this.content.length - index3(this.nodemap, bit) - 2, newNode));
    }
    if ((this.nodemap & bit) !== 0) {
      var n = this.content.length - 1 - index3(this.nodemap, bit);
      return new MapNode(
        this.datamap,
        this.nodemap,
        copyAndOverwriteOrExtend1(
          this.content,
          n,
          this.content[n].insertWith(keyEquals, hashFunction, f, key, keyHash, value13, shift + 5)
        )
      );
    }
    return new MapNode(this.datamap | bit, this.nodemap, insert22(this.content, i * 2, key, value13));
  };
  MapNode.prototype.delet = function delet(keyEquals, key, keyHash, shift) {
    var bit = mask(keyHash, shift);
    if ((this.datamap & bit) !== 0) {
      var dataIndex = index3(this.datamap, bit);
      if (keyEquals(this.content[dataIndex * 2])(key)) {
        if (this.nodemap === 0 && this.content.length === 2) return empty4;
        return new MapNode(this.datamap ^ bit, this.nodemap, remove2(this.content, dataIndex * 2));
      }
      return this;
    }
    if ((this.nodemap & bit) !== 0) {
      var nodeIndex = index3(this.nodemap, bit);
      var recNode = this.content[this.content.length - 1 - nodeIndex];
      var recRes = recNode.delet(keyEquals, key, keyHash, shift + 5);
      if (recNode === recRes) return this;
      if (recRes.isSingleton()) {
        if (this.content.length === 1) {
          recRes.datamap = this.nodemap;
          return recRes;
        }
        return new MapNode(
          this.datamap | bit,
          this.nodemap ^ bit,
          insert2remove1(this.content, 2 * index3(this.datamap, bit), recRes.content[0], recRes.content[1], this.content.length - 1 - nodeIndex)
        );
      }
      return new MapNode(this.datamap, this.nodemap, copyAndOverwriteOrExtend1(this.content, this.content.length - 1 - nodeIndex, recRes));
    }
    return this;
  };
  MapNode.prototype.toArrayBy = function(f, res) {
    for (var i = 0; i < popCount(this.datamap) * 2; ) {
      var k = this.content[i++];
      var v = this.content[i++];
      res.push(f(k)(v));
    }
    for (; i < this.content.length; i++)
      this.content[i].toArrayBy(f, res);
  };
  MapNode.prototype.isSingleton = function() {
    return this.nodemap === 0 && this.content.length === 2;
  };
  MapNode.prototype.eq = function(kf, vf, that) {
    if (this === that) return true;
    if (this.constructor !== that.constructor || this.nodemap !== that.nodemap || this.datamap !== that.datamap) return false;
    for (var i = 0; i < popCount(this.datamap) * 2; ) {
      if (kf(this.content[i])(that.content[i])) i++;
      else return false;
      if (vf(this.content[i])(that.content[i])) i++;
      else return false;
    }
    for (; i < this.content.length; i++)
      if (!this.content[i].eq(kf, vf, that.content[i])) return false;
    return true;
  };
  MapNode.prototype.hash = function(vhash) {
    var h = this.datamap;
    for (var i = 0; i < popCount(this.datamap); i++)
      h = h * 31 + vhash(this.content[i * 2 + 1]) | 0;
    for (var j = 0; j < popCount(this.nodemap); j++)
      h = h * 31 + this.content[this.content.length - j - 1].hash(vhash) | 0;
    return h;
  };
  MapNode.prototype.size = function() {
    var res = popCount(this.datamap);
    for (var i = res * 2; i < this.content.length; i++) res += this.content[i].size();
    return res;
  };
  MapNode.prototype.imap = function(f) {
    var newContent = this.content.slice();
    for (var i = 0; i < popCount(this.datamap) * 2; ) {
      var k = this.content[i++];
      var v = this.content[i++];
      newContent[i - 2] = k;
      newContent[i - 1] = f(k)(v);
    }
    for (; i < this.content.length; i++)
      newContent[i] = this.content[i].imap(f);
    return new MapNode(this.datamap, this.nodemap, newContent);
  };
  MapNode.prototype.ifoldMap = function(m, mappend, f) {
    for (var i = 0; i < popCount(this.datamap) * 2; ) {
      var k = this.content[i++];
      var v = this.content[i++];
      m = mappend(m)(f(k)(v));
    }
    for (; i < this.content.length; i++)
      m = this.content[i].ifoldMap(m, mappend, f);
    return m;
  };
  function lowestBit(n) {
    return n & -n;
  }
  function mergeState(bit, thisnode, thisdata, thatnode, thatdata) {
    var state3 = 0;
    state3 |= (bit & thisnode) !== 0 ? 1 : 0;
    state3 |= (bit & thisdata) !== 0 ? 2 : 0;
    state3 |= (bit & thatnode) !== 0 ? 4 : 0;
    state3 |= (bit & thatdata) !== 0 ? 8 : 0;
    return state3;
  }
  MapNode.prototype.unionWith = function(eq5, hash3, f, that, shift) {
    if (this.constructor !== that.constructor)
      throw "Trying to union a MapNode with something else";
    var thisDataIndex, thatDataIndex, thisNodeIndex, thatNodeIndex;
    var datamap = 0;
    var nodemap = 0;
    var data = [];
    var nodes = [];
    var skipmap = this.datamap | this.nodemap | that.datamap | that.nodemap;
    while (skipmap !== 0) {
      var bit = lowestBit(skipmap);
      skipmap &= ~bit;
      switch (mergeState(bit, this.nodemap, this.datamap, that.nodemap, that.datamap)) {
        case 1:
          thisNodeIndex = index3(this.nodemap, bit);
          nodemap |= bit;
          nodes.push(this.content[this.content.length - thisNodeIndex - 1]);
          break;
        case 2:
          thisDataIndex = index3(this.datamap, bit);
          datamap |= bit;
          data.push(this.content[thisDataIndex * 2], this.content[thisDataIndex * 2 + 1]);
          break;
        case 4:
          thatNodeIndex = index3(that.nodemap, bit);
          nodemap |= bit;
          nodes.push(that.content[that.content.length - thatNodeIndex - 1]);
          break;
        case 5:
          thisNodeIndex = index3(this.nodemap, bit);
          thatNodeIndex = index3(that.nodemap, bit);
          nodemap |= bit;
          nodes.push(
            this.content[this.content.length - thisNodeIndex - 1].unionWith(eq5, hash3, f, that.content[that.content.length - thatNodeIndex - 1], shift + 5)
          );
          break;
        case 6:
          thisDataIndex = index3(this.datamap, bit);
          thatNodeIndex = index3(that.nodemap, bit);
          var k = this.content[thisDataIndex * 2];
          var v = this.content[thisDataIndex * 2 + 1];
          var hk = hash3(k);
          var flippedF = function(a) {
            return function(b) {
              return f(b)(a);
            };
          };
          nodemap |= bit;
          nodes.push(that.content[that.content.length - thatNodeIndex - 1].insertWith(eq5, hash3, flippedF, k, hk, v, shift + 5));
          break;
        case 8:
          thatDataIndex = index3(that.datamap, bit);
          datamap |= bit;
          data.push(that.content[thatDataIndex * 2], that.content[thatDataIndex * 2 + 1]);
          break;
        case 9:
          thatDataIndex = index3(that.datamap, bit);
          thisNodeIndex = index3(this.nodemap, bit);
          var k = that.content[thatDataIndex * 2];
          var v = that.content[thatDataIndex * 2 + 1];
          var hk = hash3(k);
          nodemap |= bit;
          nodes.push(this.content[this.content.length - thisNodeIndex - 1].insertWith(eq5, hash3, f, k, hk, v, shift + 5));
          break;
        case 10:
          thisDataIndex = index3(this.datamap, bit);
          thatDataIndex = index3(that.datamap, bit);
          if (eq5(this.content[thisDataIndex * 2])(that.content[thatDataIndex * 2])) {
            datamap |= bit;
            data.push(this.content[thisDataIndex * 2], f(this.content[thisDataIndex * 2 + 1])(that.content[thatDataIndex * 2 + 1]));
          } else {
            nodemap |= bit;
            nodes.push(binaryNode(
              this.content[thisDataIndex * 2],
              hash3(this.content[thisDataIndex * 2]),
              this.content[thisDataIndex * 2 + 1],
              that.content[thatDataIndex * 2],
              hash3(that.content[thatDataIndex * 2]),
              that.content[thatDataIndex * 2 + 1],
              shift + 5
            ));
          }
          break;
      }
    }
    return new MapNode(datamap, nodemap, data.concat(nodes.reverse()));
  };
  MapNode.prototype.intersectionWith = function(Nothing2, Just2, eq5, hash3, f, that, shift) {
    if (this.constructor !== that.constructor)
      throw "Trying to intersect a MapNode with something else";
    var thisDataIndex, thatDataIndex, thisNodeIndex, thatNodeIndex;
    var datamap = 0;
    var nodemap = 0;
    var data = [];
    var nodes = [];
    var skipmap = (this.datamap | this.nodemap) & (that.datamap | that.nodemap);
    while (skipmap !== 0) {
      var bit = lowestBit(skipmap);
      skipmap &= ~bit;
      switch (mergeState(bit, this.nodemap, this.datamap, that.nodemap, that.datamap)) {
        case 5:
          thisNodeIndex = index3(this.nodemap, bit);
          thatNodeIndex = index3(that.nodemap, bit);
          var recRes = this.content[this.content.length - thisNodeIndex - 1].intersectionWith(Nothing2, Just2, eq5, hash3, f, that.content[that.content.length - thatNodeIndex - 1], shift + 5);
          if (isEmpty2(recRes)) continue;
          if (recRes.isSingleton()) {
            datamap |= bit;
            data.push(recRes.content[0], recRes.content[1]);
          } else {
            nodemap |= bit;
            nodes.push(recRes);
          }
          break;
        case 6:
          thisDataIndex = index3(this.datamap, bit);
          thatNodeIndex = index3(that.nodemap, bit);
          var k = this.content[thisDataIndex * 2];
          var v = this.content[thisDataIndex * 2 + 1];
          var hk = hash3(k);
          var res = that.content[that.content.length - thatNodeIndex - 1].lookup(Nothing2, Just2, eq5, k, hk, shift + 5);
          if (res !== Nothing2) {
            datamap |= bit;
            data.push(k, f(v)(res.value0));
          }
          break;
        case 9:
          thatDataIndex = index3(that.datamap, bit);
          thisNodeIndex = index3(this.nodemap, bit);
          var k = that.content[thatDataIndex * 2];
          var v = that.content[thatDataIndex * 2 + 1];
          var hk = hash3(k);
          var res = this.content[this.content.length - thisNodeIndex - 1].lookup(Nothing2, Just2, eq5, k, hk, shift + 5);
          if (res !== Nothing2) {
            datamap |= bit;
            data.push(k, f(res.value0)(v));
          }
          break;
        case 10:
          thisDataIndex = index3(this.datamap, bit);
          thatDataIndex = index3(that.datamap, bit);
          if (eq5(this.content[thisDataIndex * 2])(that.content[thatDataIndex * 2])) {
            datamap |= bit;
            data.push(this.content[thisDataIndex * 2], f(this.content[thisDataIndex * 2 + 1])(that.content[thatDataIndex * 2 + 1]));
          }
          break;
      }
    }
    return new MapNode(datamap, nodemap, data.concat(nodes.reverse()));
  };
  MapNode.prototype.filterWithKey = function filterWithKey(f) {
    var datamap = 0;
    var nodemap = 0;
    var data = [];
    var nodes = [];
    var skipmap = this.datamap | this.nodemap;
    while (skipmap !== 0) {
      var bit = lowestBit(skipmap);
      skipmap &= ~bit;
      if ((this.datamap & bit) !== 0) {
        var dataIndex = index3(this.datamap, bit);
        var k = this.content[dataIndex * 2];
        var v = this.content[dataIndex * 2 + 1];
        if (f(k)(v)) {
          datamap |= bit;
          data.push(k, v);
        }
      } else {
        var nodeIndex = index3(this.nodemap, bit);
        var node = this.content[this.content.length - nodeIndex - 1].filterWithKey(f);
        if (isEmpty2(node)) continue;
        if (node.isSingleton()) {
          datamap |= bit;
          data.push(node.content[0], node.content[1]);
        } else {
          nodemap |= bit;
          nodes.push(node);
        }
      }
    }
    return new MapNode(datamap, nodemap, data.concat(nodes.reverse()));
  };
  MapNode.prototype.travHelper = function() {
    function go2(vi, vm2, ni, nm, copy) {
      if (vi < vm2)
        return function(v) {
          return go2(vi + 1, vm2, ni, nm, function() {
            var res = copy();
            res.content[vi * 2 + 1] = v;
            return res;
          });
        };
      if (ni < nm)
        return function(n) {
          return go2(vi, vm2, ni + 1, nm, function() {
            var res = copy();
            res.content[vm2 * 2 + ni] = n;
            return res;
          });
        };
      return copy();
    }
    var vm = popCount(this.datamap);
    var self = this;
    return go2(0, vm, 0, this.content.length - vm * 2, function() {
      return new MapNode(self.datamap, self.nodemap, self.content.slice());
    });
  };
  MapNode.prototype.ifoldMap = function(m, mappend, f) {
    for (var i = 0; i < popCount(this.datamap) * 2; ) {
      var k = this.content[i++];
      var v = this.content[i++];
      m = mappend(m)(f(k)(v));
    }
    for (; i < this.content.length; i++)
      m = this.content[i].ifoldMap(m, mappend, f);
    return m;
  };
  MapNode.prototype.itraverse = function(pure9, apply5, f) {
    var m = pure9(this.travHelper());
    for (var i = 0; i < popCount(this.datamap) * 2; ) {
      var k = this.content[i++];
      var v = this.content[i++];
      m = apply5(m)(f(k)(v));
    }
    for (; i < this.content.length; i++)
      m = apply5(m)(this.content[i].itraverse(pure9, apply5, f));
    return m;
  };
  MapNode.prototype.any = function(predicate) {
    for (var i = 1; i < popCount(this.datamap) * 2; i = i + 2) {
      var v = this.content[i];
      if (predicate(v)) {
        return true;
      }
    }
    i--;
    for (; i < this.content.length; i++) {
      if (this.content[i].any(predicate)) {
        return true;
      }
    }
    return false;
  };
  function Collision(keys2, values) {
    this.keys = keys2;
    this.values = values;
  }
  Collision.prototype.lookup = function collisionLookup(Nothing2, Just2, keyEquals, key, keyHash, shift) {
    for (var i = 0; i < this.keys.length; i++)
      if (keyEquals(key)(this.keys[i]))
        return Just2(this.values[i]);
    return Nothing2;
  };
  Collision.prototype.insert = function collisionInsert(keyEquals, hashFunction, key, keyHash, value13, shift) {
    var i = 0;
    for (; i < this.keys.length; i++)
      if (keyEquals(key)(this.keys[i]))
        break;
    return new Collision(
      copyAndOverwriteOrExtend1(this.keys, i, key),
      copyAndOverwriteOrExtend1(this.values, i, value13)
    );
  };
  Collision.prototype.insertMut = function collisionInsertMut(keyEquals, hashFunction, key, keyHash, value13, shift) {
    var i = 0;
    for (; i < this.keys.length; i++)
      if (keyEquals(key)(this.keys[i]))
        break;
    this.keys[i] = key;
    this.values[i] = value13;
  };
  Collision.prototype.insertWith = function collisionInsert2(keyEquals, hashFunction, f, key, keyHash, value13, shift) {
    var i = 0;
    for (; i < this.keys.length; i++)
      if (keyEquals(key)(this.keys[i]))
        return new Collision(
          copyAndOverwriteOrExtend1(this.keys, i, key),
          copyAndOverwriteOrExtend1(this.values, i, f(this.values[i])(value13))
        );
    return new Collision(
      copyAndOverwriteOrExtend1(this.keys, i, key),
      copyAndOverwriteOrExtend1(this.values, i, value13)
    );
  };
  Collision.prototype.delet = function collisionDelete(keyEquals, key, keyHash, shift) {
    var i = 0;
    for (; i < this.keys.length; i++)
      if (keyEquals(key)(this.keys[i]))
        break;
    if (i === this.keys.length) return this;
    if (this.keys.length === 2)
      return new MapNode(1 << (keyHash & 31), 0, [this.keys[1 - i], this.values[1 - i]]);
    return new Collision(remove1(this.keys, i), remove1(this.values, i));
  };
  Collision.prototype.toArrayBy = function(f, res) {
    for (var i = 0; i < this.keys.length; i++)
      res.push(f(this.keys[i])(this.values[i]));
  };
  Collision.prototype.isSingleton = function() {
    return false;
  };
  Collision.prototype.eq = function(kf, vf, that) {
    if (this.constructor !== that.constructor || this.keys.length !== that.keys.length) return false;
    outer:
      for (var i = 0; i < this.keys.length; i++) {
        for (var j = 0; j < that.keys.length; j++) {
          if (kf(this.keys[i])(that.keys[j])) {
            if (vf(this.values[i])(that.values[j]))
              continue outer;
            else
              return false;
          }
        }
      }
    return true;
  };
  Collision.prototype.hash = function(vhash) {
    var h = 0;
    for (var i = 0; i < this.values.length; i++)
      h += vhash(this.values[i]);
    return h;
  };
  Collision.prototype.size = function() {
    return this.keys.length;
  };
  Collision.prototype.imap = function(f) {
    var newValues = this.values.slice();
    for (var i = 0; i < this.values.length; i++)
      newValues[i] = f(this.keys[i])(this.values[i]);
    return new Collision(this.keys, newValues);
  };
  Collision.prototype.ifoldMap = function(m, mappend, f) {
    for (var i = 0; i < this.keys.length; i++)
      m = mappend(m)(f(this.keys[i])(this.values[i]));
    return m;
  };
  Collision.prototype.travHelper = function() {
    function go2(i, m, copy) {
      if (i < m)
        return function(v) {
          return go2(i + 1, m, function() {
            var res = copy();
            res.values[i] = v;
            return res;
          });
        };
      return copy();
    }
    var self = this;
    return go2(0, this.keys.length, function() {
      return new Collision(self.keys, self.values.slice());
    });
  };
  Collision.prototype.itraverse = function(pure9, apply5, f) {
    var m = pure9(this.travHelper());
    for (var i = 0; i < this.keys.length; i++)
      m = apply5(m)(f(this.keys[i])(this.values[i]));
    return m;
  };
  Collision.prototype.unionWith = function(eq5, hash3, f, that, shift) {
    if (that.constructor !== Collision)
      throw "Trying to union a Collision with something else";
    var keys2 = [];
    var values = [];
    var added = Array(that.keys.length).fill(false);
    outer:
      for (var i = 0; i < this.keys.length; i++) {
        for (var j = 0; j < that.keys.length; j++) {
          if (eq5(this.keys[i])(that.keys[j])) {
            keys2.push(this.keys[i]);
            values.push(f(this.values[i])(that.values[j]));
            added[j] = true;
            continue outer;
          }
        }
        keys2.push(this.keys[i]);
        values.push(this.values[i]);
        added[j] = true;
      }
    for (var k = 0; k < that.keys.length; k++) {
      if (!added[k]) {
        keys2.push(that.keys[k]);
        values.push(that.values[k]);
      }
    }
    return new Collision(keys2, values);
  };
  Collision.prototype.intersectionWith = function(Nothing2, Just2, eq5, hash3, f, that, shift) {
    if (that.constructor !== Collision)
      throw "Trying to intersect a Collision with something else";
    var keys2 = [];
    var values = [];
    outer:
      for (var i = 0; i < this.keys.length; i++) {
        for (var j = 0; j < that.keys.length; j++) {
          if (eq5(this.keys[i])(that.keys[j])) {
            keys2.push(this.keys[i]);
            values.push(f(this.values[i])(that.values[j]));
            continue outer;
          }
        }
      }
    if (keys2.length === 0)
      return empty4;
    if (keys2.length === 1)
      return new MapNode(1, 0, [keys2[0], values[0]]);
    return new Collision(keys2, values);
  };
  Collision.prototype.filterWithKey = function collisionFilterWithKey(f) {
    var keys2 = [];
    var values = [];
    for (var i = 0; i < this.keys.length; i++) {
      var k = this.keys[i];
      var v = this.values[i];
      if (f(k)(v)) {
        keys2.push(k);
        values.push(v);
      }
    }
    if (keys2.length === 0) return empty4;
    if (keys2.length === 1) return new MapNode(1, 0, [keys2[0], values[0]]);
    return new Collision(keys2, values);
  };
  Collision.prototype.any = function(predicate) {
    for (var i = 0; i < this.keys.length; i++) {
      if (predicate(this.values[i])) {
        return true;
      }
    }
    return false;
  };
  function mask(keyHash, shift) {
    return 1 << (keyHash >>> shift & 31);
  }
  function index3(map18, bit) {
    return popCount(map18 & bit - 1);
  }
  function popCount(n) {
    n = n - (n >> 1 & 1431655765);
    n = (n & 858993459) + (n >> 2 & 858993459);
    return (n + (n >> 4) & 252645135) * 16843009 >> 24;
  }
  function binaryNode(k1, kh1, v1, k2, kh2, v2, s) {
    if (s >= 32) return new Collision([k1, k2], [v1, v2]);
    var b1 = kh1 >>> s & 31;
    var b2 = kh2 >>> s & 31;
    if (b1 !== b2) return new MapNode(1 << b1 | 1 << b2, 0, b1 >>> 0 < b2 >>> 0 ? [k1, v1, k2, v2] : [k2, v2, k1, v1]);
    return new MapNode(0, 1 << b1, [binaryNode(k1, kh1, v1, k2, kh2, v2, s + 5)]);
  }
  function overwriteTwoElements(a, index5, v1, v2) {
    var res = a.slice();
    res[index5] = v1;
    res[index5 + 1] = v2;
    return res;
  }
  function remove2(a, index5) {
    var res = a.slice();
    res.splice(index5, 2);
    return res;
  }
  function remove1(a, index5) {
    var res = a.slice();
    res.splice(index5, 1);
    return res;
  }
  function copyAndOverwriteOrExtend1(a, index5, v) {
    var res = a.slice();
    res[index5] = v;
    return res;
  }
  function remove2insert1(a, removeIndex, insertIndex, v1) {
    var res = new Array(a.length - 1);
    for (var i = 0; i < removeIndex; i++) res[i] = a[i];
    for (; i < insertIndex; i++) res[i] = a[i + 2];
    res[i++] = v1;
    for (; i < res.length; i++) res[i] = a[i + 1];
    return res;
  }
  function insert22(a, index5, v1, v2) {
    var res = new Array(a.length + 2);
    for (var i = 0; i < index5; i++) res[i] = a[i];
    res[i++] = v1;
    res[i++] = v2;
    for (; i < res.length; i++) res[i] = a[i - 2];
    return res;
  }
  function insert2remove1(a, insertIndex, v1, v2, removeIndex) {
    var res = new Array(a.length + 1);
    for (var i = 0; i < insertIndex; i++) res[i] = a[i];
    res[i++] = v1;
    res[i++] = v2;
    for (; i < removeIndex + 2; i++) res[i] = a[i - 2];
    for (; i < res.length; i++) res[i] = a[i - 1];
    return res;
  }
  var empty4 = new MapNode(0, 0, []);
  function lookupPurs(Nothing2, Just2, keyEquals, key, keyHash) {
    return function(m) {
      return m.lookup(Nothing2, Just2, keyEquals, key, keyHash, 0);
    };
  }
  function fromArrayPurs(keyEquals, hashFunction) {
    return function(kf) {
      return function(vf) {
        return function(a) {
          var m = new MapNode(0, 0, []);
          for (var i = 0; i < a.length; i++) {
            var x = a[i];
            var k = kf(x);
            m.insertMut(keyEquals, hashFunction, k, hashFunction(k), vf(x), 0);
          }
          return m;
        };
      };
    };
  }
  function insertPurs(keyEquals, hashFunction) {
    return function(key) {
      return function(value13) {
        return function(m) {
          return m.insert(keyEquals, hashFunction, key, hashFunction(key), value13, 0);
        };
      };
    };
  }
  function toArrayBy(f) {
    return function(m) {
      var res = [];
      m.toArrayBy(f, res);
      return res;
    };
  }
  function isEmpty2(m) {
    return m.datamap === 0 && m.nodemap === 0;
  }

  // output/Data.Hashable/foreign.js
  function hashString(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) {
      h = 31 * h + s.charCodeAt(i) | 0;
    }
    return h;
  }

  // output/Data.Hashable/index.js
  var hashableString = {
    hash: hashString,
    Eq0: function() {
      return eqString;
    }
  };
  var hash = function(dict) {
    return dict.hash;
  };

  // output/Data.HashMap/index.js
  var lookup3 = function(dictHashable) {
    var eq5 = eq(dictHashable.Eq0());
    var hash3 = hash(dictHashable);
    return function(k) {
      return lookupPurs(Nothing.value, Just.create, eq5, k, hash3(k));
    };
  };
  var insert3 = function(dictHashable) {
    return insertPurs(eq(dictHashable.Eq0()), hash(dictHashable));
  };
  var fromArrayBy = function(dictHashable) {
    return fromArrayPurs(eq(dictHashable.Eq0()), hash(dictHashable));
  };
  var fromArray = function(dictHashable) {
    return fromArrayBy(dictHashable)(fst)(snd);
  };

  // output/Web.DOM.DOMTokenList/foreign.js
  function add2(list) {
    return function(token) {
      return function() {
        return list.add(token);
      };
    };
  }
  function remove(list) {
    return function(token) {
      return function() {
        return list.remove(token);
      };
    };
  }
  function contains2(list) {
    return function(token) {
      return function() {
        return list.contains(token);
      };
    };
  }

  // output/Web.DOM.Document/foreign.js
  var getEffProp = function(name16) {
    return function(doc) {
      return function() {
        return doc[name16];
      };
    };
  };
  var url = getEffProp("URL");
  var documentURI = getEffProp("documentURI");
  var origin = getEffProp("origin");
  var compatMode = getEffProp("compatMode");
  var characterSet = getEffProp("characterSet");
  var contentType = getEffProp("contentType");
  var _documentElement = getEffProp("documentElement");
  function createElement(localName2) {
    return function(doc) {
      return function() {
        return doc.createElement(localName2);
      };
    };
  }

  // output/Web.Internal.FFI/foreign.js
  function _unsafeReadProtoTagged(nothing, just, name16, value13) {
    if (typeof window !== "undefined") {
      var ty = window[name16];
      if (ty != null && value13 instanceof ty) {
        return just(value13);
      }
    }
    var obj = value13;
    while (obj != null) {
      var proto = Object.getPrototypeOf(obj);
      var constructorName = proto.constructor.name;
      if (constructorName === name16) {
        return just(value13);
      } else if (constructorName === "Object") {
        return nothing;
      }
      obj = proto;
    }
    return nothing;
  }

  // output/Web.Internal.FFI/index.js
  var unsafeReadProtoTagged = function(name16) {
    return function(value13) {
      return _unsafeReadProtoTagged(Nothing.value, Just.create, name16, value13);
    };
  };

  // output/Web.DOM.Document/index.js
  var toParentNode = unsafeCoerce2;
  var toEventTarget = unsafeCoerce2;

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name16) {
    return function(doctype) {
      return doctype[name16];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");
  function classList(element) {
    return function() {
      return element.classList;
    };
  }
  function setAttribute(name16) {
    return function(value13) {
      return function(element) {
        return function() {
          element.setAttribute(name16, value13);
        };
      };
    };
  }
  function _getAttribute(name16) {
    return function(element) {
      return function() {
        return element.getAttribute(name16);
      };
    };
  }

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp2 = function(name16) {
    return function(node) {
      return function() {
        return node[name16];
      };
    };
  };
  var children = getEffProp2("children");
  var _firstElementChild = getEffProp2("firstElementChild");
  var _lastElementChild = getEffProp2("lastElementChild");
  var childElementCount = getEffProp2("childElementCount");
  function _querySelector(selector) {
    return function(node) {
      return function() {
        return node.querySelector(selector);
      };
    };
  }
  function querySelectorAll(selector) {
    return function(node) {
      return function() {
        return node.querySelectorAll(selector);
      };
    };
  }

  // output/Web.DOM.ParentNode/index.js
  var map10 = /* @__PURE__ */ map(functorEffect);
  var querySelector = function(qs) {
    var $2 = map10(toMaybe);
    var $3 = _querySelector(qs);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.DOM.Element/index.js
  var map11 = /* @__PURE__ */ map(functorEffect);
  var toParentNode2 = unsafeCoerce2;
  var toNode = unsafeCoerce2;
  var toEventTarget2 = unsafeCoerce2;
  var toChildNode = unsafeCoerce2;
  var getAttribute = function(attr) {
    var $6 = map11(toMaybe);
    var $7 = _getAttribute(attr);
    return function($8) {
      return $6($7($8));
    };
  };
  var fromNode = /* @__PURE__ */ unsafeReadProtoTagged("Element");
  var fromEventTarget = /* @__PURE__ */ unsafeReadProtoTagged("Element");

  // output/Web.DOM.Node/foreign.js
  var getEffProp3 = function(name16) {
    return function(node) {
      return function() {
        return node[name16];
      };
    };
  };
  var baseURI = getEffProp3("baseURI");
  var _ownerDocument = getEffProp3("ownerDocument");
  var _parentNode = getEffProp3("parentNode");
  var _parentElement = getEffProp3("parentElement");
  var childNodes = getEffProp3("childNodes");
  var _firstChild = getEffProp3("firstChild");
  var _lastChild = getEffProp3("lastChild");
  var _previousSibling = getEffProp3("previousSibling");
  var _nextSibling = getEffProp3("nextSibling");
  var _nodeValue = getEffProp3("nodeValue");
  var textContent = getEffProp3("textContent");
  function setTextContent(value13) {
    return function(node) {
      return function() {
        node.textContent = value13;
      };
    };
  }
  function appendChild(node) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node);
      };
    };
  }

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var toDocument = unsafeCoerce2;

  // output/Web.HTML.HTMLElement/foreign.js
  function _read(nothing, just, value13) {
    var tag = Object.prototype.toString.call(value13);
    if (tag.indexOf("[object HTML") === 0 && tag.indexOf("Element]") === tag.length - 8) {
      return just(value13);
    } else {
      return nothing;
    }
  }
  function offsetTop(el) {
    return function() {
      return el.offsetTop;
    };
  }
  function offsetLeft(el) {
    return function() {
      return el.offsetLeft;
    };
  }
  function offsetWidth(el) {
    return function() {
      return el.offsetWidth;
    };
  }
  function offsetHeight(el) {
    return function() {
      return el.offsetHeight;
    };
  }

  // output/Web.HTML.HTMLElement/index.js
  var fromElement = function(x) {
    return _read(Nothing.value, Just.create, x);
  };

  // output/Web.HTML.HTMLInputElement/foreign.js
  function value4(input) {
    return function() {
      return input.value;
    };
  }
  function checkValidity4(input) {
    return function() {
      return input.checkValidity();
    };
  }
  function reportValidity4(input) {
    return function() {
      return input.reportValidity();
    };
  }

  // output/Web.HTML.HTMLInputElement/index.js
  var fromNode2 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLInputElement");
  var fromElement2 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLInputElement");

  // output/Web.HTML.HTMLTextAreaElement/foreign.js
  function value12(textarea) {
    return function() {
      return textarea.value;
    };
  }

  // output/Web.HTML.HTMLTextAreaElement/index.js
  var fromElement3 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLTextAreaElement");

  // output/Web.HTML.Location/foreign.js
  function reload(location2) {
    return function() {
      location2.reload();
    };
  }

  // output/Web.HTML.Window/foreign.js
  function document(window2) {
    return function() {
      return window2.document;
    };
  }
  function location(window2) {
    return function() {
      return window2.location;
    };
  }
  function innerWidth(window2) {
    return function() {
      return window2.innerWidth;
    };
  }
  function innerHeight(window2) {
    return function() {
      return window2.innerHeight;
    };
  }
  function scrollY(window2) {
    return function() {
      return window2.scrollY;
    };
  }

  // output/DomUtils/index.js
  var bind5 = /* @__PURE__ */ bind(bindEffect);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableArray);
  var fromArray2 = /* @__PURE__ */ fromArray(hashableString);
  var map13 = /* @__PURE__ */ map(functorArray);
  var identity8 = /* @__PURE__ */ identity(categoryFn);
  var lookup4 = /* @__PURE__ */ lookup3(hashableString);
  var setStyles = function(styles) {
    return function(element) {
      return setAttribute("style")(joinWith(";")(toArrayBy(function(k) {
        return function(v) {
          return k + (":" + v);
        };
      })(styles)))(element);
    };
  };
  var htmlTag = function(parameters) {
    return function __do4() {
      var element = bind5(bind5(windowImpl)(document))(function() {
        var $36 = createElement(parameters.tagName);
        return function($37) {
          return $36(toDocument($37));
        };
      }())();
      (function() {
        if (parameters.attributes instanceof Just) {
          return traverse_2(function(v) {
            return setAttribute(v.value0)(v.value1)(element);
          })(toArrayBy(Tuple.create)(parameters.attributes.value0))();
        }
        ;
        if (parameters.attributes instanceof Nothing) {
          return unit;
        }
        ;
        throw new Error("Failed pattern match at DomUtils (line 62, column 5 - line 64, column 29): " + [parameters.attributes.constructor.name]);
      })();
      (function() {
        if (parameters.classes instanceof Just) {
          return traverse_2(function(entry) {
            return function __do5() {
              var domTokenList = classList(element)();
              return add2(domTokenList)(entry)();
            };
          })(parameters.classes.value0)();
        }
        ;
        if (parameters.classes instanceof Nothing) {
          return unit;
        }
        ;
        throw new Error("Failed pattern match at DomUtils (line 65, column 5 - line 67, column 29): " + [parameters.classes.constructor.name]);
      })();
      (function() {
        if (parameters.style instanceof Just) {
          return setAttribute("style")(parameters.style.value0)(element)();
        }
        ;
        if (parameters.style instanceof Nothing) {
          return unit;
        }
        ;
        throw new Error("Failed pattern match at DomUtils (line 68, column 5 - line 70, column 29): " + [parameters.style.constructor.name]);
      })();
      (function() {
        if (parameters.contents instanceof Just) {
          return setTextContent(parameters.contents.value0)(toNode(element))();
        }
        ;
        if (parameters.contents instanceof Nothing) {
          return unit;
        }
        ;
        throw new Error("Failed pattern match at DomUtils (line 71, column 5 - line 73, column 29): " + [parameters.contents.constructor.name]);
      })();
      return element;
    };
  };
  var getStyles = function(element) {
    return function __do4() {
      var result = getAttribute("style")(element)();
      if (result instanceof Just) {
        return fromArray2(map13(function(entry) {
          var v = indexOf2(":")(entry);
          if (v instanceof Just) {
            return new Tuple(trim(splitAt3(v.value0)(entry).before), splitAt3(v.value0 + 1 | 0)(entry).after);
          }
          ;
          if (v instanceof Nothing) {
            return new Tuple(entry, "");
          }
          ;
          throw new Error("Failed pattern match at DomUtils (line 78, column 59 - line 81, column 34): " + [v.constructor.name]);
        })(split(";")(result.value0)));
      }
      ;
      if (result instanceof Nothing) {
        return empty4;
      }
      ;
      throw new Error("Failed pattern match at DomUtils (line 77, column 65 - line 83, column 26): " + [result.constructor.name]);
    };
  };
  var getNumberValueFromStyles = function(key) {
    return function(styles) {
      var value1 = maybe("0")(identity8)(lookup4(key)(styles));
      var value22 = maybe("0")(identity8)(stripSuffix("px")(value1));
      return maybe(0)(identity8)(fromString(value22));
    };
  };
  var elementParameters = /* @__PURE__ */ function() {
    return {
      tagName: "div",
      classes: Nothing.value,
      attributes: Nothing.value,
      style: Nothing.value,
      contents: Nothing.value
    };
  }();

  // output/Effect.Now/foreign.js
  function now() {
    return Date.now();
  }
  function getTimezoneOffset() {
    var n = new Date(Date.now());
    return n.getTimezoneOffset();
  }

  // output/Data.DateTime.Instant/foreign.js
  var createDateTime = function(y, m, d, h, mi, s, ms) {
    var dateTime3 = new Date(Date.UTC(y, m, d, h, mi, s, ms));
    if (y >= 0 && y < 100) {
      dateTime3.setUTCFullYear(y);
    }
    return dateTime3;
  };
  function fromDateTimeImpl(y, mo, d, h, mi, s, ms) {
    return createDateTime(y, mo - 1, d, h, mi, s, ms).getTime();
  }
  function toDateTimeImpl(ctor) {
    return function(instant2) {
      var dt = new Date(instant2);
      return ctor(dt.getUTCFullYear())(dt.getUTCMonth() + 1)(dt.getUTCDate())(dt.getUTCHours())(dt.getUTCMinutes())(dt.getUTCSeconds())(dt.getUTCMilliseconds());
    };
  }

  // output/Data.DateTime.Instant/index.js
  var fromJust6 = /* @__PURE__ */ fromJust();
  var toEnum8 = /* @__PURE__ */ toEnum(boundedEnumMonth);
  var fromEnum9 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
  var unInstant = function(v) {
    return v;
  };
  var toDateTime = /* @__PURE__ */ function() {
    var mkDateTime = function(y) {
      return function(mo) {
        return function(d) {
          return function(h) {
            return function(mi) {
              return function(s) {
                return function(ms) {
                  return new DateTime(canonicalDate(y)(fromJust6(toEnum8(mo)))(d), new Time(h, mi, s, ms));
                };
              };
            };
          };
        };
      };
    };
    return toDateTimeImpl(mkDateTime);
  }();
  var fromDateTime = function(v) {
    return fromDateTimeImpl(year(v.value0), fromEnum9(month(v.value0)), day(v.value0), hour(v.value1), minute(v.value1), second(v.value1), millisecond(v.value1));
  };

  // output/Effect.Now/index.js
  var map14 = /* @__PURE__ */ map(functorEffect);
  var nowDateTime = /* @__PURE__ */ map14(toDateTime)(now);
  var nowDate = /* @__PURE__ */ map14(function($3) {
    return date(toDateTime($3));
  })(now);

  // output/Web.DOM.ChildNode/foreign.js
  function remove3(node) {
    return function() {
      return node.remove();
    };
  }

  // output/Web.DOM.NodeList/foreign.js
  function toArray3(list) {
    return function() {
      return [].slice.call(list);
    };
  }

  // output/Web.Event.Event/foreign.js
  function _target(e) {
    return e.target;
  }
  function preventDefault(e) {
    return function() {
      return e.preventDefault();
    };
  }
  function stopPropagation(e) {
    return function() {
      return e.stopPropagation();
    };
  }

  // output/Web.Event.Event/index.js
  var target5 = function($3) {
    return toMaybe(_target($3));
  };

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Web.HTML.Event.EventTypes/index.js
  var domcontentloaded = "DOMContentLoaded";
  var click2 = "click";

  // output/Web.UIEvent.MouseEvent/foreign.js
  function pageY(e) {
    return e.pageY;
  }
  function buttons(e) {
    return e.buttons;
  }

  // output/Web.UIEvent.MouseEvent/index.js
  var fromEvent = /* @__PURE__ */ unsafeReadProtoTagged("MouseEvent");

  // output/Web.UIEvent.MouseEvent.EventTypes/index.js
  var mousemove = "mousemove";

  // output/Calendar/index.js
  var bind6 = /* @__PURE__ */ bind(bindEffect);
  var pure7 = /* @__PURE__ */ pure(applicativeEffect);
  var toEnum9 = /* @__PURE__ */ toEnum(boundedEnumYear);
  var toEnum13 = /* @__PURE__ */ toEnum(boundedEnumHour);
  var toEnum24 = /* @__PURE__ */ toEnum(boundedEnumMinute);
  var toEnum33 = /* @__PURE__ */ toEnum(boundedEnumSecond);
  var toEnum42 = /* @__PURE__ */ toEnum(boundedEnumMillisecond);
  var identity9 = /* @__PURE__ */ identity(categoryFn);
  var toEnum52 = /* @__PURE__ */ toEnum(boundedEnumDay);
  var adjust3 = /* @__PURE__ */ adjust2(durationMinutes);
  var traverse3 = /* @__PURE__ */ traverse(traversableArray)(applicativeEffect);
  var notEq2 = /* @__PURE__ */ notEq(eqHour);
  var bottom3 = /* @__PURE__ */ bottom(boundedHour);
  var show5 = /* @__PURE__ */ show(showNumber);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableArray);
  var insert4 = /* @__PURE__ */ insert3(hashableString);
  var show14 = /* @__PURE__ */ show(showInt);
  var fromEnum10 = /* @__PURE__ */ fromEnum(boundedEnumDay);
  var eq13 = /* @__PURE__ */ eq(eqMonth);
  var eq23 = /* @__PURE__ */ eq(eqWeekday);
  var bottom12 = /* @__PURE__ */ bottom(boundedDay);
  var fromEnum13 = /* @__PURE__ */ fromEnum(boundedEnumYear);
  var show22 = /* @__PURE__ */ show(showMonth);
  var mod5 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromEnum24 = /* @__PURE__ */ fromEnum(boundedEnumWeekday);
  var monthFromString = function(string3) {
    if (string3 === "January") {
      return new Just(January.value);
    }
    ;
    if (string3 === "February") {
      return new Just(February.value);
    }
    ;
    if (string3 === "March") {
      return new Just(March.value);
    }
    ;
    if (string3 === "April") {
      return new Just(April.value);
    }
    ;
    if (string3 === "May") {
      return new Just(May.value);
    }
    ;
    if (string3 === "June") {
      return new Just(June.value);
    }
    ;
    if (string3 === "July") {
      return new Just(July.value);
    }
    ;
    if (string3 === "August") {
      return new Just(August.value);
    }
    ;
    if (string3 === "September") {
      return new Just(September.value);
    }
    ;
    if (string3 === "October") {
      return new Just(October.value);
    }
    ;
    if (string3 === "November") {
      return new Just(November.value);
    }
    ;
    if (string3 === "December") {
      return new Just(December.value);
    }
    ;
    return Nothing.value;
  };
  var getYear = function(calendarElement) {
    return function __do4() {
      var element = querySelector(".year")(toParentNode2(calendarElement))();
      if (element instanceof Just) {
        var dateValue = textContent(toNode(element.value0))();
        var v = fromString2(dateValue);
        if (v instanceof Just) {
          return toEnum9(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Calendar (line 416, column 13 - line 418, column 40): " + [v.constructor.name]);
      }
      ;
      if (element instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Calendar (line 413, column 5 - line 419, column 32): " + [element.constructor.name]);
    };
  };
  var getTime = function(hour2) {
    return function(minute2) {
      return function(second2) {
        return function(millisecond2) {
          var v = toEnum13(function() {
            var $80 = hour2 === 24;
            if ($80) {
              return 0;
            }
            ;
            return hour2;
          }());
          if (v instanceof Just) {
            var v1 = toEnum24(minute2);
            if (v1 instanceof Just) {
              var v2 = toEnum33(second2);
              if (v2 instanceof Just) {
                var v3 = toEnum42(millisecond2);
                if (v3 instanceof Just) {
                  return new Just(new Time(v.value0, v1.value0, v2.value0, v3.value0));
                }
                ;
                if (v3 instanceof Nothing) {
                  return Nothing.value;
                }
                ;
                throw new Error("Failed pattern match at Calendar (line 473, column 37 - line 475, column 39): " + [v3.constructor.name]);
              }
              ;
              if (v2 instanceof Nothing) {
                return Nothing.value;
              }
              ;
              throw new Error("Failed pattern match at Calendar (line 472, column 33 - line 476, column 35): " + [v2.constructor.name]);
            }
            ;
            if (v1 instanceof Nothing) {
              return Nothing.value;
            }
            ;
            throw new Error("Failed pattern match at Calendar (line 471, column 27 - line 477, column 31): " + [v1.constructor.name]);
          }
          ;
          if (v instanceof Nothing) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at Calendar (line 470, column 5 - line 478, column 27): " + [v.constructor.name]);
        };
      };
    };
  };
  var getTimeResult = function(dayElement) {
    return function __do4() {
      var element = querySelector(".timeButton")(toParentNode2(dayElement))();
      if (element instanceof Just) {
        var attribute = getAttribute("title")(element.value0)();
        if (attribute instanceof Just) {
          var times = split("-")(attribute.value0);
          var $91 = length(times) === 2;
          if ($91) {
            var startString = maybe("00:00")(identity9)(head(times));
            var endString = maybe("00:00")(identity9)(last(times));
            var startString$prime = maybe("00")(identity9)(stripSuffix(":00")(startString));
            var endString$prime = maybe("00")(identity9)(stripSuffix(":00")(endString));
            var startValue = maybe(0)(identity9)(fromString2(startString$prime));
            var endValue = maybe(0)(identity9)(fromString2(endString$prime));
            var v = getTime(startValue)(0)(0)(0);
            if (v instanceof Just) {
              var v1 = getTime(endValue)(0)(0)(0);
              if (v1 instanceof Just) {
                return new Just({
                  startTime: v.value0,
                  endTime: v1.value0
                });
              }
              ;
              if (v1 instanceof Nothing) {
                return Nothing.value;
              }
              ;
              throw new Error("Failed pattern match at Calendar (line 460, column 47 - line 462, column 56): " + [v1.constructor.name]);
            }
            ;
            if (v instanceof Nothing) {
              return Nothing.value;
            }
            ;
            throw new Error("Failed pattern match at Calendar (line 459, column 25 - line 463, column 52): " + [v.constructor.name]);
          }
          ;
          return Nothing.value;
        }
        ;
        if (attribute instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Calendar (line 449, column 13 - line 465, column 40): " + [attribute.constructor.name]);
      }
      ;
      if (element instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Calendar (line 446, column 5 - line 466, column 32): " + [element.constructor.name]);
    };
  };
  var getMonth = function(calendarElement) {
    return function __do4() {
      var element = querySelector(".month")(toParentNode2(calendarElement))();
      if (element instanceof Just) {
        var value13 = textContent(toNode(element.value0))();
        return monthFromString(value13);
      }
      ;
      if (element instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Calendar (line 424, column 5 - line 428, column 32): " + [element.constructor.name]);
    };
  };
  var getDay = function(dayElement) {
    return function __do4() {
      var element = querySelector(".label")(toParentNode2(dayElement))();
      if (element instanceof Just) {
        var dateValue = textContent(toNode(element.value0))();
        var v = fromString2(dateValue);
        if (v instanceof Just) {
          return toEnum52(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Calendar (line 436, column 13 - line 438, column 40): " + [v.constructor.name]);
      }
      ;
      if (element instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Calendar (line 433, column 5 - line 439, column 32): " + [element.constructor.name]);
    };
  };
  var createRow = /* @__PURE__ */ function() {
    return htmlTag({
      classes: elementParameters.classes,
      attributes: elementParameters.attributes,
      contents: elementParameters.contents,
      tagName: "div",
      style: new Just("display: block; white-space: nowrap; border-bottom: 1px solid black;")
    });
  }();
  var createOffsetElement = function(offset) {
    return function(rowNode) {
      if (offset === 0) {
        return pure7(unit);
      }
      ;
      if (otherwise) {
        return function __do4() {
          (function __do5() {
            var $143 = htmlTag({
              classes: elementParameters.classes,
              attributes: elementParameters.attributes,
              contents: elementParameters.contents,
              tagName: "div",
              style: new Just("display: inline-block; width: 72px; height: 72px; vertical-align: top;")
            })();
            return function(node) {
              return appendChild(node)(rowNode);
            }(toNode($143))();
          })();
          var $106 = (offset - 1 | 0) > 0;
          if ($106) {
            return createOffsetElement(offset - 1 | 0)(rowNode)();
          }
          ;
          return unit;
        };
      }
      ;
      throw new Error("Failed pattern match at Calendar (line 122, column 1 - line 122, column 50): " + [offset.constructor.name, rowNode.constructor.name]);
    };
  };
  var createDateTime2 = function(date2) {
    return function(time3) {
      var dateTime3 = new DateTime(date2, time3);
      return function __do4() {
        var timezoneOffset = getTimezoneOffset();
        return maybe(dateTime3)(identity9)(adjust3(timezoneOffset)(dateTime3));
      };
    };
  };
  var createDate2 = function(year2) {
    return function(month2) {
      return function(day2) {
        if (year2 instanceof Just) {
          if (month2 instanceof Just) {
            if (day2 instanceof Just) {
              return new Just(canonicalDate(year2.value0)(month2.value0)(day2.value0));
            }
            ;
            if (day2 instanceof Nothing) {
              return Nothing.value;
            }
            ;
            throw new Error("Failed pattern match at Calendar (line 404, column 28 - line 406, column 35): " + [day2.constructor.name]);
          }
          ;
          if (month2 instanceof Nothing) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at Calendar (line 403, column 23 - line 407, column 31): " + [month2.constructor.name]);
        }
        ;
        if (year2 instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Calendar (line 402, column 5 - line 408, column 27): " + [year2.constructor.name]);
      };
    };
  };
  var getCalendarResult = function(element) {
    return function __do4() {
      var year2 = getYear(element)();
      var month2 = getMonth(element)();
      var dayList = querySelectorAll(".day.selected")(toParentNode2(element))();
      var days = toArray3(dayList)();
      var arr = traverse3(function(node) {
        var v = fromNode(node);
        if (v instanceof Just) {
          return function __do5() {
            var timeResult = getTimeResult(v.value0)();
            var day2 = getDay(v.value0)();
            var date2 = createDate2(year2)(month2)(day2);
            if (date2 instanceof Just) {
              if (timeResult instanceof Just) {
                var $116 = notEq2(hour(timeResult.value0.endTime))(bottom3);
                if ($116) {
                  var startDateTime = createDateTime2(date2.value0)(timeResult.value0.startTime)();
                  var endDateTime = createDateTime2(date2.value0)(timeResult.value0.endTime)();
                  return new Just({
                    startTime: startDateTime,
                    endTime: endDateTime
                  });
                }
                ;
                var v1 = adjust(1)(date2.value0);
                if (v1 instanceof Just) {
                  var startDateTime = createDateTime2(date2.value0)(timeResult.value0.startTime)();
                  var endDateTime = createDateTime2(v1.value0)(timeResult.value0.endTime)();
                  return new Just({
                    startTime: startDateTime,
                    endTime: endDateTime
                  });
                }
                ;
                if (v1 instanceof Nothing) {
                  return Nothing.value;
                }
                ;
                throw new Error("Failed pattern match at Calendar (line 374, column 37 - line 379, column 64): " + [v1.constructor.name]);
              }
              ;
              if (timeResult instanceof Nothing) {
                var v1 = getTime(0)(0)(0)(0);
                if (v1 instanceof Just) {
                  var v2 = adjust(1)(date2.value0);
                  if (v2 instanceof Just) {
                    var startDateTime = createDateTime2(date2.value0)(v1.value0)();
                    var endDateTime = createDateTime2(v2.value0)(v1.value0)();
                    return new Just({
                      startTime: startDateTime,
                      endTime: endDateTime
                    });
                  }
                  ;
                  if (v2 instanceof Nothing) {
                    return Nothing.value;
                  }
                  ;
                  throw new Error("Failed pattern match at Calendar (line 383, column 41 - line 388, column 69): " + [v2.constructor.name]);
                }
                ;
                if (v1 instanceof Nothing) {
                  return Nothing.value;
                }
                ;
                throw new Error("Failed pattern match at Calendar (line 381, column 33 - line 389, column 61): " + [v1.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Calendar (line 367, column 25 - line 389, column 61): " + [timeResult.constructor.name]);
            }
            ;
            if (date2 instanceof Nothing) {
              return Nothing.value;
            }
            ;
            throw new Error("Failed pattern match at Calendar (line 365, column 17 - line 390, column 44): " + [date2.constructor.name]);
          };
        }
        ;
        if (v instanceof Nothing) {
          return pure7(Nothing.value);
        }
        ;
        throw new Error("Failed pattern match at Calendar (line 360, column 9 - line 391, column 36): " + [v.constructor.name]);
      })(days)();
      return arr;
    };
  };
  var addTimeElement = function(relativeElement) {
    return function(startTime) {
      return function(endTime) {
        return function(closeHandler) {
          return function __do4() {
            var result = bind6(bind6(windowImpl)(document))(function() {
              var $144 = querySelector("body");
              return function($145) {
                return $144(toParentNode(toDocument($145)));
              };
            }())();
            if (result instanceof Just) {
              var v = fromElement(relativeElement);
              if (v instanceof Just) {
                var x = offsetLeft(v.value0)();
                var y = offsetTop(v.value0)();
                var width8 = offsetWidth(v.value0)();
                var height8 = offsetHeight(v.value0)();
                var containerHeight = 16 * 24;
                var maskElement = htmlTag({
                  attributes: elementParameters.attributes,
                  contents: elementParameters.contents,
                  tagName: "div",
                  style: new Just("position: absolute; left: 0; top: 0; width: 100%; height: 100%;"),
                  classes: new Just(["mask"])
                })();
                appendChild(toNode(maskElement))(toNode(result.value0))();
                var element = htmlTag({
                  attributes: elementParameters.attributes,
                  contents: elementParameters.contents,
                  tagName: "div",
                  style: new Just("display: inline-block; width: 72px; height: " + (show5(containerHeight) + ("px; position: absolute; " + ("left: " + (show5(x + width8 + 8) + ("px; top: " + (show5(y + height8 / 2 - containerHeight / 2) + "px; background-color: white; border-radius: 4px; border: 1px solid gray; box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.8);"))))))),
                  classes: new Just(["time"])
                })();
                appendChild(toNode(element))(toNode(maskElement))();
                var initialY = 16 * toNumber2(startTime);
                var initialHeight = 16 * toNumber2(endTime - startTime | 0);
                var rangeElement = htmlTag({
                  attributes: elementParameters.attributes,
                  contents: elementParameters.contents,
                  tagName: "div",
                  style: new Just("display: inline-block; width: 100%; height: " + (show5(initialHeight) + ("px; position: absolute; left: 0; top: " + (show5(initialY) + "px; background: repeating-linear-gradient(-45deg, white, white 3px, #e0e0e0 0px, #e0e0e0 6px);")))),
                  classes: new Just(["range"])
                })();
                appendChild(toNode(rangeElement))(toNode(element))();
                var scaleContainer = htmlTag({
                  attributes: elementParameters.attributes,
                  contents: elementParameters.contents,
                  tagName: "div",
                  style: new Just("display: block; width: 100%; height: 100%; position: relative;"),
                  classes: new Just(["scale"])
                })();
                appendChild(toNode(scaleContainer))(toNode(element))();
                for_2(range2(0)(23))(function(i) {
                  return function __do5() {
                    var scaleElement = htmlTag({
                      attributes: elementParameters.attributes,
                      tagName: "div",
                      style: new Just("display: block; width: 100%; height: " + (show5(16) + "px; font-size: 8pt; border-bottom: 1px solid black; vertical-align: top; padding: 0 4px; user-select: none;")),
                      classes: new Just(["scale"]),
                      contents: new Just(fromRight("")(formatNumber("00")(toNumber2(i))) + ":00")
                    })();
                    return appendChild(toNode(scaleElement))(toNode(scaleContainer))();
                  };
                })();
                (function __do5() {
                  var handler2 = eventListener(function(event) {
                    return function __do6() {
                      stopPropagation(event)();
                      var rangeElementStyles = getStyles(rangeElement)();
                      var rangeElementY = getNumberValueFromStyles("top")(rangeElementStyles);
                      var rangeElementHeight = getNumberValueFromStyles("height")(rangeElementStyles);
                      var startTime$prime = round2(rangeElementY / 16);
                      var endTime$prime = round2((rangeElementHeight + rangeElementY) / 16);
                      closeHandler(startTime$prime)(endTime$prime)();
                      return remove3(toChildNode(maskElement))();
                    };
                  })();
                  return addEventListener(click2)(handler2)(false)(toEventTarget2(maskElement))();
                })();
                (function __do5() {
                  var handler2 = eventListener(function(event) {
                    return function __do6() {
                      preventDefault(event)();
                      return stopPropagation(event)();
                    };
                  })();
                  return addEventListener(click2)(handler2)(false)(toEventTarget2(element))();
                })();
                var handler = eventListener(function(event) {
                  var v1 = fromEvent(event);
                  if (v1 instanceof Just) {
                    var $129 = buttons(v1.value0) === 0;
                    if ($129) {
                      return pure7(unit);
                    }
                    ;
                    return function __do5() {
                      var rangeElementStyles = getStyles(rangeElement)();
                      var elementY = maybe(pure7(0))(function(elm) {
                        return offsetTop(elm);
                      })(fromElement(element))();
                      var rangeElementY = getNumberValueFromStyles("top")(rangeElementStyles);
                      var rangeElementHeight = getNumberValueFromStyles("height")(rangeElementStyles);
                      var currentY = toNumber2(pageY(v1.value0)) - elementY - 32;
                      var rangeElementPosition = round(currentY / 16) * 16;
                      var distanceTop = abs2(currentY - rangeElementY);
                      var distanceBottom = abs2(currentY - (rangeElementY + rangeElementHeight));
                      var $130 = distanceTop < distanceBottom;
                      if ($130) {
                        var styles = insert4("height")(show5(rangeElementY + rangeElementHeight - rangeElementPosition) + "px")(insert4("top")(show5(rangeElementPosition) + "px")(rangeElementStyles));
                        return setStyles(styles)(rangeElement)();
                      }
                      ;
                      var $131 = distanceTop > distanceBottom;
                      if ($131) {
                        var styles = insert4("height")(show5(containerHeight - rangeElementY - (containerHeight - rangeElementPosition)) + "px")(rangeElementStyles);
                        return setStyles(styles)(rangeElement)();
                      }
                      ;
                      return unit;
                    };
                  }
                  ;
                  if (v1 instanceof Nothing) {
                    return pure7(unit);
                  }
                  ;
                  throw new Error("Failed pattern match at Calendar (line 325, column 25 - line 346, column 49): " + [v1.constructor.name]);
                })();
                return addEventListener(mousemove)(handler)(false)(toEventTarget2(element))();
              }
              ;
              if (v instanceof Nothing) {
                return unit;
              }
              ;
              throw new Error("Failed pattern match at Calendar (line 254, column 13 - line 348, column 37): " + [v.constructor.name]);
            }
            ;
            if (result instanceof Nothing) {
              return unit;
            }
            ;
            throw new Error("Failed pattern match at Calendar (line 252, column 5 - line 349, column 29): " + [result.constructor.name]);
          };
        };
      };
    };
  };
  var addTimeButton = function(parentElement2) {
    return function(applyHandler) {
      return function __do4() {
        var element = htmlTag({
          attributes: elementParameters.attributes,
          contents: elementParameters.contents,
          tagName: "div",
          style: new Just("display: none; width: 40px; height: 40px; position: absolute; right: 16px; top: 16px; opacity: 0.3;"),
          classes: new Just(["timeButton"])
        })();
        appendChild(toNode(element))(toNode(parentElement2))();
        (function __do5() {
          var handler = eventListener(function(event) {
            return function __do6() {
              stopPropagation(event)();
              var parseTime = function(timeString2) {
                var times = split("-")(timeString2);
                var $135 = length(times) === 2;
                if ($135) {
                  var startString = maybe("00")(identity9)(stripSuffix(":00")(maybe("00:00")(identity9)(head(times))));
                  var endString = maybe("00")(identity9)(stripSuffix(":00")(maybe("00:00")(identity9)(last(times))));
                  return {
                    startTime: maybe(0)(identity9)(fromString2(startString)),
                    endTime: maybe(0)(identity9)(fromString2(endString))
                  };
                }
                ;
                return {
                  startTime: 0,
                  endTime: 24
                };
              };
              var title3 = getAttribute("title")(element)();
              var timeString = maybe("")(identity9)(title3);
              var time3 = parseTime(timeString);
              return addTimeElement(parentElement2)(time3.startTime)(time3.endTime)(function(startTime) {
                return function(endTime) {
                  return function __do7() {
                    (function() {
                      var $136 = startTime > 0 || endTime < 24;
                      if ($136) {
                        var formatTime = function(st) {
                          return function(et) {
                            return fromRight("")(formatNumber("00")(toNumber2(st))) + (":00-" + (fromRight("")(formatNumber("00")(toNumber2(et))) + ":00"));
                          };
                        };
                        var styles = getStyles(element)();
                        var styles$prime = insert4("opacity")("1.0")(styles);
                        setStyles(styles$prime)(element)();
                        setAttribute("title")(formatTime(startTime)(endTime))(element)();
                        return unit;
                      }
                      ;
                      var styles = getStyles(element)();
                      var styles$prime = insert4("opacity")("0.3")(styles);
                      setStyles(styles$prime)(element)();
                      setAttribute("title")("")(element)();
                      return unit;
                    })();
                    return applyHandler(startTime)(endTime)();
                  };
                };
              })();
            };
          })();
          return addEventListener(click2)(handler)(false)(toEventTarget2(element))();
        })();
        return element;
      };
    };
  };
  var createCalenderElement = function(date2) {
    return function(rowNode) {
      return function(containerNode) {
        return function __do4() {
          var element = htmlTag({
            attributes: elementParameters.attributes,
            contents: elementParameters.contents,
            tagName: "div",
            style: new Just("display: inline-block; width: " + (show14(72) + ("px; height: " + (show14(72) + "px; vertical-align: top; user-select: none; position: relative;")))),
            classes: new Just(["day"])
          })();
          appendChild(toNode(element))(rowNode)();
          var rangeElement = htmlTag({
            attributes: elementParameters.attributes,
            contents: elementParameters.contents,
            tagName: "div",
            style: new Just("display: none; width: 100%; height: 100%; position: absolute; left: 0; top: 0; background: repeating-linear-gradient(-45deg, white, white 3px, #e0e0e0 0px, #e0e0e0 6px);"),
            classes: new Just(["range"])
          })();
          appendChild(toNode(rangeElement))(toNode(element))();
          var dayLabel = htmlTag({
            attributes: elementParameters.attributes,
            tagName: "div",
            style: new Just("display: inline-block; width: 100%; height: 100%; padding: 4px; position: absolute; left: 0; top: 0;"),
            classes: new Just(["label"]),
            contents: new Just(show14(fromEnum10(day(date2))))
          })();
          appendChild(toNode(dayLabel))(toNode(element))();
          var timeButton = addTimeButton(element)(function(startTime) {
            return function(endTime) {
              var scaleHeight = toNumber2(72) / 24;
              var rangeY = scaleHeight * toNumber2(startTime);
              var rangeHeight = scaleHeight * toNumber2(endTime - startTime | 0);
              return function __do5() {
                var styles = getStyles(rangeElement)();
                return setStyles(insert4("height")(show5(rangeHeight) + "px")(insert4("top")(show5(rangeY) + "px")(styles)))(rangeElement)();
              };
            };
          })();
          (function __do5() {
            var handler = eventListener(function(v2) {
              return function __do6() {
                var domTokenList = classList(element)();
                var selected2 = contains2(domTokenList)("selected")();
                if (selected2) {
                  remove(domTokenList)("selected")();
                  (function __do7() {
                    var styles2 = getStyles(rangeElement)();
                    return setStyles(insert4("display")("none")(styles2))(rangeElement)();
                  })();
                  var styles = getStyles(timeButton)();
                  return setStyles(insert4("display")("none")(styles))(timeButton)();
                }
                ;
                add2(domTokenList)("selected")();
                (function __do7() {
                  var styles2 = getStyles(rangeElement)();
                  return setStyles(insert4("display")("inline-block")(styles2))(rangeElement)();
                })();
                var styles = getStyles(timeButton)();
                return setStyles(insert4("display")("inline-block")(styles))(timeButton)();
              };
            })();
            return addEventListener(click2)(handler)(false)(toEventTarget2(element))();
          })();
          var v = adjust(1)(date2);
          if (v instanceof Just) {
            var $139 = eq13(month(v.value0))(month(date2));
            if ($139) {
              var $140 = eq23(weekday(v.value0))(Sunday.value);
              if ($140) {
                var newRow = createRow();
                var newRowNode = toNode(newRow);
                appendChild(newRowNode)(containerNode)();
                return createCalenderElement(v.value0)(newRowNode)(containerNode)();
              }
              ;
              return createCalenderElement(v.value0)(rowNode)(containerNode)();
            }
            ;
            return unit;
          }
          ;
          if (v instanceof Nothing) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Calendar (line 182, column 5 - line 193, column 29): " + [v.constructor.name]);
        };
      };
    };
  };
  var createCalender = function(year2) {
    return function(month2) {
      return function __do4() {
        var container = htmlTag({
          attributes: elementParameters.attributes,
          contents: elementParameters.contents,
          tagName: "div",
          style: new Just("display: inline-block;"),
          classes: new Just(["calendar"])
        })();
        var containerNode = toNode(container);
        var date2 = canonicalDate(year2)(month2)(bottom12);
        var headerRow = htmlTag({
          classes: elementParameters.classes,
          attributes: elementParameters.attributes,
          contents: elementParameters.contents,
          tagName: "div",
          style: new Just("display: block; text-align: center;")
        })();
        var headerRowNode = toNode(headerRow);
        appendChild(headerRowNode)(containerNode)();
        var yearString = show14(fromEnum13(year2));
        var monthString = show22(month2);
        (function __do5() {
          var $146 = htmlTag({
            attributes: elementParameters.attributes,
            tagName: "div",
            style: new Just("display: inline-block; margin: 0 4px 0 0; font-weight: 600; user-select: none;"),
            classes: new Just(["year"]),
            contents: new Just(yearString)
          })();
          return function(node) {
            return appendChild(node)(headerRowNode);
          }(toNode($146))();
        })();
        (function __do5() {
          var $147 = htmlTag({
            attributes: elementParameters.attributes,
            tagName: "div",
            style: new Just("display: inline-block; margin: 0 0 0 4px; font-weight: 600; user-select: none;"),
            classes: new Just(["month"]),
            contents: new Just(monthString)
          })();
          return function(node) {
            return appendChild(node)(headerRowNode);
          }(toNode($147))();
        })();
        var weekdayRow = htmlTag({
          classes: elementParameters.classes,
          attributes: elementParameters.attributes,
          contents: elementParameters.contents,
          tagName: "div",
          style: new Just("display: block;")
        })();
        var weekdayRowNode = toNode(weekdayRow);
        appendChild(weekdayRowNode)(containerNode)();
        for_2(range2(0)(6))(function(i) {
          var label4 = function() {
            if (i === 0) {
              return "Sun";
            }
            ;
            if (i === 1) {
              return "Mon";
            }
            ;
            if (i === 2) {
              return "Tue";
            }
            ;
            if (i === 3) {
              return "Wed";
            }
            ;
            if (i === 4) {
              return "Thu";
            }
            ;
            if (i === 5) {
              return "Fri";
            }
            ;
            return "Sat";
          }();
          return function __do5() {
            var $148 = htmlTag({
              classes: elementParameters.classes,
              attributes: elementParameters.attributes,
              tagName: "div",
              style: new Just("display: inline-block; width: 72px; padding: 4px; border-bottom: 1px solid black; user-select: none;"),
              contents: new Just(label4)
            })();
            return function(node) {
              return appendChild(node)(weekdayRowNode);
            }(toNode($148))();
          };
        })();
        var row = createRow();
        var rowNode = toNode(row);
        appendChild(rowNode)(containerNode)();
        var weekdayOffset = mod5(fromEnum24(weekday(date2)))(7);
        createOffsetElement(weekdayOffset)(rowNode)();
        createCalenderElement(date2)(rowNode)(containerNode)();
        return container;
      };
    };
  };

  // output/Data.Formatter.DateTime/index.js
  var show6 = /* @__PURE__ */ show(showInt);
  var foldMap2 = /* @__PURE__ */ foldMap(foldableList);
  var foldMap12 = /* @__PURE__ */ foldMap2(monoidString);
  var mapFlipped4 = /* @__PURE__ */ mapFlipped(functorParserT);
  var oneOfAs2 = /* @__PURE__ */ oneOfAs(functorArray)(foldableArray);
  var map15 = /* @__PURE__ */ map(functorParserT);
  var abs3 = /* @__PURE__ */ abs(ordInt)(ringInt);
  var some4 = /* @__PURE__ */ some2(alternativeParserT)(lazyParserT);
  var fromEnum11 = /* @__PURE__ */ fromEnum(boundedEnumYear);
  var show15 = /* @__PURE__ */ show(showMonth);
  var fromEnum14 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
  var fromEnum25 = /* @__PURE__ */ fromEnum(boundedEnumDay);
  var unwrap5 = /* @__PURE__ */ unwrap();
  var fromEnum33 = /* @__PURE__ */ fromEnum(boundedEnumWeekday);
  var show23 = /* @__PURE__ */ show(showWeekday);
  var fromEnum42 = /* @__PURE__ */ fromEnum(boundedEnumHour);
  var mod6 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromEnum52 = /* @__PURE__ */ fromEnum(boundedEnumMinute);
  var fromEnum62 = /* @__PURE__ */ fromEnum(boundedEnumSecond);
  var fromEnum72 = /* @__PURE__ */ fromEnum(boundedEnumMillisecond);
  var div12 = /* @__PURE__ */ div(euclideanRingInt);
  var mapFlipped1 = /* @__PURE__ */ mapFlipped(functorEither);
  var YearFull = /* @__PURE__ */ function() {
    function YearFull2() {
    }
    ;
    YearFull2.value = new YearFull2();
    return YearFull2;
  }();
  var YearTwoDigits = /* @__PURE__ */ function() {
    function YearTwoDigits2() {
    }
    ;
    YearTwoDigits2.value = new YearTwoDigits2();
    return YearTwoDigits2;
  }();
  var YearAbsolute = /* @__PURE__ */ function() {
    function YearAbsolute2() {
    }
    ;
    YearAbsolute2.value = new YearAbsolute2();
    return YearAbsolute2;
  }();
  var MonthFull = /* @__PURE__ */ function() {
    function MonthFull2() {
    }
    ;
    MonthFull2.value = new MonthFull2();
    return MonthFull2;
  }();
  var MonthShort = /* @__PURE__ */ function() {
    function MonthShort2() {
    }
    ;
    MonthShort2.value = new MonthShort2();
    return MonthShort2;
  }();
  var MonthTwoDigits = /* @__PURE__ */ function() {
    function MonthTwoDigits2() {
    }
    ;
    MonthTwoDigits2.value = new MonthTwoDigits2();
    return MonthTwoDigits2;
  }();
  var DayOfMonthTwoDigits = /* @__PURE__ */ function() {
    function DayOfMonthTwoDigits2() {
    }
    ;
    DayOfMonthTwoDigits2.value = new DayOfMonthTwoDigits2();
    return DayOfMonthTwoDigits2;
  }();
  var DayOfMonth = /* @__PURE__ */ function() {
    function DayOfMonth2() {
    }
    ;
    DayOfMonth2.value = new DayOfMonth2();
    return DayOfMonth2;
  }();
  var UnixTimestamp = /* @__PURE__ */ function() {
    function UnixTimestamp2() {
    }
    ;
    UnixTimestamp2.value = new UnixTimestamp2();
    return UnixTimestamp2;
  }();
  var DayOfWeek = /* @__PURE__ */ function() {
    function DayOfWeek2() {
    }
    ;
    DayOfWeek2.value = new DayOfWeek2();
    return DayOfWeek2;
  }();
  var DayOfWeekName = /* @__PURE__ */ function() {
    function DayOfWeekName2() {
    }
    ;
    DayOfWeekName2.value = new DayOfWeekName2();
    return DayOfWeekName2;
  }();
  var DayOfWeekNameShort = /* @__PURE__ */ function() {
    function DayOfWeekNameShort2() {
    }
    ;
    DayOfWeekNameShort2.value = new DayOfWeekNameShort2();
    return DayOfWeekNameShort2;
  }();
  var Hours24 = /* @__PURE__ */ function() {
    function Hours242() {
    }
    ;
    Hours242.value = new Hours242();
    return Hours242;
  }();
  var Hours12 = /* @__PURE__ */ function() {
    function Hours122() {
    }
    ;
    Hours122.value = new Hours122();
    return Hours122;
  }();
  var Meridiem = /* @__PURE__ */ function() {
    function Meridiem2() {
    }
    ;
    Meridiem2.value = new Meridiem2();
    return Meridiem2;
  }();
  var Minutes2 = /* @__PURE__ */ function() {
    function Minutes3() {
    }
    ;
    Minutes3.value = new Minutes3();
    return Minutes3;
  }();
  var MinutesTwoDigits = /* @__PURE__ */ function() {
    function MinutesTwoDigits2() {
    }
    ;
    MinutesTwoDigits2.value = new MinutesTwoDigits2();
    return MinutesTwoDigits2;
  }();
  var Seconds = /* @__PURE__ */ function() {
    function Seconds2() {
    }
    ;
    Seconds2.value = new Seconds2();
    return Seconds2;
  }();
  var SecondsTwoDigits = /* @__PURE__ */ function() {
    function SecondsTwoDigits2() {
    }
    ;
    SecondsTwoDigits2.value = new SecondsTwoDigits2();
    return SecondsTwoDigits2;
  }();
  var Milliseconds2 = /* @__PURE__ */ function() {
    function Milliseconds3() {
    }
    ;
    Milliseconds3.value = new Milliseconds3();
    return Milliseconds3;
  }();
  var MillisecondsShort = /* @__PURE__ */ function() {
    function MillisecondsShort2() {
    }
    ;
    MillisecondsShort2.value = new MillisecondsShort2();
    return MillisecondsShort2;
  }();
  var MillisecondsTwoDigits = /* @__PURE__ */ function() {
    function MillisecondsTwoDigits2() {
    }
    ;
    MillisecondsTwoDigits2.value = new MillisecondsTwoDigits2();
    return MillisecondsTwoDigits2;
  }();
  var Placeholder = /* @__PURE__ */ function() {
    function Placeholder2(value0) {
      this.value0 = value0;
    }
    ;
    Placeholder2.create = function(value0) {
      return new Placeholder2(value0);
    };
    return Placeholder2;
  }();
  var printShortMonth = function(v) {
    if (v instanceof January) {
      return "Jan";
    }
    ;
    if (v instanceof February) {
      return "Feb";
    }
    ;
    if (v instanceof March) {
      return "Mar";
    }
    ;
    if (v instanceof April) {
      return "Apr";
    }
    ;
    if (v instanceof May) {
      return "May";
    }
    ;
    if (v instanceof June) {
      return "Jun";
    }
    ;
    if (v instanceof July) {
      return "Jul";
    }
    ;
    if (v instanceof August) {
      return "Aug";
    }
    ;
    if (v instanceof September) {
      return "Sep";
    }
    ;
    if (v instanceof October) {
      return "Oct";
    }
    ;
    if (v instanceof November) {
      return "Nov";
    }
    ;
    if (v instanceof December) {
      return "Dec";
    }
    ;
    throw new Error("Failed pattern match at Data.Formatter.DateTime (line 489, column 19 - line 501, column 22): " + [v.constructor.name]);
  };
  var placeholderContent = /* @__PURE__ */ mapFlipped4(/* @__PURE__ */ some(alternativeParserT)(lazyParserT)(/* @__PURE__ */ noneOf(/* @__PURE__ */ toCharArray("YMDEHhamsS"))))(fromCharArray);
  var padSingleDigit = function(i) {
    if (i < 0) {
      return "-" + padSingleDigit(-i | 0);
    }
    ;
    if (i < 10) {
      return "0" + show6(i);
    }
    ;
    if (otherwise) {
      return show6(i);
    }
    ;
    throw new Error("Failed pattern match at Data.Formatter.DateTime (line 194, column 1 - line 194, column 32): " + [i.constructor.name]);
  };
  var padQuadrupleDigit = function(i) {
    if (i < 0) {
      return "-" + padQuadrupleDigit(-i | 0);
    }
    ;
    if (i < 10) {
      return "000" + show6(i);
    }
    ;
    if (i < 100) {
      return "00" + show6(i);
    }
    ;
    if (i < 1e3) {
      return "0" + show6(i);
    }
    ;
    if (otherwise) {
      return show6(i);
    }
    ;
    throw new Error("Failed pattern match at Data.Formatter.DateTime (line 207, column 1 - line 207, column 35): " + [i.constructor.name]);
  };
  var padDoubleDigit = function(i) {
    if (i < 0) {
      return "-" + padDoubleDigit(-i | 0);
    }
    ;
    if (i < 10) {
      return "00" + show6(i);
    }
    ;
    if (i < 100) {
      return "0" + show6(i);
    }
    ;
    if (otherwise) {
      return show6(i);
    }
    ;
    throw new Error("Failed pattern match at Data.Formatter.DateTime (line 200, column 1 - line 200, column 32): " + [i.constructor.name]);
  };
  var formatterCommandParser = /* @__PURE__ */ function() {
    return alt(altParserT)(oneOfAs2(monadIdentity)(function($664) {
      return $$try4(string2($664));
    })([new Tuple("YYYY", YearFull.value), new Tuple("YY", YearTwoDigits.value), new Tuple("Y", YearAbsolute.value), new Tuple("MMMM", MonthFull.value), new Tuple("MMM", MonthShort.value), new Tuple("MM", MonthTwoDigits.value), new Tuple("DD", DayOfMonthTwoDigits.value), new Tuple("D", DayOfMonth.value), new Tuple("E", DayOfWeek.value), new Tuple("X", UnixTimestamp.value), new Tuple("dddd", DayOfWeekName.value), new Tuple("ddd", DayOfWeekNameShort.value), new Tuple("HH", Hours24.value), new Tuple("hh", Hours12.value), new Tuple("a", Meridiem.value), new Tuple("mm", MinutesTwoDigits.value), new Tuple("m", Minutes2.value), new Tuple("ss", SecondsTwoDigits.value), new Tuple("s", Seconds.value), new Tuple("SSS", Milliseconds2.value), new Tuple("SS", MillisecondsTwoDigits.value), new Tuple("S", MillisecondsShort.value)]))(map15(Placeholder.create)(placeholderContent));
  }();
  var formatYearTwoDigits = function(i) {
    var dateString = show6(abs3(i));
    var dateLength = length4(dateString);
    if (dateLength === 1) {
      return "0" + dateString;
    }
    ;
    if (dateLength === 2) {
      return dateString;
    }
    ;
    return drop4(dateLength - 2 | 0)(dateString);
  };
  var formatParser2 = /* @__PURE__ */ some4(formatterCommandParser);
  var parseFormatString2 = /* @__PURE__ */ runP(formatParser2);
  var fix12 = function(h) {
    var $618 = h === 0;
    if ($618) {
      return 12;
    }
    ;
    return h;
  };
  var formatCommand = function(v) {
    return function(v1) {
      if (v1 instanceof YearFull) {
        return padQuadrupleDigit(fromEnum11(year(v.value0)));
      }
      ;
      if (v1 instanceof YearTwoDigits) {
        return formatYearTwoDigits(fromEnum11(year(v.value0)));
      }
      ;
      if (v1 instanceof YearAbsolute) {
        return show6(fromEnum11(year(v.value0)));
      }
      ;
      if (v1 instanceof MonthFull) {
        return show15(month(v.value0));
      }
      ;
      if (v1 instanceof MonthShort) {
        return printShortMonth(month(v.value0));
      }
      ;
      if (v1 instanceof MonthTwoDigits) {
        return padSingleDigit(fromEnum14(month(v.value0)));
      }
      ;
      if (v1 instanceof DayOfMonthTwoDigits) {
        return padSingleDigit(fromEnum25(day(v.value0)));
      }
      ;
      if (v1 instanceof DayOfMonth) {
        return show6(fromEnum25(day(v.value0)));
      }
      ;
      if (v1 instanceof UnixTimestamp) {
        return show6(floor2(function(v2) {
          return v2 / 1e3;
        }(unwrap5(unInstant(fromDateTime(v))))));
      }
      ;
      if (v1 instanceof DayOfWeek) {
        return show6(fromEnum33(weekday(v.value0)));
      }
      ;
      if (v1 instanceof DayOfWeekName) {
        return show23(weekday(v.value0));
      }
      ;
      if (v1 instanceof DayOfWeekNameShort) {
        return take4(3)(show23(weekday(v.value0)));
      }
      ;
      if (v1 instanceof Hours24) {
        return padSingleDigit(fromEnum42(hour(v.value1)));
      }
      ;
      if (v1 instanceof Hours12) {
        return padSingleDigit(fix12(mod6(fromEnum42(hour(v.value1)))(12)));
      }
      ;
      if (v1 instanceof Meridiem) {
        var $621 = fromEnum42(hour(v.value1)) >= 12;
        if ($621) {
          return "PM";
        }
        ;
        return "AM";
      }
      ;
      if (v1 instanceof Minutes2) {
        return show6(fromEnum52(minute(v.value1)));
      }
      ;
      if (v1 instanceof MinutesTwoDigits) {
        return padSingleDigit(fromEnum52(minute(v.value1)));
      }
      ;
      if (v1 instanceof Seconds) {
        return show6(fromEnum62(second(v.value1)));
      }
      ;
      if (v1 instanceof SecondsTwoDigits) {
        return padSingleDigit(fromEnum62(second(v.value1)));
      }
      ;
      if (v1 instanceof Milliseconds2) {
        return padDoubleDigit(fromEnum72(millisecond(v.value1)));
      }
      ;
      if (v1 instanceof MillisecondsShort) {
        return show6(function(v2) {
          return div12(v2)(100);
        }(fromEnum72(millisecond(v.value1))));
      }
      ;
      if (v1 instanceof MillisecondsTwoDigits) {
        return padSingleDigit(function(v2) {
          return div12(v2)(10);
        }(fromEnum72(millisecond(v.value1))));
      }
      ;
      if (v1 instanceof Placeholder) {
        return v1.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Formatter.DateTime (line 169, column 38 - line 192, column 21): " + [v1.constructor.name]);
    };
  };
  var format2 = function(f) {
    return function(d) {
      return foldMap12(formatCommand(d))(f);
    };
  };
  var formatDateTime = function(pattern2) {
    return function(datetime) {
      return mapFlipped1(parseFormatString2(pattern2))(function(v) {
        return format2(v)(datetime);
      });
    };
  };

  // output/Effect.Console/foreign.js
  var error2 = function(s) {
    return function() {
      console.error(s);
    };
  };

  // output/Effect.Class.Console/index.js
  var error3 = function(dictMonadEffect) {
    var $79 = liftEffect(dictMonadEffect);
    return function($80) {
      return $79(error2($80));
    };
  };

  // output/JsonUtils/index.js
  var identity10 = /* @__PURE__ */ identity(categoryFn);
  var fromArray3 = /* @__PURE__ */ fromArray(hashableString);
  var map16 = /* @__PURE__ */ map(functorArray);
  var getStringHashMapFromObject = function(key) {
    return function(object) {
      var json3 = maybe(jsonEmptyObject)(identity10)(lookup(key)(object));
      var object_ = maybe(empty)(identity10)(toObject(json3));
      return fromArray3(map16(function(key_) {
        var json_ = maybe(jsonNull)(identity10)(lookup(key_)(object_));
        return new Tuple(key_, maybe("")(identity10)(toString(json_)));
      })(keys(object_)));
    };
  };
  var getStringFromObject = function(key) {
    return function(defaultValue4) {
      return function(object) {
        var json3 = maybe(jsonEmptyString)(identity10)(lookup(key)(object));
        return maybe(defaultValue4)(identity10)(toString(json3));
      };
    };
  };
  var getStringArrayFromObject = function(key) {
    return function(object) {
      var json3 = maybe(jsonEmptyArray)(identity10)(lookup(key)(object));
      var array = maybe([])(identity10)(toArray(json3));
      return map16(function(entry) {
        return maybe("")(identity10)(toString(entry));
      })(array);
    };
  };
  var getObjectFromObject = function(key) {
    return function(object) {
      var json3 = maybe(jsonEmptyObject)(identity10)(lookup(key)(object));
      return maybe(empty)(identity10)(toObject(json3));
    };
  };
  var getNumberFromObject = function(key) {
    return function(defaultValue4) {
      return function(object) {
        var json3 = maybe(jsonEmptyString)(identity10)(lookup(key)(object));
        return maybe(defaultValue4)(identity10)(toNumber(json3));
      };
    };
  };
  var getArrayFromObject = function(key) {
    return function(object) {
      var json3 = maybe(jsonEmptyArray)(identity10)(lookup(key)(object));
      return maybe([])(identity10)(toArray(json3));
    };
  };

  // output/Main/index.js
  var bind7 = /* @__PURE__ */ bind(bindEffect);
  var div3 = /* @__PURE__ */ div(euclideanRingInt);
  var error4 = /* @__PURE__ */ error3(monadEffectEffect);
  var show7 = /* @__PURE__ */ show(showInt);
  var fromArray4 = /* @__PURE__ */ fromArray(hashableString);
  var elem3 = /* @__PURE__ */ elem2(eqString);
  var pure8 = /* @__PURE__ */ pure(applicativeEffect);
  var traverse_3 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableArray);
  var lookup5 = /* @__PURE__ */ lookup3(hashableString);
  var toEnum10 = /* @__PURE__ */ toEnum(boundedEnumYear);
  var toEnum14 = /* @__PURE__ */ toEnum(boundedEnumMonth);
  var adjust4 = /* @__PURE__ */ adjust2(durationMinutes);
  var negateDuration2 = /* @__PURE__ */ negateDuration(durationMinutes);
  var traverse4 = /* @__PURE__ */ traverse(traversableArray)(applicativeEffect);
  var traverseWithIndex2 = /* @__PURE__ */ traverseWithIndex(traversableWithIndexArray)(applicativeEffect);
  var map17 = /* @__PURE__ */ map(functorArray);
  var fromFoldable4 = /* @__PURE__ */ fromFoldable2(foldableArray);
  var not2 = /* @__PURE__ */ not(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean));
  var identity11 = /* @__PURE__ */ identity(categoryFn);
  var show16 = /* @__PURE__ */ show(showNumber);
  var foldM3 = /* @__PURE__ */ foldM(monadEffect);
  var Text = /* @__PURE__ */ function() {
    function Text2() {
    }
    ;
    Text2.value = new Text2();
    return Text2;
  }();
  var MultiSelect = /* @__PURE__ */ function() {
    function MultiSelect2() {
    }
    ;
    MultiSelect2.value = new MultiSelect2();
    return MultiSelect2;
  }();
  var LongText = /* @__PURE__ */ function() {
    function LongText2() {
    }
    ;
    LongText2.value = new LongText2();
    return LongText2;
  }();
  var Calendar = /* @__PURE__ */ function() {
    function Calendar2() {
    }
    ;
    Calendar2.value = new Calendar2();
    return Calendar2;
  }();
  var showThanks = function(message2) {
    return function __do4() {
      var scrollY2 = bind7(windowImpl)(scrollY)();
      var windowWidth = bind7(windowImpl)(innerWidth)();
      var windowHeight = bind7(windowImpl)(innerHeight)();
      var x = div3(windowWidth - 300 | 0)(2);
      var y = round2(scrollY2) + div3(windowHeight - 300 | 0)(2) | 0;
      var body = bind7(bind7(windowImpl)(document))(function() {
        var $141 = querySelector("body");
        return function($142) {
          return $141(toParentNode(toDocument($142)));
        };
      }())();
      if (body instanceof Nothing) {
        return error4("No body element found.")();
      }
      ;
      if (body instanceof Just) {
        var frame = htmlTag({
          attributes: elementParameters.attributes,
          contents: elementParameters.contents,
          tagName: "div",
          classes: new Just(["dialog"]),
          style: new Just("left:" + (show7(x) + ("px; top:" + (show7(y) + ("px; width:" + (show7(300) + ("px; height:" + (show7(160) + "px;"))))))))
        })();
        appendChild(toNode(frame))(toNode(body.value0))();
        var headline = htmlTag({
          classes: elementParameters.classes,
          attributes: elementParameters.attributes,
          tagName: "div",
          style: new Just("font-weight: 600;"),
          contents: new Just(message2)
        })();
        appendChild(toNode(headline))(toNode(frame))();
        var controls2 = htmlTag({
          classes: elementParameters.classes,
          attributes: elementParameters.attributes,
          contents: elementParameters.contents,
          tagName: "div",
          style: new Just("text-align: center; margin: 16px 0;")
        })();
        appendChild(toNode(controls2))(toNode(frame))();
        var applyButton = htmlTag({
          attributes: elementParameters.attributes,
          style: elementParameters.style,
          tagName: "button",
          classes: new Just(["applyButton"]),
          contents: new Just("OK")
        })();
        var listener = eventListener(function(v) {
          return bind7(bind7(windowImpl)(location))(reload);
        })();
        addEventListener(click2)(listener)(false)(toEventTarget2(applyButton))();
        return appendChild(toNode(applyButton))(toNode(controls2))();
      }
      ;
      throw new Error("Failed pattern match at Main (line 198, column 5 - line 230, column 63): " + [body.constructor.name]);
    };
  };
  var loadForm = function(parameters) {
    return function __do4() {
      var form = htmlTag({
        attributes: elementParameters.attributes,
        contents: elementParameters.contents,
        tagName: "div",
        classes: new Just(["question"]),
        style: new Just("margin: 32px 0px;")
      })();
      var headline = htmlTag({
        classes: elementParameters.classes,
        attributes: elementParameters.attributes,
        tagName: "h2",
        style: new Just("font-weight: 600; margin-bottom: 16px"),
        contents: new Just(parameters.title)
      })();
      appendChild(toNode(headline))(toNode(form))();
      var contents = htmlTag({
        classes: elementParameters.classes,
        attributes: elementParameters.attributes,
        style: elementParameters.style,
        contents: elementParameters.contents,
        tagName: "div"
      })();
      appendChild(toNode(contents))(toNode(form))();
      (function() {
        if (parameters.formType instanceof Text) {
          (function __do5() {
            var domTokenList2 = classList(form)();
            return add2(domTokenList2)("text")();
          })();
          var input = htmlTag({
            classes: elementParameters.classes,
            contents: elementParameters.contents,
            tagName: "input",
            style: new Just("width: 100%; height: 32px"),
            attributes: new Just(fromArray4([new Tuple("type", "text")]))
          })();
          appendChild(toNode(input))(toNode(contents))();
          if (parameters.constraints instanceof Just) {
            var $74 = elem3("required")(parameters.constraints.value0);
            if ($74) {
              return setAttribute("required")("required")(input)();
            }
            ;
            return unit;
          }
          ;
          if (parameters.constraints instanceof Nothing) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Main (line 366, column 13 - line 371, column 37): " + [parameters.constraints.constructor.name]);
        }
        ;
        if (parameters.formType instanceof MultiSelect) {
          var domTokenList = classList(form)();
          add2(domTokenList)("multi-select")();
          if (parameters.selection instanceof Just) {
            return traverse_3(function(item) {
              return function __do5() {
                var input2 = htmlTag({
                  attributes: elementParameters.attributes,
                  style: elementParameters.style,
                  tagName: "div",
                  classes: new Just(["checkbox"]),
                  contents: new Just(item)
                })();
                var listener = eventListener(function(event) {
                  var v = target5(event);
                  if (v instanceof Just) {
                    var v1 = fromEventTarget(v.value0);
                    if (v1 instanceof Just) {
                      return function __do6() {
                        var _domTokenList = classList(v1.value0)();
                        var selected2 = contains2(_domTokenList)("selected")();
                        if (selected2) {
                          return remove(_domTokenList)("selected")();
                        }
                        ;
                        return add2(_domTokenList)("selected")();
                      };
                    }
                    ;
                    if (v1 instanceof Nothing) {
                      return pure8(unit);
                    }
                    ;
                    throw new Error("Failed pattern match at Main (line 386, column 33 - line 391, column 57): " + [v1.constructor.name]);
                  }
                  ;
                  if (v instanceof Nothing) {
                    return pure8(unit);
                  }
                  ;
                  throw new Error("Failed pattern match at Main (line 384, column 25 - line 392, column 49): " + [v.constructor.name]);
                })();
                addEventListener(click2)(listener)(false)(toEventTarget2(input2))();
                return appendChild(toNode(input2))(toNode(contents))();
              };
            })(parameters.selection.value0)();
          }
          ;
          if (parameters.selection instanceof Nothing) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Main (line 376, column 13 - line 397, column 37): " + [parameters.selection.constructor.name]);
        }
        ;
        if (parameters.formType instanceof LongText) {
          var domTokenList = classList(form)();
          add2(domTokenList)("long-text")();
          var input = htmlTag({
            classes: elementParameters.classes,
            contents: elementParameters.contents,
            tagName: "textarea",
            style: new Just("width: 100%; height: 80px"),
            attributes: new Just(fromArray4([new Tuple("type", "text")]))
          })();
          return appendChild(toNode(input))(toNode(contents))();
        }
        ;
        if (parameters.formType instanceof Calendar) {
          var domTokenList = classList(form)();
          add2(domTokenList)("calendar")();
          var now2 = nowDate();
          var result = function() {
            if (parameters.attributes instanceof Just) {
              var year$prime = function() {
                var v = lookup5("year")(parameters.attributes.value0);
                if (v instanceof Just) {
                  var v1 = fromString2(v.value0);
                  if (v1 instanceof Just) {
                    var v2 = toEnum10(v1.value0);
                    if (v2 instanceof Just) {
                      return v2.value0;
                    }
                    ;
                    if (v2 instanceof Nothing) {
                      return year(now2);
                    }
                    ;
                    throw new Error("Failed pattern match at Main (line 419, column 45 - line 421, column 68): " + [v2.constructor.name]);
                  }
                  ;
                  if (v1 instanceof Nothing) {
                    return year(now2);
                  }
                  ;
                  throw new Error("Failed pattern match at Main (line 417, column 37 - line 422, column 60): " + [v1.constructor.name]);
                }
                ;
                if (v instanceof Nothing) {
                  return year(now2);
                }
                ;
                throw new Error("Failed pattern match at Main (line 415, column 37 - line 423, column 52): " + [v.constructor.name]);
              }();
              var month$prime = function() {
                var v = lookup5("month")(parameters.attributes.value0);
                if (v instanceof Just) {
                  var v1 = fromString2(v.value0);
                  if (v1 instanceof Just) {
                    var v2 = toEnum14(v1.value0);
                    if (v2 instanceof Just) {
                      return v2.value0;
                    }
                    ;
                    if (v2 instanceof Nothing) {
                      return month(now2);
                    }
                    ;
                    throw new Error("Failed pattern match at Main (line 428, column 45 - line 430, column 69): " + [v2.constructor.name]);
                  }
                  ;
                  if (v1 instanceof Nothing) {
                    return month(now2);
                  }
                  ;
                  throw new Error("Failed pattern match at Main (line 426, column 37 - line 431, column 61): " + [v1.constructor.name]);
                }
                ;
                if (v instanceof Nothing) {
                  return month(now2);
                }
                ;
                throw new Error("Failed pattern match at Main (line 424, column 38 - line 432, column 53): " + [v.constructor.name]);
              }();
              return new Tuple(year$prime, month$prime);
            }
            ;
            if (parameters.attributes instanceof Nothing) {
              return new Tuple(year(now2), month(now2));
            }
            ;
            throw new Error("Failed pattern match at Main (line 413, column 26 - line 435, column 55): " + [parameters.attributes.constructor.name]);
          }();
          var calendar = createCalender(fst(result))(snd(result))();
          return appendChild(toNode(calendar))(toNode(contents))();
        }
        ;
        throw new Error("Failed pattern match at Main (line 355, column 5 - line 437, column 60): " + [parameters.formType.constructor.name]);
      })();
      return form;
    };
  };
  var getCurrentDateTimeString = function __do() {
    var dateTime3 = nowDateTime();
    var minutes = getTimezoneOffset();
    var v = adjust4(negateDuration2(minutes))(dateTime3);
    if (v instanceof Nothing) {
      return Nothing.value;
    }
    ;
    if (v instanceof Just) {
      var v1 = formatDateTime("YYYY-MM-DDTHH:mm:ss")(v.value0);
      if (v1 instanceof Left) {
        return Nothing.value;
      }
      ;
      if (v1 instanceof Right) {
        return new Just(v1.value0);
      }
      ;
      throw new Error("Failed pattern match at Main (line 239, column 13 - line 241, column 51): " + [v1.constructor.name]);
    }
    ;
    throw new Error("Failed pattern match at Main (line 236, column 5 - line 241, column 51): " + [v.constructor.name]);
  };
  var getContentsSetting = function(jsonHandler) {
    return runAff_(function(result) {
      if (result instanceof Left) {
        return error4(message(result.value0));
      }
      ;
      if (result instanceof Right) {
        if (result.value0 instanceof Left) {
          return error4(printError(result.value0.value0));
        }
        ;
        if (result.value0 instanceof Right) {
          return jsonHandler(result.value0.value0.body);
        }
        ;
        throw new Error("Failed pattern match at Main (line 246, column 22 - line 248, column 52): " + [result.value0.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Main (line 244, column 54 - line 248, column 52): " + [result.constructor.name]);
    })(get2(json2)("contents.json"));
  };
  var formTypeFromString = function(v) {
    if (v === "MultiSelect") {
      return MultiSelect.value;
    }
    ;
    if (v === "LongText") {
      return LongText.value;
    }
    ;
    if (v === "Calendar") {
      return Calendar.value;
    }
    ;
    return Text.value;
  };
  var convertCheckboxToModel = function(nodes) {
    return traverse4(function(node) {
      var v = fromNode(node);
      if (v instanceof Just) {
        return function __do4() {
          var domTokenList = classList(v.value0)();
          var selected2 = contains2(domTokenList)("selected")();
          if (selected2) {
            var text5 = textContent(node)();
            return id(text5);
          }
          ;
          return jsonNull;
        };
      }
      ;
      if (v instanceof Nothing) {
        return pure8(jsonNull);
      }
      ;
      throw new Error("Failed pattern match at Main (line 300, column 9 - line 309, column 42): " + [v.constructor.name]);
    })(nodes);
  };
  var convertViewToModel = function(nodes) {
    return traverseWithIndex2(function(index5) {
      return function(node) {
        var v = fromNode(node);
        if (v instanceof Just) {
          return function __do4() {
            var domTokenList = classList(v.value0)();
            var isText = contains2(domTokenList)("text")();
            var isLongText = contains2(domTokenList)("long-text")();
            var isCalendar = contains2(domTokenList)("calendar")();
            if (isText) {
              var _element = querySelector("input")(toParentNode2(v.value0))();
              if (_element instanceof Just) {
                var v1 = fromElement2(_element.value0);
                if (v1 instanceof Just) {
                  var value13 = value4(v1.value0)();
                  return id(singleton2("q" + show7(index5))(id(value13)));
                }
                ;
                if (v1 instanceof Nothing) {
                  return id(empty);
                }
                ;
                throw new Error("Failed pattern match at Main (line 263, column 25 - line 267, column 77): " + [v1.constructor.name]);
              }
              ;
              if (_element instanceof Nothing) {
                return jsonNull;
              }
              ;
              throw new Error("Failed pattern match at Main (line 261, column 17 - line 268, column 50): " + [_element.constructor.name]);
            }
            ;
            if (isLongText) {
              var _element = querySelector("textarea")(toParentNode2(v.value0))();
              if (_element instanceof Just) {
                var v1 = fromElement3(_element.value0);
                if (v1 instanceof Just) {
                  var value13 = value12(v1.value0)();
                  return id(singleton2("q" + show7(index5))(id(value13)));
                }
                ;
                if (v1 instanceof Nothing) {
                  return id(empty);
                }
                ;
                throw new Error("Failed pattern match at Main (line 273, column 25 - line 277, column 77): " + [v1.constructor.name]);
              }
              ;
              if (_element instanceof Nothing) {
                return jsonNull;
              }
              ;
              throw new Error("Failed pattern match at Main (line 271, column 17 - line 278, column 50): " + [_element.constructor.name]);
            }
            ;
            if (isCalendar) {
              var results = getCalendarResult(v.value0)();
              return id(singleton2("q" + show7(index5))(id(map17(function(result) {
                if (result instanceof Just) {
                  var startTimeString = fromRight("")(formatDateTime("YYYY-MM-DDTHH:mm:ss")(result.value0.startTime));
                  var endimeString = fromRight("")(formatDateTime("YYYY-MM-DDTHH:mm:ss")(result.value0.endTime));
                  return id(fromFoldable4([new Tuple("startTime", id(startTimeString)), new Tuple("endTime", id(endimeString))]));
                }
                ;
                if (result instanceof Nothing) {
                  return jsonNull;
                }
                ;
                throw new Error("Failed pattern match at Main (line 282, column 21 - line 287, column 49): " + [result.constructor.name]);
              })(results))));
            }
            ;
            var nodeList = querySelectorAll(".checkbox")(toParentNode2(v.value0))();
            var _nodeList = toArray3(nodeList)();
            var chekboxModel = convertCheckboxToModel(_nodeList)();
            return id(singleton2("q" + show7(index5))(id(filter(function(entry) {
              return not2(isNull)(entry);
            })(chekboxModel))));
          };
        }
        ;
        if (v instanceof Nothing) {
          return pure8(jsonNull);
        }
        ;
        throw new Error("Failed pattern match at Main (line 253, column 5 - line 294, column 38): " + [v.constructor.name]);
      };
    })(nodes);
  };
  var contextPath = "http://localhost:3000";
  var loadMainContents = function __do2() {
    var mainContents = htmlTag({
      attributes: elementParameters.attributes,
      style: elementParameters.style,
      contents: elementParameters.contents,
      tagName: "div",
      classes: new Just(["main"])
    })();
    var contents = htmlTag({
      classes: elementParameters.classes,
      attributes: elementParameters.attributes,
      style: elementParameters.style,
      contents: elementParameters.contents,
      tagName: "div"
    })();
    appendChild(toNode(contents))(toNode(mainContents))();
    getContentsSetting(function(json3) {
      var setting = maybe(empty)(identity11)(toObject(json3));
      return function __do4() {
        var header = htmlTag({
          classes: elementParameters.classes,
          attributes: elementParameters.attributes,
          contents: elementParameters.contents,
          tagName: "div",
          style: new Just("text-align: center;")
        })();
        appendChild(toNode(header))(toNode(contents))();
        var imageSetting = getObjectFromObject("image")(setting);
        (function() {
          var $127 = !isEmpty(imageSetting);
          if ($127) {
            var imagePath = getStringFromObject("path")("")(imageSetting);
            var width8 = getNumberFromObject("width")(0)(imageSetting);
            var height8 = getNumberFromObject("height")(0)(imageSetting);
            var element = htmlTag({
              classes: elementParameters.classes,
              attributes: elementParameters.attributes,
              contents: elementParameters.contents,
              tagName: "div",
              style: new Just("height: " + (show16(height8) + ("px; background-image: url(" + (imagePath + ("); background-position: center 0; background-size: " + (show16(width8) + ("px " + (show16(height8) + "px; background-repeat: no-repeat; margin: 0 0 32px 0;"))))))))
            })();
            return appendChild(toNode(element))(toNode(header))();
          }
          ;
          return unit;
        })();
        var title3 = getStringFromObject("title")("")(setting);
        (function __do5() {
          var element = htmlTag({
            classes: elementParameters.classes,
            attributes: elementParameters.attributes,
            tagName: "h1",
            style: new Just("font-size: large; font-weight: 600; margin-bottom: 8px;"),
            contents: new Just(title3)
          })();
          return appendChild(toNode(element))(toNode(header))();
        })();
        var notes = getStringFromObject("notes")("")(setting);
        traverse_3(function(entry) {
          return function __do5() {
            var element = htmlTag({
              classes: elementParameters.classes,
              attributes: elementParameters.attributes,
              tagName: "p",
              style: new Just("font-size: small; color: gray; margin-bottom: 8px;"),
              contents: new Just(entry)
            })();
            return appendChild(toNode(element))(toNode(header))();
          };
        })(split("\n")(notes))();
        var questions = getArrayFromObject("questions")(setting);
        traverse_3(function(entry) {
          var object = maybe(empty)(identity11)(toObject(entry));
          return function __do5() {
            var element = loadForm({
              title: getStringFromObject("question")("")(object),
              formType: formTypeFromString(getStringFromObject("formType")("")(object)),
              selection: new Just(getStringArrayFromObject("selection")(object)),
              constraints: new Just(getStringArrayFromObject("constraints")(object)),
              attributes: new Just(getStringHashMapFromObject("attributes")(object))
            })();
            return appendChild(toNode(element))(toNode(contents))();
          };
        })(questions)();
        var answerSetting = getObjectFromObject("answer")(setting);
        var buttonLabel = getStringFromObject("button")("")(answerSetting);
        var message2 = getStringFromObject("message")("")(answerSetting);
        var controls2 = htmlTag({
          classes: elementParameters.classes,
          attributes: elementParameters.attributes,
          contents: elementParameters.contents,
          tagName: "div",
          style: new Just("text-align: center;")
        })();
        appendChild(toNode(controls2))(toNode(mainContents))();
        var applyButton = htmlTag({
          attributes: elementParameters.attributes,
          style: elementParameters.style,
          tagName: "button",
          classes: new Just(["applyButton"]),
          contents: new Just(buttonLabel)
        })();
        appendChild(toNode(applyButton))(toNode(controls2))();
        var listener = eventListener(function(v) {
          return function __do5() {
            var inputNodeList = bind7(bind7(windowImpl)(document))(function() {
              var $143 = querySelectorAll("input, textarea");
              return function($144) {
                return $143(toParentNode(toDocument($144)));
              };
            }())();
            var inputList = toArray3(inputNodeList)();
            var valid = foldM3(function(result) {
              return function(inputNode) {
                if (result) {
                  var v1 = fromNode2(inputNode);
                  if (v1 instanceof Just) {
                    return function __do6() {
                      var validity9 = checkValidity4(v1.value0)();
                      var $130 = !validity9;
                      if ($130) {
                        reportValidity4(v1.value0)();
                        return validity9;
                      }
                      ;
                      return validity9;
                    };
                  }
                  ;
                  if (v1 instanceof Nothing) {
                    return pure8(true);
                  }
                  ;
                  throw new Error("Failed pattern match at Main (line 157, column 21 - line 164, column 45): " + [v1.constructor.name]);
                }
                ;
                return pure8(false);
              };
            })(true)(inputList)();
            if (valid) {
              var nodeList = bind7(bind7(windowImpl)(document))(function() {
                var $145 = querySelectorAll("div.question");
                return function($146) {
                  return $145(toParentNode(toDocument($146)));
                };
              }())();
              var answers = bind7(toArray3(nodeList))(convertViewToModel)();
              var dateTime3 = getCurrentDateTimeString();
              var requestBody = id(fromFoldable4([new Tuple("date", id(maybe("")(identity11)(dateTime3))), new Tuple("answers", id(answers))]));
              return runAff_(function(result) {
                if (result instanceof Left) {
                  return error4(message(result.value0));
                }
                ;
                if (result instanceof Right) {
                  if (result.value0 instanceof Left) {
                    return error4(printError(result.value0.value0));
                  }
                  ;
                  if (result.value0 instanceof Right) {
                    return showThanks(message2);
                  }
                  ;
                  throw new Error("Failed pattern match at Main (line 178, column 42 - line 180, column 58): " + [result.value0.constructor.name]);
                }
                ;
                throw new Error("Failed pattern match at Main (line 176, column 33 - line 180, column 58): " + [result.constructor.name]);
              })(post2(string)(contextPath + "/answer")(new Just(json(requestBody))))();
            }
            ;
            return unit;
          };
        })();
        return addEventListener(click2)(listener)(false)(toEventTarget2(applyButton))();
      };
    })();
    return mainContents;
  };
  var domReadyHandler = function(v) {
    return function __do4() {
      var mainContents = loadMainContents();
      var body = bind7(bind7(windowImpl)(document))(function() {
        var $147 = querySelector("body");
        return function($148) {
          return $147(toParentNode(toDocument($148)));
        };
      }())();
      if (body instanceof Nothing) {
        return error4("No body element found.")();
      }
      ;
      if (body instanceof Just) {
        return appendChild(toNode(mainContents))(toNode(body.value0))();
      }
      ;
      throw new Error("Failed pattern match at Main (line 71, column 5 - line 73, column 83): " + [body.constructor.name]);
    };
  };
  var main = function __do3() {
    var win = windowImpl();
    var doc = document(win)();
    var handler = eventListener(domReadyHandler)();
    return addEventListener(domcontentloaded)(handler)(false)(toEventTarget(toDocument(doc)))();
  };

  // <stdin>
  main();
})();
