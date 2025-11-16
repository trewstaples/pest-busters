'use strict'

// === ЭЛЕМЕНТЫ ===
const menu = document.getElementById('header-menu')
const burgerBtn = document.getElementById('burger-btn')
const closeBtn = document.getElementById('close-burger')
const overlay = document.getElementById('menu-overlay')

// === ОТКРЫТИЕ МЕНЮ ===
function openMenu() {
  if (!menu) return

  // Открываем меню
  menu.classList.remove('-right-full')
  menu.classList.add('right-0')

  // Показываем overlay
  if (overlay) {
    overlay.classList.remove('invisible', 'opacity-0')
    overlay.classList.add('visible', 'opacity-100')
  }

  // Блокируем прокрутку страницы
  document.body.style.overflow = 'hidden'
}

// === ЗАКРЫТИЕ МЕНЮ ===
function closeMenu() {
  if (!menu) return

  // Закрываем меню
  menu.classList.remove('right-0')
  menu.classList.add('-right-full')

  // Скрываем overlay
  if (overlay) {
    overlay.classList.remove('visible', 'opacity-100')
    overlay.classList.add('invisible', 'opacity-0')
  }

  // Возвращаем прокрутку страницы
  document.body.style.overflow = ''
}

// === СОБЫТИЯ ===
// Клик по кнопке бургера - открыть меню
if (burgerBtn) {
  burgerBtn.addEventListener('click', openMenu)
}

// Клик по крестику - закрыть меню
if (closeBtn) {
  closeBtn.addEventListener('click', closeMenu)
}

// Клик по overlay - закрыть меню
if (overlay) {
  overlay.addEventListener('click', closeMenu)
}

// === ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ ===
const anchors = ['about', 'services', 'entities', 'individuals', 'portfolio', 'footer']
const headerHeight = 110

anchors.forEach(anchor => {
  const links = document.querySelectorAll(`a[href="#${anchor}"]`)
  const section = document.getElementById(anchor)

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()

      // Плавная прокрутка
      if (section) {
        window.scroll({
          top: section.offsetTop - headerHeight,
          behavior: 'smooth',
        })
      }

      // Закрываем меню на мобильных после клика
      if (window.innerWidth < 768) {
        closeMenu()
      }
    })
  })
})

// === ЗАКРЫТИЕ МЕНЮ ПО ESC ===
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('right-0')) {
    closeMenu()
  }
})

// === МОДАЛЬНОЕ ОКНО ===
const modal = document.getElementById('consultationModal')
const openModalEntitiesBtn = document.getElementById('openModalEntities')
const openModalIndividualsBtn = document.getElementById('openModalIndividuals')
const closeModalBtn = document.getElementById('closeModal')
const consultationForm = document.getElementById('consultationForm')
const formStatus = document.getElementById('formStatus')

// Функция открытия модального окна
function openModal() {
  if (modal) {
    modal.classList.remove('hidden')
    modal.classList.add('flex')
    document.body.style.overflow = 'hidden'
  }
}

// Функция закрытия модального окна
function closeModal() {
  if (modal) {
    modal.classList.remove('flex')
    modal.classList.add('hidden')
    document.body.style.overflow = ''
    // Скрываем статус при закрытии
    if (formStatus) {
      formStatus.classList.add('hidden')
    }
  }
}

// Открытие модального окна по кнопкам
if (openModalEntitiesBtn) {
  openModalEntitiesBtn.addEventListener('click', openModal)
}

if (openModalIndividualsBtn) {
  openModalIndividualsBtn.addEventListener('click', openModal)
}

// Закрытие модального окна
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal)
}

// Закрытие по клику вне модального окна
if (modal) {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal()
    }
  })
}

// Закрытие по ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
    closeModal()
  }
})

// === ОТПРАВКА ФОРМЫ ===
if (consultationForm) {
  consultationForm.addEventListener('submit', async e => {
    e.preventDefault()

    // Получаем данные формы
    const formData = new FormData(consultationForm)

    // Показываем статус отправки
    formStatus.classList.remove('hidden', 'text-green-600', 'text-red-600')
    formStatus.classList.add('text-gray-600')
    formStatus.textContent = 'Отправка...'

    try {
      // Отправляем форму
      const response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      // Показываем результат
      if (result.message === 'Данные отправлены') {
        formStatus.classList.remove('text-gray-600')
        formStatus.classList.add('text-green-600', 'font-bold')
        formStatus.textContent = '✓ Заявка успешно отправлена!'

        // Очищаем форму
        consultationForm.reset()

        // Закрываем модальное окно через 2 секунды
        setTimeout(() => {
          closeModal()
        }, 2000)
      } else {
        throw new Error('Ошибка отправки')
      }
    } catch (error) {
      formStatus.classList.remove('text-gray-600')
      formStatus.classList.add('text-red-600', 'font-bold')
      formStatus.textContent = '✗ Ошибка отправки. Попробуйте позже.'
      console.error('Ошибка:', error)
    }
  })
}
