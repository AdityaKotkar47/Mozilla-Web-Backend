const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY,
  },
});

const uploadImageToR2 = async (base64Image, folder = 'Mozilla_Web') => {
  try {
    if (!base64Image) {
      throw new Error('Missing required parameter: base64Image');
    }

    // Default folder to Mozilla_Web if not specified
    const uploadFolder = folder || 'Mozilla_Web';

    // Extract the image data and determine content type
    const matches = base64Image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 image format');
    }
    
    const imageType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    
    const fileName = `${uploadFolder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${imageType === 'jpeg' ? 'jpg' : imageType}`;

    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: `image/${imageType}`,
    });

    await s3Client.send(command);
    
    // Construct the public URL using the public endpoint
    return `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${fileName}`;
  } catch (error) {
    console.error('Error uploading image to R2:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

module.exports = { uploadImageToR2 };