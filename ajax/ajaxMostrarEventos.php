<?php
require '../clases/AutoCarga.php';
$sesion = new Session();
$bd = new DataBase();
$gestorEventos = new ManageEvento($bd);
echo '{"r":' . $gestorEventos->getListJson(1, "dia, hora") . '}';