// const aboutAnchor = document.querySelector('a[href*="#about"]');

// aboutAnchor.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   const blockID = aboutAnchor.getAttribute('href');
//   document.querySelector('' + blockID).scrollIntoView({
//     behavior: 'smooth',
//     block: 'start',
//   });
// });

// const servicesAnchor = document.querySelector('a[href*="#services"]');

// servicesAnchor.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   const blockID = servicesAnchor.getAttribute('href');
//   document.querySelector('' + blockID).scrollIntoView({
//     behavior: 'smooth',
//     block: 'start',
//   });
// });

const anchors = ['about', 'services', 'entities', 'individuals', 'portfolio', 'footer'];

const createLinkScroll = (elementHref) => {
  const elementAnchor = document.querySelector(`a[href*="#${elementHref}"]`);

  elementAnchor.addEventListener('click', (evt) => {
    evt.preventDefault();
    const blockID = elementAnchor.getAttribute('href');
    document.querySelector('' + blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
};

anchors.forEach((anchor) => createLinkScroll(anchor));
