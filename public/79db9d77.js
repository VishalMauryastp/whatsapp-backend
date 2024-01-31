const path = require("path");
const fs = require("fs/promises");
const { generateString, Errorlogger } = require("./handlers");

const dirExists = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch (error) {
    // Directory does not exist, create it
    let dirName = dirPath;
    await fs.mkdir(dirName, { recursive: true });
  }
};

const uploadImage = async (file, dirName) => {
  try {
    // Array of allowed files
    const fileTypeArray = [
      "png",
      "jpeg",
      "jpg",
      "gif",
      "bmp",
      "webp",
      "svg",
      "avif",
    ];
    // Allowed file size in mb
    const maxFileSize = 2;

    const dir = path.join(path.join(__dirname, "/public"), dirName);
    await dirExists(dir);

    // const file = await req.files.image;
    const fileType = await file?.mimetype.split("/")[1];

    // Check if the uploaded file is allowed
    if (!fileTypeArray.includes(fileType)) {
      throw Error("Invalid file format");
    }

    // Check if the uploaded file is allowed
    if (file.size / (1024 * 1024) > maxFileSize) {
      throw Error("File size too large");
    }

    const fileName = `${generateString(12)}.${fileType}`;

    var filePath = await path.join(dir, fileName);

    await file.mv(filePath, (err) => {
      if (err) {
        Errorlogger("upload-image file, UploadImage func", err);
        return false;
      }
    });
    return fileName.toString();
  } catch (error) {
    Errorlogger("upload-image file, UploadImage func", error);
    return error;
  }
};

const deleteImageFile = async (filepath) => {
  try {
    const dir = path.join(path.join(__dirname, "../../public"), filepath);
    return await fs.unlink(dir, (err) => {
      if (err) {
        Errorlogger("upload-image file, deleteImageFile func", err);
        return false;
      }
      return true;
    });
  } catch (error) {
    Errorlogger("upload-image file, deleteImageFile func", error);
    return false;
  }
};

module.exports = { uploadImage, deleteImageFile };
