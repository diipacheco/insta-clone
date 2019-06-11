// importação das dependencias para as funções
const Post = require('../models/Post');

module.exports = {
  // função que possibilita o link dentro de cada post, através dos parâmetros da requisição
  async like(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    req.io.emit('Like', post);

    return res.json(post);
  },
};
