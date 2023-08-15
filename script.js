"use strict"

/**
 *Fonction qui gère le rétrécissement de la navigation au scroll
 */

var header;
function lessMenu(){
   let menu, logo, burger, phone, stickPosition;

    header = document.getElementById('header');
    menu = header.firstElementChild.nextElementSibling;
    logo = menu.firstElementChild;
    burger = menu.lastElementChild;
    phone = logo.nextElementSibling.firstElementChild.nextElementSibling;
    stickPosition = header.getBoundingClientRect().top;

    if(window.innerWidth < 576){
        window.addEventListener('scroll', ()=>{
            if(window.scrollY > stickPosition){
                logo.style.width="23%";
                menu.style.flexDirection="row";
                header.classList.add("header-shadow");
                phone.classList.add('display-phone');
                burger.classList.remove('burger-position');
            }
            else{
                    logo.style.width="50%";
                    menu.style.flexDirection="column";
                    burger.classList.add('burger-position');
                    phone.classList.remove('display-phone');
                    header.classList.remove("header-shadow");
            }
        }); 
    }   
}

/**
 * Fonction qui gère l'ouverture du menu Mobile au clic
 */

function sideMenu(){
    let sideBar,checkMenu, welcome;
    
    checkMenu = document.getElementById('check');
    sideBar = header.lastElementChild;
    welcome = header.firstElementChild;

    checkMenu.addEventListener('click', ()=>{
        sideBar.classList.toggle('moveMenu');
        welcome.classList.toggle('annonce-display-change');
        header.classList.toggle('header_main-change');
        });
}

    /***
     * 
     * Fonction qui gère l'affichage et le timing du diaporama
     */
function diaporama(){
    let slide, slideWidth, slider, decal, start, next, dots, count=0;
     
    slide = document.getElementById('main_diapo');
    slider = document.querySelectorAll('picture.main_diapo_slide');
    slideWidth = slide.getBoundingClientRect().width;
    dots = document.querySelectorAll('span.dot');
    next = document.querySelector('a.next');
   
        console.log(next);
   
    function diapoRun(){
    // Boucle sur les items de slider afin de retirer toutes classe slide-show afin d'avoir l'effet de transition
        for(let i=0; i<slider.length; ++i){
            slider[i].classList.remove('slide-show');
            dots[i].classList.remove('active');
        }
       
        count++;
        dots[count].classList.add('active');
        slider[count].classList.add('slide-show');
        nextSlide(decal);

    }
        //  Calcule le décalage : largeur de l'affichage - le produit de ce dernier par l'index du slider(count);
        //  Puis décale en fonction de la largeur calculer.
        
    function nextSlide(next){
       
        next = -slideWidth * count;
        slide.style.transform=`translateX( ${next}px)`;
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

/**
 * Au clic supprime la classe active si elle existe, sinon l'ajoute
 */
function activeLink(){
    let link = document.querySelectorAll('#nav_menu a');
    console.log(link);
    link.forEach((el)=>{
       el.addEventListener('click', ()=>{
            link.forEach((active)=>{
                if(active.classList.contains('border-link'))
                active.classList.remove('border-link');
            });
            el.classList.add('border-link');
        });
    })
}

window.addEventListener('load', ()=>{
   activeLink();
    diaporama();
    lessMenu();
    sideMenu();
});