export class StartWindow {
  constructor(container, handlerSubmit) {
    this.window = document.createElement('div')
    const form = document.createElement('form')
    const message = document.createElement('h5')
    const inputNumber = document.createElement('input')
    // <button type="button" class="btn btn-dark">Dark</button>
    const buttonSubmit = document.createElement('button')

    this.window.classList.add('col-3', 'bg-white', 'p-4', 'rounded', 'position-absolute', 'top-50', 'start-50', 'translate-middle')

    inputNumber.type = 'number'
    buttonSubmit.type = 'submit'
    inputNumber.classList.add('form-control', 'mb-3')
    buttonSubmit.classList.add('btn', 'btn-outline-dark', 'px-4')
    buttonSubmit.textContent = 'Start game'
    message.classList.add('mb-3')
    message.textContent = ' Кол-во карточек по вертикали/горизонтали '

    form.addEventListener('submit', handlerSubmit)

    form.append(inputNumber)
    form.append(buttonSubmit)

    this.window.append(message)
    this.window.append(form)

    // this.hide()
    container.append(this.window)
  }

  getValue() {
    const value = +this.window.childNodes[1][0].value
    const def = 4
    if (value === 0) {
      return def
    }
    else if (value > 10) {
      return def
    }
    else if (value < 0) {
      return def
    }
    else if (value % 2 === 0) {
      return value
    } else {
      return def
    }
  }

  show() {
    this.window.style.display = ''
  }

  hide() {
    this.window.style.display = 'none'
  }
}
