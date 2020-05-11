const usersClientesCtrl = {};
const passport = require('passport');
const UserCliente = require('../models/UserCliente');
// const Orden = require('../models/Orden');

usersClientesCtrl.renderSignUpForm = (req , res) => {
  res.render('usersClientes/signup', {layout: 'admin'}); // son los nombre de los hbs
};

//____________________________________________________________________________
//  Signup: Buscar modulo para hacer validaciones mas completas  y sencillas |
//===========================================================================
usersClientesCtrl.signup = async (req , res) => {
   const errors = [];
   const {nombre , email, password, confirm_password,numeroAfiliado} = req.body;
   if (password != confirm_password) {
      errors.push({text: 'Las contraseñas no coinciden'});
   }
   if (password.length < 8) {
      errors.push({text: 'La contraseña debe obtener almenos 8 caracteres'});
   }
   if (errors.length > 0) {
      res.render('usersClientes/signup', {
         errors,
         nombre,
         email
      });
   } else{
      const emailUser =await UserCliente.findOne({email: email}); // aqui buscamos en la bd si ya existe este correo
      if (emailUser) { // si encontraste algo ose correo
         req.flash('error_msg', 'Este correo ya esta registrado');
         res.redirect('/usersClientes/signup');
      }else{
         const newUser = new UserCliente({nombre , email, password ,numeroAfiliado});
         newUser.password = await newUser.encryptContraseña(password);
         req.flash('success_msg', 'Registro completado correctamente');
         await newUser.save();
         res.redirect('/usersClientes/signin');
      }
   }
 };

 usersClientesCtrl.renderSignipForm = (req , res) => {
   res.render('usersClientes/signin', {layout: 'admin'}); 
 };

 usersClientesCtrl.signin = passport.authenticate('local',{
    failureRedirect: '/usersClientes/signin', // cuando algo falle lo direcionamos ahi
    successRedirect: '/reservaciones', //si se loguea correctamente va a ahi
    failureFlash: true // si hhay un mensage de eroor utiliza flash
 }) // esta funcion se basa en el locale startegy que codificamos previamente

 usersClientesCtrl.logout = (req , res) => {
   req.logout();
   req.flash('success_msg', 'Session cerrada correctamente');
   res.redirect('/usersClientes/signin');
 };

//  usersClientesCtrl.renderPedidos = async (req , res) => {
//    const ordenes = await Orden.find({cliente: req.user.id}).sort({createdAt:'desc'}); //Hacemos una peticion a la bd, lo filtramos segun si el usuario le pertenece y lo ordenamos por fecha de manera desendente
//    res.render('usersClientes/mostrarPedidos', {ordenes});
//  };

module.exports = usersClientesCtrl;