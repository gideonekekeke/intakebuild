const mongoose = require("mongoose");

const main = "mongodb://localhost/set07DB";
const url =
	"mongodb+srv://shotkode:shotkode@cluster0.2kfdg.mongodb.net/set07DB?retryWrites=true&w=majority";
mongoose
	.connect(url)
	.then(() => {
		console.log("database is connected");
	})
	.catch((err) => {
		console.log("an error ocuured while connecting");
	});
