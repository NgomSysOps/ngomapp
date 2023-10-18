import React, { useState } from 'react';
import s3 from './awsConfig';
import Camera from './capture';

function App() {
  const [image1, setImage1] = useState(null);

  const uploadImage = () => {
    const params = {
      Bucket: 'your-bucket-name',
      Key: image1.name, 
      Body: image1,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Image uploaded successfully. URL: ${data.Location}`);
      }
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage1(URL.createObjectURL(file));
  };

  return (
    <><div>
      <h1>Image Upload</h1>
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image1 && <img src={image1} alt="Image" style={{ maxWidth: '300px' }} />}
      </div>
    </div>

    {/* Camera function */}
    <div className="App">
        <Camera />
    </div>

    <div className="App" >
      <button className="my-button" onClick={uploadImage} style={{marginTop: '10px', width: '40%', height: '30px', color:'lightgreens'}}>Verify</button>
    </div>
    </>
  );
}

export default App;
