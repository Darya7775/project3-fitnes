import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------
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
    iframe.classList.add('gym__video-img');
    iframe.style.zIndex = '2';

    gymLink.remove();
    gymButton.remove();
    gymVideo.appendChild(iframe);
  });

  const gymPHide = document.querySelector('.gym__wrap--hide');

  const breakpoint = window.matchMedia('(min-width:75em)');
  const deletePgym = () => {
    if (breakpoint.matches) {
      gymPHide.style.display = 'block';
    } else {
      gymPHide.style.display = 'none';
    }
  };
  breakpoint.addEventListener('change', deletePgym);
  deletePgym();

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
