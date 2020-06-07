// variables

import 'normalize.css';
import './scss/styles.scss';

// imports

import { headerCircleMove, adaptiveHeader, headerMouse, aboutSelect, burgerAnimation, lazyLoad, animatedMan, rubleConverter } from './js/main';

// callstack

function preloaderAnimation() {
  const preloader = document.querySelector('.preloader');
  if (localStorage.getItem('preloader') !== 'false' && document.location.pathname !== '/ru') {
    const body = document.querySelector('body');
    const preloaderEnButton = document.querySelector('.preloader__links-item');

    body.style.overflow = 'hidden';

    preloaderEnButton.addEventListener('click', () => {
      body.removeAttribute('style');

      preloader.style.top = '-100%';
      preloader.style.opacity = 0;

      preloader.addEventListener('transitionend', function() {
        preloader.remove();
        localStorage.setItem('preloader', 'false');
      });
    });
  } else {
    preloader.remove();
  }
}

preloaderAnimation();

window.addEventListener('DOMContentLoaded', () => {
  const headerCircle = document.querySelector('.header__circle');

  headerCircleMove(headerCircle, 0.01);
  adaptiveHeader();
  headerMouse();
  aboutSelect();
  burgerAnimation();
  lazyLoad();
  animatedMan();
});