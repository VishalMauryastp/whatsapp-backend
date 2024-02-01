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

const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3001;
app.use(cors());

// Enable file uploads
app.use(fileUpload());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));
// app.use('/public', express.static(path.join(__dirname, 'public')));

// File upload route
app.post("/upload", async (req, res) => {
  try {
    if (!req?.files || Object.keys(req?.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // const file = await req?.files.image;
    const file = req?.files && req?.files?.image;

    if (!file) {
      return res.status(400).send("No files were uploaded.");
    }

    const shortFileName = generateShortFileName(file?.name);
    const uploadPath = path.join(__dirname, "public", shortFileName);

    file.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      const fileUrl = `https://whatsapp-backend-blue.vercel.app/${shortFileName}`;
      res.send({ fileName: shortFileName, fileUrl });
    });

    //
  } catch (err) {
    console.error("Error handling file upload:", err);
    res.status(500).send("Internal Server Error");
  }
});

function generateShortFileName(originalFileName) {
  const shortName = uuidv4().substring(0, 8);
  const fileExtension = path.extname(originalFileName);
  return `${shortName}${fileExtension}`;
}

// get req
app.get("/api/sendMessage", (req, res) => {
  res.send(`<h1>APi is working </h1>`);
});

// post req
app.post("/api/sendMessage", async (req, res) => {
  // const file = req?.files;

  if (!req?.files || Object.keys(req?.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // const file = await req?.files.image;
  const file = req?.files && req?.files?.image;

  if (!file) {
    return res.status(400).send("No files were uploaded.");
  }

  const shortFileName = generateShortFileName(file?.name);
  const uploadPath = path.join(__dirname, "public", shortFileName);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    const fileUrl = `https://whatsapp-backend-blue.vercel.app/${shortFileName}`;
    res.send({ fileName: shortFileName, fileUrl });
  });

  const { phone, selectedOption, message, caption } = req.body;

  console.log("Received message data:", {
    phone,
    selectedOption,
    message,
    caption,
    uploadedImgUrl,
  });

  // let data;

  // if (selectedOption === "text") {
  //   data = {
  //     messaging_product: "whatsapp",
  //     to: "7376834642",
  //     type: "template",
  //     template: {
  //       name: "hello_world",
  //       language: {
  //         code: "en_US",
  //       },
  //     },
  //   };
  //   // data = {
  //   //   messaging_product: "whatsapp",
  //   //   to: phone,
  //   //   type: "text",
  //   //   text: {
  //   //     body: message,
  //   //   },
  //   // };
  // }

  // if (
  //   selectedOption === "image"
  //   // ||
  //   // selectedOption === "video" ||
  //   // selectedOption === "document"
  // ) {
  //   data = {
  //     messaging_product: "whatsapp",
  //     to: "7376834642",
  //     type: "image",
  //     image: {
  //       link: "https://gronitywebsolution.com/online-data-analysis-flat-illustration-of-data-analytics-vector.jpg",
  //     },
  //   };
  // }
  // function getTextMessageInput(recipient, text) {
  //   return JSON.stringify({
  //     messaging_product: "whatsapp",
  //     preview_url: false,
  //     recipient_type: "individual",
  //     to: recipient,
  //     type: "text",
  //     text: {
  //       body: text,
  //     },
  //   });
  // }

  // var data = getTextMessageInput(
  //   "7376834642",
  //   "Welcome to the Movie Ticket Demo App for Node.js!"
  // );

  // const url = "https://graph.facebook.com/v18.0/239423185911953/messages";
  // const accessToken =
  //   "EAAQ4gWEoyicBO4IZA1YcUwqAUzH1Um0gS2w7dSpuu4T2GEBJrw5Nm1WrpDZAmZCWu4l05QUlamRhgSoksy1EFsUVZA3nvGnnHX6zQTaxg46GzubEHqP7ZCNhjh2UrKjcp2zPJyWoRmvb9nnOvg9w7AQGGoZA1e3ZAvZCw8UR7mtb3pg7DFXiEZAC8a0QksmvYnDx4jjSAe7E1xZAuUi6GDRqoTql3OyPKXvDKPqOwZD";

  // const headers = {
  //   Authorization: `Bearer ${accessToken}`,
  //   "Content-Type": "application/json",
  // };

  // await axios
  //   .post(url, data, { headers })
  //   .then((response) => {
  //     console.log("Response:", response.data);
  //     return res.send(response);
  //   })
  //   .catch((error) => {
  //     console.error(
  //       "Error:",
  //       error.response ? error.response.data : error.message
  //     );
  //   });

  // res.json({ success: true, message: liveUrl });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
