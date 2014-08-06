/**
 * Created by XadillaX on 2014/8/7.
 */
var Transparent = require("../lib/transparent");

var trans = new Transparent();
console.log(trans.toBase64());
console.log(Transparent.createFromPB(trans.serialize()));
console.log(Transparent.createFromBase64(trans.toBase64()));

trans.setActionKey("ddd");
trans.setActionLocKey("abc");
console.log(Transparent.createFromPB(trans.serialize()));
