'use client'

import { useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

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
          <Image src={qrCodeUrl} alt="QR Code" width={500} height={500} className="w-auto h-auto" />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
