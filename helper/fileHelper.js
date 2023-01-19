const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString.replace(/:/g, "-" + file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  //Checks the media type of the input
  if (
    file.mimetype === "image/png" || //Detects a png image
    file.mimetype === "image/jpg" || //Detects a jpg image
    file.mimetype === "image/jpeg" || //Detects a jpeg image
    file.mimetype === "application/pdf" || //Detects a pdf file
    file.mimetype ===
      " application/vnd.openxmlformats-officedocument.wordprocessingml.document" || //Detects a word document (docx)
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" //Detects a spreadsheet document (xlxs)
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileUpload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { fileUpload };
