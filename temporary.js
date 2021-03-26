const nav = document.querySelector('.js-nav');
const btnMore = document.querySelector('.js-btn-more');

const toggleMenu = () => {
  nav.classList.toggle('js-display-block');
};

btnMore.addEventListener('click', toggleMenu);
