<?php
include "header.html";
?>

<body>
    <div class="wrapper">
        <header id="header_main">
            <div id="annonce">
                <span >BIENVENUE A BORD...</span>
                <i class="fi fi-rr-car-side"></i>
            </div>
            <div class="header_logo header_flex" id="header_menu">
                <a href="#" id="logo">
                    <h1><img  src="logo/logo-abcd.png" widh="50%" alt="ABCD Taxi"></h1>
                </a>
                <div class="header_tel header_flex" >
                <i class="fi fi-sr-circle-phone"></i>
                    <a href="tel:0664142034">06 64 14 20 34</a>
                </div>
                <div id="burger" class="burger-position">
                    <input type="checkbox" id="check">
                        <label for="check">
                            <span id="span1"></span><span id="span2"></span><span id="span3"></span>
                        </label>
                </div>
                
            </div>
            <nav id="nav_menu">
                <!-- <img src="image/logo-noir.png" alt="ABCD Taxi" width="25%"> -->
                <ul>
                     <li><a href="#">Accueil</a></li>
                     <li><a href="#">Réservation<i class="fi fi-rs-angle-small-down"></i></a>
                        <ul class="header_nav_sousMenu">
                            <li><a href="#">Réserver un transport</a></li>
                            <li><a href="#">Annuler un transport</a></li>
                        </ul>
                     </li>
                     <li><a href="#">A propos</a></li>
                     <li><a href="#">Contact</a></li>
                </ul>
                <p id="abcd">Arrivez Bien à Chaque Destination</p>
            </nav>
        </header>
        <main class="accueil">