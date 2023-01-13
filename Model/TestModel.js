const mongoose = require("mongoose");

const TestSchema = mongoose.Schema(
	{
		title: {
			type: String,
		},
		duration: {
			type: String,
		},
		totalScore: {
			type: Number,
		},
		AllTest: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "alltests",
			},
		],
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("tests", TestSchema);
