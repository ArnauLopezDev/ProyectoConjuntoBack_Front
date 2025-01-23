<?php
if(!isset($_SESSION)){
    session_start();
}
require('models/eventos.model.php');
$event = new EventosModel();
$pagina = isset($_GET['pagina']) ? $_GET['pagina'] : 1;
$eventos = $event->getEventos($pagina);
$totalEventos = $event->getTotalEventos();
$totalPages = $event->getTotalPages();
$data_publi = array();
foreach($eventos as $key => $value){
    $data_publi[$key] = $value["fecha"];
}
$tipo = tipo
require('views/manageEventos.view.php');
?>