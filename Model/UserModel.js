const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		phoneNumber: {
			type: String,
		},
		address: {
			type: String,
		},
		avatar: {
			type: String,
		},
		profile: {
			type: String,
		},
		logic: {
			type: Number,
			default: 0,
		},
		logicToggle: {
			type: Boolean,
			default: false,
		},
		leadership: {
			type: Number,
			default: 0,
		},
		leadershipToggle: {
			type: Boolean,
			default: false,
		},
		psycho: {
			type: Number,
			default: 0,
		},
		psychoToggle: {
			type: Boolean,
			default: false,
		},
		code: {
			type: String,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("intake", userSchema);
