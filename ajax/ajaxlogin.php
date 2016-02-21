<?php
require '../clases/AutoCarga.php';
header('Contet-Type: application/json');
$sesion = new Session();
$bd = new DataBase();
$gestor = new ManageUsuario($bd);
$ok = json_encode(array('login' => true));
$no = json_encode(array('login' => false));
$email = Request::req("email");
$pass = Request::req("pass");
$usuario = $gestor->get($email);

if($usuario->getEmail() === $email && $usuario->getClave() === sha1($pass)) {
    $sesion->setUser($usuario);
    echo $ok;
}else{
    echo $no;
}
