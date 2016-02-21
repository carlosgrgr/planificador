<?php

class Controlador {
    static function handle() {
        $bd = new DataBase();
        $gestor = new ManageUsuario($bd);
        $sesion = new Session();
        
        $action = Request::req("action");
        $do = Request::req("do");
        $metodo = $action . ucfirst($do);
        if (method_exists(get_class(), $metodo)) {
            self::$metodo();
        } else {
            self::loginView();
        }
        
    }
    
    private static function loginView(){
        $plantillaIntro = file_get_contents('plantillas/pages-intro.html');
        echo $plantillaIntro;
    }
    
    private static function readView() {
        $bd = new DataBase();
        $gestorEvento = new ManageEvento($bd);
        $sesion = new Session();
        $usuario = $sesion->getUser();
        if(!$sesion->isLogged()){
            header("Location:?action=login&do=view");
        }
        $plantillaUserProfile = file_get_contents('plantillas/pages-calendar.html');
        
        $plantillaUserProfile = str_replace('{name}', $usuario->getEmail(), $plantillaUserProfile);
        
        echo $plantillaUserProfile;
    }
}
