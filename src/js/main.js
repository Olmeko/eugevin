function headerCircleMove(item, speed) {
  window.addEventListener('mousemove', (e) => {
    const headerVisible = item.getBoundingClientRect().bottom;

    if (headerVisible > 0) {
      let xPos = e.x;
      let yPos = e.y;

      item.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px) rotate(${xPos * speed}deg)`;
    }
  })
}

function adaptiveHeader() {
  const header = document.querySelector('.header__menu');
  const feedbackSection = document.querySelector('.feedback');
  
  if (pageYOffset > 0) {
    header.classList.add('header__menu_active');
  } else {
    header.classList.remove('header__menu_active');
  }

  // убрать header, когда скролл доходит до feedback

  if (feedbackSection.getBoundingClientRect().y < 0) {
    header.style.top = '-25%';
    header.style.transform = 'rotate(10deg)';
    header.style.opacity = '0';
  } else {
    header.removeAttribute('style');
  }

  requestAnimationFrame(adaptiveHeader);
}

function headerMouse() {
  const headerMouse = document.querySelector('.header__mouse');
  const skills = document.querySelector('.skills');

  headerMouse.addEventListener('click', () => {
    skills.scrollIntoView({ behavior: 'smooth' });
  });
}

function aboutSelect() {
  const selectors = document.querySelectorAll('.about__content-item');
  const pictures = document.querySelectorAll('.about__image picture');

  selectors.forEach((selector, k) => {
    selector.addEventListener('click', function () {
      if (!this.classList.contains('content-item_active')) {
        pictures.forEach(picture => {
          picture.classList.remove('about__image-item_active');
        });

        pictures[k].classList.add('about__image-item_active');

        selectors.forEach(item => {
          item.classList.remove('content-item_active');
        });

        this.classList.add('content-item_active');
      }
    });
  });
}

function burgerAnimation() {
  const headerBurger = document.querySelector('.header__menu-burger');
  const nav = document.querySelector('.header__menu-navigation');
  const navItems = document.querySelectorAll('.header__menu-navigation li');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      nav.removeAttribute('style');
      headerBurger.classList.remove('header__menu-burger_active');
    });
  })

  headerBurger.addEventListener('click', function() {
    if (!headerBurger.classList.contains('header__menu-burger_active')) {
      this.classList.add('header__menu-burger_active');
      nav.style.left = 0;
      nav.style.borderRadius = 0;
      nav.style.opacity = 1;
    } else {
      this.classList.remove('header__menu-burger_active');
      nav.removeAttribute('style');
    }
  });
}

function lazyLoad() {
  const lazyItems = document.querySelectorAll('[data-src]');

  lazyItems.forEach(item => {
    const itemPos = item.getBoundingClientRect().y;

    item.style.opacity = 0;
    item.style.transform = 'translateY(20px)';
    
    if (itemPos < innerHeight / 1.2) {
      if (item.hasAttribute('data-src')) {
        const itemSource = item.getAttribute('data-src');

        item.removeAttribute('data-src');

        if (item.nodeName === 'VIDEO') {
          item.src = itemSource;
          item.onloadeddata = function() {
            this.removeAttribute('style');
          }
        } else if (item.nodeName === 'SOURCE') {
          item.setAttribute('srcset', itemSource);
          item.removeAttribute('style');
        } else {
          item.src = itemSource;
          item.onload = function() {
            this.removeAttribute('style');
          }
        }
      }
    }    
  });

  requestAnimationFrame(lazyLoad);
}

function animatedMan() {
  const a = document.querySelectorAll('a');
  const manMain = document.querySelector('.animatedMan');
  const man = document.querySelector('.animatedMan__model');
  const manAlert = document.querySelector('.animatedMan__alert');
  const manAlertSpan = document.querySelector('.animatedMan__alert span');
  const manText = document.querySelector('.animatedMan__text');
  const manTextSpan = document.querySelector('.animatedMan__text span');

  if (localStorage.getItem('catch') !== 'true') {
    a.forEach(item => {
      item.addEventListener('mouseover', () => {
        man.classList.add('animatedMan__model_active');
      });
      item.addEventListener('mouseleave', () => {
        man.classList.remove('animatedMan__model_active');
      });
    });
  
    manAlertSpan.addEventListener('click', () => {
      manAlert.remove();
    });
  
    man.addEventListener('mouseover', () => {
      manText.style.opacity = 1;
      manText.style.zIndex = 99;
      manText.style.transform = 'scale(1)';

      priceChange();
  
      manTextSpan.addEventListener('click', () => {
        manText.removeAttribute('style');
        manText.addEventListener('transitionend', () => {
          manMain.remove();
          localStorage.setItem('catch', 'true');
        });
      });
      
      document.addEventListener("keydown", function(event) {
        if(event.keyCode === 27){
          manText.removeAttribute('style');
          manText.addEventListener('transitionend', () => {
            manMain.remove();
            localStorage.setItem('catch', 'true');
          });
        }
      });
    });
  } else {
    manMain.remove();
    priceChange();
  }

  function priceChange() {
    const allPrices = document.querySelectorAll('.cards-item__price');

    allPrices.forEach(price => {
      let priceNumber = price.textContent.split('').splice(1).join('');
      priceNumber = parseInt(priceNumber * 0.85);

      price.textContent = `$${priceNumber}`      
    });
  }
}

export { headerCircleMove, adaptiveHeader, headerMouse, aboutSelect, burgerAnimation, lazyLoad, animatedMan };