<?php 
   try {
		 require_once('funciones/bd_conexion.php');
		 $sql="Select * from contactos";
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
			   <div id="crear_contacto" class="crear">
					<h2>Nuevo Contacto</h2>

					<form action="crear.php" method="post" accept-charset="utf-8" id="formulario_crear_usuario">
					<div class="campo">
						<label for="nombre">Nombre</label>
							<input type="text" name="nombre" id="nombre" placeholder="Nombre">
						
					</div>
					<div class="campo">
						<label for="numero">Numero</label>
							<input type="text" name="numero" id="numero" placeholder="Numero">
						
					</div>

					<input type="submit" name="agregar" value="Agregar" class="boton" id="agregar">

					</form>
				</div>	
	 		</div>

			 <div class="contenido existentes">

               <div class='buscar'>

			      <h2><input type="text" id="buscador" name="buscador" placeholder="Buscar" class="buscador"></h2>
			   </div>


			    <h2>Contactos Existentes</h2>
   				<p>
				   Numero de Contactos: <span id="total"><?php echo $resultado->num_rows; ?></span>				
				</p>

				<table id="registrados">
				   <thead>
				      <tr>
					     <th>Nombre</th>
						 <th>Teléfono</th>
						 <th>Editar</th>
						 <th><button type="button" name="borrar" id="btn_borrar" class="borrar">Borrar </button>
						    <input type="checkbox"  id="borrar_todos">
						 </th>
					  </tr>

				   </thead>
				   <tbody>
					  <?php 
					  while($registros = $resultado->fetch_assoc()){ ?>
						   
					      <tr id="<?php echo $registros['id']; ?>">
						     <td>
							      <p><?php echo $registros['nombre']; ?></p> 
							      <input type="text" class="nombre_contacto" value="<?php echo $registros['nombre']; ?>" name="contacto_<?php echo $registros['id']; ?>">
							 </td>
							 <td>
							     <p><?php echo $registros['telefono']; ?></p> 
							     <input type="text" class="numero_contacto" value="<?php echo $registros['telefono']; ?>" name="telefono_<?php echo $registros['id']; ?>">
							 </td>

							 <td>
									 <a href="#" class="editar_btn">Editar</a>
									 <a href="#" class="guardarBtn">Guardar</a>
							 </td>
							 <td class="borrar">
							 		<input  class="borrar_contacto" type="checkbox" name="<?php echo $registros['id']; ?>">
							 </td>
						  </tr>
					  
					  <?php } ?>
				   </tbody>
				</table>

			 </div>

	 </div>

<?php
   $conexion->close();
?>

<script src="js/app.js"></script>
</body>
</html>