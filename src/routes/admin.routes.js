// IMPORTACIONES MODULS //
const {Router} = require('express');
const router = Router();
const cloudinary = require('cloudinary');
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
});

// IMPORTACIONES PROPIAS //
const { renderGestor, renderReservaciones, renderProductos} = require('../controllers/admin.controller');



router.get('/Gestor-de-habitaciones',  renderGestor);

router.get('/reservaciones', renderReservaciones);

router.get('/productoss', renderProductos);


module.exports = router;