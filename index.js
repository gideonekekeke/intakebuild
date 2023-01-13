require("./Utils/db");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 15790;

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", require("./Routes/UserRoute"));
app.use("/api/test", require("./Routes/TestRoute"));

app.listen(port, () => {
	console.log("listening on port 6000");
});
