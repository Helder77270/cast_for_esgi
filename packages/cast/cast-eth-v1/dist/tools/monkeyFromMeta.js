"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genMonkeyArray = void 0;
const monkey_1 = require("./monkey");
const genMonkeyArray = (inputs) => inputs.map((val) => (0, monkey_1.monkeyFromType)(val.type));
exports.genMonkeyArray = genMonkeyArray;
//# sourceMappingURL=monkeyFromMeta.js.map