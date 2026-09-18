const multer = require('multer');

const storage = multer.memoryStorage();

const filtroImagen = (req, file, cb) => {
  const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes JPG, PNG, WEBP o GIF'), false);
  }
};

const upload = multer({
  storage,
  fileFilter: filtroImagen,
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = upload;
