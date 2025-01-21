<?php
require_once("configs/config.php");
class EventosModel {
    private $conexion;
    private $eventos;
    private $totalEvento;

    public function __construct() {
        global $bd_config;
        $this->conexion = Conectar::conexion($bd_config);
        $this->eventos = array();
    }
    public function getEventos($pagina_actal = 1) {
        global $blog_config;
        $limit = $blog_config['posts_por_pagina'];
        $offset = ($pagina_actal - 1) * $limit;
        $sql = "SELECT * FROM eventos ORDER BY id DESC LIMIT $limit OFFSET $offset";
        $query = $this->conexion->prepare($sql);
        $query->execute();
        $this->eventos = $query->fetchAll();
        return $this->eventos;
    }
    public function getTotalEventos() {
        $totalEvento = $this->conexion->prepare("SELECT COUNT(*) as total FROM eventos");
        $this->totalEvento = $totalEvento->fetch()['total'];
        return $this->totalEvento;
    }
    public function getEvento($id_evento) {
        $sql = "SELECT * FROM eventos WHERE id_evento = ?";
        $query = $this->conexion->prepare($sql);
        $query->execute([$id_evento]);
        return $query->fetch(PDO::FETCH_ASSOC);
    }
    public function getTotalPages() {
        global $blog_config;
        $totalEventos = $this->getTotalEventos();
        $totalPages = ceil($totalEventos / $blog_config['posts_por_pagina']);
        return $totalPages;
    }
}
?>