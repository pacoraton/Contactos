var agregar_contacto=document.getElementById("agregar");
var formulario=document.getElementById("formulario_crear_usuario");
var action=formulario.getAttribute("action");
var divCrear=document.getElementById('crear_contacto');
var tablaRegistrados = document.getElementById('registrados');
var checkboxes=document.getElementsByClassName('borrar_contacto');
var btnBorrar=document.getElementById('btn_borrar');
var tableBody =document.getElementsByTagName('tbody');
var divExistentes = document.getElementsByClassName('existentes');
var inputBuscador= document.getElementById('buscador');
var total_registros=document.getElementById('total');
var SeleccionarTodos= document.getElementById('borrar_todos');

function crear_usuario(){
    var form_datos= new FormData(formulario);
    for([key,value] of form_datos.entries()){
        console.log(key + ":" +value);
    }
    
    var xhr =new XMLHttpRequest();
    xhr.open('POST',action,true);
    xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
    xhr.onreadystatechange= function(){
       
        if (xhr.readyState == 4 && xhr.status==200){
            var resultado = xhr.responseText;
        
            var json=JSON.parse(resultado);
             if(json.respuesta == true){
                 registroExitoso(json.nombre);
                 construirTemplate(json.nombre,json.telefono,json.id);
                 var totalActualizado=parseInt(total_registros.textContent) +1;
                 total_registros.innerHTML=totalActualizado;
             }
        }
    }

    xhr.send(form_datos);
}


//Funcion para mostrar al usuario el mensaje de registro exitoso     
function registroExitoso(nombre){
    //CREAR DIV I AGREGAR ID
    var divMensaje =document.createElement('DIV');
    divMensaje.setAttribute('id',"mensaje");

    //agregar texto
    var texto =document.createTextNode('Creado:'+ nombre);

    divMensaje.appendChild(texto);

    //indicamos en que parte del div vamos a insertar el div creado
    divCrear.insertBefore(divMensaje,divCrear.childNodes[4]);

    //agregamos la clase mostrar 
   divMensaje.classList.add('mostrar'); 

   //Ocultar el mensaje de creacion
    setTimeout(function() {
       divMensaje.classList.add('ocultar');
       setTimeout(function(){
           var divPadreMensaje = divMensaje.parentNode;
           divPadreMensaje.removeChild(divMensaje);
       },500)
    },3000)
}    

//Funcion para contruir template para insertar datos dinamicamente
function construirTemplate(nombre,telefono,registro_id){
  //crear nombre de contacto
  var tdnombre =document.createElement('TD');
  var textoNombre =document.createTextNode(nombre);
  var parrafoNombre=document.createElement('P');
  parrafoNombre.appendChild(textoNombre);
  tdnombre.appendChild(parrafoNombre);

  //agregar input con el nombre
  var input_nombre =document.createElement('INPUT');
  input_nombre.type='text';
  input_nombre.name='contacto_'+registro_id;
  input_nombre.value=nombre;
  input_nombre.classList.add('nombre_contacto');

  //Crear telefono de contacto
  var tdTelefono =document.createElement('TD');
  var textoTelefono= document.createTextNode(telefono);
  var parrafoTelefono =document.createElement('P');
  parrafoTelefono.appendChild(textoTelefono);
  tdTelefono.appendChild(parrafoTelefono);

   //agregar input con el telefono
   var input_telefono =document.createElement('INPUT');
   input_telefono.type='text';
   input_telefono.name='telefono_'+registro_id;
   input_telefono.value=telefono;
   input_telefono.classList.add('numero_contacto');

  //Crear enlace de editar
  var nodobtn= document.createElement('A');
  var textEnlace = document.createTextNode('Editar');
  nodobtn.appendChild(textEnlace);
  nodobtn.href='#';
  nodobtn.classList.add('editar_btn');

//Crear boton para guardar

var btnGuardar= document.createElement('A');
var textGuardar = document.createTextNode('Guardar');
btnGuardar.appendChild(textGuardar);
btnGuardar.href='#';
btnGuardar.classList.add('guardarBtn');

  //agregar el boton al td
  var nodoTdEditar = document.createElement('TD');
  nodoTdEditar.appendChild(nodobtn);
  nodoTdEditar.appendChild(btnGuardar);

  //crear checkbox para borrar
  var checkBorrar = document.createElement('INPUT');
  checkBorrar.type = 'checkbox';
  checkBorrar.name=registro_id;
  checkBorrar.classList.add('borrar_contacto');

  //agregar td a checkbox
  var tdCheckbox= document.createElement('TD');
  tdCheckbox.classList.add('borrar');
  tdCheckbox.appendChild(checkBorrar);

//Agregar nombre y telefono para editar
  tdnombre.appendChild(input_nombre);   
  tdTelefono.appendChild(input_telefono);
  
  //agregar tr
  var trContacto = document.createElement('TR');
  trContacto.setAttribute('id',registro_id);
  trContacto.appendChild(tdnombre);
  trContacto.appendChild(tdTelefono);
  trContacto.appendChild(nodoTdEditar);
  trContacto.appendChild(tdCheckbox);

tablaRegistrados.childNodes[3].append(trContacto);

actualizarNumero();
recorrerBotonesEditar();
recorrerBotonesGuardar(registro_id);


}

