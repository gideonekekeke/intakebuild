const userData = require("../Model/UserModel");
const cloudinary = require("../Utils/cloudinary");
const path = require("path");

const getUser = async (req, res) => {
	const getting = await userData.find({ new: true });

	res.status(200).json({
		message: "successful",
		data: getting,
	});
};

const RegisterUser = async (req, res) => {
	try {
		const {
			name,
			email,
			phoneNumber,
			address,
			avatar,
			profile,
			logic,
			logicToggle,
			leadership,
			leadershipToggle,
			psycho,
			psychoToggle,
			code,
		} = req.body;

		const user = await userData.findOne({ email: email });

		if (user) {
			return res.status(404).json({ message: "user already registered" });
		}

		const Image = await cloudinary.uploader.upload(req.file.path, {
			upload_preset: "code",
		});

		const regUser = await userData.create({
			name,
			email,
			phoneNumber,
			address,
			avatar: Image.secure_url,
			profile,
			logic,
			logicToggle,
			leadership,
			leadershipToggle,
			psycho,
			psychoToggle,
			code: Math.floor(Math.random() * 80),
		});

		res.status(200).json({
			message: "successful",
			data: regUser,
		});
	} catch (err) {
		res.status(400).json({
			message: "an erro occures",
		});
	}
};

const updatingLogic = async (req, res) => {
	try {
		const { logic } = req.body;
		const editStatus = await userData.findByIdAndUpdate(
			req.params.id,
			{
				logic,
				logicToggle: true,
			},
			{ new: true },
		);

		res.status(200).json(editStatus);
	} catch (err) {
		res.status(404).json({ message: "an error occured", err });
	}
};
const updatingLeadership = async (req, res) => {
	try {
		const { leadership } = req.body;
		const editStatus = await userData.findByIdAndUpdate(
			req.params.id,
			{
				leadership,
				leadershipToggle: true,
			},
			{ new: true },
		);

		res.status(200).json(editStatus);
	} catch (err) {
		res.status(404).json({ message: "an error occured", err });
	}
};
const updatingPsycho = async (req, res) => {
	try {
		const { psycho } = req.body;
		const editStatus = await userData.findByIdAndUpdate(
			req.params.id,
			{
				psycho,
				psychoToggle: true,
			},
			{ new: true },
		);

		res.status(200).json(editStatus);
	} catch (err) {
		res.status(404).json({ message: "an error occured", err });
	}
};

module.exports = {
	getUser,
	RegisterUser,
	updatingLogic,
	updatingLeadership,
	updatingPsycho,
};
