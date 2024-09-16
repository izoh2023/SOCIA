'use client'

import { useState } from "react";
import QRCode from "qrcode";

const QRCodeGenerator = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState(""); // State to store the generated QR code URL
  const [inputText, setInputText] = useState(""); // State to store the input text

  // Function to generate the QR code
  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(inputText)
      setQrCodeUrl(url); // Set the generated QR code URL
    } catch (error) {
      console.error("Error generating QR code", error);
    }
  };

  return (
    <div>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter text for QR code"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)} // Update input text
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeUrl && (
        <div>
          <h3>Your QR Code:</h3>
          <img src={qrCodeUrl} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
