const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

const app = express();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/files");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
// app.use(express.static("public"));

app.get("/upload", (req, res) => {
	const filesFolder = "./public/files";
	const fileList = fs.readdirSync(filesFolder);
	// fileList passed in via ejs object
	res.render("upload", { fileList: fileList });
});

app.post("/upload", upload.single("file"), (req, res) => {
	res.send("File Uploaded");
});

app.listen(3001, () => {
	console.log("Server running: port 3001");
});
