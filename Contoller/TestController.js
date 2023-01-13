const mongoose = require("mongoose");

const TestModel = require("../Model/TestModel");
const QuestModel = require("../Model/AllTests");

const creatingTest = async (req, res) => {
	try {
		const { title, totalScore, duration } = req.body;

		const creating = await TestModel.create({
			title,
			totalScore,
			duration,
		});

		return res.status(200).json({
			message: "success",
			data: creating,
		});
	} catch (err) {
		res.status(404).json({ message: "an error occured", err });
	}
};

const getAllTest = async (req, res) => {
	try {
		const getTest = await TestModel.find().populate({
			path: "AllTest",
			options: { limit: 10 },
		});

		return res.status(200).json({
			message: "all test gotten",
			data: getTest,
		});
	} catch (err) {
		res.status(404).json({ message: "an error occured", err });
	}
};

const CreateQuestions = async (req, res) => {
	try {
		const getTest = await TestModel.findById(req.params.id);
		const { a, b, c, d, answer, question } = req.body;

		if (getTest) {
			const creatingQuest = await QuestModel.create({
				a,
				b,
				c,
				d,
				answer,
				question,
			});

			await getTest?.AllTest?.push(mongoose.Types.ObjectId(creatingQuest?._id));

			getTest.save();

			return res
				.status(200)
				.json({ message: "test created successfull", data: creatingQuest });
		} else {
			return res.status(404).json({ message: "id is not found", err });
		}
	} catch (err) {
		res.status(404).json({ message: "an error occured", err });
	}
};

module.exports = {
	creatingTest,
	CreateQuestions,
	getAllTest,
};
