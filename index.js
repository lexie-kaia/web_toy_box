import { projects, tags } from './projects.js';

const projectList = document.querySelector('.js-project-list');
const filterList = document.querySelector('.js-filter-list');

const generateProjectCards = () => {
  projects.forEach((project) => {
    const { title, summary, url, imgUrl, tags, keyFeatures, references } = project;
    const tagsData = tags.join(' ');
    let tagsHTML = '';
    let keyFeaturesHTML = '';
    let referencesHTML = '';
    tags.forEach((tag) => {
      tagsHTML += `<span class="tag__s">${tag.toUpperCase()}</span>`;
    });
    keyFeatures.forEach((feature) => {
      keyFeaturesHTML += `<li class="fs__list">${feature}</li>`;
    });
    references.forEach((ref) => {
      referencesHTML += `<li class="fs__list"><a href="${ref[1]}">${ref[0]}</a></li>`;
    });
    const projectCardHTML = `
      <div class="project__summary">
        <a href="${url}" class="project__img-container">
          <img src="${imgUrl}" alt="" class="project__image" />
        </a>
        <div class="project__text-container">
          ${tagsHTML}
          <h3 class="project__title fs__h2">
            <a href="${url}">
              ${title}
            </a>
          </h3>
          <p class="project__description fs__p">
            <a href="${url}">
              ${summary}
            </a>
          </p>
        </div>
        <div class="project__btn-container">
          <button class="btn__view-more js-btn-view-more">
            <i class="fas fa-chevron-down js-icon"></i>
          </button>
        </div>
      </div>
      <div class="project__verbose js-verbose">
        <h4 class="project__heading fs__h3">
          Key Features
        </h4>
        <p class="project__description fs__p">
          <ul>
            ${keyFeaturesHTML}
          </ul>
        </p>
        <h4 class="project__heading fs__f3">
          References
        </h4>
        <p class="project__description fs__p">
          <ul>
            ${referencesHTML}
          </ul>
        </p>
      </div>
    `;

    const div = document.createElement('div');
    div.classList.add('project__card', 'js-project-card');
    div.setAttribute('data-tags', tagsData);
    div.innerHTML = projectCardHTML;
    projectList.append(div);
  });
};

const generateTags = () => {
  tags.forEach((tag) => {
    const button = document.createElement('button');
    button.classList.add('tag__m');
    button.setAttribute('data-filter', tag);
    button.textContent = tag.toUpperCase();
    filterList.append(button);
  });
};

const toggleVerbose = (event) => {
  if (!event.target.matches('.js-icon') && !event.target.matches('.js-btn-view-more')) return;

  const contentVerbose = event.currentTarget.querySelector('.js-verbose');
  const btnMore = event.currentTarget.querySelector('.js-btn-view-more');

  contentVerbose.classList.toggle('js-verbose-show');
  btnMore.classList.toggle('js-btn-view-more-rotate');
};

const setProjectCardsEventListener = () => {
  const projectCards = document.querySelectorAll('.js-project-card');

  projectCards.forEach((projectCard) => {
    projectCard.addEventListener('click', toggleVerbose);
  });
};

const showFilteredProjectCards = (event) => {
  if (event.target.nodeName !== 'BUTTON') return;

  const prevSelected = filterList.querySelector('.js-filter-selected');
  const currSelected = event.target;
  const filter = currSelected.dataset.filter;
  const projectCards = document.querySelectorAll('.js-project-card');

  prevSelected.classList.remove('js-filter-selected');
  currSelected.classList.add('js-filter-selected');
  projectList.classList.add('js-anim-out');
  setTimeout(() => {
    projectCards.forEach((projectCard) => {
      const verboseShow = projectCard.querySelector('.js-verbose-show');
      verboseShow && verboseShow.classList.remove('js-verbose-show');

      if (filter === 'all') {
        projectCard.classList.remove('js-display-none');
      } else {
        const tags = projectCard.dataset.tags;
        if (tags.indexOf(filter) === -1) {
          projectCard.classList.add('js-display-none');
        } else {
          projectCard.classList.remove('js-display-none');
        }
      }
    });
    projectList.classList.remove('js-anim-out');
  }, 250);
};

window.addEventListener('DOMContentLoaded', () => {
  generateProjectCards();
  generateTags();
  setProjectCardsEventListener();
});

filterList.addEventListener('click', showFilteredProjectCards);
