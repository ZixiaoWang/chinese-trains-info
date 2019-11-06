export function attach (object) {
    return function (target) {
        if (object && Object.prototype.toString.call(object) === '[object Object]') {
            for (let key in object) {
                target.prototype[key] = object[key];
            }
        }
        return target;
    }
}