<?php
require '../clases/AutoCarga.php';
header('Contet-Type: application/json');
$sesion = new Session();
$sesion->destroy();
$ok = json_encode(array('login' => false));
echo $ok;