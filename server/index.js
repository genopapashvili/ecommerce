const express = require('express');
const app = express();
const cors = require('cors');
//const sharp = require('sharp');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment')

const port = 3001;
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};
const {products} = require("../server/data/products")
const {users} = require("../server/data/user")

const secret = "secret"
const sessionMap = new Map();
const clarificationMap = new Map();


app.use(express.json());
app.use(cors(corsOptions));
app.use("/assets", express.static('server/assets'));


app.post("/register", (req, res) => {

  const userDetails = req.body
  const found = users.find(it => it.email === userDetails.email)
  if (found) {
    res.status(403)
    res.send({error: "The email is already used"})
    return;
  }
  const token = jwt.sign(userDetails, secret)
  const code = nextCertificationCode()
  console.log(code)
  clarificationMap.set(token, {
    task: registration,
    code
  })

  const duration = moment.duration(60, 'seconds');
  setTimeout(() => {
    clarificationMap.delete(token)
  }, duration.asMilliseconds())
  res.send({token, expirationDate: moment().add(duration).toDate()})
})

app.post("/certify", (req, res) => {
  const body = req.body;
  const result = {success: false}
  const data = jwt.verify(body.token, secret);
  const handlerHolder = clarificationMap.get(body.token)
  if (!handlerHolder) {
    res.status(401)
    res.send(result)
    return;
  }

  if (handlerHolder.code === body.code) {
    result.success = handlerHolder.task(data);
    res.send(result)
  } else {
    res.status(403)
    res.send(result)
  }
})


app.post('/basket', (req, res) => {
  try {
    const user = getUser(req)
    if (req.body && req.body.id) {
      user.basket.push(req.body)
      res.send({success: true})
    } else {
      res.status(403)
      res.send({success: false})
    }
  } catch (e) {
    res.status(401)
    res.send({error: e.message});
  }
})

app.get('/basket', (req, res) => {
  try {
    const user = getUser(req)
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
  const token = jwt.sign(userDetails, secret)
  sessionMap.set(token, found.id);

  res.send({token})
});
app.get("/product/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    let result = products.find(it => it.id === productId)
    if (!result) {
      res.status(404)
      res.send({error: "not found"})
      return;
    }

    res.send(result)
  } catch (e) {
    res.send({error: e.message})
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

function registration(data) {
  console.log(data)
  const copied = {
    id: users.length + 1,
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.birthDate,
    email: data.email,
    password: encodePassword(data.password),
    basket: []
  }
  console.log("Added new client: ", copied)
  users.push(copied)

  return true
}

function nextCertificationCode() {
  const rn = "1234" + Math.round(Math.random() * 100000).toString(10)
  return rn.substring(rn.length - 4)
}

function encodePassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

