const omegaNumError = "[OmegaNumError] ";
const invalidArgument = omegaNumError + "Invalid argument: ";
const isOmegaNum = /^[-\+]*(Infinity|NaN|(10(\^+|\{[1-9]\d*\})|\(10(\^+|\{[1-9]\d*\})\)\^[1-9]\d* )*((\d+(\.\d*)?|\d*\.\d+)?([Ee][-\+]*))*(0|\d+(\.\d*)?|\d*\.\d+))$/;
const MAX_SAFE_INTEGER = 9007199254740991;
const MAX_E = Math.log10(MAX_SAFE_INTEGER); //15.954589770191003

function decimalPlaces(value, places) {
    const len = places + 1;
    const numDigits = Math.ceil(Math.log10(Math.abs(value)));
    const rounded = Math.round(value * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len);
    return Number(rounded.toFixed(Math.max(len - numDigits, 0)));
}

function f_gamma(n) {
    if (!Number.isFinite(n)) return n;
    if (n < -50) {
        if (n === Math.trunc(n)) return Number.NEGATIVE_INFINITY;
        return 0;
    }
    let scal1 = 1;
    while (n < 10) {
        scal1 = scal1 * n;
        n++;
    }
    n--;;
    let l = 0.9189385332046727; //0.5*Math.log(2*Math.PI)
    l += (n + 0.5) * Math.log(n);
    l -= n;
    let n2 = n * n;
    let np = n;
    l += 1 / (12 * np);
    np *= n2;
    l += 1 / (360 * np);
    np *= np * n2;
    l += 1 / (1260 * np);
    np *= n2;
    l += 1 / (1680 * np);
    np *= n2;
    l += 1 / (1188 * np);
    np *= n2;
    l += 691 / (360360 * np);
    np *= n2;
    l += 7 / (1092 * np);
    np *= n2;
    l += 3617 / (122400 * np);
    return Math.exp(l) / scal1;
}
//All of these are from Patashu's break_eternity.js
const OMEGA = 0.56714329040978387299997; //W(1,0)
//from https://math.stackexchange.com/a/465183
//The evaluation can become inaccurate very close to the branch point
function f_lambertw(z, tol = 1e-10) {
    let w, wn;
    if (!Number.isFinite(z) || z === 0) return z;
    if (z === 1) return OMEGA;
    w = z < 10 ? 0 : Math.log(z) - Math.log(Math.log(z));
    for (let i = 0; i < 100; i++) {
        wn = (z * Math.exp(-w) + w * w) / (w + 1);
        if (Math.abs(wn - w) < tol * Math.abs(wn)) return wn;
        w = wn;
    }
    throw new Error("Iteration failed to converge: " + z);
}

function d_lambertw(z, tol = 1e-10) {
    z = new OmegaNum(z);
    let w, ew, wewz, wn;
    if (!z.isFinite() || z.eq(OmegaNum.ZERO)) return z;
    if (z.eq(OmegaNum.ONE)) return new OmegaNum(OMEGA);
    //Get an initial guess for Halley's method
    w = OmegaNum.ln(z);
    //Halley's method; see 5.9 in [1]
    for (let i = 0; i < 100; i++) {
        ew = OmegaNum.exp(-w);
        wewz = w.sub(z.mul(ew));
        wn = w.sub(wewz.div(w.add(OmegaNum.ONE).sub((w.add(OmegaNum.TWO)).mul(wewz).div((OmegaNum.TWO.mul(w).add(OmegaNum.TWO))))));
        if (OmegaNum.abs(wn.sub(w)).lt(OmegaNum.abs(wn).mul(tol))) return wn;
        w = wn;
    }
    throw new Error("Iteration failed to converge: " + z);
}

class OmegaNum {
    static JSON = 0;
    static STRING = 1;
    static NONE = 0;
    static NORMAL = 1;
    static ALL = 2;
    static maxArrow = 1e3;
    static serializeMode = 0;
    static debug = 0;
    static ZERO = new OmegaNum(0);
    static ONE = new OmegaNum(1);
    static TWO = new OmegaNum(2);
    static TEN = new OmegaNum(10);
    static E = new OmegaNum(Math.E);
    static LN2 = new OmegaNum(Math.LN2);
    static LN10 = new OmegaNum(Math.LN10);
    static LOG2E = new OmegaNum(Math.LOG2E);
    static LOG10E = new OmegaNum(Math.LOG10E);
    static PI = new OmegaNum(Math.PI);
    static SQRT1_2 = new OmegaNum(Math.SQRT1_2);
    static SQRT2 = new OmegaNum(Math.SQRT2);
    static MAX_SAFE_INTEGER = new OmegaNum(MAX_SAFE_INTEGER);
    static MIN_SAFE_INTEGER = new OmegaNum(Number.MIN_SAFE_INTEGER);
    static NaN = new OmegaNum(Number.NaN);
    static NEGATIVE_INFINITY = new OmegaNum(Number.NEGATIVE_INFINITY);
    static POSITIVE_INFINITY = new OmegaNum(Number.POSITIVE_INFINITY);
    static E_MAX_SAFE_INTEGER = new OmegaNum("e" + MAX_SAFE_INTEGER);
    static EE_MAX_SAFE_INTEGER = new OmegaNum("ee" + MAX_SAFE_INTEGER);
    static TETRATED_MAX_SAFE_INTEGER = new OmegaNum("10^^" + MAX_SAFE_INTEGER);

    array = [0];
    sign = 1

    abs() {
        const x = this.clone();
        x.sign = x.sign === 0 ? 0 : 1;
        return x;
    }

    absoluteValue() {
        return this.abs();
    }

    static abs(x) {
        return new OmegaNum(x).abs();
    }

    static absoluteValue(x) {
        return new OmegaNum(x).abs();
    }

    neg() {
        const x = this.clone();
        x.sign = -x.sign;
        return x;
    }

    negate() {
        return this.neg();
    }

    static neg(x) {
        return new OmegaNum(x).neg();
    }

    static negate(x) {
        return new OmegaNum(x).neg();
    }

    cmp(other) {
        if (!(other instanceof OmegaNum))
            other = new OmegaNum(other);
        if (Number.isNaN(this.array[0]) || Number.isNaN(other.array[0]))
            return NaN;
        if (this.array[0] === Infinity && other.array[0] !== Infinity)
            return this.sign;
        if (this.array[0] !== Infinity && other.array[0] === Infinity)
            return -other.sign;
        if (this.array.length === 1 && this.array[0] === 0 && other.array.length === 1 && other.array[0] === 0)
            return 0;
        if (this.sign !== other.sign)
            return this.sign;
        let m = this.sign, r;
        if (this.array.length > other.array.length)
            r = 1;
        else if (this.array.length < other.array.length)
            r = -1;
        else {
            for (let i = this.array.length - 1; i >= 0; --i) {
                if (this.array[i] > other.array[i]) {
                    r = 1;
                    break;
                }
                else if (this.array[i] < other.array[i]) {
                    r = -1;
                    break;
                }
            }
            r ||= 0;
        }
        return r * m;
    }

    compareTo(other) {
        return this.cmp(other);
    }

    static cmp(x, y) {
        return new OmegaNum(x).cmp(y);
    }

    static compare(x, y) {
        return new OmegaNum(x).cmp(y);
    }

    gt(other) {
        return this.cmp(other) > 0;
    }

    greaterThan(other) {
        return this.gt(other);
    }

    static gt(x, y) {
        return new OmegaNum(x).gt(y);
    }

    static greaterThan(x, y) {
        return new OmegaNum(x).gt(y);
    }

    gte(other) {
        return this.cmp(other) >= 0;
    }

    greaterThanOrEqualTo(other) {
        return this.gte(other);
    }

    static gte(x, y) {
        return new OmegaNum(x).gte(y);
    }

    static greaterThanOrEqualTo(x, y) {
        return new OmegaNum(x).gte(y);
    }

    lt(other) {
        return this.cmp(other) < 0;
    }

    lessThan(other) {
        return this.lt(other);
    }

    static lt(x, y) {
        return new OmegaNum(x).lt(y);
    }

    static lessThan(x, y) {
        return new OmegaNum(x).lt(y);
    }

    lte(other) {
        return this.cmp(other) <= 0;
    }

    lessThanOrEqualTo(other) {
        return this.lte(other);
    }

    static lte(x, y) {
        return new OmegaNum(x).lte(y);
    }

    static lessThanOrEqualTo(x, y) {
        return new OmegaNum(x).lte(y);
    }

    eq(other) {
        return this.cmp(other) === 0;
    }

    equal(other) {
        return this.eq(other);
    }

    equalsTo(other) {
        return this.eq(other);
    }

    static eq(x, y) {
        return new OmegaNum(x).eq(y);
    }

    static equal(x, y) {
        return new OmegaNum(x).eq(y);
    }

    static equalsTo(x, y) {
        return new OmegaNum(x).eq(y);
    }

    neq(other) {
        return this.cmp(other) !== 0;
    }

    notEqual(other) {
        return this.neq(other);
    }

    notEqualsTo(other) {
        return this.neq(other);
    }

