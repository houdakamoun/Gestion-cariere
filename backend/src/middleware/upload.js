const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname
      .replace(/\s+/g, "-") // supprime espaces
      .replace(/[^a-zA-Z0-9.\-_]/g, "");

    cb(null, Date.now() + "-" + safeName);
  },
});

module.exports = multer({ storage });
