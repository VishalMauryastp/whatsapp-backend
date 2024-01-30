const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const axios = require("axios")

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/api/sendMessage", (req, res) => {
  res.send(`<h1>APi is working </h1>`);
});
app.post("/api/sendMessage", upload.single("image"), (req, res) => {
  const { phone, selectedOption, message, caption } = req.body;

  const liveUrl = req.file
    ? `http://localhost:3001/public/${req.file.filename}`
    : null;

  console.log("Received message data:", {
    phone,
    selectedOption,
    message,
    caption,
  });

//   const data =
//     selectedOption === "text"
//       ? {
//           messaging_product: "whatsapp",
//           to: phone,
//           type: "text",
//           text: {
//             body: message,
//           },
//         }
//       : selectedOption === "image"
//       ? {
//           messaging_product: "whatsapp",
//           to: phone,
//           type: "image",
//           image: {
//             link: message,
//             caption: caption,
//           },
//         }
//       : selectedOption === "video"
//       ? {
//           messaging_product: "whatsapp",
//           to: phone,
//           type: "video",
//           video: {
//             link: message,
//             caption: caption,
//           },
//         }
//       : selectedOption === "document"
//       ? {
//           messaging_product: "whatsapp",
//           to: phone,
//           type: "document",
//           document: {
//             link: message,
//             caption: caption,
//           },
//         }
//       : null;

//   const url = "https://graph.facebook.com/v18.0/239423185911953/messages";
//   const accessToken =
//     "EAAQ4gWEoyicBO3pgpJZAGaLrHoAAmjyNEiP4bZAcNb7afXlRoBR7oMEg2bvFTUbIM8dwoe2TQkZBuFU3k6rtJvdpTyCLRq5zlCgzZApaKq2YnTwPbZAveD9OmTXQDgUHBtVqk9d6yz6ALLH4t32FjWnZCb4fiYjoNEnZBFW6uvNzZAqYoZAzDWQ5vftR2erhWSoktbugz0xxO5luGfKPmDKclfcBuEs9fl8W14w0ZD";

//   const headers = {
//     Authorization: `Bearer ${accessToken}`,
//     "Content-Type": "application/json",
//   };

//   axios
//     .post(url, data, { headers })
//     .then((response) => {
//       console.log("Response:", response.data);
//     })
//     .catch((error) => {
//       console.error(
//         "Error:",
//         error.response ? error.response.data : error.message
//       );
//     });

  res.json({ success: true, message:liveUrl });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
