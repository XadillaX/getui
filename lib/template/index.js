/**
 * Created by XadillaX on 2014/8/7.
 */
var Transparent = require("../transparent");

/**
 * base template
 * @param appKey
 * @param appId
 * @constructor
 */
var BaseTemplate = function(appKey, appId) {
    this.transparent = new Transparent(appKey, appId);
};

/**
 * serialize the object
 * @returns {*}
 */
BaseTemplate.prototype.serialize = function() {
    return this.transparent.serialize();
};

/**
 * serialize the object and get base64
 * @returns {*}
 */
BaseTemplate.prototype.toBase64 = function() {
    return this.transparent.toBase64();
};

/**
 * set the protobuf object
 * @param pb
 */
BaseTemplate.prototype.setProtobufObject = function(pb) {
    this.transparent = Transparent.createFromPB(pb);
};

/**
 * set the protobuf object from base64
 * @param base64
 */
BaseTemplate.prototype.setProtobufObjectFromBase64 = function(base64) {
    this.transparent = Transparent.createFromBase64(base64);
};

/**
 * some set/get functions
 * @type {string[]}
 */
const keys = [ "id", "action", "taskId", "appKey", "appId", "messageId" ];
for(var i = 0; i < keys.length; i++) {
    (function(key) {
        BaseTemplate.prototype["set" + key[0].toUpperCase() + key.substr(1)] = function(value) {
            this.transparent.protocol[key] = value.toString();
        };

        BaseTemplate.prototype["get" + key[0].toUpperCase() + key.substr(1)] = function() {
            return this.transparent.protocol[key];
        }
    })(keys[i]);
}

module.exports = BaseTemplate;
