const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
// mount public folder
// app.use("/", express.static("public"));


app.use("/static", express.static(path.join(__dirname, "public")));

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
app.post("/api/sendMessage", upload.single("file"), (req, res) => {
  const { phone, selectedOption, message, caption,image } = req.body;

  const liveUrl = req.file
    ? `https://whatsapp-backend-blue.vercel.app/static/${req.file.filename}`
    : null;

  console.log("Received message data:", {
    phone,
    selectedOption,
    message,
    caption,

  });

  // let data 

  // if (selectedOption === "text") {
  //   data = {
  //     messaging_product: "whatsapp",
  //     to: phone,
  //     type: "text",
  //     text: {
  //       body: message,
  //     },
  //   };
  // } else if (selectedOption === "image" || selectedOption === "video" || selectedOption === "document") {
  //   data = {
  //     messaging_product: "whatsapp",
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
  //   "EAAQ4gWEoyicBO4IZA1YcUwqAUzH1Um0gS2w7dSpuu4T2GEBJrw5Nm1WrpDZAmZCWu4l05QUlamRhgSoksy1EFsUVZA3nvGnnHX6zQTaxg46GzubEHqP7ZCNhjh2UrKjcp2zPJyWoRmvb9nnOvg9w7AQGGoZA1e3ZAvZCw8UR7mtb3pg7DFXiEZAC8a0QksmvYnDx4jjSAe7E1xZAuUi6GDRqoTql3OyPKXvDKPqOwZD";

  // const headers = {
  //   Authorization: `Bearer ${accessToken}`,
  //   "Content-Type": "application/json",
  // };

  // axios
  //   .post(url, data, { headers })
  //   .then((response) => {
  //     console.log("Response:", response.data);
  //     res.json({ success: true, message: response });
  //   })
  //   .catch((error) => {
  //     console.error(
  //       "Error:",
  //       error.response ? error.response.data : error.message
  //     );
  //   });

  res.json({ success: true, message: liveUrl });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



