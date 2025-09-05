const express = require("express");
const path = require("path");
const QRCode = require("qrcode");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home page
app.get("/", (req, res) => {
  res.render("index", { qrCodeUrl: null });
});

// Generate QR Code
app.post("/generate", async (req, res) => {
  const text = req.body.text;

  try {
    const qrCodeUrl = await QRCode.toDataURL(text);
    res.render("index", { qrCodeUrl });
  } catch (err) {
    console.error(err);
    res.send("Error generating QR Code");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});