const adminCtrl = {};

adminCtrl.renderGestor = (req,res) =>{
   console.log(res.locals.user);
   res.render('admins.gestor', {layout: 'administrador'}); // son los nombre de los hbs 
};

adminCtrl.renderReservaciones = (req,res) =>{
   res.render('admins.reservaciones', {layout: 'administrador'}); // son los nombre de los hbs
};

adminCtrl.renderProductos = (req, res) =>{
   res.render('admins.productos', {layout: 'administrador'});
};

module.exports = adminCtrl;