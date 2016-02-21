<?php
require '../clases/AutoCarga.php';
$sesion = new Session();
$bd = new DataBase();
$gestorReserva = new ManageReserva($bd);

$ok = json_encode(array('delete' => true));
$no = json_encode(array('delete' => false));

$pkId = Request::get("id");
$usuario = $sesion->getUser();
$email = $usuario->getEmail();
$reserva = $gestorReserva->get($pkId);

if($reserva->getEmail() == $email){
    $gestorReserva->delete($pkId);
    echo $ok;
}else{
    echo $no;
}

