const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3001;

const fileUpload = require("express-fileupload");
const { uploadImage } = require("./upload-image");

app.use(fileUpload());

app.use(bodyParser.json());
app.use(cors());

app.get("/api/sendMessage", (req, res) => {
  res.send(`<h1>APi is working </h1>`);
});

app.post("/api/sendMessage", async (req, res) => {

  const file = req?.files;
  const uploadedImgUrl = await uploadImage(file?.image, "banners");


  // const isuploadfile = await uploadImage(req.files, "/public");

  const { phone, selectedOption, message, caption } = req.body;

  // const liveUrl = req.file
  //   ? `https://whatsapp-backend-blue.vercel.app/static/${req.file.filename}`
  //   : null;

  console.log("Received message data:", {
    phone,
    selectedOption,
    message,
    caption,
    uploadedImgUrl
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
  console.log(`Server is running on port ${port}`);
});
