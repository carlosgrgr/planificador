<?php
require '../clases/AutoCarga.php';
$sesion = new Session();
$bd = new DataBase();
$gestorReserva = new ManageReserva($bd);
echo '{"r":' . $gestorReserva->getListJson() . '}';