
/**
*Fonction qui gère l'affichage et le timing du diaporama 
*/
export function slideShow(){
    let slide,  slider, decal, start, next, prev, dots, slideWidth, count=0;
    
    slide = document.getElementById('main_diapo');
    slider = document.querySelectorAll('img.diapo__slide');
    dots = document.querySelectorAll('span.slide__dot__item');
    next = document.querySelector('a.diapo__next');
    prev = document.querySelector('a.diapo__prev');

    if(slide){
        
        slideWidth = slide.getBoundingClientRect().width;
        startTimer(), slideDots(), touchFinger();

        slide.addEventListener('mouseover', stopTimer);
        slide.addEventListener('mouseout', startTimer);
        next.addEventListener('click', slideNext);
        prev.addEventListener('click', slidePrev);

        //Redimensionne la fenetre pour le responsive
        window.addEventListener('resize', ()=>{
            slideWidth = slide.getBoundingClientRect().width;
            // réactualise le size lors du changement de la taille d'écran
            slideNext();
        });
    }

    // Gère la détection du touchSlide
    function touchFinger(){
       
        if(screen.width <= 1024) {
            let distance; let touch, start=0; 
            // let between = 20;
            // Au premier point de contact
            slide.addEventListener("touchstart", function(evt) {
                // Récupère les "touches" effectuées
                touch = evt.changedTouches[0];
                start = touch.pageX;
                distance = 0;
            });
            // Stop l'évènement au simple clic
            slide.addEventListener('touchmove', (evt)=>{
                evt.stopPropagation();
            })
            // Quand le contact s'arrête
            slide.addEventListener("touchend", function(evt) {
                 touch = evt.changedTouches[0];
                //  console.log(touch.length());
                 distance = touch.pageX - start;
                // Si le slide effectué > 0, on change l'image appropriée
                if(distance > 0){
                    slideNext();
                }else if(distance < 0){
                   slidePrev();
                }
            });
        }
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

    // Permet au clic sur les dots le défilements des photos
    function slideDots(){
        
        for(let i = 0; i < dots.length; ++i){
            dots[i].addEventListener('click', ()=>{
                count  = i;
                nextSlide(decal, slideWidth, count, slide);
                setClass(dots, slider);
            });
        }
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
