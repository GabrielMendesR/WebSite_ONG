const express = require('express');
const cors = require('cors');
const createOng = require('./database');
const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.send('Aplicação rodando!\n');
});
 
app.post('/api/ong', (req, res) => {
  createOng(req)
  res.json({ message: `ONG cadastrada com sucesso` })
});

// Start the server
const port = 3000; // or any port you prefer
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});