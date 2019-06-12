// importação das dependencias para as funções
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {
  // função que retorna todos os posts do database
  async index(req, res) {
    const post = await Post.find().sort('-createdAt');
    return res.json(post);
  },

  // função que possibilita o post em si atavés do upload de uma imagem estática
  async store(req, res) {
    // objetos que representam campos dentro do body e parametros da requisição
    const {
      author, place, description, hashtags,
    } = req.body;
    const { filename: image } = req.file;
    const [name] = image.split('.');
    const filename = `${name}.jpg`;

    // configurações de redimensionamento através da lib sharp
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', filename));
    fs.unlinkSync(req.file.path);

    // criação do schema de Post dentro do database, parametrizando os campos da requisição em Json
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: filename,
    });

    // websocket para todos usuarios
    req.io.emit('post', post);

    // retorno do objeto post com o sucesso da criação
    return res.json(post);
  },
};
