<?php
require '../clases/AutoCarga.php';
$sesion = new Session();
$bd = new DataBase();
$gestorReserva = new ManageReserva($bd);
$usuario = $sesion->getUser();
$lista = $gestorReserva->getListJson(1, "", Constants::NRPP, "email ='".$usuario->getEmail()."'");
echo '{"r":' . $lista . '}';