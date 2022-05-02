"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayEquality = void 0;
function arrayEquality(array1, array2) {
    if (array1.length != array2.length) {
        return false;
    }
    return array1.every((elt, index) => {
        return elt === array2[index];
    });
}
exports.arrayEquality = arrayEquality;
//# sourceMappingURL=arrays.js.map