    static neq(x, y) {
        return new OmegaNum(x).neq(y);
    }

    static notEqual(x, y) {
        return new OmegaNum(x).neq(y);
    }

    static notEqualsTo(x, y) {
        return new OmegaNum(x).neq(y);
    }

    min(other) {
        return this.lt(other) ? this : new OmegaNum(other);
    }

    minimum(other) {
        return this.min(other);
    }

    static min(x, y) {
        return new OmegaNum(x).min(y);
    }

    static minimum(x, y) {
        return new OmegaNum(x).min(y);
    }

    max(other) {
        return this.gt(other) ? this : new OmegaNum(other);
    }

    maximum(other) {
        return this.max(other);
    }

    static max(x, y) {
        return new OmegaNum(x).max(y);
    }

    static maximum(x, y) {
        return new OmegaNum(x).max(y);
    }

    ispos() {
        return this.gt(OmegaNum.ZERO);
    }

    isPositive() {
        return this.ispos();
    }

    static ispos(x) {
        return new OmegaNum(x).ispos();
    }

    static isPositive(x) {
        return new OmegaNum(x).ispos();
    }

    isneg() {
        return this.lt(OmegaNum.ZERO);
    }

    isNegative() {
        return this.isneg();
    }

    static isneg(x) {
        return new OmegaNum(x).isneg();
    }

    static isNegative(x) {
        return new OmegaNum(x).isneg();
    }

    isNaN() {
        return Number.isNaN(this.array[0]);
    }

    static isNaN(x) {
        return new OmegaNum(x).isNaN();
    }

    isFinite() {
        return Number.isFinite(this.array[0]);
    }

    static isFinite(x) {
        return new OmegaNum(x).isFinite();
    }

    isInfinite() {
        return this.array[0] === Infinity;
    }

    static isInfinite(x) {
        return new OmegaNum(x).isInfinite();
    }

    isint() {
        if (this.sign === -1)
            return this.abs().isint();
        if (this.gt(OmegaNum.MAX_SAFE_INTEGER))
            return true;
        return Number.isInteger(this.toNumber());
    }

    isInteger() {
        return this.isint();
    }

    static isint(x) {
        return new OmegaNum(x).isint();
    }

    static isInteger(x) {
        return new OmegaNum(x).isint();
    }

    floor() {
        if (this.isInteger())
            return this;
        return new OmegaNum(Math.floor(this.toNumber()));
    }

    static floor(x) {
        return new OmegaNum(x).floor();
    }

    ceil() {
        if (this.isInteger())
            return this;
        return new OmegaNum(Math.ceil(this.toNumber()));
    }

    ceiling() {
        return this.ceil();
    }

    static ceil(x) {
        return new OmegaNum(x).ceil();
    }

    static ceiling(x) {
        return new OmegaNum(x).ceil();
    }

    round() {
        if (this.isInteger())
            return this;
        return new OmegaNum(Math.round(this.toNumber()));
    }

    static round(x) {
        return new OmegaNum(x).round();
    }

    add(otherIn) {
        const x = this;
        const other = otherIn instanceof OmegaNum ? otherIn : new OmegaNum(otherIn);
        if (OmegaNum.debug >= OmegaNum.NORMAL)
            console.log(this + "+" + other);
        if (x.sign === -1)
            return x.neg().add(other.neg()).neg();
        if (other.sign === -1)
            return x.sub(other.neg());
        if (x.eq(OmegaNum.ZERO))
            return other;
        if (other.eq(OmegaNum.ZERO))
            return x;
        if (x.isNaN() || other.isNaN() || x.isInfinite() && other.isInfinite() && x.eq(other.neg()))
            return OmegaNum.NaN.clone();
        if (x.isInfinite())
            return x;
        if (other.isInfinite())
            return other;
        const p = x.min(other);
        const q = x.max(other);
        let t;
        if (q.gt(OmegaNum.E_MAX_SAFE_INTEGER) || q.div(p).gt(OmegaNum.MAX_SAFE_INTEGER)) {
            t = q;
        }
        else if (!q.array[1]) {
            t = new OmegaNum(x.toNumber() + other.toNumber());
        }
        else if (q.array[1] === 1) {
            const a = p.array[1] ? p.array[0] : Math.log10(p.array[0]);
            t = new OmegaNum([a + Math.log10(Math.pow(10, q.array[0] - a) + 1), 1]);
        }
        else {
            throw new Error("Unexpected error");
        }
        return t;
    }

    plus(other) {
        return this.add(other);
    }

    static add(x, y) {
        return new OmegaNum(x).add(y);
    }

    static plus(x, y) {
        return new OmegaNum(x).add(y);
    }

    sub(otherIn) {
        const x = this;
        const other = new OmegaNum(otherIn);
        if (OmegaNum.debug >= OmegaNum.NORMAL)
            console.log(x + "-" + other);
        if (x.sign === -1)
            return x.neg().sub(other.neg()).neg();
        if (other.sign === -1)
            return x.add(other.neg());
        if (x.eq(other))
            return OmegaNum.ZERO;
        if (other.eq(OmegaNum.ZERO))
            return x;
        if (x.isNaN() || other.isNaN() || x.isInfinite() && other.isInfinite())
            return OmegaNum.NaN;
        if (x.isInfinite())
            return x;
        if (other.isInfinite())
            return other.neg();
        const p = x.min(other);
        const q = x.max(other);
        const n = other.gt(x);
        let t;
        if (q.gt(OmegaNum.E_MAX_SAFE_INTEGER) || q.div(p).gt(OmegaNum.MAX_SAFE_INTEGER)) {
            t = q;
            t = n ? t.neg() : t;
        }
        else if (!q.array[1]) {
            t = new OmegaNum(x.toNumber() - other.toNumber());
        }
        else if (q.array[1] === 1) {
            var a = p.array[1] ? p.array[0] : Math.log10(p.array[0]);
            t = new OmegaNum([a + Math.log10(Math.pow(10, q.array[0] - a) - 1), 1]);
            t = n ? t.neg() : t;
        }
        else {
            throw new Error("Unexpected error");
        }
        return t;
    }

    minus(other) {
        return this.sub(other);
    }

    static sub(x, y) {
        return new OmegaNum(x).sub(y);
    }

    static minus(x, y) {
        return new OmegaNum(x).sub(y);
    }

    mul(otherIn) {
        const x = this;
        const other = new OmegaNum(otherIn);
        if (OmegaNum.debug >= OmegaNum.NORMAL)
            console.log(x + "*" + other);
        if (x.sign * other.sign === -1)
            return x.abs().mul(other.abs()).neg();
        if (x.sign === -1)
            return x.abs().mul(other.abs());
        if (x.isNaN() || other.isNaN() || x.eq(OmegaNum.ZERO) && other.isInfinite() || x.isInfinite() && other.abs().eq(OmegaNum.ZERO))
            return OmegaNum.NaN;
        if (other.eq(OmegaNum.ZERO))
            return OmegaNum.ZERO;
        if (other.eq(OmegaNum.ONE))
            return x.clone();
        if (x.isInfinite())
            return x;
        if (other.isInfinite())
            return other;
        if (x.max(other).gt(OmegaNum.EE_MAX_SAFE_INTEGER))
            return x.max(other);
        const n = x.toNumber() * other.toNumber();
        if (n <= MAX_SAFE_INTEGER)
            return new OmegaNum(n);
        return OmegaNum.TEN.pow(x.log10().add(other.log10()));
    }

    times(other) {
        return this.mul(other);
    }

    static mul(x, y) {
        return new OmegaNum(x).mul(y);
    }

    static times(x, y) {
        return new OmegaNum(x).mul(y);
    }

    div(otherIn) {
        const x = this;
        const other = new OmegaNum(otherIn);
        if (OmegaNum.debug >= OmegaNum.NORMAL)
            console.log(x + "/" + other);
        if (x.sign * other.sign === -1)
            return x.abs().div(other.abs()).neg();
        if (x.sign === -1)
            return x.abs().div(other.abs());
        if (x.isNaN() || other.isNaN() || x.isInfinite() && other.isInfinite() || x.eq(OmegaNum.ZERO) && other.eq(OmegaNum.ZERO))
            return OmegaNum.NaN;
        if (other.eq(OmegaNum.ZERO))
            return OmegaNum.POSITIVE_INFINITY;
        if (other.eq(OmegaNum.ONE))
            return x.clone();
        if (x.eq(other))
            return OmegaNum.ONE;
        if (x.isInfinite())
            return x;
        if (other.isInfinite())
            return OmegaNum.ZERO;
        if (x.max(other).gt(OmegaNum.EE_MAX_SAFE_INTEGER))
            return x.gt(other) ? x : OmegaNum.ZERO;
        var n = x.toNumber() / other.toNumber();
        if (n <= MAX_SAFE_INTEGER)
            return new OmegaNum(n);
        const pw = OmegaNum.TEN.pow(x.log10().sub(other.log10()));
        const fp = pw.floor();
        if (pw.sub(fp).lt(1e-9))
            return fp;
        return pw;
    }

    divide(other) {
        return this.div(other);
    }

    static div(x, y) {
        return new OmegaNum(x).div(y);
    }

