'use strict';


/**
 *Fonction qui gère le show et le hide du lenu au scroll
 */

var header;
function hideMenu(){
    let  position = 0;
    header = document.getElementById('header');
    window.addEventListener('scroll', ()=>{
        if((document.body.getBoundingClientRect()).top < position ){
            header.classList.add('hideMenu');
        }
        else{
            header.classList.remove('hideMenu');
        }
        position = document.body.getBoundingClientRect().top;
    });
}
/**
 * Fonction qui gère l'ouverture du menu Mobile au clic
 */

function displayMenu(){
    let navMobile, checkBurger, checkFlags, page, body;
    page = document.querySelector('html');
    body = document.querySelector('body');
    checkBurger = document.querySelector('.header__burger');
    checkFlags = document.querySelector('.header__nav-flags');
    navMobile = document.querySelector('.header__nav');
    checkBurger.addEventListener('click', ()=>{
        checkBurger.classList.toggle('burger');
        navMobile.classList.toggle('showMenu');
        checkFlags.classList.toggle('flag-position');
        page.classList.toggle('unSroll');
        body.classList.toggle('unScroll');
    });
}

/**
*Fonction qui gère l'affichage et le timing du diaporama 
*/
function slideShow(){
    let slide,  slider, decal, start, next, prev, dots, slideWidth, count=0;
     
    slide = document.getElementById('main_diapo');
    slider = document.querySelectorAll('picture.diapo__slide');
    dots = document.querySelectorAll('span.slide__dot__item');
    next = document.querySelector('a.diapo__next');
    prev = document.querySelector('a.diapo__prev');

    if(slide){
        
        slideWidth = slide.getBoundingClientRect().width;
        startTimer();
        slide.addEventListener('mouseover', stopTimer);
        slide.addEventListener('mouseout', startTimer);
        next.addEventListener('click', slideNext);
        prev.addEventListener('click', slidePrev);

        //Redimensionne la fenetre pour le responsive
        window.addEventListener('resize', ()=>{
            slideWidth = slide.getBoundingClientRect().width;
            slideNext();
        });
    }
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

}

/**
 * Fonction qui gère les l'ajout de classe des liens de menus
 */
function activeLink(){
    let link = document.querySelectorAll('#nav_menu a');

    link.forEach((el)=>{
        el.addEventListener('click', ()=>{
            link.forEach((active)=>{
                if(active.classList.contains('active-link'))
                    active.classList.remove('active-link');
            });
            el.classList.add('active-link');
        });
    });
}

function scrollToTop(){
    let arrow = document.createElement('i');
    arrow.setAttribute('class', 'fi fi-rs-angle-up backToTop');
    document.body.append(arrow);

    window.addEventListener('scroll', ()=>{
        if(window.scrollY > 50){
            arrow.style.display = 'block';
        }
        else{
            arrow.style.display = 'none';
        }
    });

    arrow.addEventListener('click', ()=>{
        window.scrollTo({
            top:0,
            left:0,
            behavior:'smooth'
        });
    });
    
    arrow.addEventListener('mouseover', ()=>{
        arrow.style.opacity = '.9';
    });
    arrow.addEventListener('mouseleave', ()=>{
        arrow.style.opacity = '.2';
    });
}

window.addEventListener('load', ()=>{
    scrollToTop();
    activeLink();
    slideShow();
    hideMenu();
    // headerSize();
    displayMenu();
});