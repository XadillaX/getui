/**
 * Created by XadillaX on 2014/8/7.
 */
var base64= require("js-base64").Base64;
var Schema = require("protobuf").Schema;
var fs = require("fs");
var schema = new Schema(fs.readFileSync(__dirname + "/../protobuf.desc"));
var TransparentSchema = schema["protobuf.Transparent"];

/**
 * transparent
 * @param appKey
 * @param appId
 * @constructor
 */
var Transparent = function(appKey, appId) {
    this.protocol = {
        id          : "",
        action      : "pushmessage",
        taskId      : "",
        appKey      : appKey || "",
        appId       : appId || "",
        messageId   : "",
        pushInfo    : {},
        actionChains: []
    };
};

/**
 * serialize this object to protobuf object
 * @returns {*}
 */
Transparent.prototype.serialize = function() {
    return TransparentSchema.serialize(this.protocol);
};

/**
 * serialize this object to base64
 * @returns {*}
 */
Transparent.prototype.toBase64 = function() {
    return base64.encode(new Buffer(this.serialize()).toString());
};

/**
 * set push info values
 * @type {string[]}
 */
const pushInfoKeys = [
    "actionLocKey",
    "badge",
    "message",
    "sound",
    "payload",
    "locKey",
    "locArgs",
    "launchImage",
    "actionKey"
];
for(var i = 0; i < pushInfoKeys.length; i++) {
    (function(key) {
        Transparent.prototype["set" + key[0].toUpperCase() + key.substr(1)] = function(value) {
            this.protocol.pushInfo[key] = value.toString();
        };

        Transparent.prototype["get" + key[0].toUpperCase() + key.substr(1)] = function() {
            return this.protocol.pushInfo[key];
        }
    })(pushInfoKeys[i]);
}

module.exports = Transparent;

/**
 * create Transparent from protobuf
 * @param pb
 * @returns {Transparent}
 */
module.exports.createFromPB = function(pb) {
    var object = TransparentSchema.parse(pb);
    var trans = new Transparent();
    trans.protocol = object;
    return trans;
};

/**
 * create Transparent from base64
 * @param base64String
 * @returns {Transparent}
 */
module.exports.createFromBase64 = function(base64String) {
    var buf = new Buffer(base64.decode(base64String));
    return this.createFromPB(buf);
};
