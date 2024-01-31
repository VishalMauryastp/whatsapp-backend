const path = require("path");
const fs = require("fs/promises");

const generateString = (length) => {
  var uniStr = "";
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let i = 0;
  while (i <= length) {
    let num = Math.floor(Math.random() * 62);
    uniStr += str.slice(num - 1, num);
    i++;
  }
  return uniStr;
};

const dirExists = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch (error) {
    // Directory does not exist, create it
    await fs.mkdir(dirPath, { recursive: true });
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
      "pdf", // lowercase "pdf" added
    ];
    // Allowed file size in mb
    const maxFileSize = 2;

    if (!file) {
      throw new Error("No file provided");
    }

    const fileType = file.mimetype.split("/")[1].toLowerCase(); // Convert to lowercase

    // Check if the uploaded file is allowed
    if (!fileTypeArray.includes(fileType)) {
      throw new Error("Invalid file format");
    }

    // Check if the uploaded file is allowed
    if (file.size / (1024 * 1024) > maxFileSize) {
      throw new Error("File size too large");
    }

    const dir = path.join(__dirname, dirName);
    await dirExists(dir);

    const fileName = `${generateString(12)}.${fileType}`;
    const filePath = path.join(dir, fileName);

    // Use fs.promises.rename instead of file.mv to move the file
    await fs.promises.rename(file.tempFilePath, filePath);

    return fileName;
  } catch (error) {
    console.error("upload-image file, UploadImage func", error);
    throw error; // Re-throw the error to be caught by the calling code
  }
};

const deleteImageFile = async (filepath) => {
  try {
    const dir = path.join(__dirname, "../../public", filepath);
    await fs.unlink(dir);
    return true;
  } catch (error) {
    console.error("upload-image file, deleteImageFile func", error);
    return false;
  }
};

module.exports = { uploadImage, deleteImageFile };
