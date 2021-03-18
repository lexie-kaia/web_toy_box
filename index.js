const filter = document.querySelector('.js-filter');

const showFiltered = (event) => {
  console.log(event.target.dataset.filter);
};

filter.addEventListener('click', showFiltered);

const projectCards = document.querySelectorAll('.js-project-card');

const showVerbose = (event) => {
  if (!event.target.matches('.js-icon') && !event.target.matches('.js-btn-more')) return;

  const contentVerbose = event.currentTarget.querySelector('.js-content-verbose');
  const btnMore = event.currentTarget.querySelector('.js-btn-view- more');

  contentVerbose.classList.toggle('display--none');
  btnMore.classList.toggle('btn__view-more--rotate');
};

projectCards.forEach((projectCard) => projectCard.addEventListener('click', showVerbose));
