import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import Swiper, {Navigation, Keyboard} from 'swiper';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------
  // header

  const buttonBay = document.querySelector('.header__button');

  buttonBay.addEventListener('click', (e) => {
    e.preventDefault();
    const buttonId = buttonBay.getAttribute('href');
    document.querySelector(buttonId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });

  // gym

  const gymVideo = document.querySelector('.gym__video-wrapper');
  const gymButton = gymVideo.querySelector('.gym__video-button');
  const gymLink = gymVideo.querySelector('.gym__video-link');

  gymLink.removeAttribute('href');
  gymVideo.classList.add('gym__video-wrapper--enebled');

  gymVideo.addEventListener('click', () => {

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/9TZXsZItgdw?autoplay=1');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.classList.add('gym__video-img');

    gymVideo.classList.add('gym__video-wrapper--after');

    gymLink.remove();
    gymButton.remove();
    gymVideo.appendChild(iframe);
  });

  const gymPHide = document.querySelector('.gym__wrap--hide');

  const breakpoint = window.matchMedia('(max-width:75em)');
  const deletePgym = () => {
    if (breakpoint.matches) {
      gymPHide.style.display = 'none';
    } else {
      gymPHide.style.display = 'block';
    }
  };
  breakpoint.addEventListener('change', deletePgym);
  deletePgym();

  // subscription

  const tabs = document.querySelectorAll('input[type=radio]');
  const tabsList = document.querySelectorAll('.subscription__tabs-list');

  for (let i = 0; i < tabsList.length; i++) {
    tabsList[i].style.display = 'none';
  }

  tabs.forEach((tab) => {
    if (tab.getAttribute('checked') === '') {
      for (let i = 0; i < tabsList.length; i++) {
        if (tabsList[i].classList.contains(tab.getAttribute('id'))) {
          tabsList[i].style.display = 'grid';
        }
      }
    }
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idTab = tab.getAttribute('id');

      for (let i = 0; i < tabsList.length; i++) {
        tabsList[i].style.display = 'none';
      }

      for (let i = 0; i < tabsList.length; i++) {
        if (tabsList[i].classList.contains(idTab)) {
          tabsList[i].style.display = 'grid';
        }
      }
    });
  });

  // trainers

  void new Swiper('.trainer__swiper', {
    modules: [Navigation, Keyboard],
    spaceBetween: 40,
    grabCursor: true,
    loop: true,
    navigation: {
      nextEl: '.trainer__button--next',
      prevEl: '.trainer__button--prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        initialSlide: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        initialSlide: 2,
      },
      1200: {
        slidesPerView: 4,
      },
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    a11y: {
      enebled: true,
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      firstSlideMessage: 'Первый слайд',
      lastSlideMessage: 'Послдений слайд',
      notificationClass: 'swiper-notification',
    },
  });

  const slides = document.querySelectorAll('.trainer__item');

  for (let i = 0; i < 4; i++) {
    slides[i].removeAttribute('tabindex');
  }

  // reviews

  void new Swiper('.reviews__swiper', {
    modules: [Navigation],
    grabCursor: true,
    spaceBetween: 30,
    navigation: {
      nextEl: '.reviews__button--next',
      prevEl: '.reviews__button--prev',
    },
    a11y: {
      enebled: true,
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
      firstSlideMessage: 'Первый слайд',
      lastSlideMessage: 'Послдений слайд',
      notificationClass: 'swiper-notification',
    },
  });

  // contacts

  const telephones = document.querySelectorAll('input[type="tel"]');

  const prefixNumber = (str) => {
    if (str === '7') {
      return '7 (';
    }
    if (str === '8') {
      return '7 (';
    }
    if (str === '9') {
      return '7 (';
    }
    return '7 (';
  };

  // ---------------
  for (let i = 0; i < telephones.length; i++) {
    telephones[i].addEventListener('input', () => {
      const value = telephones[i].value.replace(/\D+/g, '');
      const numberLength = 11;

      let result;
      if (telephones[i].value.includes('+8') || telephones[i].value[0] === '8') {
        result = '';
      } else {
        result = '+';
      }

      //
      for (let j = 0; j < value.length && j < numberLength; j++) {
        switch (j) {
          case 0:
            result += prefixNumber(value[i]);
            continue;
          case 4:
            result += ') ';
            break;
          case 7:
            result += '-';
            break;
          case 9:
            result += '-';
            break;
          default:
            break;
        }
        result += value[j];
      }
      //
      telephones[i].value = result;
    });
  }

  const form = document.querySelector('#form');

  form.addEventListener('submit', (e) => {
    if (telephones[0].value.length < 18) {
      e.preventDefault();
      telephones[0].style.boxShadow = '0 0 0 5px #ffffff';
    }
  });

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener

// используйте .closest(el)
