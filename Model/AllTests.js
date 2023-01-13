const mongoose = require("mongoose");

const AllTestShema = mongoose.Schema(
	{
		question: {
			type: String,
			require: true,
		},
		answer: {
			type: String,
			require: true,
		},

		a: {
			type: String,
			require: true,
		},
		b: {
			type: String,
			require: true,
		},

		c: {
			type: String,
			require: true,
		},
		d: {
			type: String,
			require: true,
		},

		test: {
			type: mongoose.Types.ObjectId,
			ref: "tests",
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("alltests", AllTestShema);
