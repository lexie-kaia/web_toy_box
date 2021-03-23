import { projects, tags } from './projects.js';

const projectList = document.querySelector('.js-project-list');
const filterList = document.querySelector('.js-filter-list');

const generateProjectCards = () => {
  projects.forEach((project) => {
    const { title, summary, url, thumbnailUrl, tags, keyFeatures, references, imgsUrl } = project;
    const tagsData = tags.join(' ');
    let tagsHTML = '';
    let keyFeaturesHTML = '';
    let referencesHTML = '';
    let imgsHTML = '';
    tags.forEach((tag) => {
      tagsHTML += `<span class="tag__s">${tag.toUpperCase()}</span>`;
    });

    if (keyFeatures.length !== 0) {
      let keyFeaturesInnerHTML = '';
      console.log(keyFeaturesInnerHTML);
      keyFeatures.forEach((feature) => {
        keyFeaturesInnerHTML = keyFeaturesInnerHTML + `<li class="fs__list">${feature}</li>`;
      });
      keyFeaturesHTML = `
        <h4 class="project__heading fs__h4">
          Key Features
        </h4>
        <p class="project__description">
          <ul class="fs__p">
            ${keyFeaturesInnerHTML}
          </ul>
        </p>`;
    }

    if (references.length !== 0) {
      let referencesInnerHTML = '';
      references.forEach((ref) => {
        referencesInnerHTML =
          referencesInnerHTML + `<li class="fs__list"><a href="${ref[1]}" target="_blank">${ref[0]}</a></li>`;
      });
      referencesHTML = `
        <h4 class="project__heading fs__h4">
          References
        </h4>
        <p class="project__description">
          <ul class="fs__p">
            ${referencesInnerHTML}
          </ul>
        </p>`;
    }

    imgsUrl.forEach((img) => {
      imgsHTML += `<img src="${img}" alt="" class="project__src"></img>`;
    });
    const projectCardHTML = `
      <div class="project__summary">
        <a href="${url}" target="_blank" class="project__thumbnail-container">
          <img src="${thumbnailUrl}" alt="" class="project__thumbnail" />
        </a>
        <div class="project__text-container">
          ${tagsHTML}
          <h3 class="project__title fs__h3">
            <a href="${url}" target="_blank">
              ${title}
            </a>
          </h3>
          <p class="project__description fs__p">
            <a href="${url}" target="_blank">
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
        <div class="project__img">
          ${imgsHTML}
        </div>
        ${keyFeaturesHTML}
        ${referencesHTML}
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
    button.classList.add('tag__m', 'filter__item');
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
      const rotatedButton = projectCard.querySelector('.js-btn-view-more-rotate');
      rotatedButton && rotatedButton.classList.remove('js-btn-view-more-rotate');

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
