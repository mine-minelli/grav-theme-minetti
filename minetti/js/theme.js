// Theme Script
(function() {
  
    //   YES JS
    document.documentElement.classList.remove('nojs');
    
    //   ADD target _blank to external link
    let links = document.querySelectorAll('a[href^="http"]');
    if(links.length > 0) {
      Array.prototype.forEach.call(links, function(el, i){
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      });
    }
    
    const budy = document.body.parentNode;
//     MENU
    const fakeButton = document.querySelector('[data-menu-button]');
    const menu = document.querySelector('[data-menu]');

    const toggleMenuButton = document.createElement('button');
    toggleMenuButton.innerHTML = fakeButton.innerHTML;
    toggleMenuButton.setAttribute('aria-expanded', false);
    toggleMenuButton.setAttribute('aria-controls', 'menu');
    toggleMenuButton.classList.add('nav_toggle');

    fakeButton.parentNode.replaceChild(toggleMenuButton, fakeButton);

    toggleMenuButton.addEventListener('click', function() {

      let expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      menu.hidden = !menu.hidden;
      
      if(!expanded) {
        budy.classList.add('noscroll', 'menu-open');
      }else{
        budy.classList.remove('noscroll', 'menu-open');
      }
    });
    menu.hidden = true;

    // Stop body scrolling on IOS
    // https://www.tenpixelsleft.com/prevent-body-scroll-fixed-position-element-ios/
/*
    menu.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);
*/

    
    // Show menu if link get Focused
    let menuLinks = document.querySelectorAll('.main-nav a[href]');
    if(menuLinks.length > 0) {
        let timer;
        Array.prototype.forEach.call(menuLinks, function(el, i){
            el.addEventListener('focus', function(){
                clearTimeout(timer);
                toggleMenuButton.setAttribute('aria-expanded', true);
                menu.hidden = false;
                budy.classList.add('noscroll', 'menu-open');
            });
            
            el.addEventListener('blur', function(){
                timer = window.setTimeout(function(){
                    toggleMenuButton.setAttribute('aria-expanded', false);
                    menu.hidden = true;
                    budy.classList.remove('noscroll', 'menu-open');
                }, 300);
            });
        });
    }
      
})();






