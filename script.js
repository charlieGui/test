"use strict"
// Récupère la position du logo.
// Un scroll Y détecté de 50px reduit le logo et paramètre un flexboxRow

function lessMenu(){
    var logo = document.getElementById('logo');
    var menu = document.getElementById('header_menu');
    var stickPosition = logo.getBoundingClientRect().top; 
    
    window.addEventListener('scroll', ()=>{
       if(window.scrollY >= stickPosition + 51 ){
            logo.style.width="25%";
            menu.style.flexDirection="row";
           }else {
                logo.style.width="50%";
                menu.style.flexDirection="column";
            }
        });
    }

// Declenche le slide du Menu Mobile lors du clic sur le burger
function sideMenu(){
    var sideBar = document.querySelector('nav');
    var header =  document.getElementById('header_main')
    var checkMenu = document.querySelector('input[type=checkbox]');
    
        checkMenu.addEventListener('click', ()=>{
        sideBar.classList.toggle('moveMenu');
        document.getElementById('annonce').classList.toggle('annonce-display-change');
        header.classList.toggle('header_main-change');
        });
    }

    /***
     * Récupère les slide du diapo et gère le défilement.
     * Joute et retire les classe afin de paramètrer le fondu via l'opacité.
     */
function diaporama(){
    let slider = document.getElementsByClassName('main_diapo_slide');
    let slide = document.getElementById('main_diapo');
    var start;
    // Calcule la largeur de l'affichage du diapo
    let slideWidth = slide.getBoundingClientRect().width;
    let count = 0;

    function diapoRun(){
       
    // Boucle sur les items de Slider afin de retirer toutes classe slide-show afin d'avori l'effet de transition
    // avant de le rajouter individuellement.
        for(let i=0; i<slider.length; ++i){
            slider[i].classList.remove('slide-show');
        }

        count++;
        slider[count].classList.add('slide-show');
        //  Calcule le décalage : largeur de l'affichage - le produit de ce dernier par l'index du slider;
        //  Puis décale en fonction de la largeur calculer.
        let decal = -slideWidth * count;
        slide.style.transform=`translateX( ${decal}px)`;
        if(count == (slider.length - 1)){
            count = -1;
        }
    }
       
    function startTimer(){
        start = setInterval(diapoRun, 6000);
    }

    function stopTimer(){
        clearInterval(start);
    }
    startTimer();
    
    slide.addEventListener('mouseover', stopTimer);
    slide.addEventListener('mouseout', startTimer);

    //permet le redimensionnement de la fenetre pour le responsive
    window.addEventListener('resize', ()=>{
        slideWidth= slide.getBoundingClientRect().width;
        diapoRun();
    })
}

window.addEventListener('load', ()=>{
    diaporama();
    lessMenu();
    sideMenu();
});