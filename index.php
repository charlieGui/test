<?php 

include 'header.html';
include 'nav.php';
$val = isset($GET['val'])?$GET['val']:null;

switch($val){
    case 'test' :
        include 'accueil.php';
        break;
    default:
    include 'accueil.php';
}
include 'footer.php';