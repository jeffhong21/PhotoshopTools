"object" !== typeof JSON && (JSON = {});
(function () {
	function m(a) {
		return 10 > a ? "0" + a : a
	}
	function t(a) {
		p.lastIndex = 0;
		return p.test(a) ? '"' + a.replace(p, function (a) {
			var c = u[a];
			return "string" === typeof c ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + a + '"'
	}
	function q(a, l) {
		var c,
		d,
		h,
		r,
		g = e,
		f,
		b = l[a];
		b && "object" === typeof b && "function" === typeof b.toJSON && (b = b.toJSON(a));
		"function" === typeof k && (b = k.call(l, a, b));
		switch (typeof b) {
		case "string":
			return t(b);
		case "number":
			return isFinite(b) ? String(b) : "null";
		case "boolean":
		case "null":
			return String(b);
		case "object":
			if (!b)
				return "null";
			e += n;
			f = [];
			if ("[object Array]" === Object.prototype.toString.apply(b)) {
				r = b.length;
				for (c = 0; c < r; c += 1)
					f[c] = q(c, b) || "null";
				h = 0 === f.length ? "[]" : e ? "[\n" + e + f.join(",\n" + e) + "\n" + g + "]" : "[" + f.join(",") + "]";
				e = g;
				return h
			}
			if (k && "object" === typeof k) {
				r = k.length;
				for (c = 0; c < r; c += 1)
					"string" === typeof k[c] && (d = k[c], (h = q(d, b)) && f.push(t(d) + (e ? ": " : ":") + h))
			} else
				for (d in b)
					Object.prototype.hasOwnProperty.call(b, d) && (h = q(d, b)) && f.push(t(d) + (e ? ": " : ":") + h);
			h = 0 === f.length ? "{}" : e ? "{\n" + e + f.join(",\n" +
					e) + "\n" + g + "}" : "{" + f.join(",") + "}";
			e = g;
			return h
		}
	}
	"function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + m(this.getUTCMonth() + 1) + "-" + m(this.getUTCDate()) + "T" + m(this.getUTCHours()) + ":" + m(this.getUTCMinutes()) + ":" + m(this.getUTCSeconds()) + "Z" : null
	}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
		return this.valueOf()
	});
	var s,
	p,
	e,
	n,
	u,
	k;
	"function" !== typeof JSON.stringify && (p = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		u = {
			"\b" : "\\b",
			"\t" : "\\t",
			"\n" : "\\n",
			"\f" : "\\f",
			"\r" : "\\r",
			'"' : '\\"',
			"\\" : "\\\\"
		}, JSON.stringify = function (a, l, c) {
		var d;
		n = e = "";
		if ("number" === typeof c)
			for (d = 0; d < c; d += 1)
				n += " ";
		else
			"string" === typeof c && (n = c);
		if ((k = l) && "function" !== typeof l && ("object" !== typeof l || "number" !== typeof l.length))
			throw Error("JSON.stringify");
		return q("", {
			"" : a
		})
	});
	"function" !== typeof JSON.parse && (s = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function (a,
			e) {
		function c(a, d) {
			var g,
			f,
			b = a[d];
			if (b && "object" === typeof b)
				for (g in b)
					Object.prototype.hasOwnProperty.call(b, g) && (f = c(b, g), void 0 !== f ? b[g] = f : delete b[g]);
			return e.call(a, d, b)
		}
		var d;
		a = String(a);
		s.lastIndex = 0;
		s.test(a) && (a = a.replace(s, function (a) {
					return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
				}));
		if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
			return d =
				eval("(" + a + ")"), "function" === typeof e ? c({
				"" : d
			}, "") : d;
		throw new SyntaxError("JSON.parse");
	})
})();
