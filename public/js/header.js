const anchors = ['about', 'services', 'entities', 'individuals', 'portfolio', 'footer'];

const createLinkScroll = (elementHref) => {
  const elementAnchor = document.querySelector(`a[href*="#${elementHref}"]`);

  elementAnchor.addEventListener('click', (evt) => {
    evt.preventDefault();
    const blockID = elementAnchor.getAttribute('href');
    document.querySelector('' + blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  });
};

anchors.forEach((anchor) => createLinkScroll(anchor));
