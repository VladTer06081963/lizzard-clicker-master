const $circle = document.querySelector('#circle')
const $score = document.querySelector('#score')
const $resetButton = document.querySelector('#resetButton')

// Начальная инициализация счета и изображения
function start() {
  const score = getScore()
  console.log(score);
  
  setScore(score)
  setImage(score)
}

// Установка значения счета и обновление отображения
function setScore(score) {
  localStorage.setItem('score', score)
  $score.textContent = score
}

// Изменение изображения в зависимости от счета
function setImage(score) {
  if (score >= 50) {
    $circle.setAttribute('src', './assets/lizzard.png')
  } else {
    $circle.setAttribute('src', './assets/frog.png') // Убедитесь, что у вас есть начальное изображение
  }
}

// Получение текущего значения счета из localStorage
function getScore() {
  return Number(localStorage.getItem('score')) || 0
}

// Увеличение счета на 1 и обновление изображения
function addOne() {
  const newScore = getScore() + 1
  setScore(newScore)
  setImage(newScore)
}

// Сброс счета до 0 и возврат к начальному изображению
function resetScore() {
  setScore(0)
  setImage(0)
}

// Обработчик клика на элемент $circle
$circle.addEventListener('click', (event) => {
  const rect = $circle.getBoundingClientRect()

  const offsetX = event.clientX - rect.left - rect.width / 2
  const offsetY = event.clientY - rect.top - rect.height / 2

  const DEG = 40

  const tiltX = (offsetY / rect.height) * DEG
  const tiltY = (offsetX / rect.width) * -DEG

  $circle.style.setProperty('--tiltX', `${tiltX}deg`)
  $circle.style.setProperty('--tiltY', `${tiltY}deg`)

  setTimeout(() => {
    $circle.style.setProperty('--tiltX', `0deg`)
    $circle.style.setProperty('--tiltY', `0deg`)
  }, 300)

  const plusOne = document.createElement('div')
  plusOne.classList.add('plus-one')
  plusOne.textContent = '+1'
  plusOne.style.left = `${event.clientX - rect.left}px`
  plusOne.style.top = `${event.clientY - rect.top}px`

  $circle.parentElement.appendChild(plusOne)

  addOne()

  setTimeout(() => {
    plusOne.remove()
  }, 2000)
})

// Обработчик клика на кнопку сброса
$resetButton.addEventListener('click', resetScore)

start()
