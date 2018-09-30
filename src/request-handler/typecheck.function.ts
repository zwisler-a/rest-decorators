// returns false if not equal
export function typeCheck(object, desiredClass) {
    if (typeof object === 'object') {
        return !differes(desiredClass, object);
    } else {
        return typeof object === desiredClass ? false : true;
    }
}

function differes(obj1, obj2) {
    const keys = Object.keys(obj1);
    return keys.some(key => {
        if (obj2.hasOwnProperty(key)) {
            if (typeof obj1[key] === 'object') {
                return differes(obj1[key], obj2[key]);
            } else {
                return typeof obj1[key] !== typeof obj2[key];
            }
        } else {
            return true;
        }
    });
}
