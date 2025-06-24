const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

let otpStore = {}; // store mobile-otp temporarily

// 🔐 REPLACE THIS WITH YOUR REAL FAST2SMS OR TWILIO API KEY
const API_KEY = "YOUR_API_KEY";

app.post("/send-otp", async (req, res) => {
  const { mobile } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[mobile] = otp;

  try {
    // Replace with your actual SMS API URL (e.g., Fast2SMS, Twilio, etc.)
    await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: API_KEY,
        variables_values: otp,
        route: "otp",
        numbers: mobile,
      },
    });

    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { mobile, otp } = req.body;
  if (otpStore[mobile] === otp) {
    delete otpStore[mobile]; // clear OTP once verified
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});