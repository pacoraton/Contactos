<?php 
  function peticion_ajax(){
      return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest';
  }


if (isset($_POST['nombre'])){
	$nombre=htmlspecialchars($_POST['nombre']);
}
if (isset($_POST['numero'])){
	$numero=htmlspecialchars($_POST['numero']);
}


   try {
         require_once('funciones/bd_conexion.php');
         $sql="Insert into contactos (id,nombre,telefono) values (NULL,'$nombre','$numero');";
         $resultado =$conexion->query($sql);  

         if(peticion_ajax()){
            echo json_encode(array(
                "respuesta"=> $resultado,
                "nombre"=>$nombre,
                "telefono"=>$numero,
                "id"=>$conexion->insert_id

            ));
       }else{
             exit;
            }


   } catch (Exception $e) {
   	
   	$error= $e->getMessage();
   }
   $conexion->close();
 ?>

