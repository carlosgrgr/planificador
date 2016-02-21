<?php

class ManageEvento {
    private $bd = null;
    private $tabla = "evento";
    
    function __construct(DataBase $bd) {
        $this->bd = $bd;
    }
    
    function get($id) {
        //devuelve el objeto de la fila cuyo email coincide con el email que le estoy pasando;
        //devuelve el objeto entero;
        $parametros = array();
        $parametros["id"] = $id;
        $this->bd->select($this->tabla, "*", "id =:id", $parametros);
        $fila = $this->bd->getRow();
        $evento = new Evento();
        $evento->set($fila);
        return $evento;
    }
    
    function count($condicion="1=1", $parametros=array()){
        return $this->bd->count($this->tabla, $condicion, $parametros);
    }
            
    function delete($id) {
        //borrar por id
        $parametros = array();
        $parametros["id"] = $id;
        return $this->bd->delete($this->tabla, $parametros);
    }
    
//    function forzarDelete($email) {
//        $parametros = array();
//        $parametros['CountryCode'] = $Code;
//        $gestor = new ManageCity($this->bd);
//        $gestor->deleteCities($parametros);
//        $this->bd->delete("countrylanguage", $parametros);
//        $parametros = array();
//        $parametros["Code"] = $Code;
//        return $this->delete($this->tabla, $parametros);
//    }
    
    function deleteEventos($parametros){
        return $this->bd->delete($this->tabla, $parametros);
    }
    
    function erase(Evento $evento) {
        //borrar por nombre
        //dice ele numero de filas borratas
        return $this->delete($evento->getId());
    }
    
    function set(Evento $evento, $pkId) {
        //update de todos los campos 
        //pasamos el codigo que tenia y como en este si se puede cambiar el codigo, cambiamos todos los campos
        //dice el numero de filas modificades
        $parametros = $evento->getArray();
        $parametrosWhere = array();
        $parametrosWhere["id"] = $pkId;
        $this->bd->update($this->tabla, $parametros, $parametrosWhere);
    }
    
    function insert(Evento $evento) {
        //se le pasa un objeto City y lo inserta en la tabla
        //dice el numero de filas insertadas;
        $parametrosSet = array();
        $parametrosSet["id"]=$evento->getId();
        $parametrosSet["email"]=$evento->getEmail();
        $parametrosSet["nombre"]=$evento->getNombre();
        $parametrosSet["dia"]=$evento->getDia();
        $parametrosSet["hora"]=$evento->getHora();
        return $this->bd->insert($this->tabla, $parametrosSet);
    }
    
    function getList($pagina=1, $orden="", $nrpp=Constants::NRPP, $condicion ="1=1", $parametros=array()) {
        $ordenPredeterminado = "$orden, id, email";
        if(trim($orden)==="" || trim($orden)===null){
            $ordenPredeterminado = "id, email";
        }
        $registroInicial = ($pagina - 1) * $nrpp;
        $this->bd->select($this->tabla, "*", $condicion, $parametros, $ordenPredeterminado,
                "$registroInicial, $nrpp");
        $r = array();
        while ($fila = $this->bd->getRow()){
            $evento = new Evento();
            $evento->set($fila);
            $r[] = $evento;
        }
        return $r;
    }
    
    function getListJson($pagina = 1, $orden = "", $nrpp = Constants::NRPP, $condicion = "1=1", $parametros = array()) {
        $list = $this->getList($pagina, $orden, $nrpp, $condicion, $parametros);
        $r = "[ ";
        foreach ($list as $objeto) {
            $r .= $objeto->getJSON() . ",";
        }
        $r = substr($r, 0, -1) . "]";
        return $r;
    }
    
    function getValuesSelect() {
        $this->bd->query($this->tabla, "id, nombre", array(), "nombre");
        $array = array();
        while ($fila = $this->bd->getRow()){
            $array[$fila[0]] = $fila[1];
        }
        return $array;
    }
}
