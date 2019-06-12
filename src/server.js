// Importação das dependências
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Objetos que fazem instancia das funções dessas dependências
const app = express();

const cors = require('cors');

// habilitação para qualquer aplicação frontend acessar os protocolos da API
app.use(cors());
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Conexão com o banco de dados Mongodb
mongoose.connect('mongodb://192.168.99.100:27012/instaClone', {
  useNewUrlParser: true,
});

// configuração de Webscockets
app.use((req, res, next) => {
  req.io = io;

  next();
});

// rota que dá acesso a uma url das imagens que foram feitas uploads
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// referência do arquivo de rotas
app.use(require('./routes'));

// porta padrão de desenvolvimento
server.listen(3333);
