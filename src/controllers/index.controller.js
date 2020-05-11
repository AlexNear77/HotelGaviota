const indexCtrl = {};

indexCtrl.renderIndex = (req,res) =>{
   console.log(res.locals.user);
   res.render('index'); // son los nombre de los hbs 
};

indexCtrl.renderServicios = (req,res) =>{
   res.render('servicios'); // son los nombre de los hbs
};

indexCtrl.renderInstalaciones = (req,res) =>{
   res.render('instalaciones'); // son los nombre de los hbs
};

indexCtrl.renderContacto = (req,res) =>{
   res.render('contacto'); // son los nombre de los hbs
};

indexCtrl.renderHabitaciones = (req,res) =>{
   res.render('habitaciones'); // son los nombre de los hbs
};

indexCtrl.renderAdmin = (req, res) =>{
   res.render('tipoUserSignin', {layout: 'admin'});
};

module.exports = indexCtrl;