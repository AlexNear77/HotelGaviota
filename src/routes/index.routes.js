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
const { renderServicios, renderIndex, renderInstalaciones, renderContacto, renderHabitaciones, renderAdmin} = require('../controllers/index.controller');

router.get('/',  renderIndex);

router.get('/servicios', renderServicios);

router.get('/instalaciones', renderInstalaciones);

router.get('/contacto', renderContacto);

router.get('/habitaciones', renderHabitaciones);

router.get('/admin', renderAdmin);

module.exports = router;