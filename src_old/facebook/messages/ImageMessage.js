"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FacebookMessage_1 = require('facebook/messages/FacebookMessage');
var parser_1 = require('utils/parser');
var ImageMessage = (function (_super) {
    __extends(ImageMessage, _super);
    function ImageMessage(url) {
        _super.call(this);
        if (!url || !parser_1.isUrl(url)) {
            throw new Error('parameter url is not a valid URL');
        }
        this.url = url;
    }
    ImageMessage.prototype.get = function () {
        var reply = {
            attachment: {
                type: 'image',
                payload: {
                    url: this.url,
                },
            },
        };
        return reply;
    };
    return ImageMessage;
}(FacebookMessage_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageMessage;
