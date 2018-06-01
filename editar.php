<?php 

if(isset($_GET['id'])){
    $id=$_GET['id'];
}
   try {
		 require_once('funciones/bd_conexion.php');
		 $sql="Select * from contactos where id='$id'";
		 $resultado=$conexion->query($sql);
   } catch (Exception $e) {
   	
   	$error= $e->getMessage();
   }

 ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Agenda PHP</title>
	<link rel="stylesheet" type="text/css" href="css/estilos.css">
</head>
<body>
	 <div class="contenedor">
	 		<h1>Agenda de Contactos</h1>

	 		<div class="contenido">
	 			<h2>Editar Contacto</h2>


	 			<form action="actualizar.php" method="get" accept-charset="utf-8">

                 <?php  while($registro =$resultado->fetch_assoc()) {?>
                        <div class="campo">
                            <label for="nombre">Nombre</label>
                                <input type="text" value=<?php echo $registro['nombre']; ?> name="nombre" id="nombre" placeholder="Nombre">  
                        </div>
                        <div class="campo">
                            <label for="numero">Numero</label>
                                <input type="text" value=<?php echo $registro['telefono'];?> name="numero" id="numero" placeholder="Numero">
                        </div>

                        <input type="hidden" name="id" value="<?php echo $registro['id']; ?>">
                        <input type="submit"  value="Modificar" class="boton">

                <?php } ?>
	 			</form>
	 		</div>
<?php
   $conexion->close();
?>
</body>
</html>