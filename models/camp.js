var mongoose = require("mongoose");

var compschema = new mongoose.Schema({
    name:String,
    image:String,
    description:String,
});

// var compg =mongoose.model("compg",compschema);
module.exports = mongoose.model("compg",compschema);