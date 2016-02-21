<?php

class Pager {
    private $registros, $rpp, $paginaActual;

    function __construct($registros, $rpp = Constants::NRPP, $paginaActual = 1) {
        if($rpp===null){
            $rpp = Constants::NRPP;
        }
        if($paginaActual===null){
            $paginaActual = 1;
        }
        $this->registros = $registros;
        $this->rpp = $rpp;
        $this->paginaActual = $paginaActual;
    }

    function getRegistros() {
        return $this->registros;
    }

    function getRpp() {
        return $this->rpp;
    }

    function getPaginaActual() {
        return $this->paginaActual;
    }

    function getPrimera(){
        return 1;
    }

    function getAnterior(){
        return max(1, $this->paginaActual-1);
    }

    function getSelect($id, $name = null){
        if($name===null){
            $name = $id;
        }
        $array = array(10=>"10 rpp", 50=>"50 rpp", 100=>"100 rpp");
        return Util::getSelect($name, $array, $this->rpp, false, "", $id);
    }

    function getSiguiente(){
        return min($this->getPaginas(), $this->paginaActual+1);
    }

    /*function getUltima(){
        return $this->getPaginas();
    }*/

    function getPaginas(){
        return ceil($this->registros/$this->rpp);
    }

    function setRegistros($registros) {
        $this->registros = $registros;
    }

    function setRpp($rpp) {
        $this->rpp = $rpp;
    }

    function setPaginaActual($paginaActual) {
        $this->paginaActual = $paginaActual;
    }
    
    function getEnlacesPaginas($rango, $enlace, $nombreParametroPagina, $pagina = 0){
        $array = array();
        for($i=$pagina-$rango; $i<=$pagina+$rango; $i++){
            if($i>0 && $i<=$this->getPaginas()){
                if($pagina===$i){
                    $array[$i] = "$i";
                } else {
                    $array[$i] = "$enlace&$nombreParametroPagina=$i";
                }
            }
        }
        return $array;
    }
}