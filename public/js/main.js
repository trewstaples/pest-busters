const ANCHORS = ['about', 'services', 'entities', 'individuals', 'portfolio', 'footer'];
const HEADER_HEIGHT = 110;

const scrollT0 = (el) => {
  window.scroll({
    top: el.offsetTop - HEADER_HEIGHT,
    behavior: 'smooth',
  });
};

const servicesItem = document.getElementById('entities');

const scrollToChapter = (hrefElement) => {
  const anchorElement = document.querySelectorAll(`a[href*="#${hrefElement}"]`);
  const anchorChapter = document.getElementById(`${hrefElement}`);

  anchorElement.forEach((anchor) => {
    anchor.addEventListener('click', (evt) => {
      evt.preventDefault();
      scrollT0(anchorChapter);
    });
  });
};

ANCHORS.forEach((anchor) => scrollToChapter(anchor));
