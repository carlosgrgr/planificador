<?php
require '../clases/AutoCarga.php';
$sesion = new Session();
$bd = new DataBase();
$gestorEventos = new ManageEvento($bd);

$ok = json_encode(array('insert' => true));
$no = json_encode(array('insert' => false));
$nombre = Request::get("nombre");
$dia = Request::get("dia");
$hora = Request::get("hora");
$usuario = $sesion->getUser();
$email = $usuario->getEmail();
$evento = new Evento(0, $email, $nombre, $dia, $hora);

if($gestorEventos->insert($evento)){
    echo $ok;
}else{
    echo $no;
}

