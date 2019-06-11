// importação das dependencias para as funções
const multer = require('multer');
const path = require('path');

module.exports = {
  // configuração padrão do multer como middleware para possibilitar o upload de imagens e armazenamento das mesmas.
  // eslint-disable-next-line new-cap
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  }),
};
