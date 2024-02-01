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

      const fileUrl = `https://testingbuy-vom.onrender.com/${shortFileName}`;
      res.send({ fileName: shortFileName, fileUrl });
    });

    //
  } catch (err) {
    console.error("Error handling file upload:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/sendMessage", (req, res) => {
  res.send(`<h1>APi is working </h1>`);
});

app.post("/api/sendMessage", async (req, res) => {
  const { phone, selectedOption, message, caption, file } = req.body;

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

      const fileUrl = `https://testingbuy-vom.onrender.com/${shortFileName}`;
      res.send({ fileName: shortFileName, fileUrl });
    });

    const fileUrl = `https://testingbuy-vom.onrender.com/${shortFileName}`;

    console.log("Received message data:", {
      phone,
      selectedOption,
      message,
      caption,
      file,
      fileUrl,
    });

    //

    let data;

    if (selectedOption === "text") {
      // data = {
      //   messaging_product: "whatsapp",
      //   to: "7376834642",
      //   type: "template",
      //   template: {
      //     name: "hello_world",
      //     language: {
      //       code: "en_US",
      //     },
      //   },
      // };
      return (data = {
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: {
          body: message,
        },
      });
    }

    if (selectedOption === "image") {
      return (data = {
        messaging_product: "whatsapp",
        to:phone,
        type: "image",
        image: {
          link: fileUrl,
          caption: message,
        },
      });
    }
    if (selectedOption === "document") {
      return (data = {
        messaging_product: "whatsapp",
        to:phone,
        type: "document",
        document: {
          link: fileUrl,
          caption: message,
        },
      });
    }
    if (selectedOption === "video") {
      return (data = {
        messaging_product: "whatsapp",
        to:phone,
        type: "video",
        video: {
          link: fileUrl,
          caption: message,
        },
      });
    }

    const url = "https://graph.facebook.com/v18.0/239423185911953/messages";
    const accessToken =
      "EAAQ4gWEoyicBOzDhNNXh7pTDmF8oK3igj0FsIyixIf5CZB2CVMPHUh6D4T2rflCKRtBOltMnsrdSATvxFPye3Go7SsxmKfCZA7K6RO8hxxX7RS3gzjAxDZBh2V1aMJ9yAnGnHZCdqtCVugFd6ZCU0RkZADwUsio9csoCcd1YSK3deuusK2eu5UAo1U2cLyDvXG13FfZBWN42fhoi0OKT0gtUQBZCSi22ZApQNY58ZD";

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    await axios
      .post(url, data, { headers })
      .then((response) => {
        console.log("Response:", response.data);
        return res.send(response);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