    static divide(x, y) {
        return new OmegaNum(x).div(y);
    }

    rec() {
        if (OmegaNum.debug >= OmegaNum.NORMAL)
            console.log(this + "^-1");
        if (this.isNaN() || this.eq(OmegaNum.ZERO))
            return OmegaNum.NaN;
        if (this.abs().gt("2e323"))
            return OmegaNum.ZERO;
        return new OmegaNum(1 / this.toNumber());
    }

    reciprocate() {
        return this.rec();
    }

    static rec(x) {
        return new OmegaNum(x).rec();
    }

    static reciprocate(x) {
        return new OmegaNum(x).rec();
    }

    mod(otherIn) {
        const other = new OmegaNum(otherIn);
        if (other.eq(OmegaNum.ZERO))
            return OmegaNum.ZERO;
        if (this.sign * other.sign === -1)
            return this.abs().mod(other.abs()).neg();
        if (this.sign === -1)
            return this.abs().mod(other.abs());
        return this.sub(this.div(other).floor().mul(other));
    }

    modular(other) {
        return this.mod(other);
    }

    static mod(x, y) {
        return new OmegaNum(x).mod(y);
    }

    static modular(x, y) {
        return new OmegaNum(x).mod(y);
    }

    gamma() {
        const x = this;
        if (x.gt(OmegaNum.TETRATED_MAX_SAFE_INTEGER))
            return x;
        if (x.gt(OmegaNum.E_MAX_SAFE_INTEGER))
            return OmegaNum.exp(x);
        if (x.gt(OmegaNum.MAX_SAFE_INTEGER))
            return OmegaNum.exp(OmegaNum.mul(x, OmegaNum.ln(x).sub(1)));
        var n = x.array[0];
        if (n > 1) {
            if (n < 24)
                return new OmegaNum(f_gamma(x.sign * n));
            var t = n - 1;
            var l = 0.9189385332046727; //0.5*Math.log(2*Math.PI)
            l += ((t + 0.5) * Math.log(t));
            l -= t;
            var n2 = t * t;
            var np = t;
            var lm = 12 * np;
            var adj = 1 / lm;
            var l2 = l + adj;
            if (l2 == l)
                return OmegaNum.exp(l);
            l = l2;
            np *= n2;
            lm = 360 * np;
            adj = 1 / lm;
            l2 = l - adj;
            if (l2 == l)
                return OmegaNum.exp(l);
            l = l2;
            np *= n2;
            lm = 1260 * np;
            var lt = 1 / lm;
            l += lt;
            np *= n2;
            lm = 1680 * np;
            lt = 1 / lm;
            l -= lt;
            return OmegaNum.exp(l);
        }
        else
            return this.rec();
    }

    static gamma(x) {
        return new OmegaNum(x).gamma();
    }

