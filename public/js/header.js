const anchors = ['about', 'services', 'entities', 'individuals', 'portfolio', 'footer'];

const createLinkScroll = (elementHref) => {
  const elementAnchors = document.querySelectorAll(`a[href*="#${elementHref}"]`);

  elementAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (evt) => {
      evt.preventDefault();
      const blockID = anchor.getAttribute('href');
      document.querySelector('' + blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    });
  });
};

anchors.forEach((anchor) => createLinkScroll(anchor));
