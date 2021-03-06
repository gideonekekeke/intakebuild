require("./Utils/db");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 6000;

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", require("./Routes/UserRoute"));

app.listen(port, () => {
	console.log("listening on port 6000");
});
