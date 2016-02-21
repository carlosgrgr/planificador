<?php
require '../clases/AutoCarga.php';
header('Contet-Type: application/json');
$bd = new DataBase();
$gestor = new ManageUsuario($bd);
$ok = json_encode(array('signup' => true));
$no = json_encode(array('signup' => false));
$usuarios = $gestor->getList();
$alias = Request::req("alias");
$email = Request::req("mail");
$pass = Request::req("pass");
$fechaalta = date('Y-m-d');
$usuario = new Usuario($email, sha1($pass), $alias, $fechaalta, 1, 0, 0);
if($gestor->get($email)->getEmail() == "") {
    $gestor->insert($usuario);
    echo $ok;
}else{
    echo $no;
}
