const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

require("dotenv").config();
const port = process.env.PORT || null;

const app = express();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/videos");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const storageFiles = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/files");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });
const uploadFile = multer({ storage: storageFiles });

const admin = false;

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

// -------------------------------------------------
// --process videos
app.get("/", (req, res) => {
	const filesFolder = "./public/videos";
	const fileList = fs.readdirSync(filesFolder);
	// fileList passed in via ejs object
	res.render("videos", { fileList: fileList });
});

app.post("/", upload.single("file"), (req, res) => {
	// uploads file and then displays video files
	res.redirect("/");
});
// -------------------------------------------------
// --process files
app.get("/files", (req, res) => {
	const filesFolder = "./public/files";
	const fileList = fs.readdirSync(filesFolder);
	// fileList passed in via ejs object
	res.render("files", { fileList: fileList });
});

app.post("/files", uploadFile.single("file"), (req, res) => {
	// uploads file and then displays files
	res.redirect("/files");
});

// -------------------------------------------------
app.get("/videos/delete/:fname", (req, res) => {
	console.log(req.params.fname);
	fs.unlink(`./public/videos/${req.params.fname}`, err => {
		if (err) console.log(err);
	});
	res.redirect("/");
});

// -------------------------------------------------

if (port) {
	app.listen(port, "localhost", () => {
		console.log(`Listening on ${port}`);
	});
} else {
	app.listen();
}
