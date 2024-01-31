// const express = require('express');
// const fileUpload = require('express-fileupload');
// const path = require('path');
// const cors = require("cors");

// const app = express();
// const port = 3001;
// app.use(cors());

// // Enable file uploads
// app.use(fileUpload());

// // Serve static files from the public folder
// app.use(express.static(path.join(__dirname, 'public')));

// // File upload route
// app.post('/upload', (req, res) => {
//   try {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).send('No files were uploaded.');
//     }

//     const file = req.files.image;
//     const uploadPath = path.join(__dirname, '/', file.name);

//     // Move the file to the public folder
//     file.mv(uploadPath, (err) => {
//       if (err) {
//         return res.status(500).send(err);
//       }

//       res.send('File uploaded!');
//     });
//   } catch (err) {
//     console.error('Error handling file upload:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// const express = require("express");
// const fileUpload = require("express-fileupload");
// const path = require("path");
// const cors = require("cors");

// const app = express();
// const port = 3001;
// app.use(cors());

// // Enable file uploads
// app.use(fileUpload());

// // Serve static files from the public folder
// app.use(express.static(path.join(__dirname, "public")));

// // File upload route
// app.post("/upload", (req, res) => {
//   try {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).send("No files were uploaded.");
//     }

//     const file = req.files.image;
//     const uploadPath = path.join(__dirname, "public", file.name);

//     // Move the file to the public folder
//     file.mv(uploadPath, (err) => {
//       if (err) {
//         return res.status(500).send(err);
//       }

//       // Return the file name as part of the response
//       res.send({ fileName: file.name });
//     });
//   } catch (err) {
//     console.error("Error handling file upload:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3001;
app.use(cors());

// Enable file uploads
app.use(fileUpload());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// File upload route
app.post('/upload', (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.image;
    const shortFileName = generateShortFileName(file.name);
    const uploadPath = path.join(__dirname, 'public', shortFileName);

    file.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      const fileUrl = `https://whatsapp-backend-blue.vercel.app/${shortFileName}`;
      res.send({ fileName: shortFileName, fileUrl });
    });
  } catch (err) {
    console.error('Error handling file upload:', err);
    res.status(500).send('Internal Server Error');
  }
});

function generateShortFileName(originalFileName) {
  const shortName = uuidv4().substring(0, 8);
  const fileExtension = path.extname(originalFileName);
  return `${shortName}${fileExtension}`;
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


