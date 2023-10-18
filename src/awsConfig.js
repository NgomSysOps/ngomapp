// awsConfig.js
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'your-access-key',
  secretAccessKey: 'your-secret-key',
  region: 'your-region', // e.g., 'us-east-1'
});

const s3 = new AWS.S3();

export default s3;
