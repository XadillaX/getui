/**
 * Created by XadillaX on 2014/8/7.
 */
var util = require("util");
var BaseTemplate = require("./");

var TransmissionTemplate = function(appKey, appId) {
    BaseTemplate.call(this, appKey, appId);
};

util.inherits(TransmissionTemplate, BaseTemplate);

module.exports = TransmissionTemplate;
