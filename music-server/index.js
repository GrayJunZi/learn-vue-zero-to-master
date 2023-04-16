const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();

app.use(express.static("./public"));

let uploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/upload");
    },
    filename: (req, file, cb) => {
      cb(null, `${+new Date()}.${file.originalname.split(".")[1]}`);
    },
  }),
});

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.post("/api/upload", uploader.single("file"), (req, res) => {
  console.log(req.file);
  res.json({
    originalname: req.file.originalname,
    filename: req.file.filename,
    url: `http://${req.headers.host}//upload//${req.file.filename}`,
  });
});

const port = 5174;
app.listen(port, "localhost", () => {
  console.log(`启动成功，正在监听 ${port} 端口。\nhttp://localhost:${port}`);
});
