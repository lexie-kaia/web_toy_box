const headerProfileDropdownMenu = document.querySelector('.header-dropdown-menu');
const headerPropfileDropdownBtn = document.querySelector('.header-profile-avatar');
const headerNavDropdownMenu = document.querySelector('.header-nav');
const headerNavDropdownBtn = document.querySelector('.header-nav-btn');

const toggleProfileDropdownMenu = () => {
  headerProfileDropdownMenu.classList.toggle('header-hide');
};

const hideProfileDropdownMenu = () => {
  headerProfileDropdownMenu.classList.add('header-hide');
};

const toggleNavDropdownMenu = () => {
  headerNavDropdownMenu.classList.toggle('header-show');
};

const hideNavDropdownMenu = () => {
  headerNavDropdownMenu.classList.remove('header-show');
};

headerPropfileDropdownBtn.addEventListener('click', toggleProfileDropdownMenu);
headerPropfileDropdownBtn.addEventListener('blur', hideProfileDropdownMenu);

headerNavDropdownBtn.addEventListener('click', toggleNavDropdownMenu);
headerNavDropdownBtn.addEventListener('blur', hideNavDropdownMenu);
