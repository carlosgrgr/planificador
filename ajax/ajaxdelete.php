<?php
require '../clases/AutoCarga.php';
$sesion = new Session();
$bd = new DataBase();
$gestorEventos = new ManageEvento($bd);

$ok = json_encode(array('delete' => true));
$no = json_encode(array('delete' => false));

$pkId = Request::get("id");
$usuario = $sesion->getUser();
$email = $usuario->getEmail();
$evento = $gestorEventos->get($pkId);

if($evento->getEmail() == $email){
    $gestorEventos->delete($pkId);
    echo $ok;
}else{
    echo $no;
}

