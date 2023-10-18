import React, { useState, useRef } from "react";

function Camera() {
  const videoRef = useRef();
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    setCapturedImage(dataURL);
  };

  return (
    <div style={{display:'flow-root'}}>
      <h2>Camera</h2>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture Image</button>
      <video ref={videoRef} width="550" height="550" autoPlay />
      {capturedImage && <img src={capturedImage} alt="Captured" width="480" height="380"/>}
    </div>
  );
}

export default Camera;
