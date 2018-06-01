<?php
include_once("funciones/bd_conexion_2.php");

$consulta = "Select * from contactos";

//En la variable resultado se guardara el resultado de la consulta 
$resultado=$conexion->query($consulta);

while($registros=$resultado->fetch_assoc()){
    echo "Resultado--id--".$registros['id']. "---";
    echo "Resultado--nombre--".$registros['nombre']. "---";
    echo "Resultado--telefono--".$registros['telefono']. "---<br>";
}

?> 