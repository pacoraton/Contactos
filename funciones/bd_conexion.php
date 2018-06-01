<?php 

$host_db="localhost";
$usuario_db="root";
$pasword_db="";
$db_name="contactos";

$conexion=new mysqli($host_db,$usuario_db,$pasword_db,$db_name);

if($conexion->connect_error){
	echo $error= $conexion->connect_error;
}

//Encaso de que no nos muestre los caracteres especiaes(acentos etc)le colocamos el tipo de caracteres
//mysqli_set_charset($conexion,"utf8");
mysqli_set_charset($conexion,"utf8");

 ?>