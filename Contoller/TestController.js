const mongoose = require("mongoose");

const TestModel = require("../Model/TestModel");
const QuestModel = require("../Model/AllTests");
const allTes = require("../Model/AllTests");

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
		var myLimit = 10;
		const getTest = await TestModel.find().populate({
			path: "AllTest",
			options: { limit: myLimit },
		});

		return res.status(200).json({
			message: "all test gotten",
			data: getTest,
		});
	} catch (err) {
		res.status(404).json({ message: "an error occured", err });
	}
};
const getAllTested = async (req, res) => {
	try {
		const page = req.query.page || 1;
		const ran = Math.floor(Math.random() * 18);
		// console.log("my rand", ran);
		const getTesst = await allTes
			.find()
			.skip((page - 1) * 1)
			// .sort(() => Math.random() - 0.5)
			.limit(10);
		// const getTest = await getTesst;

		// console.log(getTest);

		return res.status(200).json({
			message: "all test gotten",
			data: getTesst,
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
	getAllTested,
};
