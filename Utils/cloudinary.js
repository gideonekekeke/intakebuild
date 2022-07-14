const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: "codeeer",
	api_key: "712836121183151",
	api_secret: "E2etyI8LPh5s6dR4IWKGJXzNd-I",
	secure: true,
});

module.exports = cloudinary;
