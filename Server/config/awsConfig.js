// awsConfig.js
import dotenv from "dotenv"
dotenv.config()
import AWS from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3';

// Configure AWS SDK
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
});


export default s3;