//For para agregar o quitar clase dependiendo de si estan seleccionados o no
for(var i=0; i<checkboxes.length;i++){
    checkboxes[i].addEventListener('change',function(){
        if(this.checked){
            this.parentNode.parentNode.classList.add('activo');
        }else{
            this.parentNode.parentNode.classList.remove('activo');
        }
    });
}

agregar_contacto.addEventListener("click",function(e){
    e.preventDefault();
   crear_usuario();
});


btnBorrar.addEventListener('click',function(){
    checkboxSeleccionado();

});

//funcion que para borrar los checkboxes seleccionados
function checkboxSeleccionado(){
    var contactos =[];

    for(i=0; i<checkboxes.length;i++){
        if (checkboxes[i].checked==true){
            contactos.push(checkboxes[i].name);
        }
    }
    
    contactosEliminar(contactos);

}

function eliminarHTML(ids_Borrados){
    console.log("aqui"+ids_Borrados);
    for(i=0;i<ids_Borrados.length;i++){
        var elementoBorrar= document.getElementById(ids_Borrados[i]);
         tableBody[0].removeChild(elementoBorrar); 
    }
}

function mostrarEliminados(){
    //Creamos un div y agregamos un id
    var divElimnado=document.createElement('DIV');
    divElimnado.setAttribute('id','borrado');
   
    //agregamos texto
    var texto=document.createTextNode('Contacto Eliminado');
    divElimnado.appendChild(texto);

     divExistentes[0].insertBefore(divElimnado,divExistentes[0].childNodes[0]); 

    //agregamos clase de css
    divElimnado.classList.add('mostrar');

    setTimeout(function() {
        divElimnado.classList.add('ocultar');
        setTimeout(function(){
            var divPadreMensaje = divElimnado.parentNode;
            divPadreMensaje.removeChild(divElimnado);
        },500)
     },3000)
 }    




function contactosEliminar(contactos){
  var xhr= new XMLHttpRequest();

  xhr.open('GET','borrar.php?id='+contactos ,true);
  console.log('borrar.php?id='+contactos);
  xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
  xhr.onreadystatechange= function(){
       
    if (xhr.readyState == 4 && xhr.status==200){
        var resultadoBorrar = xhr.responseText;
        var json =JSON.parse(resultadoBorrar);
        if(json.respuesta==true){
            console.log("Resultado"+ resultadoBorrar);
            eliminarHTML(contactos);
            mostrarEliminados();
            var totalActualizado=parseInt(total_registros.textContent) - json.borrados;
            total_registros.innerHTML=totalActualizado;
            
        }else{
            alert("Selecciona un elemento");
        }



    }
};
xhr.send();

}

inputBuscador.addEventListener('input',function(){
    ocultarRegistros(this.value);
   
});

function ocultarRegistros(nombre_buscar){
    //console.log(nombre_buscar);
    //variable para todos los registros
   var registros = tableBody[0].getElementsByTagName('tr');

   //expresion regular que busca el nombre con case insensitive
   var expresion= new RegExp(nombre_buscar,"i");

   for(var i=0;i<registros.length;i++){

       registros[i].style.display='none';
       registros[i].classList.add('ocultar');

       if(registros[i].childNodes[1].textContent.replace(/\s/g,"").search(expresion) != -1 || nombre_buscar=='')  {
          registros[i].classList.add('mostrar');
          registros[i].classList.remove('ocultar');
          registros[i].style.display='table-row';
       }
   }

  actualizarNumero();
 

}


function actualizarNumero(){
    var registros = tableBody[0].getElementsByTagName('tr');

    var ocultos=0;

    var cantidad=0;

    for(var i=0; i<registros.length; i++){
        var elementos=registros[i];
        if(elementos.style.display=='table-row'){
            cantidad++;
            total_registros.innerHTML=cantidad;
        }else {
            if (elementos.style.display=='none'){
                ocultos++;
                if(ocultos == registros.length){
                ocultos=ocultos-registros.length;
                total_registros.innerHTML=ocultos;
                }        
            }
        }
    }

}

