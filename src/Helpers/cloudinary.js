const cloudinary = require("../Configs/cloudinary");
const datauriParser = require("datauri/parser");
const path = require("path");

const uploader = async (req, prefix, id, folder = "coffee-shop") => {
  // ambil buffer via multer
  const { file } = req;
  if (!file) return { data: null, err: null };
  const buffer = file.buffer;

  // konversi buffer menjadi datauri base64
  const ext = path.extname(file.originalname);
  const parser = new datauriParser();
  const datauriFile = parser.format(ext, buffer);
  const publicId = `${prefix}_${file.fieldname}-${id}`;
  try {
    // upload file ke cloudinary
    const result = await cloudinary.uploader.upload(datauriFile.content, {
      public_id: publicId,
      folder,
    });
    return { data: result, err: null };
  } catch (err) {
    return { data: null, err };
  }
};

module.exports = { uploader };
