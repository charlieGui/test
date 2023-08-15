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

    /**
     *Fonction qui gère l'affichage et le timing du diaporama 
     */
function diaporama(){
    let slide,  slider, decal, start, next, prev, dots, slideWidth, count=0;
     
    slide = document.getElementById('main_diapo');
    slider = document.querySelectorAll('picture.main_diapo_slide');
    slideWidth = slide.getBoundingClientRect().width;
    dots = document.querySelectorAll('span.dot');
    next = document.querySelector('a.next');
    prev = document.querySelector('a.prev');
   
    // Fonction qui fait défiler vers la droite.
   function slideNext(){
    count++;
    if(count == slider.length){
        count = 0;
    }
        nextSlide(decal, slideWidth, count, slide);
        setClass(dots, slider);
    }

    // Fais défiler vers la gauche
    function slidePrev(){
        count--;
        if(count < 0){
            count= slider.length -1;
        }
        nextSlide(decal, slideWidth, count, slide);
        setClass(dots, slider);
   }

    // Fonction qui supprime les classes en bouclant et les rajoute
    // selon l'index de count
    function setClass(dt, sl){
        for(let i=0; i<sl.length; ++i){
            sl[i].classList.remove('slide-show');
            dt[i].classList.remove('active');
        }
        dt[count].classList.add('active');
        sl[count].classList.add('slide-show');
       }

    // Fonction qui décale les slides
    function nextSlide(dec, slw, ct, sl){
        dec = -slw * ct;
        sl.style.transform=`translateX( ${dec}px)`;
    }

    // Les timers
   function startTimer(){
        start = setInterval(slideNext, 6000);
    }

    function stopTimer(){
        clearInterval(start);
    }   
    startTimer();
    slide.addEventListener('mouseover', stopTimer);
    slide.addEventListener('mouseout', startTimer);
    next.addEventListener('click', slideNext)
    prev.addEventListener('click', slidePrev);

    //permet le redimensionnement de la fenetre pour le responsive
    window.addEventListener('resize', ()=>{
        slideWidth= slide.getBoundingClientRect().width;
        slideNext();
    })
}

/**
 * Fonction qui gère les l'ajout de classe des liens de menus
 */
function activeLink(){
    let link = document.querySelectorAll('#nav_menu a');

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