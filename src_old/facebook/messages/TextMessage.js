"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FacebookMessage_1 = require('facebook/messages/FacebookMessage');
var TextMessage = (function (_super) {
    __extends(TextMessage, _super);
    function TextMessage(text) {
        _super.call(this);
        if (!text) {
            throw new Error('parameter text is required');
        }
        if (text.length > 320) {
            throw new Error('text is too long');
        }
        this.text = text;
    }
    TextMessage.prototype.get = function () {
        var reply = {
            text: this.text,
        };
        if (Array.isArray(this.quickReplies) && this.quickReplies.length > 0) {
            reply.quick_replies = this.quickReplies;
        }
        return reply;
    };
    return TextMessage;
}(FacebookMessage_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextMessage;
