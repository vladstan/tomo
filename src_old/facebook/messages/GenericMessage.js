"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FacebookMessage_1 = require('facebook/messages/FacebookMessage');
var parser_1 = require('utils/parser');
var GenericMessage = (function (_super) {
    __extends(GenericMessage, _super);
    function GenericMessage() {
        _super.call(this);
        this.bubbles = [];
    }
    GenericMessage.prototype.get = function () {
        if (!this.bubbles || !this.bubbles.length) {
            throw new Error('add at least one bubble');
        }
        return {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    elements: this.bubbles,
                },
            },
        };
    };
    GenericMessage.prototype.getLastBubble = function () {
        if (!this.bubbles || !this.bubbles.length) {
            throw new Error('add at least one bubble');
        }
        return this.bubbles[this.bubbles.length - 1];
    };
    GenericMessage.prototype.addBubble = function (title, subtitle) {
        if (this.bubbles.length === 10) {
            throw new Error('too many bubbles: 10 is the maximum');
        }
        if (!title) {
            throw new Error('bubble title cannot be empty');
        }
        if (title.length > 80) {
            throw new Error('bubble title cannot be longer than 80 characters');
        }
        if (subtitle && subtitle.length > 80) {
            throw new Error('bubble subtitle cannot be longer than 80 characters');
        }
        var bubble = {
            title: title,
            subtitle: subtitle || undefined,
        };
        this.bubbles.push(bubble);
        return this;
    };
    GenericMessage.prototype.addUrl = function (url) {
        if (!url) {
            throw new Error('URL is required');
        }
        if (!parser_1.isUrl(url)) {
            throw new Error('URL needs to be valid');
        }
        this.getLastBubble().item_url = url;
        return this;
    };
    GenericMessage.prototype.addImage = function (url) {
        if (!url) {
            throw new Error('image URL is required');
        }
        if (!parser_1.isUrl(url)) {
            throw new Error('image URL needs to be valid');
        }
        this.getLastBubble().image_url = url;
        return this;
    };
    GenericMessage.prototype.addButton = function (title, value) {
        var bubble = this.getLastBubble();
        bubble.buttons = bubble.buttons || [];
        if (bubble.buttons.length === 3) {
            throw new Error('too many buttons: 3 is the maximum');
        }
        if (!title) {
            throw new Error('button title cannot be empty');
        }
        if (!value) {
            throw new Error('button value is required');
        }
        var button = {
            title: title,
        };
        if (parser_1.isUrl(value)) {
            button.type = 'web_url';
            button.url = value;
        }
        else {
            button.type = 'postback';
            button.payload = value;
        }
        bubble.buttons.push(button);
        return this;
    };
    return GenericMessage;
}(FacebookMessage_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GenericMessage;
