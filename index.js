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
// mount public folder
app.use("/", express.static("public"));

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
    ? `https://whatsapp-backend-bvtk21cdq-vishalmauryastp.vercel.app/${req.file.filename}`
    : null;

  console.log("Received message data:", {
    phone,
    selectedOption,
    message,
    caption,
  });

  // let data = null;

  // if (selectedOption === "text") {
  //   data = {
  //     messaging_product: "whatsapp_business",
  //     to: phone,
  //     type: "text",
  //     text: {
  //       body: message,
  //     },
  //   };
  // } else if (selectedOption === "image" || selectedOption === "video" || selectedOption === "document") {
  //   data = {
  //     messaging_product: "whatsapp_business",
  //     to: phone,
  //     type: selectedOption,
  //     [selectedOption]: {
  //       link: liveUrl,
  //       caption: caption,
  //     },
  //   };
  // }

  // const url = "https://graph.facebook.com/v18.0/239423185911953/messages";
  // const accessToken =
  //   "EAAQ4gWEoyicBO3pgpJZAGaLrHoAAmjyNEiP4bZAcNb7afXlRoBR7oMEg2bvFTUbIM8dwoe2TQkZBuFU3k6rtJvdpTyCLRq5zlCgzZApaKq2YnTwPbZAveD9OmTXQDgUHBtVqk9d6yz6ALLH4t32FjWnZCb4fiYjoNEnZBFW6uvNzZAqYoZAzDWQ5vftR2erhWSoktbugz0xxO5luGfKPmDKclfcBuEs9fl8W14w0ZD";

  // const headers = {
  //   Authorization: `Bearer ${accessToken}`,
  //   "Content-Type": "application/json",
  // };

  // axios
  //   .post(url, data, { headers })
  //   .then((response) => {
  //     console.log("Response:", response.data);
  //   })
  //   .catch((error) => {
  //     console.error(
  //       "Error:",
  //       error.response ? error.response.data : error.message
  //     );
  //   });

  res.json({ success: true, message:liveUrl });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
