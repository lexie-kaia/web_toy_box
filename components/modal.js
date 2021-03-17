const btnOpenModal = document.querySelector('.js-open-modal');
const btnCloseModal = document.querySelector('.js-close-modal');
const modal = document.querySelector('.js-modal');

const openModal = () => {
  modal.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
};

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
