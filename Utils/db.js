const mongoose = require("mongoose");

const main = "mongodb://localhost/myServiceeDB";
const url =
	"mongodb+srv://shotkode:shotkode@cluster0.2kfdg.mongodb.net/CodeLabIntakeDB?retryWrites=true&w=majority";
mongoose
	.connect(url)
	.then(() => {
		console.log("database is connected");
	})
	.catch((err) => {
		console.log("an error ocuured while connecting");
	});
