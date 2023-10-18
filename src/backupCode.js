import React, { useState } from 'react';
import s3 from './awsConfig';
import Button from './Button';
import Camera from './capture';

function App() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const uploadImage = (file, imageNumber) => {
    const params = {
      Bucket: 'your-bucket-name',
      Key: `image${imageNumber}.jpg`, 
      Body: file,
      ACL: 'public-read',
      ContentType: 'image/jpeg',
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Image ${imageNumber} uploaded successfully. URL: ${data.Location}`);
      }
    });
  };

  const handleImage1Upload = (event) => {
    const file = event.target.files[0];
    setImage1(URL.createObjectURL(file));
    uploadImage(file, 1);
  };

  const handleImage2Upload = (event) => {
    const file = event.target.files[0];
    setImage2(URL.createObjectURL(file));
    uploadImage(file, 2);
  };

  return (
    <><div>
      <h1>Image Uploader</h1>
      <div>
        <h2>Upload Image 1</h2>
        <input type="file" accept="image/*" onChange={handleImage1Upload} />
        {image1 && <img src={image1} alt="Image 1" style={{ maxWidth: '300px' }} />}
      </div>
      <div>
        <h2>Upload Image 2</h2>
        <input type="file" accept="image/*" onChange={handleImage2Upload} />
        {image2 && <img src={image2} alt="Image 2" style={{ maxWidth: '300px' }} />}
      </div>
    </div>
    <div className="App" style={{marginTop: '20px'}}>
        <Camera />
    </div>
    <div className="App" style={{marginTop: '30px'}}>
        <Button />
    </div>
    </>
  );
}

export default App;
