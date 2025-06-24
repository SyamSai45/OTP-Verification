import React, { useState } from "react";

const OtpVerification = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [step, setStep] = useState("enterMobile"); // enterMobile, enterOtp, verified

  // Function to generate 6-digit OTP
  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    console.log("Generated OTP:", newOtp); // In real app, send via SMS/email API
    alert("Your OTP is: " + newOtp);
    setStep("enterOtp");
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      alert("OTP Verified Successfully!");
      setStep("verified");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>OTP Verification</h2>

      {step === "enterMobile" && (
        <div style={styles.card}>
          <label>Enter Mobile Number:</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile"
            style={styles.input}
          />
          <button
            onClick={generateOtp}
            disabled={mobile.length !== 10}
            style={styles.button}
          >
            Send OTP
          </button>
        </div>
      )}

      {step === "enterOtp" && (
        <div style={styles.card}>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            style={styles.input}
          />
          <button onClick={handleVerifyOtp} style={styles.button}>
            Verify OTP
          </button>
        </div>
      )}

      {step === "verified" && (
        <div style={styles.success}>
          ✅ Your mobile number is verified!
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "400px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial",
  },
  card: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  success: {
    marginTop: "20px",
    color: "green",
    fontSize: "18px",
  },
};

export default OtpVerification;