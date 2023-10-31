

 export function menuManager(){

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

    function hideMenu(){
        let header,  position = 0;
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
    displayMenu(), hideMenu(), activeLink();
}