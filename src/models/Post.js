// importação das dependencias
const mongoose = require('mongoose');

// Abstração de um Schema no banco de dados
const Post = new mongoose.Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Post', Post);
