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

app.get('/basket', (req, res) => {
  try {
    const user = getUser(req)
    console.log(user)
    res.send(user.basket)
  } catch (e) {
    res.status(401)
    res.send({error: e.message});
  }
})

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
  sessionMap.set(token, found.id);

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

function getUser(req) {
  const userId = sessionMap.get(getToken(req))
  isOrThrowAsUnauthorized(userId)
  const user = users.find(it => it.id === userId)
  isOrThrowAsUnauthorized(user)

  return user
}

function isOrThrowAsUnauthorized(variable) {
  if (!variable) {
    throw new Error("Unauthorized")
  }
}

function getToken(req) {
  const authHeader = req.header("Authorization")
  isOrThrowAsUnauthorized(authHeader)
  return authHeader.trim().replace(/^Bearer /g, "");
}
