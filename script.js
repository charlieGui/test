'use strict';


/**
 *Fonction qui ajoute des styles afin d'adapter le menuMobile au scroll
 */

var header;
function headerSize(){
    let logoBox, logo, burger, phone, stickPosition, chaine;

    header = document.getElementById('header');
    logoBox = header.firstElementChild;
    logo = logoBox.firstElementChild;
    burger = logoBox.lastElementChild;
    phone = logo.nextElementSibling.firstElementChild.nextElementSibling;
    stickPosition = header.getBoundingClientRect().top;

// # a la fin du href ???
    function currentPage(ch){ 
        ch = location.href;
        console.log(ch);
        ch = ch.split('/').pop();
        console.log(ch);
        return ch;
    }

    function addClass(el, cl){
        el.classList.add(cl);
    }

    function removeClass(el, cl){
        el.classList.remove(cl);
    }

    function headerSmall(){
        logo.style.width='23%';
        logoBox.style.flexDirection='row';
        addClass(header, 'header-shadow');
        addClass(phone, 'is-hide');
        removeClass(burger, 'header__burger-position');
    }
    
    function headerXl(){
        logo.style.width='50%';
        logoBox.style.flexDirection='column';
        addClass(burger, 'header__burger-position');
        removeClass(phone, 'is-hide');
        removeClass(header, 'header-shadow');
    }

    if(window.innerWidth < 576) { /*Version mobile */
       
        if(currentPage(chaine) == 'index.html') {  
        window.addEventListener('scroll', ()=>{
            if(window.scrollY > stickPosition){
                headerSmall();
            }
            else {
                headerXl();
            }
        }); 
        }else {
            headerSmall();
        }
    }
}

/**
 * Fonction qui gère l'ouverture du menu Mobile au clic
 */

function displayMenu(){
    let navMobile, checkBurger;
    
    checkBurger = document.querySelector('.header__burger');
    navMobile = document.querySelector('.header__nav');
    checkBurger.addEventListener('click', ()=>{
        checkBurger.classList.toggle('burger');
        navMobile.classList.toggle('showMenu');
        header.classList.toggle('header_main-change');
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
    headerSize();
    displayMenu();
});