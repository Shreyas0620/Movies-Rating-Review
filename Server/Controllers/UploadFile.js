import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
});

const storage = multer.memoryStorage(); // Store in memory before uploading
const upload = multer({ storage });

const uploadMiddleware = async (req, res, next) => {
    upload.single('file')(req, res, async (err) => {
        if (err) return res.status(400).json({ message: err.message });
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        try {
            const fileName = `${Date.now().toString()}-${req.file.originalname}`;
            const uploadParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
                // ACL: 'public-read',    
            };

            await s3.send(new PutObjectCommand(uploadParams));

            req.fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
            next();
        } catch (uploadError) {
            res.status(500).json({ message: 'Upload failed', error: uploadError.message });
        }
    });
};

export default uploadMiddleware;
