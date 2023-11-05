const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();

// 파일 업로드 저장소 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/upload", upload.single("model"), (req, res) => {
  res.json({ message: "File uploaded successfully" });
});

// 서버가 해당 포트에서 실행되도록 설정
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
