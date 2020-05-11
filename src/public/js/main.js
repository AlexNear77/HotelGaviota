const btnDepa = document.getElementById('btn-departamentos'),
   btnCerrarMenu = document.getElementById('btn-menu-cerrar'),
   grid = document.getElementById('grid'),
   contenedorSubCategorias = document.querySelector('#grid .contenedor-subcategorias'),
   contenedorEnlacesNav = document.querySelector('#menu .contenedor-enlaces-nav');
   esDispositivoMovil = () =>{
      if (window.innerWidth <= 800){
         return true;
      } else{
         return false; 
      }
   }

   // esDispositivoMovil = () =>  window.innerWidth <= 800;



btnDepa.addEventListener('mouseover', () =>{
   if(!esDispositivoMovil()){
      grid.classList.add('activo');
   }
   
} );

grid.addEventListener('mouseleave', () =>{
   if(!esDispositivoMovil()){
      grid.classList.remove('activo');
   }
});

document.querySelectorAll('#menu .categorias a').forEach((elemento) =>{
    console.log(elemento);
    elemento.addEventListener('mouseenter', (e) =>{
         if(!esDispositivoMovil()){
            console.log(e.target.dataset.categoria); // Accede a los atributos personalisados, que en este caso solo tenemos uno que es data-categoria pero solo se coloca categoria

            document.querySelectorAll('#menu .subcategoria').forEach((categoria) =>{
            console.log(categoria.dataset.categoria);

            categoria.classList.remove('activo'); //elimina la clase activo

            if(categoria.dataset.categoria == e.target.dataset.categoria){ 
               categoria.classList.add('activo'); //Agrega la case activo
               }
            }); // Esto devuelve una lista de todas las SUBcategorias completas
         };
    });

}); // accede a la clase menu luego a la clase categoria y despues a los enlaces que son los titulos "categorias" esto nos devuelve en lista de los a, por lo que con un forEach se va a iterar cada uno de ellos


//_______________________________________RESPONSIVE____________________________

document.querySelector('#btn-menu-barras').addEventListener('click', (e) =>{
   e.preventDefault(); //Esto se hace para que no cambie la direccion de la pag
   if (contenedorEnlacesNav.classList.contains('activo')){
      contenedorEnlacesNav.classList.remove('activo');
      document.querySelector('body').style.overflow = 'visible';
   }else{
      contenedorEnlacesNav.classList.add('activo');
      document.querySelector('body').style.overflow = 'hidden';
   }
});


//Blocke que permite mostrar el menu cuando se de click en "Todoso los departamentos"
btnDepa.addEventListener('click',  (e) =>{
   e.preventDefault(); // esto es para prevenir que el usuario no se enviado a otra pagina cuando haga click en "Todos los departamentos"

   grid.classList.add('activo');
   btnCerrarMenu.classList.add('activo'); 
});

// Boton de regresar en el menu de categorias

document.querySelector('#grid .categorias .btn-regresar').addEventListener('click', (e) =>{
   e.preventDefault();
   grid.classList.remove('activo');
   btnCerrarMenu.classList.remove('activo'); 
});


document.querySelectorAll('#menu .categorias a').forEach((elemento) =>{
   elemento.addEventListener('click',(e) =>{
      if(esDispositivoMovil()){
         contenedorSubCategorias.classList.add('activo');

         document.querySelectorAll('#menu .subcategoria').forEach((categoria) =>{
               categoria.classList.remove('activo');
               if(categoria.dataset.categoria == e.target.dataset.categoria){
                  categoria.classList.add('activo');
               }
         });
      }
   });
});

document.querySelectorAll('#grid .contenedor-subcategorias .btn-regresar').forEach((boton) =>{
   boton.addEventListener('click', (e) =>{
      e.preventDefault();
      contenedorSubCategorias.classList.remove('activo');
   });
});

btnCerrarMenu.addEventListener('click',(e) =>{
   e.preventDefault();
   document.querySelectorAll('#menu .activo').forEach((elemento) =>{
      elemento.classList.remove('activo');
      document.querySelector('body').style.overflow = 'visible';
   });
})


