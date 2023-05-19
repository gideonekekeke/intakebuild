const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const XLSX = require("xlsx");

// MongoDB connection settings
const mongoUrl =
	"mongodb+srv://shotkode:shotkode@cluster0.2kfdg.mongodb.net/Kode10XIntake01?retryWrites=true&w=majority";
const dbName = "Kode10XIntake01";
const collectionName = "intakes";

// Excel export route
router.get("/export", async (req, res) => {
	try {
		// Connect to MongoDB
		const client = await MongoClient.connect(mongoUrl);
		const db = client.db(dbName);
		const collection = db.collection(collectionName);

		// Query and retrieve MongoDB documents
		const documents = await collection.find({}).toArray();

		// Transform documents to worksheet format
		const worksheet = XLSX.utils.json_to_sheet(documents);

		// Create workbook and add the worksheet
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Documents");

		// Generate Excel binary data
		const excelData = XLSX.write(workbook, {
			type: "buffer",
			bookType: "xlsx",
		});

		// Set response headers for file download
		res.setHeader(
			"Content-Disposition",
			"attachment; filename=exported_documents.xlsx",
		);
		res.setHeader(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		);

		// Send the Excel data as the response
		res.send(excelData);

		// Close the MongoDB connection
		client.close();
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
