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
                phone.classList.add('is-hide');
                burger.classList.remove('header__burger-position');
            }
            else{
                    logo.style.width="50%";
                    menu.style.flexDirection="column";
                    burger.classList.add('header__burger-position');
                    phone.classList.remove('is-hide');
                    header.classList.remove("header-shadow");
            }
        }); 
    }   
}


/**
 * Fonction qui gère l'ouverture du menu Mobile au clic
 */

function sideMenu(){
    let sideBar, welcome, checkBurger;
    
    
    checkBurger = document.querySelector('.header__burger');
    sideBar = document.querySelector('.header__nav');
    welcome = header.firstElementChild;
    console.log(checkBurger);
    checkBurger.addEventListener('click', ()=>{
        checkBurger.classList.toggle('burger');
        // checkBurger.classList.toggle('active');
        sideBar.classList.toggle('moveMenu');
        welcome.classList.toggle('is-hide');
        header.classList.toggle('header_main-change');
        });
console.log(sideBar);
}

    /**
     *Fonction qui gère l'affichage et le timing du diaporama 
     */
function diaporama(){
    let slide,  slider, decal, start, next, prev, dots, slideWidth, count=0;
     
    slide = document.getElementById('main_diapo');
    slider = document.querySelectorAll('picture.diapo__slide');
    slideWidth = slide.getBoundingClientRect().width;
    dots = document.querySelectorAll('span.slide__dot__item');
    next = document.querySelector('a.diapo__next');
    prev = document.querySelector('a.diapo__prev');
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
                if(active.classList.contains('active-link'))
                active.classList.remove('active-link');
            });
            el.classList.add('active-link');
        });
    })
    console.log(link);
}

function scrollToTop(){
    let arrow = document.createElement('i');
    arrow.setAttribute('class', 'fi fi-rs-angle-up backToTop');
    document.body.append(arrow);

    window.addEventListener('scroll', ()=>{
        if(window.scrollY > 50){
            arrow.style.display = "block";
        }
        else{
            arrow.style.display = "none";
        }
    })

    arrow.addEventListener('click', ()=>{
        window.scrollTo({
            top:0,
            left:0,
            behavior:'smooth'
        });
    })
    
    arrow.addEventListener('mouseover', ()=>{
        arrow.style.opacity = '.9';
    })
    arrow.addEventListener('mouseleave', ()=>{
        arrow.style.opacity = '.2';
    })
    
    

}
window.addEventListener('load', ()=>{
    scrollToTop();
   activeLink();
    diaporama();
    lessMenu();
    sideMenu();
});