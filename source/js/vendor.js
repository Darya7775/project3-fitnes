// Swiper 7.4.1
import Swiper from './vendor/swiper';
import './vendor/focus-visible-polyfill';

void new Swiper('.trainer__swiper', {
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
  a11y: {
    enebled: true,
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'Первый слайд',
    lastSlideMessage: 'Послдений слайд',
    notificationClass: 'swiper-notification',
  },
});
