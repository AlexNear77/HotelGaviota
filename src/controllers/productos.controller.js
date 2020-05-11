const productsCtrl = {};
const Producto = require('../models/Producto');
const Orden = require('../models/Orden');
const cloudinary = require('cloudinary');
const fs = require('fs-extra'); // este modulo  trabaja con los archivos , podemos buscar y eliminar archivos
const {CLAVESTRIPE} = process.env;
const stripe = require('stripe')(CLAVESTRIPE); //stripe

productsCtrl.renderProductForm = (req,res) =>{
   res.render('productos/new-product');
};

productsCtrl.createNewProduct = async (req,res) =>{
   const {nombre, descripcion,descripcionCorta,autor,stock,precio,categoria} = req.body;
   const result = await cloudinary.v2.uploader.upload(req.file.path); // con esto mandamos la imagen almacenada temp de nuestro dicrectorio a claudinary y lo guardamos en una constante

   const newProducto = new Producto({nombre, descripcion,descripcionCorta,autor,stock,precio,categoria});
   newProducto.user = req.user.id; 

//          -----------------------Code Claudinary------------------------------
   newProducto.imageURL = result.url; // Guardamos la propiedad url al objeto
   newProducto.public_id = result.public_id; // Guardamos la propiedad public_id al objeto
   await fs.unlink(req.file.path); // elimina el archivo ya que como ya lo subimos a laudinary no es necesario almacenarlo en nuestro servidor
//          -----------------------EndCode Claudi ------------------------------
   await newProducto.save(); 
   req.flash('success_msg','Libro agregado');         
   res.redirect('/productos');
};

productsCtrl.renderProductos = async (req,res) =>{
   const productos = await Producto.find({user: req.user.id}).sort({createdAt:'desc'}); //Hacemos una peticion a la bd, lo filtramos segun si el usuario le pertenece y lo ordenamos por fecha de manera desendente
   res.render('productos/all-products', {productos}, {layout: 'administrador'});
};

productsCtrl.renderEditForm = async (req,res) =>{
   const producto = await Producto.findById(req.params.id);
   if(producto.user != req.user.id){ // si el producto en su propiedad usuario es distinto al usuario actual...
      req.flash('error_msg', 'No autorizado');
      res.redirect('/productos');
   }
   res.render('productos/edit-product', {producto}, {layout: 'administrador'});
};

productsCtrl.updateProduct = async (req,res) =>{
   const {nombre, descripcion,descripcionCorta,autor,stock,precio,categoria} = req.body;
   const producto = await Producto.findByIdAndUpdate(req.params.id, {nombre, descripcion,descripcionCorta,autor,stock,precio,categoria});

//          -----------------------Code Claudinary------------------------------
   await cloudinary.v2.uploader.destroy(producto.public_id);
   const result = await cloudinary.v2.uploader.upload(req.file.path); // con esto mandamos la imagen almacenada temp de nuestro dicrectorio a claudinary y lo guardamos en una constante
   producto.imageURL = result.url; // Guardamos la propiedad url al objeto
   producto.public_id = result.public_id; // Guardamos la propiedad public_id al objeto
   await producto.save();
//          -----------------------EndCode Claudi ------------------------------

   req.flash('succes_msg','Producto actualializado correctamente');
   res.redirect('/productos');
};

productsCtrl.deleteProduct = async (req,res) =>{
   const producto= await Producto.findByIdAndDelete(req.params.id);

//          -----------------------Code Claudinary------------------------------
   await cloudinary.v2.uploader.destroy(producto.public_id);
//          -----------------------EndCode Claudi ------------------------------
   req.flash('success_msg','Libro eliminado satisfactoriamente');
   res.redirect('/productos');
};

productsCtrl.mostrarProducto = async (req,res) =>{
   const producto = await Producto.findById(req.params.id);

   const libros = await Producto.find({"categoria": producto.categoria}).limit(2); //Hacemos una peticion a la bd, lo filtramos segun si el usuario le pertenece y lo ordenamos por fecha de manera desendente
   res.render('productos/producto', {producto,libros}, {layout: 'administrador'});
}

productsCtrl.checkoutProduct = async (req,res) =>{
   const customer = await stripe.customers.create({
      email: req.body.strispeEmail,
      source: req.body.stripeToken
   });
   //guardamos id busacmos producto y lo guardamos en una orden
   const producto = await Producto.findById(req.body.id);
   const orden = producto.nombre;
   const total = producto.precio;
   const envio = req.body.envio;
   const estado = "En sucursal"
   const newOrden = new Orden({orden, total,envio,estado});
   console.log(newOrden);
   newOrden.cliente = req.user.id;
   await newOrden.save();
   // Enviamos los datos a stripe
   const charge = await stripe.charges.create({
      amount: total*100,
      currency: 'MXN',
      customer: customer.id,
      description: producto.nombre
   });
   req.flash('succes_msg','Compra correctamente efectuada');
   res.redirect('/usersClientes/mostrarPedidos');
};

module.exports = productsCtrl;