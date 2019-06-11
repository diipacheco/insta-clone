// importação das dependencias para as rotas
const express = require('express');
const multer = require('multer');
const PostCrontroller = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const uploadConfig = require('./config/upload');

// instãncia das funções do multer no objeto upload;
const upload = multer(uploadConfig);
// instãncia das funções do roteador no objeto routes;
const routes = new express.Router();

// rotas da aplicação
routes.post('/posts', upload.single('image'), PostCrontroller.store);
routes.get('/posts', PostCrontroller.index);
routes.post('/posts/:id/like', LikeController.like);

module.exports = routes;
