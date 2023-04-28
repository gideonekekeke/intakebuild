const userData = require("../Model/UserModel");
const cloudinary = require("../Utils/cloudinary");
const path = require("path");
const otpGenerator = require("otp-generator");

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

		const opppt = otpGenerator.generate(3, {
			upperCaseAlphabets: false,
			specialChars: false,
			digits: true,
			lowerCaseAlphabets: false,
		});
		console.log(opppt);

		const regUser = await userData.create({
			name: name.trim(),
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
			code: opppt,
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

const LoginUser = async (req, res) => {
	try {
		const { name } = req.body;

		const getUser = await userData.findOne({ name });

		if (getUser) {
			if (!getUser?.logicToggle) {
				return res.status(200).json({
					message: "Welcome",
					data: getUser,
				});
			} else {
				return res.status(404).json({
					message: "you have already taken the test",
				});
			}
		} else {
			return res.status(404).json({
				message: "User With this name is not Found",
			});
		}
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
	LoginUser,
};
