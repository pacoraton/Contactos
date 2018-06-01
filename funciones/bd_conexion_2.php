<?php
$host_db="localhost";
$nombre_db="contactos";
$usuario_db="root";
$contra_db="";

//conexion a la base de datos parametros(servidor(host donde esta la BD),usuario de la BD, contraseña de la BD, nombre de la base de datos)
$conexion=mysqli_connect($host_db,$usuario_db,$contra_db);

//if en caso de que haya ocurrido un error en la conexion  a la BD el exit() evita que muestre mas errores sacando del codigo
if(mysqli_connect_errno()){
	
	echo "Error al conectar en la base de datos";
	
	exit();
}

//Para en caso de error en el nombre de la db ser mas precisos indicamos en que db se conectara 

mysqli_select_db($conexion,$nombre_db) or die ("No se encuentra la base de datos");

//Encaso de que no nos muestre los caracteres especiaes(acentos etc)le colocamos el tipo de caracteres
  mysqli_set_charset($conexion,"utf8");




?>