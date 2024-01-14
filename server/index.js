const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const sharp = require('sharp');

const {products} = require("./data/products")

const corsOptions = {
  origin: 'http://localhost:4200', // Replace with the allowed origin(s)
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
};

app.use(cors(corsOptions));
app.use('/assets', express.static('server/assets'));
app.get('/image', async (req, res) => {
  const targetWidth = 1000;
  const targetHeight = 1000;
  try {
    const imagePath = "server/assets/1.jpg"
    const imageInfo = await sharp(imagePath).metadata();
    const originalWidth = imageInfo.width;
    const originalHeight = imageInfo.height;

    const aspectRatio = originalWidth / originalHeight;

    let newWidth
    let newHeight

    if (targetWidth * aspectRatio > targetHeight){
      newWidth = targetWidth
      newHeight = newWidth * aspectRatio;
    }else{
      newHeight = targetHeight
      newWidth = newHeight * aspectRatio;
    }
    console.log(originalWidth)
    console.log(originalHeight)
    console.log(newWidth)
    console.log(newHeight)

   const resizedImage = sharp(imagePath).resize({ width: newWidth, height: newHeight });

    // Crop centered area
    const croppedImage = resizedImage.extract({
      width: 100,
      height: 100,
      left: 0,
      top: 0,
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
  res.send(products);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
