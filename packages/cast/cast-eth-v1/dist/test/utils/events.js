"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertEventArgs = exports.assertEvent = void 0;
function assertEvent(response, eventName) {
    const eventIndex = response.logs.findIndex((log) => log.event === eventName);
    assert.isTrue(eventIndex !== -1, `${eventName} event should fire`);
    return eventIndex;
}
exports.assertEvent = assertEvent;
function assertEventArgs(response, eventIndex, argName, expectedValue) {
    assert.equal(response.logs[eventIndex].args[argName], expectedValue, `${argName} expected to be equal to ${expectedValue}`);
}
exports.assertEventArgs = assertEventArgs;
//# sourceMappingURL=events.js.map