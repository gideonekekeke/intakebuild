const mongoose = require("mongoose");

const main = "mongodb://localhost/Kode10XStudents";
const url =
	"mongodb+srv://shotkode:shotkode@cluster0.2kfdg.mongodb.net/Kode10XIntake02?retryWrites=true&w=majority";
mongoose
	.connect(url)
	.then(() => {
		console.log("database is connected");
	})
	.catch((err) => {
		console.log("an error ocuured while connecting");
	});
