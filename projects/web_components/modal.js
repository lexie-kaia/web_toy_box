const btnOpenModal = document.querySelector('.js-open-modal');
const btnCloseModal = document.querySelector('.js-close-modal');
const btnJoinModal = document.querySelector('.js-join-modal');
const modal = document.querySelector('.js-modal');

const openModal = () => {
  modal.classList.remove('modal-hidden');
};

const closeModal = () => {
  modal.classList.add('modal-hidden');
};

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
btnJoinModal.addEventListener('click', closeModal);
