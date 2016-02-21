<?php
require '../clases/AutoCarga.php';
$sesion = new Session();
$bd = new DataBase();
$gestorEventos = new ManageEvento($bd);

$ok = json_encode(array('edit' => true));
$no = json_encode(array('edit' => false));
$pkId = Request::get("id");
$nombre = Request::get("nombre");
$dia = Request::get("dia");
$hora = Request::get("hora");
$usuario = $sesion->getUser();
$email = $usuario->getEmail();

if($gestorEventos->get($pkId)->getEmail() == $email){
    $evento = new Evento(0, $email, $nombre, $dia, $hora, 0);
    $gestorEventos->set($evento, $pkId);
    echo $ok;
}else{
    echo $no;
}