    static factorials = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368000, 20922789888000, 355687428096000, 6402373705728000, 121645100408832000, 2432902008176640000, 51090942171709440000, 1.1240007277776076800e+21, 2.5852016738884978213e+22, 6.2044840173323941000e+23, 1.5511210043330986055e+25, 4.0329146112660565032e+26, 1.0888869450418351940e+28, 3.0488834461171387192e+29, 8.8417619937397018986e+30, 2.6525285981219106822e+32, 8.2228386541779224302e+33, 2.6313083693369351777e+35, 8.6833176188118859387e+36, 2.9523279903960415733e+38, 1.0333147966386145431e+40, 3.7199332678990125486e+41, 1.3763753091226345579e+43, 5.2302261746660111714e+44, 2.0397882081197444123e+46, 8.1591528324789768380e+47, 3.3452526613163807956e+49, 1.4050061177528799549e+51, 6.0415263063373834074e+52, 2.6582715747884488694e+54, 1.1962222086548018857e+56, 5.5026221598120891536e+57, 2.5862324151116817767e+59, 1.2413915592536072528e+61, 6.0828186403426752249e+62, 3.0414093201713375576e+64, 1.5511187532873821895e+66, 8.0658175170943876846e+67, 4.2748832840600254848e+69, 2.3084369733924137924e+71, 1.2696403353658276447e+73, 7.1099858780486348103e+74, 4.0526919504877214100e+76, 2.3505613312828784949e+78, 1.3868311854568983861e+80, 8.3209871127413898951e+81, 5.0758021387722483583e+83, 3.1469973260387939390e+85, 1.9826083154044400850e+87, 1.2688693218588416544e+89, 8.2476505920824715167e+90, 5.4434493907744306945e+92, 3.6471110918188683221e+94, 2.4800355424368305480e+96, 1.7112245242814129738e+98, 1.1978571669969892213e+100, 8.5047858856786230047e+101, 6.1234458376886084639e+103, 4.4701154615126843855e+105, 3.3078854415193862416e+107, 2.4809140811395399745e+109, 1.8854947016660503806e+111, 1.4518309202828587210e+113, 1.1324281178206296794e+115, 8.9461821307829757136e+116, 7.1569457046263805709e+118, 5.7971260207473678414e+120, 4.7536433370128420198e+122, 3.9455239697206587884e+124, 3.3142401345653531943e+126, 2.8171041143805501310e+128, 2.4227095383672734128e+130, 2.1077572983795278544e+132, 1.8548264225739843605e+134, 1.6507955160908460244e+136, 1.4857159644817615149e+138, 1.3520015276784029158e+140, 1.2438414054641308179e+142, 1.1567725070816415659e+144, 1.0873661566567430754e+146, 1.0329978488239059305e+148, 9.9167793487094964784e+149, 9.6192759682482120384e+151, 9.4268904488832479837e+153, 9.3326215443944153252e+155, 9.3326215443944150966e+157, 9.4259477598383598816e+159, 9.6144667150351270793e+161, 9.9029007164861804721e+163, 1.0299016745145628100e+166, 1.0813967582402909767e+168, 1.1462805637347083683e+170, 1.2265202031961380050e+172, 1.3246418194518290179e+174, 1.4438595832024936625e+176, 1.5882455415227430287e+178, 1.7629525510902445874e+180, 1.9745068572210740115e+182, 2.2311927486598137657e+184, 2.5435597334721876552e+186, 2.9250936934930159967e+188, 3.3931086844518980862e+190, 3.9699371608087210616e+192, 4.6845258497542909237e+194, 5.5745857612076058231e+196, 6.6895029134491271205e+198, 8.0942985252734440920e+200, 9.8750442008336010580e+202, 1.2146304367025329301e+205, 1.5061417415111409314e+207, 1.8826771768889261129e+209, 2.3721732428800468512e+211, 3.0126600184576594309e+213, 3.8562048236258040716e+215, 4.9745042224772874590e+217, 6.4668554892204741474e+219, 8.4715806908788206314e+221, 1.1182486511960043298e+224, 1.4872707060906857134e+226, 1.9929427461615187928e+228, 2.6904727073180504073e+230, 3.6590428819525488642e+232, 5.0128887482749919605e+234, 6.9177864726194885808e+236, 9.6157231969410893532e+238, 1.3462012475717525742e+241, 1.8981437590761708898e+243, 2.6953641378881628530e+245, 3.8543707171800730787e+247, 5.5502938327393044385e+249, 8.0479260574719917061e+251, 1.1749972043909107097e+254, 1.7272458904546389230e+256, 2.5563239178728653927e+258, 3.8089226376305697893e+260, 5.7133839564458546840e+262, 8.6272097742332399855e+264, 1.3113358856834524492e+267, 2.0063439050956822953e+269, 3.0897696138473507759e+271, 4.7891429014633940780e+273, 7.4710629262828942235e+275, 1.1729568794264144743e+278, 1.8532718694937349890e+280, 2.9467022724950384028e+282, 4.7147236359920616095e+284, 7.5907050539472189932e+286, 1.2296942187394494177e+289, 2.0044015765453026266e+291, 3.2872185855342959088e+293, 5.4239106661315886750e+295, 9.0036917057784375454e+297, 1.5036165148649991456e+300, 2.5260757449731984219e+302, 4.2690680090047051083e+304, 7.2574156153079990350e+306];
    
    fact() {
        const x = this;
        const f = OmegaNum.factorials;
        if (x.lt(OmegaNum.ZERO) || !x.isint())
            return x.add(1).gamma();
        if (x.lte(170))
            return new OmegaNum(f[+x]);
        const errorFixer = 1;
        let e = +x;
        if (e < 500)
            e += 163879 / 209018880 * Math.pow(e, 5);
        if (e < 1000)
            e += -571 / 2488320 * Math.pow(e, 4);
        if (e < 50000)
            e += -139 / 51840 * Math.pow(e, 3);
        if (e < 1e7)
            e += 1 / 288 * Math.pow(e, 2);
        if (e < 1e20)
            e += 1 / 12 * e;
        return x.div(OmegaNum.E).pow(x).mul(x.mul(OmegaNum.PI).mul(2).sqrt()).times(errorFixer);
    }

    factorial() {
        return this.fact();
    }

    static fact(x) {
        return new OmegaNum(x).fact();
    }

    static factorial(x) {
        return new OmegaNum(x).fact();
    }

    pow(otherIn) {
        var other = new OmegaNum(otherIn);
        if (OmegaNum.debug >= OmegaNum.NORMAL)
            console.log(this + "^" + other);
        if (other.eq(OmegaNum.ZERO))
            return OmegaNum.ONE.clone();
        if (other.eq(OmegaNum.ONE))
            return this.clone();
        if (other.lt(OmegaNum.ZERO))
            return this.pow(other.neg()).rec();
        if (this.lt(OmegaNum.ZERO) && other.isint()) {
            if (other.mod(2).lt(OmegaNum.ONE))
                return this.abs().pow(other);
            return this.abs().pow(other).neg();
        }
        if (this.lt(OmegaNum.ZERO))
            return OmegaNum.NaN.clone();
        if (this.eq(OmegaNum.ONE))
            return OmegaNum.ONE.clone();
        if (this.eq(OmegaNum.ZERO))
            return OmegaNum.ZERO.clone();
        if (this.max(other).gt(OmegaNum.TETRATED_MAX_SAFE_INTEGER))
            return this.max(other);
        if (this.eq(10)) {
            if (other.gt(OmegaNum.ZERO)) {
                other.array[1] = (other.array[1] + 1) || 1;
                other.standardize();
                return other;
            }
            else {
                return new OmegaNum(Math.pow(10, other.toNumber()));
            }
        }
        if (other.lt(OmegaNum.ONE))
            return this.root(other.rec());
        var n = Math.pow(this.toNumber(), other.toNumber());
        if (n <= MAX_SAFE_INTEGER)
            return new OmegaNum(n);
        return OmegaNum.pow(10, this.log10().mul(other));
    }

    toPower(other) {
        return this.pow(other);
    }

    static pow(x, y) {
        return new OmegaNum(x).pow(y);
    }

    static toPower(x, y) {
        return new OmegaNum(x).pow(y);
    }

    exp() {
        return OmegaNum.pow(Math.E, this);
    }

    exponential() {
       return this.exp();
    }

    static exp(x) {
        return OmegaNum.pow(Math.E, x);
    }

    static exponential(x) {
        return new OmegaNum(x).exp();
    }

    sqrt() {
        return this.root(2);
    }

    squareRoot() {
        return this.sqrt();
    }

    static sqrt(x) {
        return new OmegaNum(x).root(2);
    }

    static squareRoot(x) {
        return new OmegaNum(x).sqrt();
    }

    cbrt() {
        return this.root(3);
    }

    cubeRoot() {
        return this.cbrt();
    }

    static cbrt(x) {
        return new OmegaNum(x).root(3);
    }

    static cubeRoot(x) {
        return new OmegaNum(x).cbrt();
    }

    root(otherIn) {
        var other = new OmegaNum(otherIn);
        if (OmegaNum.debug >= OmegaNum.NORMAL)
            console.log(this + "root" + other);
        if (other.eq(OmegaNum.ONE))
            return this.clone();
        if (other.lt(OmegaNum.ZERO))
            return this.root(other.neg()).rec();
        if (other.lt(OmegaNum.ONE))
            return this.pow(other.rec());
        if (this.lt(OmegaNum.ZERO) && other.isint() && other.mod(2).eq(OmegaNum.ONE))
            return this.neg().root(other).neg();
        if (this.lt(OmegaNum.ZERO))
            return OmegaNum.NaN.clone();
        if (this.eq(OmegaNum.ONE))
            return OmegaNum.ONE.clone();
        if (this.eq(OmegaNum.ZERO))
            return OmegaNum.ZERO.clone();
        if (this.max(other).gt(OmegaNum.TETRATED_MAX_SAFE_INTEGER))
            return this.gt(other) ? this.clone() : OmegaNum.ZERO.clone();
        return OmegaNum.pow(10, this.log10().div(other));
    }

    static root(x, y) {
        return new OmegaNum(x).root(y);
    }

    log10() {
        var x = this.clone();
        if (OmegaNum.debug >= OmegaNum.NORMAL)
            console.log("log" + this);
        if (x.lt(OmegaNum.ZERO))
            return OmegaNum.NaN.clone();
        if (x.eq(OmegaNum.ZERO))
            return OmegaNum.NEGATIVE_INFINITY.clone();
        if (x.lte(OmegaNum.MAX_SAFE_INTEGER))
            return new OmegaNum(Math.log10(x.toNumber()));
        if (!x.isFinite())
            return x;
        if (x.gt(OmegaNum.TETRATED_MAX_SAFE_INTEGER))
            return x;
        x.array[1]--;
        return x.standardize();
    }

    generalLogarithm() {
        return this.log10();
    }

    static log10(x) {
        return new OmegaNum(x).log10();
    }

    static generalLogarithm(x) {
        return new OmegaNum(x).log10();
    }

    logBase(base) {
        if (base === undefined)
            base = Math.E;
        return this.log10().div(OmegaNum.log10(base));
    }

    logarithm(base) {
        return this.logBase(base);
    }

    static logBase(x, base) {
        return new OmegaNum(x).logBase(base);
    }

    static logarithm(x, base) {
        return new OmegaNum(x).logBase(base);
    }

    ln() {
        return this.logBase(Math.E);
    }

    log() {
        return this.ln();
    }

    naturalLogarithm() {
        return this.ln();
    }

    static ln(x) {
        return new OmegaNum(x).ln();
    }

    static log(x) {
        return new OmegaNum(x).ln();
    }

    static naturalLogarithm(x) {
        return new OmegaNum(x).ln();
    }
    
    lambertw() {
        var x = this.clone();
        if (x.isNaN())
            return x;
        if (x.lt(-0.3678794411710499))
            throw Error("lambertw is unimplemented for results less than -1, sorry!");
        if (x.gt(OmegaNum.TETRATED_MAX_SAFE_INTEGER))
            return x;
        if (x.gt(OmegaNum.EE_MAX_SAFE_INTEGER)) {
            x.array[1]--;
            return x;
        }
        if (x.gt(OmegaNum.MAX_SAFE_INTEGER))
            return d_lambertw(x);
        else
            return new OmegaNum(f_lambertw(x.sign * x.array[0]));
    }

    static lambertw(x) {
        return new OmegaNum(x).lambertw();
    }
    
    tetr(otherIn, payloadIn) {
        if (payloadIn === undefined)
            payloadIn = OmegaNum.ONE;
        var t = this.clone();
        var other = new OmegaNum(otherIn);
        var payload = new OmegaNum(payloadIn);
        if (payload.neq(OmegaNum.ONE))
            other = other.add(payload.slog(t));
        if (OmegaNum.debug >= OmegaNum.NORMAL)
            console.log(t + "^^" + other);
        var negln;
        if (t.isNaN() || other.isNaN() || payload.isNaN())
            return OmegaNum.NaN.clone();
        if (other.isInfinite() && other.sign > 0) {
            if (t.gte(Math.exp(1 / Math.E)))
                return OmegaNum.POSITIVE_INFINITY.clone();
            negln = t.ln().neg();
            return negln.lambertw().div(negln);
        }
        if (other.lte(-2))
            return OmegaNum.NaN.clone();
        if (t.eq(OmegaNum.ZERO)) {
            if (other.eq(OmegaNum.ZERO))
                return OmegaNum.NaN.clone();
            if (other.mod(2).eq(OmegaNum.ZERO))
                return OmegaNum.ZERO.clone();
            return OmegaNum.ONE.clone();
        }
        if (t.eq(OmegaNum.ONE)) {
            if (other.eq(OmegaNum.ONE.neg()))
                return OmegaNum.NaN.clone();
            return OmegaNum.ONE.clone();
        }
        if (other.eq(OmegaNum.ONE.neg()))
            return OmegaNum.ZERO.clone();
        if (other.eq(OmegaNum.ZERO))
            return OmegaNum.ONE.clone();
        if (other.eq(OmegaNum.ONE))
            return t;
        if (other.eq(2))
            return t.pow(t);
        if (t.eq(2)) {
            if (other.eq(3))
                return new OmegaNum(16);
            if (other.eq(4))
                return new OmegaNum(65536);
        }
        var m = t.max(other);
        if (m.gt("10^^^" + MAX_SAFE_INTEGER))
            return m;
        if (m.gt(OmegaNum.TETRATED_MAX_SAFE_INTEGER) || other.gt(OmegaNum.MAX_SAFE_INTEGER)) {
            if (this.lt(Math.exp(1 / Math.E))) {
                negln = t.ln().neg();
                return negln.lambertw().div(negln);
            }
            var j = t.slog(10).add(other);
            j.array[2] = (j.array[2] || 0) + 1;
            j.standardize();
            return j;
        }
        var y = other.toNumber();
        var f = Math.floor(y);
        var r = t.pow(y - f);
        var l = OmegaNum.NaN;
        for (var i = 0, m = OmegaNum.E_MAX_SAFE_INTEGER; f !== 0 && r.lt(m) && i < 100; ++i) {
            if (f > 0) {
                r = t.pow(r);
                if (l.eq(r)) {
                    f = 0;
                    break;
                }
                l = r;
                --f;
            }
            else {
                r = r.logBase(t);
                if (l.eq(r)) {
                    f = 0;
                    break;
                }
                l = r;
                ++f;
            }
        }
        if (i == 100 || this.lt(Math.exp(1 / Math.E)))
            f = 0;
        r.array[1] = (r.array[1] + f) || f;
        r.standardize();
        return r;
    }

    tetrate(other, payload) {
        return this.tetr(other, payload);
    }

    static tetr(x, y, payload) {
        return new OmegaNum(x).tetr(y, payload);
    }

    static tetrate(x, y, payload) {
        return new OmegaNum(x).tetr(y, payload);
    }
    
    iteratedexp(other, payload) {
        return this.tetr(other, payload);
    }

    static iteratedexp(x, y, payload) {
        return new OmegaNum(x).iteratedexp(y, payload);
    }
    
    iteratedlog(baseIn, otherIn) {
        if (baseIn === undefined)
            baseIn = 10;
        if (otherIn === undefined)
            otherIn = OmegaNum.ONE.clone();
        var t = this.clone();
        var base = new OmegaNum(baseIn);
        var other = new OmegaNum(otherIn);
        if (other.eq(OmegaNum.ZERO))
            return t;
        if (other.eq(OmegaNum.ONE))
            return t.logBase(base);
        return base.tetr(t.slog(base).sub(other));
    }

    static iteratedlog(x, y, z) {
        return new OmegaNum(x).iteratedlog(y, z);
    }

    layeradd(otherIn, baseIn) {
        if (baseIn === undefined)
            baseIn = 10;
        if (otherIn === undefined)
            otherIn = OmegaNum.ONE.clone();
        var t = this.clone();
        var base = new OmegaNum(baseIn);
        var other = new OmegaNum(otherIn);
        return base.tetr(t.slog(base).add(other));
    }

    static layeradd(x, y, z) {
        return new OmegaNum(x).layeradd(y, z);
    }

    layeradd10(other) {
        return this.layeradd(other);
    }

    static layeradd10(x, y) {
        return new OmegaNum(x).layeradd10(y);
    }
    
    ssrt() {
        var x = this.clone();
        if (x.lt(Math.exp(-1 / Math.E)))
            return OmegaNum.NaN.clone();
        if (!x.isFinite())
            return x;
        if (x.gt(OmegaNum.TETRATED_MAX_SAFE_INTEGER))
            return x;
        if (x.gt(OmegaNum.EE_MAX_SAFE_INTEGER)) {
            x.array[1]--;
            return x;
        }
        var l = x.ln();
        return l.div(l.lambertw());
    }

    ssqrt() {
        return this.ssrt();
    }

    static ssrt(x) {
        return new OmegaNum(x).ssqrt();
    }

    static ssqrt(x) {
        return new OmegaNum(x).ssrt();
    }

    slog(baseIn) {
        if (baseIn === undefined)
            baseIn = 10;
        var x = new OmegaNum(this);
        var base = new OmegaNum(baseIn);
        if (x.isNaN() || base.isNaN() || x.isInfinite() && base.isInfinite())
            return OmegaNum.NaN.clone();
        if (x.isInfinite())
            return x;
        if (base.isInfinite())
            return OmegaNum.ZERO.clone();
        if (x.lt(OmegaNum.ZERO))
            return OmegaNum.ONE.neg();
        if (x.eq(OmegaNum.ONE))
            return OmegaNum.ZERO.clone();
        if (x.eq(base))
            return OmegaNum.ONE.clone();
        if (base.lt(Math.exp(1 / Math.E))) {
            var a = OmegaNum.tetr(base, Infinity);
            if (x.eq(a))
                return OmegaNum.POSITIVE_INFINITY.clone();
            if (x.gt(a))
                return OmegaNum.NaN.clone();
        }
        if (x.max(base).gt("10^^^" + MAX_SAFE_INTEGER)) {
            if (x.gt(base))
                return x;
            return OmegaNum.ZERO.clone();
        }
        if (x.max(base).gt(OmegaNum.TETRATED_MAX_SAFE_INTEGER)) {
            if (x.gt(base)) {
                x.array[2]--;
                x.standardize();
                return x.sub(x.array[1]);
            }
            return OmegaNum.ZERO.clone();
        }
        var r = 0;
        var t = (x.array[1] || 0) - (base.array[1] || 0);
        if (t > 3) {
            var l = t - 3;
            r += l;
            x.array[1] = x.array[1] - l;
        }
        for (var i = 0; i < 100; ++i) {
            if (x.lt(OmegaNum.ZERO)) {
                x = OmegaNum.pow(base, x);
                --r;
            }
            else if (x.lte(1)) {
                return new OmegaNum(r + x.toNumber() - 1);
            }
            else {
                ++r;
                x = OmegaNum.logBase(x, base);
            }
        }
        return new OmegaNum(r);
    }

    static slog(x, y) {
        return new OmegaNum(x).slog(y);
    }

    pent(other) {
        return this.arrow(3)(other);
    }

    pentate(other) {
        return this.pent(other);
    }

    static pent(x, y) {
        return OmegaNum.arrow(x, 3, y);
    }

    static pentate(x, y) {
        return new OmegaNum(x).pent(y);
    }
    
    arrow(arrowsIn) {
        var t = this.clone();
        var arrows = new OmegaNum(arrowsIn);
        if (!arrows.isint() || arrows.lt(OmegaNum.ZERO))
            return function () { return OmegaNum.NaN.clone(); };
        if (arrows.eq(OmegaNum.ZERO))
            return function (other) { return t.mul(other); };
        if (arrows.eq(OmegaNum.ONE))
            return function (other) { return t.pow(other); };
        if (arrows.eq(2))
            return function (other) { return t.tetr(other); };
        return function (otherIn) {
            var other = new OmegaNum(otherIn);
            if (OmegaNum.debug >= OmegaNum.NORMAL)
                console.log(t + "{" + arrows + "}" + other);
            if (other.lt(OmegaNum.ZERO))
                return OmegaNum.NaN.clone();
            if (other.eq(OmegaNum.ZERO))
                return OmegaNum.ONE.clone();
            if (other.eq(OmegaNum.ONE))
                return t.clone();
            if (arrows.gte(OmegaNum.maxArrow)) {
                console.warn("Number too large to reasonably handle it: tried to " + arrows.add(2) + "-ate.");
                return OmegaNum.POSITIVE_INFINITY.clone();
            }
            var arrowsNum = arrows.toNumber();
            if (other.eq(2))
                return t.arrow(arrows.sub(OmegaNum.ONE))(t);
            if (t.max(other).gt("10{" + (arrowsNum + 1) + "}" + MAX_SAFE_INTEGER))
                return t.max(other);
            var r;
            if (t.gt("10{" + arrowsNum + "}" + MAX_SAFE_INTEGER) || other.gt(OmegaNum.MAX_SAFE_INTEGER)) {
                if (t.gt("10{" + arrowsNum + "}" + MAX_SAFE_INTEGER)) {
                    r = t.clone();
                    r.array[arrowsNum]--;
                    r.standardize();
                }
                else if (t.gt("10{" + (arrowsNum - 1) + "}" + MAX_SAFE_INTEGER)) {
                    r = new OmegaNum(t.array[arrowsNum - 1]);
                }
                else {
                    r = OmegaNum.ZERO;
                }
                var j = r.add(other);
                j.array[arrowsNum] = (j.array[arrowsNum] || 0) + 1;
                j.standardize();
                return j;
            }
            var y = other.toNumber();
            var f = Math.floor(y);
            var arrows_m1 = arrows.sub(OmegaNum.ONE);
            r = t.arrow(arrows_m1)(y - f);
            for (var i = 0, m = new OmegaNum("10{" + (arrowsNum - 1) + "}" + MAX_SAFE_INTEGER); f !== 0 && r.lt(m) && i < 100; ++i) {
                if (f > 0) {
                    r = t.arrow(arrows_m1)(r);
                    --f;
                }
            }
            if (i == 100)
                f = 0;
            r.array[arrowsNum - 1] = (r.array[arrowsNum - 1] + f) || f;
            r.standardize();
            return r;
        };
    }

    chain(other, arrows) {
        return this.arrow(arrows)(other);
    }

    static arrow(x, z, y) {
        return new OmegaNum(x).arrow(z)(y);
    }

    static chain(x, y, z) {
        return new OmegaNum(x).arrow(z)(y);
    }

    static hyper(zIn) {
        var z = new OmegaNum(zIn);
        if (z.eq(OmegaNum.ZERO))
            return function (x, y) { return new OmegaNum(y).eq(OmegaNum.ZERO) ? new OmegaNum(x) : new OmegaNum(x).add(OmegaNum.ONE); };
        if (z.eq(OmegaNum.ONE))
            return function (x, y) { return OmegaNum.add(x, y); };
        return function (x, y) { return new OmegaNum(x).arrow(z.sub(2))(y); };
    }

    static affordGeometricSeries(resourcesAvailableIn, priceStartIn, priceRatioIn, currentOwned) {
        /*
          If you have resourcesAvailable, the price of something starts at
          priceStart, and on each purchase it gets multiplied by priceRatio,
          and you have already bought currentOwned, how many of the object
          can you buy.
        */
        var resourcesAvailable = new OmegaNum(resourcesAvailableIn);
        var priceStart = new OmegaNum(priceStartIn);
        var priceRatio = new OmegaNum(priceRatioIn);
        var actualStart = priceStart.mul(priceRatio.pow(currentOwned));
        return OmegaNum.floor(resourcesAvailable.div(actualStart).mul(priceRatio.sub(OmegaNum.ONE)).add(OmegaNum.ONE).log10().div(priceRatio.log10()));
    }

    static affordArithmeticSeries(resourcesAvailableIn, priceStartIn, priceAddIn, currentOwnedIn) {
        /*
          If you have resourcesAvailable, the price of something starts at
          priceStart, and on each purchase it gets increased by priceAdd,
          and you have already bought currentOwned, how many of the object
          can you buy.
        */
        var resourcesAvailable = new OmegaNum(resourcesAvailableIn);
        var priceStart = new OmegaNum(priceStartIn);
        var priceAdd = new OmegaNum(priceAddIn);
        var currentOwned = new OmegaNum(currentOwnedIn);
        var actualStart = priceStart.add(currentOwned.mul(priceAdd));
        var b = actualStart.sub(priceAdd.div(2));
        var b2 = b.pow(2);
        return b.neg().add(b2.add(priceAdd.mul(resourcesAvailable).mul(2)).sqrt()).div(priceAdd).floor();
    }

    static sumGeometricSeries(numItems, priceStartIn, priceRatioIn, currentOwned) {
        /*
          If you want to buy numItems of something, the price of something starts at
          priceStart, and on each purchase it gets multiplied by priceRatio,
          and you have already bought currentOwned, what will be the price of numItems
          of something.
        */
        var priceStart = new OmegaNum(priceStartIn);
        var priceRatio = new OmegaNum(priceRatioIn);
        return priceStart.mul(priceRatio.pow(currentOwned)).mul(OmegaNum.sub(OmegaNum.ONE, priceRatio.pow(numItems))).div(OmegaNum.sub(OmegaNum.ONE, priceRatio));
    }

    static sumArithmeticSeries(numItemsIn, priceStartIn, priceAdd, currentOwnedIn) {
        /*
          If you want to buy numItems of something, the price of something starts at
          priceStart, and on each purchase it gets increased by priceAdd,
          and you have already bought currentOwned, what will be the price of numItems
          of something.
        */
        var numItems = new OmegaNum(numItemsIn);
        var priceStart = new OmegaNum(priceStartIn);
        var currentOwned = new OmegaNum(currentOwnedIn);
        var actualStart = priceStart.add(currentOwned.mul(priceAdd));
        return numItems.div(2).mul(actualStart.mul(2).plus(numItems.sub(OmegaNum.ONE).mul(priceAdd)));
    }

    // Binomial Coefficients n choose k
    static choose(n, k) {
        /*
          If you have n items and you take k out,
          how many ways could you do this?
        */
        return new OmegaNum(n).factorial().div(new OmegaNum(k).factorial().mul(new OmegaNum(n).sub(new OmegaNum(k)).factorial()));
    }

    choose(other) {
        return OmegaNum.choose(this, other);
    }

    //end break_eternity.js excerpt
    standardize() {
        var b;
        var x = this;
        if (OmegaNum.debug >= OmegaNum.ALL)
            console.log(x.toString());
        if (!x.array || !x.array.length)
            x.array = [0];
        if (x.sign != 1 && x.sign != -1) {
            if (typeof x.sign != "number")
                x.sign = Number(x.sign);
            x.sign = x.sign < 0 ? -1 : 1;
        }
        for (var l = x.array.length, i = 0; i < l; i++) {
            var e = x.array[i];
            if (e === null || e === undefined) {
                x.array[i] = 0;
                continue;
            }
            if (isNaN(e)) {
                x.array = [NaN];
                return x;
            }
            if (!isFinite(e)) {
                x.array = [Infinity];
                return x;
            }
            if (i !== 0 && !Number.isInteger(e))
                x.array[i] = Math.floor(e);
        }
        do {
            if (OmegaNum.debug >= OmegaNum.ALL)
                console.log(x.toString());
            b = false;
            while (x.array.length && x.array[x.array.length - 1] === 0) {
                x.array.pop();
                b = true;
            }
            if (x.array[0] > MAX_SAFE_INTEGER) {
                x.array[1] = (x.array[1] || 0) + 1;
                x.array[0] = Math.log10(x.array[0]);
                b = true;
            }
            while (x.array[0] < MAX_E && x.array[1]) {
                x.array[0] = Math.pow(10, x.array[0]);
                x.array[1]--;
                b = true;
            }
            if (x.array.length > 2 && !x.array[1]) {
                for (i = 2; !x.array[i]; ++i)
                    continue;
                x.array[i - 1] = x.array[0];
                x.array[0] = 1;
                x.array[i]--;
                b = true;
            }
            for (l = x.array.length, i = 1; i < l; ++i) {
                if (x.array[i] > MAX_SAFE_INTEGER) {
                    x.array[i + 1] = (x.array[i + 1] || 0) + 1;
                    x.array[0] = x.array[i] + 1;
                    for (var j = 1; j <= i; ++j)
                        x.array[j] = 0;
                    b = true;
                }
            }
        } while (b);
        if (!x.array.length)
            x.array = [0];
        return x;
    }

    toNumber() {
        //console.log(this.array);
        if (this.sign == -1)
            return -1 * this.abs().toNumber();
        if (this.array.length >= 2 && (this.array[1] >= 2 || this.array[1] == 1 && this.array[0] > Math.log10(Number.MAX_VALUE)))
            return Infinity;
        if (this.array[1] == 1)
            return Math.pow(10, this.array[0]);
        return this.array[0];
    }

    toString() {
        if (this.sign == -1)
            return "-" + this.abs();
        if (isNaN(this.array[0]))
            return "NaN";
        if (!isFinite(this.array[0]))
            return "Infinity";
        var s = "";
        if (this.array.length >= 2) {
            for (var i = this.array.length - 1; i >= 2; --i) {
                var q = i >= 5 ? "{" + i + "}" : "^".repeat(i);
                if (this.array[i] > 1)
                    s += "(10" + q + ")^" + this.array[i] + " ";
                else if (this.array[i] == 1)
                    s += "10" + q;
            }
        }
        if (!this.array[1])
            s += String(this.toNumber());
        else if (this.array[1] < 3)
            s += "e".repeat(this.array[1] - 1) + Math.pow(10, this.array[0] - Math.floor(this.array[0])) + "e" + Math.floor(this.array[0]);
        else if (this.array[1] < 8)
            s += "e".repeat(this.array[1]) + this.array[0];
        else
            s += "(10^)^" + this.array[1] + " " + this.array[0];
        return s;
    }

    //from break_eternity.js
    toStringWithDecimalPlaces(places, applyToOpNums) {
        if (this.sign == -1)
            return "-" + this.abs();
        if (isNaN(this.array[0]))
            return "NaN";
        if (!isFinite(this.array[0]))
            return "Infinity";
        var b = 0;
        var s = "";
        var m = Math.pow(10, places);
        if (this.array.length >= 2) {
            for (var i = this.array.length - 1; !b && i >= 2; --i) {
                var x = this.array[i];
                if (applyToOpNums && x >= m) {
                    ++i;
                    b = x;
                    x = 1;
                }
                else if (applyToOpNums && this.array[i - 1] >= m) {
                    ++x;
                    b = this.array[i - 1];
                }
                var q = i >= 5 ? "{" + i + "}" : "^".repeat(i);
                if (x > 1)
                    s += "(10" + q + ")^" + x + " ";
                else if (x == 1)
                    s += "10" + q;
            }
        }
        var k = this.array[0];
        var l = this.array[1] || 0;
        if (k > m) {
            k = Math.log10(k);
            ++l;
        }
        if (b)
            s += decimalPlaces(b, places);
        else if (!l)
            s += String(decimalPlaces(k, places));
        else if (l < 3)
            s += "e".repeat(l - 1) + decimalPlaces(Math.pow(10, k - Math.floor(k)), places) + "e" + decimalPlaces(Math.floor(k), places);
        else if (l < 8)
            s += "e".repeat(l) + decimalPlaces(k, places);
        else if (applyToOpNums)
            s += "(10^)^" + decimalPlaces(l, places) + " " + decimalPlaces(k, places);
        else
            s += "(10^)^" + l + " " + decimalPlaces(k, places);
        return s;
    }

    //these are from break_eternity.js as well
    toExponential(places, applyToOpNums) {
        if (this.array.length == 1)
            return (this.sign * this.array[0]).toExponential(places);
        return this.toStringWithDecimalPlaces(places, applyToOpNums);
    }

    toFixed(places, applyToOpNums) {
        if (this.array.length == 1)
            return (this.sign * this.array[0]).toFixed(places);
        return this.toStringWithDecimalPlaces(places, applyToOpNums);
    }

    toPrecision(places, applyToOpNums) {
        if (this.array[0] === 0)
            return (this.sign * this.array[0]).toFixed(places - 1);
        if (this.array.length == 1 && this.array[0] < 1e-6)
            return this.toExponential(places - 1, applyToOpNums);
        if (this.array.length == 1 && places > Math.log10(this.array[0]))
            return this.toFixed(places - Math.floor(Math.log10(this.array[0])) - 1, applyToOpNums);
        return this.toExponential(places - 1, applyToOpNums);
    }

    valueOf() {
        return this.toString();
    }

    //Note: toArray() would be impossible without changing the layout of the array or lose the information about the sign
    toJSON() {
        if (OmegaNum.serializeMode == OmegaNum.JSON) {
            return {
                array: this.array.slice(0),
                sign: this.sign
            };
        }
        else if (OmegaNum.serializeMode == OmegaNum.STRING) {
            return this.toString();
        }
    }

    toHyperE() {
        if (this.sign == -1)
            return "-" + this.abs().toHyperE();
        if (isNaN(this.array[0]))
            return "NaN";
        if (!isFinite(this.array[0]))
            return "Infinity";
        if (this.lt(OmegaNum.MAX_SAFE_INTEGER))
            return String(this.array[0]);
        if (this.lt(OmegaNum.E_MAX_SAFE_INTEGER))
            return "E" + this.array[0];
        var r = "E" + this.array[0] + "#" + this.array[1];
        for (var i = 2; i < this.array.length; ++i) {
            r += "#" + (this.array[i] + 1);
        }
        return r;
    }

    static fromNumber(input) {
        if (typeof input != "number")
            throw Error(invalidArgument + "Expected Number");
        var x = new OmegaNum();
        x.array[0] = Math.abs(input);
        x.sign = input < 0 ? -1 : 1;
        x.standardize();
        return x;
    }

    static fromString(input) {
        if (typeof input != "string")
            throw Error(invalidArgument + "Expected String");
        var isJSON = false;
        if (typeof input == "string" && (input[0] == "[" || input[0] == "{")) {
            try {
                JSON.parse(input);
            }
            finally {
                isJSON = true;
            }
        }
        if (isJSON) {
            return OmegaNum.fromJSON(input);
        }
        var x = new OmegaNum();
        x.array = [0];
        if (!isOmegaNum.test(input)) {
            console.warn(omegaNumError + "Malformed input: " + input);
            x.array = [NaN];
            return x;
        }
        var negateIt = false;
        if (input[0] == "-" || input[0] == "+") {
            var numSigns = input.search(/[^-\+]/);
            var signs = input.substring(0, numSigns);
            negateIt = (signs.match(/-/g)?.length || 0) % 2 == 1;
            input = input.substring(numSigns);
        }
        if (input == "NaN")
            x.array = [NaN];
        else if (input == "Infinity")
            x.array = [Infinity];
        else {
            var a, b, c, d, i;
            while (input) {
                if (/^\(?10[\^\{]/.test(input)) {
                    if (input[0] == "(") {
                        input = input.substring(1);
                    }
                    var arrows;
                    if (input[2] == "^") {
                        a = input.substring(2).search(/[^\^]/);
                        arrows = a;
                        b = a + 2;
                    }
                    else {
                        a = input.indexOf("}");
                        arrows = Number(input.substring(3, a));
                        b = a + 1;
                    }
                    if (arrows >= OmegaNum.maxArrow) {
                        console.warn("Number too large to reasonably handle it: tried to " + (arrows + 2) + "-ate.");
                        x.array = [Infinity];
                        break;
                    }
                    input = input.substring(b);
                    if (input[0] == ")") {
                        a = input.indexOf(" ");
                        c = Number(input.substring(2, a));
                        input = input.substring(a + 1);
                    }
                    else {
                        c = 1;
                    }
                    if (arrows == 1) {
                        x.array[1] = (x.array[1] || 0) + c;
                    }
                    else if (arrows == 2) {
                        a = x.array[1] || 0;
                        b = x.array[0] || 0;
                        if (b >= 1e10)
                            ++a;
                        if (b >= 10)
                            ++a;
                        x.array[0] = a;
                        x.array[1] = 0;
                        x.array[2] = (x.array[2] || 0) + c;
                    }
                    else {
                        a = x.array[arrows - 1] || 0;
                        b = x.array[arrows - 2] || 0;
                        if (b >= 10)
                            ++a;
                        for (i = 1; i < arrows; ++i) {
                            x.array[i] = 0;
                        }
                        x.array[0] = a;
                        x.array[arrows] = (x.array[arrows] || 0) + c;
                    }
                }
                else {
                    break;
                }
            }
            a = input.split(/[Ee]/);
            b = [x.array[0], 0];
            c = 1;
            for (i = a.length - 1; i >= 0; --i) {
                if (a[i])
                    d = Number(a[i]);
                else
                    d = 1;
                //The things that are already there
                if (b[0] < MAX_E && b[1] === 0) {
                    b[0] = Math.pow(10, c * b[0]);
                }
                else if (c == -1) {
                    if (b[1] === 0) {
                        b[0] = Math.pow(10, c * b[0]);
                    }
                    else if (b[1] == 1 && b[0] <= Math.log10(Number.MAX_VALUE)) {
                        b[0] = Math.pow(10, c * Math.pow(10, b[0]));
                    }
                    else {
                        b[0] = 0;
                    }
                    b[1] = 0;
                }
                else {
                    b[1]++;
                }
                //Multiplying coefficient
                if (b[1] === 0) {
                    b[0] *= Number(d);
                }
                else if (b[1] == 1) {
                    b[0] += Math.log10(Number(d));
                }
                else if (b[1] == 2 && b[0] < MAX_E + Math.log10(Math.log10(Number(d)))) {
                    b[0] += Math.log10(1 + Math.pow(10, Math.log10(Math.log10(Number(d))) - b[0]));
                }
                //Carrying
                if (b[0] < MAX_E && b[1]) {
                    b[0] = Math.pow(10, b[0]);
                    b[1]--;
                }
                else if (b[0] > MAX_SAFE_INTEGER) {
                    b[0] = Math.log10(b[0]);
                    b[1]++;
                }
            }
            x.array[0] = b[0];
            x.array[1] = (x.array[1] || 0) + b[1];
        }
        if (negateIt)
            x.sign *= -1;
        x.standardize();
        return x;
    }

    static fromArray(input1, input2) {
        var array, sign;
        if (input1 instanceof Array && (input2 === undefined || typeof input2 == "number")) {
            array = input1;
            sign = input2;
        }
        else if (input2 instanceof Array && typeof input1 == "number") {
            array = input2;
            sign = input1;
        }
        else {
            throw Error(invalidArgument + "Expected an Array [and Boolean]");
        }
        var x = new OmegaNum();
        x.array = array.slice(0);
        if (sign)
            x.sign = Number(sign);
        else
            x.sign = 1;
        x.standardize();
        return x;
    }

    static fromObject(input) {
        if (typeof input !== "object")
            throw Error(invalidArgument + "Expected Object");
        if (input === null)
            return OmegaNum.ZERO.clone();
        if (input instanceof Array)
            return OmegaNum.fromArray(input);
        if (input instanceof OmegaNum)
            return new OmegaNum(input);
        if (!(input.array instanceof Array))
            throw Error(invalidArgument + "Expected that property 'array' exists");
        if (input.sign !== undefined && typeof input.sign != "number")
            throw Error(invalidArgument + "Expected that property 'sign' is Number");
        var x = new OmegaNum();
        x.array = input.array.slice(0);
        x.sign = Number(input.sign) || 1;
        x.standardize();
        return x;
    }

    static fromJSON(input) {
        if (typeof input == "object")
            return OmegaNum.fromObject(input);
        if (typeof input != "string")
            throw Error(invalidArgument + "Expected String");
        var parsedObject, x;
        try {
            parsedObject = JSON.parse(input);
        }
        catch (e) {
            parsedObject = null;
            throw e;
        }
        finally {
            x = OmegaNum.fromObject(parsedObject);
        }
        parsedObject = null;
        return x;
    }

    static fromHyperE(input) {
        if (typeof input != "string")
            throw Error(invalidArgument + "Expected String");
        var x = new OmegaNum();
        x.array = [0];
        if (!/^[-\+]*(0|[1-9]\d*(\.\d*)?|Infinity|NaN|E[1-9]\d*(\.\d*)?(#[1-9]\d*)*)$/.test(input)) {
            console.warn(omegaNumError + "Malformed input: " + input);
            x.array = [NaN];
            return x;
        }
        var negateIt = false;
        if (input[0] == "-" || input[0] == "+") {
            var numSigns = input.search(/[^-\+]/);
            var signs = input.substring(0, numSigns);
            negateIt = (signs.match(/-/g)?.length || 0) % 2 === 0;
            input = input.substring(numSigns);
        }
        if (input == "NaN")
            x.array = [NaN];
        else if (input == "Infinity")
            x.array = [Infinity];
        else if (input[0] != "E") {
            x.array[0] = Number(input);
        }
        else if (input.indexOf("#") == -1) {
            x.array[0] = Number(input.substring(1));
            x.array[1] = 1;
        }
        else {
            var array = input.substring(1).split("#");
            for (var i = 0; i < array.length; ++i) {
                var t = Number(array[i]);
                if (i >= 2) {
                    --t;
                }
                x.array[i] = t;
            }
        }
        if (negateIt)
            x.sign *= -1;
        x.standardize();
        return x;
    }

    clone() {
        var temp = new OmegaNum();
        temp.array = this.array.slice(0);
        temp.sign = this.sign;
        return temp;
    }

    constructor(input, input2) {
        var x = this;
        var parsedObject = null;
        if (typeof input == "string" && (input[0] == "[" || input[0] == "{")) {
            try {
                parsedObject = JSON.parse(input);
            }
            catch (e) {
                //lol just keep going
            }
        }
        var temp, temp2;
        if (typeof input == "number" && !(input2 instanceof Array)) {
            temp = OmegaNum.fromNumber(input);
        }
        else if (parsedObject) {
            temp = OmegaNum.fromObject(parsedObject);
        }
        else if (typeof input == "string" && input[0] == "E") {
            temp = OmegaNum.fromHyperE(input);
        }
        else if (typeof input == "string") {
            temp = OmegaNum.fromString(input);
        }
        else if (input instanceof Array && (typeof input2 == "undefined" || typeof input2 == "number")) {
            temp = OmegaNum.fromArray(input, input2);
        }
        else if (typeof input == "number" && input2 instanceof Array) {
            temp = OmegaNum.fromArray(input, input2);
        }
        else if (input instanceof OmegaNum) {
            temp = input.array.slice(0);
            temp2 = input.sign;
        }
        else if (typeof input == "object") {
            temp = OmegaNum.fromObject(input);
        }
        else {
            temp = [NaN];
            temp2 = 1;
        }
        if (temp instanceof OmegaNum) {
            x.array = temp.array;
            x.sign = temp.sign;
        }
        else {
            x.array = temp;
            x.sign = temp2 ?? 1;
        }
        return x;
    }
    /*
     * Configure global settings for a OmegaNum constructor.
     *
     * `obj` is an object with one or more of the following properties,
     *
     *   precision  {number}
     *   rounding   {number}
     *   toExpNeg   {number}
     *   toExpPos   {number}
     *
     * E.g. OmegaNum.config({ precision: 20, rounding: 4 })
     *
     */
    static config(obj) {
        if (!obj || typeof obj !== 'object') {
            throw Error(omegaNumError + 'Object expected');
        }
        var i, p, v, ps = [
            'maxArrow', 1, Number.MAX_SAFE_INTEGER,
            'serializeMode', 0, 1,
            'debug', 0, 2
        ];
        for (i = 0; i < ps.length; i += 3) {
            if ((v = obj[p = ps[i]]) !== void 0) {
                //@ts-ignore
                if (Math.floor(v) === v && v >= ps[i + 1] && v <= ps[i + 2])
                    this[p] = v;
                else
                    throw Error(invalidArgument + p + ': ' + v);
            }
        }
        return this;
    }

    // Create and configure initial OmegaNum constructor.
    static get default() {
        return this;
    }

    static get OmegaNum() {
        return this;
    }

    static set(obj) {
        this.config(obj);
    }
}

let FORMAT_DEBUG = 0
let MAX_LOGP1_REPEATS = 48

/**
 * @returns {string}
 */
function commaFormat(num, precision) {
    let zeroCheck = num.array ? num.array[0] : num
    if (zeroCheck < 0.001) return (0).toFixed(precision)
    let init = num.toString()
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    return portions[0]
}

/**
 * @returns {string}
 */
function regularFormat(num, precision) {
    if (isNaN(num)) return "NaN"
    let zeroCheck = num.array ? num.array[0] : num
    if (zeroCheck < 0.001) return (0).toFixed(precision)
    let fmt = num.toString()
    let f = fmt.split(".")
    if (precision == 0) return commaFormat(num.floor ? num.floor() : Math.floor(num))
    else if (f.length == 1) return fmt + "." + "0".repeat(precision)
    else if (f[1].length < precision) return fmt + "0".repeat(precision - f[1].length)
    else return f[0] + "." + f[1].substring(0, precision)
}

function polarize(array, smallTop = false) {
    if (FORMAT_DEBUG >= 1) console.log("Begin polarize: "+JSON.stringify(array)+", smallTop "+smallTop)
    if (array.length === 0) array = [0]
    
    let bottom = array[0], top = 0, height = 0
    if (!Number.isFinite(array[0])) {}
    else if (array.length <= 1) {
        while (smallTop && bottom >= 10) {
            bottom = Math.log10(bottom)
            top++
            height = 1
        }
    }
    else {
        top = array[1]
        height = 1
        while (bottom >= 10 || height < array.length-1 || (smallTop && top >= 10)) {
            if (bottom >= 10) { // Bottom mode: the bottom number "climbs" to the top
                if (height == 1) {
                    // Apply one increment
                    bottom = Math.log10(bottom)
                    if (bottom >= 10) { // Apply increment again if necessary
                        bottom = Math.log10(bottom)
                        top++
                    }
                }
                else if (height < MAX_LOGP1_REPEATS) {
                    if (bottom >= 1e10) bottom = Math.log10(Math.log10(Math.log10(bottom))) + 2
                    else bottom = Math.log10(Math.log10(bottom)) + 1
                    for (let i = 2; i < height; i++) bottom = Math.log10(bottom) + 1
                }
                else bottom = 1 
                top += 1
                if (FORMAT_DEBUG >= 1) console.log("Bottom mode: bottom "+bottom+", top "+top+", height "+height)
            }
            else { 
                bottom = Math.log10(bottom) + top
                height += 1
                top = (array[height]||0) + 1
                if (FORMAT_DEBUG >= 1) console.log("Top mode: bottom "+bottom+", top "+top+", height "+height)
            }
        }
    }
    
    if (FORMAT_DEBUG >= 1) console.log("Polarize result: bottom "+bottom+", top "+top+", height "+height)
    return {bottom: bottom, top: top, height: height}
}

/**
 * @returns {string}
 */
function format(num, precision = 2, small = false) {
    if (OmegaNum.isNaN(num)) return "NaN"
    let precision2 = Math.max(3, precision) // for e
    let precision3 = Math.max(4, precision) // for F, G, H
    let precision4 = Math.max(6, precision) // for J
    num = new OmegaNum(num)
    let array = num.array
    if (num.abs().lt(1e-308)) return (0).toFixed(precision)
    if (num.sign < 0) return "-" + format(num.neg(), precision)
    if (num.isInfinite()) return "Infinity"
    if (num.lt("0.0001")) { return format(num.rec(), precision) + "⁻¹" }
    else if (num.lt(1)) return regularFormat(num, precision + (small ? 2 : 0))
    else if (num.lt(1000)) return regularFormat(num, precision)
    else if (num.lt(1e9)) return commaFormat(num)
    else if (num.lt("10^^5")) { // 1e9 ~ 1F5
        let rep = (array[1]||0)-1
        if (array[0] >= 1e9) {
            array[0] = Math.log10(array[0])
            rep += 1
        }
        let m = 10**(array[0]-Math.floor(array[0]))
        let e = Math.floor(array[0])
        let p = array[0] < 1000 ? precision2 : 0
        return "e".repeat(rep) + regularFormat(m, p) + "e" + commaFormat(e)
    }
    else if (num.lt("10^^1000000")) { // 1F5 ~ F1,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom, precision3) + "F" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^5")) { // F1,000,000 ~ 1G5
        if ((array[2]||0) >= 1) {
            let rep = array[2]
            array[2] = 0
            return "F".repeat(rep) + format(array, precision)
        }
        let n = array[1] + 1
        if (num.gte("10^^" + (n + 1))) n += 1
        return "F" + format(n, precision)
    }
    else if (num.lt("10^^^1000000")) { // 1G5 ~ G1,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom, precision3) + "G" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^^5")) { // G1,000,000 ~ 1H5
        if ((array[3]||0) >= 1) {
            let rep = array[3]
            array[3] = 0
            return "G".repeat(rep) + format(array, precision)
        }
        let n = array[2] + 1
        if (num.gte("10^^^" + (n + 1))) n += 1
        return "G" + format(n, precision)
    }
    else if (num.lt("10^^^^1000000")) { // 1H5 ~ H1,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom, precision3) + "H" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^^^5")) { // H1,000,000 ~ 5J4
        if ((array[4]||0) >= 1) {
            let rep = array[4]
            array[4] = 0
            return "H".repeat(rep) + format(array, precision)
        }
        let n = array[3] + 1
        if (num.gte("10^^^^" + (n + 1))) n += 1
        return "H" + format(n, precision)
    }
    // 5J4 and beyond
    let pol = polarize(array, true)
    return regularFormat(Math.log10(pol.bottom) + pol.top, precision4) + "J" + commaFormat(pol.height)
}

/**
 * @returns {string}
 */
function formatWhole(num) {
    return format(num, 0)
}

/**
 * @returns {string}
 */
function formatSmall(num, precision = 2) { 
    return format(num, precision, true)    
}
