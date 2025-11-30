const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "frontend" directory
app.use(express.static("frontend"));

// Serve index.html for the root path
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ompanchal2004@gmail.com", // 🔁 Replace with your Gmail
    pass: "ovnodvjfrfrocyoq", // 🔁 Replace with your App Password
  },
});

app.post("/send-ticket", async (req, res) => {
  const { email, seat, wallet, txHash } = req.body;

  const htmlContent = `
    <h2>Your Blockchain Ticket</h2>
    <p><strong>Seat:</strong> ${seat}</p>
    <p><strong>Wallet Address:</strong> ${wallet}</p>
    <p><strong>Transaction Hash:</strong> ${txHash}</p>
    <p>Show this QR code at entry:</p>
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Seat:${seat}, Wallet:${wallet}, TxHash:${txHash}" />
  `;

  try {
    await transporter.sendMail({
      from: '"Blockchain Booking" <your-email@gmail.com>',
      to: email,
      subject: `🎫 Your Seat #${seat} Ticket`,
      html: htmlContent,
    });

    console.log(`✅ Ticket sent to ${email}`);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Failed to send email:", err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
