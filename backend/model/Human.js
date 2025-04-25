const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const humanSchema = new Schema({
	gender: String,
	name: { title: String, first: String, last: String },
	location: { city: String, state: String, country: String },
	email: String,
	uuid: String,
	dob: String,
	phone: String,
	picture: String,
});

module.exports = mongoose.model("Human", humanSchema);
