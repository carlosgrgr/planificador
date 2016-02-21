<?php

class AutoCarga {
    static function cargar($clase){
        $clase = str_replace("\\", "/", $clase);
        $archivo = "../clases/" . $clase . ".php";
        if(!file_exists($archivo)){
            $archivo = "clases/" . $clase . ".php";
        }
        require $archivo;
    }
}
spl_autoload_register('AutoCarga::cargar');