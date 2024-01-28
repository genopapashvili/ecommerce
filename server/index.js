const express = require('express');
const app = express();
const cors = require('cors');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const sessionMap = new Map();

const port = 3001;
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};
const {products} = require("../server/data/products")
const {users} = require("../server/data/user")

app.use(express.json());
app.use(cors(corsOptions));
app.use("/assets", express.static('server/assets'));
app.get('/image', async (req, res) => {
  const targetWidth = 100;
  const targetHeight = 100;
  try {
    const imagePath = "server/assets/1.jpg"
    const imageInfo = await sharp(imagePath).metadata();
    const originalWidth = imageInfo.width;
    const originalHeight = imageInfo.height;

    // Calculate center coordinates
    const left = Math.max(0, Math.floor(originalWidth / 2 - targetWidth / 2));
    const top = Math.max(0, Math.floor(originalHeight / 2 - targetHeight / 2));

    // Handle resizing if needed
    let resizedImage;
    if (targetWidth < originalWidth || targetHeight < originalHeight) {
      resizedImage = sharp(imagePath).resize({width: targetWidth, height: targetHeight});
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

app.get('/categories', (req, res) => {
  res.send(Array.from(new Set(products.map(it => it.category))))
})

app.get('/products', (req, res) => {
  const requestData = req.query;
  let data = products;
  if (requestData.category && requestData.category !== "All") {
    data = data.filter(it => it.category === requestData.category);
  }

  if (requestData.query && requestData.query !== "") {
    data = data.filter(it => it.title.toLowerCase().includes(requestData.query.toLowerCase()))
  }

  res.send(data);
});

app.post("/login", (req, res) => {
  const userDetails = req.body;
  if (!(userDetails && userDetails.email && userDetails.password)) {
    return res.status(403).send({
      error: "invalid input data"
    })
  }
  const hash = crypto.createHash('md5').update(userDetails.password).digest('hex');
  const found = users.find(it => (it.email === userDetails.email && it.password === hash))
  if (!found) {
    return res.status(404).send({
      error: "Email or password is incorrect"
    })
  }
  const token = jwt.sign(userDetails, 'shhhhh')
  sessionMap.set(token, found);

  res.send({token})
});
app.get("/product/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    let result = products.find(it => it.id === productId)
    if (!result) {
      res.status(404)
      throw new Error("not found")
    }

    res.send(result)
  } catch (e) {
    res.send(e.message)
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
