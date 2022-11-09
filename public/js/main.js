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

const contactFormBtn = document.querySelector('.contact-form-btn');
const formContainer = document.querySelector('.form-container');
const closeBtn = document.querySelector('.close-btn');

contactFormBtn.addEventListener('click', () => {
  formContainer.style.display === 'none' ? (formContainer.style.display = 'block') : (formContainer.style.display = 'none');
});

closeBtn.addEventListener('click', () => {
  formContainer.style.display = 'none';
});

const contactForm = document.querySelector('.contact-form');

let firstName = document.getElementById('name');
let number = document.getElementById('number');
let email = document.getElementById('email');
let message = document.getElementById('message');

firstName.addEventListener('input', (evt) => {
  const isFirstNameValid = /^[А-ЯЁ ,.'-][а-яё ,.'-]+$/i.test(evt.target.value);
  if (!isFirstNameValid) {
    firstName.reportValidity();
    firstName.style.border = '3px solid red';
    return;
  }
  firstName.setCustomValidity('');
  firstName.style.border = 'none';
});

number.addEventListener('input', (evt) => {
  const isNumberValid = /^((\+7|7|8)+([0-9]){10})$/.test(evt.target.value);
  if (!isNumberValid) {
    number.reportValidity();
    number.style.border = '3px solid red';
    return;
  }
  number.style.border = 'none';
  number.setCustomValidity('');
});

email.addEventListener('input', (evt) => {
  const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(evt.target.value);
  if (!isEmailValid) {
    email.reportValidity();
    email.style.border = '3px solid red';
    return;
  }
  email.setCustomValidity('');
  email.style.border = 'none';
});

message.addEventListener('change', (evt) => {
  const isMessageValid = /^[а-яА-ЯёЁa-zA-Z0-9]+$/.test(evt.target.value);
  if (!isMessageValid) {
    message.setCustomValidity('Разрешены только буквы и цифры');
    message.reportValidity();
    message.style.border = '3px solid red';
    return;
  }
  message.setCustomValidity('');
  message.style.border = 'none';
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let formData = {
    name: firstName.value.toString(),
    email: email.value.toString(),
    number: number.value.toString(),
    message: message.value.toString(),
  };

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');

  xhr.onload = function () {
    if (xhr.responseText == 'success') {
      alert('Email sent');
      firstName.value = '';
      email.value = '';
      number.value = '';
      message.value = '';
      formContainer.style.display = 'none';
    } else {
      alert('Произошла ошибка. Попробуйте снова');
    }
  };

  xhr.send(JSON.stringify(formData));
});
