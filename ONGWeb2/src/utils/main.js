const express = require('express');
const cors = require('cors');
const database = require('./database');
const app = express();
const jwt = require('jsonwebtoken')
const multer = require('multer');
const SECRET = 'U0hBTEFMQQ=='
const router = express.Router();
const path = require('path');

app.use(cors({ origin: true, credentials: true }), express.json())

const imagesDirectory = path.resolve(__dirname, '../../../uploads'); //pasta das imagens
app.use('/uploads', express.static(imagesDirectory)); //permite acessar pelo navegador, ex: http://localhost:3000/uploads/20240308_015019.jpg

app.use('/', router);

database.createDatabase()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); //diretorio para as imagens
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/api/ong/images', upload.single('image'), (req, res) => {
  const decoded = getTokenParams(req.headers)
  const filePath = req.file.path;
  database.includeOngImages(decoded.uid, filePath)
  res.send('File uploaded successfully!', "id:", decoded.uid, "path:", filePath);
});

app.get('/api/ong/images', (req, res) => {
  //const imageName = req.params.imageName;
  const imagePath = path.join(imagesDirectory, '20240308_015019.jpg');

  // Send the image file as a response
  res.sendFile(imagePath);
});

app.get('/', (req, res) => {
    res.send('Aplicação rodando!\n');
});
 
app.post('/api/ong', (req, res) => {
  database.createOng(req.body)
  res.json({ message: `ONG cadastrada com sucesso` })
});

app.post('/api/login', async (req, res) => {
  const login = await database.checkLogin(req.body)
  console.log("login:",login)
  if(!login || login.length == 0) {
    res.status(401);
    res.json({ message: "Usuário ou senha inválidos" })
    return
  }
  const token = jwt.sign({uid: login[0].id}, SECRET, {expiresIn: '6h'})

  res.status(200).json({ message: "Login efetuado!", token});
});

function getTokenParams(headers) {
  const token = headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, SECRET);
  return decoded
}

app.get('/api/ong', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Usuário não autenticado!' });
  }
  const decoded = jwt.verify(token, SECRET);

  jwt.verify(token, SECRET, function(err, decoded) {
    if (err) return res.status(401).json({ auth: false, message: 'Usuário não autenticado!' });
    req.userId = decoded.uid;
  });
  database.getAllOngs(req)
  res.json({ message: res.body, userId: req.userId  })
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = router;