/*Selecionar todos los checkbox */
SeleccionarTodos.addEventListener('click',function(){
  if(this.checked){
   var todosRegistros=tableBody[0].getElementsByTagName('tr');
   for(var i=0; i<checkboxes.length;i++){
       checkboxes[i].checked=true;
       todosRegistros[i].classList.add('activo');
   }
  }else{
    var todosRegistros=tableBody[0].getElementsByTagName('tr');
    for(var i=0; i<checkboxes.length;i++){
        checkboxes[i].checked=false;
        todosRegistros[i].classList.remove('activo');
    }
  }
});


//Recorrer botones de guardar
function recorrerBotonesGuardar(id){
    var btn_guardar =tableBody[0].querySelectorAll('.guardarBtn');
    for(var i=0;i<btn_guardar.length;i++){
        btn_guardar[i].addEventListener('click',function(){
        ActualizarRegistro(id);
        });
    }
}

//Editar Registros

function recorrerBotonesEditar(){
    var btn_editar =tableBody[0].querySelectorAll('.editar_btn');
    
    for(var i=0; i<btn_editar.length;i++){
        btn_editar[i].addEventListener('click',function(event){
            event.preventDefault();
          
            desahabilitarEdicion();

        var registroActivo = this.parentNode.parentNode;
         registroActivo.classList.add('modo-edicion');
         registroActivo.classList.remove("desactivado");

         //Actualizamos el registro  en especifico
         ActualizarRegistro(registroActivo.id);
        });

    }
}

function desahabilitarEdicion(){
    var registrosTr =document.querySelectorAll("#registrados tbody tr");
    for (var i =0;i<registrosTr.length;i++){
        registrosTr[i].classList.add("desactivado");
    }
}
function habilitarEdicion(){
    var registrosTr =document.querySelectorAll("#registrados tbody tr");
    for (var i =0;i<registrosTr.length;i++){
        registrosTr[i].classList.remove("desactivado");
    }
}

function ActualizarRegistro(idRegistro){
    //Seleccionar boton de guardar del registro en especifico se pasa el id
  var btnGuardar = document.getElementById(idRegistro).getElementsByClassName('guardarBtn');
  
  btnGuardar[0].addEventListener("click",function(e){
      e.preventDefault();
    //Obtiene el valor del campo nombre 
    var inputNombreNuevo= document.getElementById(idRegistro).getElementsByClassName('nombre_contacto');
    var nombreNuevo=inputNombreNuevo[0].value;

    //Obtiene el valor del campo telefono 
    var inputTelefonoNuevo= document.getElementById(idRegistro).getElementsByClassName('numero_contacto');
                                                                                    
     var TelefonoNuevo=inputTelefonoNuevo[0].value;

    //objeto con todos los datos
    var contacto= {
        nombre :nombreNuevo,
        telefono:TelefonoNuevo,
        id:idRegistro
    };
    actualizarAjax(contacto);
  
  });
}

function actualizarAjax(datosContacto){
    //Convierte Objeto a JSON
    var jsonContacto =JSON.stringify(datosContacto);
   //Crear la conexion
   var xhr= new XMLHttpRequest();
   xhr.open('GET','actualizar.php?datos='+jsonContacto ,true);
   xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
   xhr.onreadystatechange= function(){
        
     if (xhr.readyState == 4 && xhr.status==200){
         var resultado= xhr.responseText;
         var resultadoJson=JSON.parse(resultado);
         console.log(resultadoJson);
                 if(resultadoJson.respuesta==true){
             var registroActivo=document.getElementById(datosContacto.id);
             
            //Inserta dinamicamente el nombre
            registroActivo.getElementsByTagName('td')[0].getElementsByTagName('p')[0].innerHTML=resultadoJson.nombre;
            //registroActivo.childNodes[1].childNodes[1].innerHTML=resultadoJson.nombre;

           console.dir(registroActivo);
           //Inserta dinamicamente el telefono
            registroActivo.getElementsByTagName('td')[1].getElementsByTagName('p')[0].innerHTML=resultadoJson.telefono;
          //registroActivo.childNodes[3].childNodes[1].innerHTML=resultadoJson.telefono;   

             //Borrar modo edicion
             registroActivo.classList.remove('modo-edicion');
             habilitarEdicion();
         }else{
               console.log( "hubo un error");
         }
       
        
     }
 };
 xhr.send();

}
document.addEventListener('DOMContentLoaded',function(e){
   recorrerBotonesEditar();
});