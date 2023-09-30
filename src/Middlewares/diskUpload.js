const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

const diskUpload = multer({
  storage,
  limits: {
    fileSize: 2e6,
  },
  fileFilter: (req, file, cb) => {
    // validasi
    if (
      file.mimetype != "image/png" &&
      file.mimetype != "image/jpg" &&
      file.mimetype != "image/jpeg"
    ) {
      req.fileValidationError = "Forbidden extension";
      return cb(null, false, req.fileValidationError);
    }
    cb(null, true);
  },
});

const upload = (fieldname) => {
  return (req, res, next) => {
    diskUpload.single(fieldname)(req, res, (err) => {
      if (err) {
        return res.status(401).json({
          msg: err.message,
        });
      }

      if (req.fileValidationError) {
        return res.status(401).json({
          msg: req.fileValidationError,
        });
      }

      return next();
    });
  };
};

module.exports = { upload };
