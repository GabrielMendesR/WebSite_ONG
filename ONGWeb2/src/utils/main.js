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

const imagesDirectory = path.resolve(__dirname, '../../../uploads/'); //pasta das imagens
app.use('/uploads', express.static(imagesDirectory)); //permite acessar pelo navegador, ex: http://152.67.41.48:3000/uploads/20240308_015019.jpg

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

app.get('/api/ong/images', async (req, res) => {
  const images = await database.getAllImages()
  const imagesPaths = images.map(image => ({
    id_ong: image.id_ong,
    path: path.join(imagesDirectory, image.image_path)
  })) 
  res.json(imagesPaths)
  //res.sendFile(imagePath); envia a imagem inteira como response
});

app.get('/', (req, res) => {
    res.send('Aplicação rodando!\n');
});
 
app.post('/api/login', async (req, res) => {
  const login = await database.checkLogin(req.body)
  if(!login || login.length == 0) {
    res.status(400);
    res.json({ message: "Usuário ou senha inválidos" })
    return
  }
  const token = jwt.sign({uid: login[0].id}, SECRET, {expiresIn: '6h'})

  res.status(200).json({ message: "Login efetuado!", token});
});

function getTokenParams(headers) {
  const token = headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, SECRET, function(err, decoded) {
    if (err) return null
    return decoded
  });
  return decoded
}

app.post('/api/ong', upload.single('image'), async (req, res) => {

  if (req.body.senha.trim() == '')  return  res.status(400).json({ error: `É obrigatorio informar a senha!` })
  if (req.body.cnpj.trim() == '') return res.status(400).json({ error: `É obrigatorio informar o CNPJ!` })
  if (req.body.nome.trim() == '') return res.status(400).json({ error: `É obrigatorio informar o nome!` })
  if (req.body.email.trim() == '')  return  res.status(400).json({ error: `É obrigatorio informar um email!` })

  const filePath = req.file.path.replace(/\\/g, '/');
  //const filePath = ''
  await database.createOng({...req.body, filePath}).then(result => {
    res.json({ message: `ONG cadastrada com sucesso` })
  })
  .catch(error => {
    console.error('Error creating ong:', error);
    return  res.status(400).json({ error })
  });
})

app.get('/api/ong', async (req, res) => {
  const ongs = await database.getAllOngs(req)
  const baseUrl = `${req.protocol}://${req.hostname}${req.baseUrl}:${port}`;
  await ongs.forEach(ong => {
    //ong.main_image_url = path.join(my_api_url, ong.main_image_url)
    ong.main_image_url = `${baseUrl}/${ong.main_image_url}`
  })
  res.json({ data: ongs })
});

app.put('/api/ong/update', upload.single('image'), async (req, res) => {
  const decoded = getTokenParams(req.headers);
  if (!decoded) {
    return res.status(401).json({ message: 'Usuário não autenticado!' });
  }
  const filePath = req.file.path.replace(/\\/g, '/');
  database.updateOng(decoded.uid, {...req.body, filePath})
  .then(result => res.json({ message: result, userId: decoded.userId  }))
  .catch(err => res.status(400).json({ message: err }))
});

app.delete('/api/ong/', async (req, res) => {
  const decoded = getTokenParams(req.headers);
  if (!decoded) {
    return res.status(401).json({ message: 'Usuário não autenticado!' });
  }
  const result = await database.deleteOng(decoded.uid, req)
  res.json({ message: `Deletada ONG de ID ${decoded.uid}`, result })
});


app.get('/api/ong/:id', async (req, res) => {
  const id = req.params.id;
  const baseUrl = `${req.protocol}://${req.hostname}${req.baseUrl}:${port}`;
  let ong = await database.getOngById(id)
  if(ong.length === 0) return
  ong[0].main_image_url = `${baseUrl}/${ong[0].main_image_url}`
  res.json( ong )
});

const hostname = '0.0.0.0'; // Listen on all available network interfaces
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = router;