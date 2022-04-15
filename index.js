const express = require("express");

const app = express();
const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "files");
	},
	filename: (req, file, cb) => {
		console.log(file);
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");

app.get("/upload", (req, res) => {
	res.render("upload");
});

app.post("/upload", upload.single("file"), (req, res) => {
	res.send("File Uploaded");
});

app.listen(3001, () => {
	console.log("Server running: port 3001");
});
