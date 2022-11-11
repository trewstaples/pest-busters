'use strict';

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

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = 0;

    let formData = new FormData(form);

    if (error === 0) {
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
      } else {
        alert('Ошибка');
        console.log(response);
      }
    }
  }

  const contactFormBtn = document.querySelector('.contact-form-btn');
  const closeBtn = document.querySelector('.close-btn');
  const formContainer = document.querySelector('.form-container');
  formContainer.style.display = 'none'

  contactFormBtn.addEventListener('click', () => {
    formContainer.style.display === 'none' ? (formContainer.style.display = 'block') : (formContainer.style.display = 'none');
  });

  closeBtn.addEventListener('click', () => {
    formContainer.style.display = 'none';
  });

});

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
