<?php
require '../clases/AutoCarga.php';
$sesion = new Session();
$bd = new DataBase();
$gestorReserva = new ManageReserva($bd);

$ok = json_encode(array('insert' => true));
$no = json_encode(array('insert' => false));
$nombre = Request::get("nombre");
$usuario = $sesion->getUser();
$email = $usuario->getEmail();
$reserva = new Reserva(0, $email, $nombre);

if($gestorReserva->insert($reserva)){
    echo $ok;
}else{
    echo $no;
}
