const express = require('express');
const app = express();
const port = 3001;

const sharp = require('sharp');

const {items} = require("../server/data/items")


app.get('/image', async (req, res) => {
  const targetWidth = 100;
  const targetHeight = 100;
  try {
    const imagePath = "server/assets/1.jpg"
    const imageInfo = await sharp(imagePath).metadata();
    const originalWidth = imageInfo.width;
    const originalHeight = imageInfo.height;

    // Calculate center coordinates
    const left = Math.max(0,Math.floor(originalWidth / 2 - targetWidth / 2));
    const top =Math.max(0, Math.floor(originalHeight / 2 - targetHeight / 2));

    // Handle resizing if needed
    let resizedImage;
    if (targetWidth < originalWidth || targetHeight < originalHeight) {
      resizedImage = sharp(imagePath).resize({ width: targetWidth, height: targetHeight });
    } else {
      resizedImage = sharp(imagePath);
    }

    // Crop centered area
    const croppedImage = resizedImage.extract({
      width: targetWidth,
      height: targetHeight,
      left,
      top,
    });
    // Set content type and send cropped image data
    res.type('image/jpeg'); // adjust based on image format (jpg, png, etc.)
    croppedImage.toBuffer().then(buffer => {
      res.send(buffer);
    });
  } catch (error) {
    console.error('Error cropping image:', error);
    res.status(500).send('Error processing image');
  }
});

app.get('/products', (req, res) => {
  res.send(items);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
