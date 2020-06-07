// variables

import 'normalize.css';
import './scss/styles.scss';

// imports

import { preloaderAnimation, headerCircleMove, adaptiveHeader, headerMouse, aboutSelect, burgerAnimation, lazyStart, lazyBreak, lazyLoad, animatedMan, fuckIE } from './js/main';

// callstack

if (!(window.ActiveXObject) && "ActiveXObject" in window) {
  const liveEvents = document.querySelectorAll('.live_events >div');

  for (let i = 0; i < liveEvents.length; i++) {
    liveEvents[i].style.display = 'none';
  }

  lazyBreak();
  
} else {

  // placeholderNormal

  lazyStart();

  // preloader

  preloaderAnimation();

  // mainFunctions

  window.onload = function() {
    const headerCircle = document.querySelector('.header__circle');

    headerCircleMove(headerCircle, 0.01);
    adaptiveHeader();
    headerMouse();
    aboutSelect();
    burgerAnimation();
    lazyLoad();
    animatedMan();
    fuckIE();
  }
}