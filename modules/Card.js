export class Card {
  static animDuration = 150
  static flipAnimDuration = this.animDuration / 2
  isSuccess = false
  isOpen = false

  constructor(container, cardNumber) {
    this.container = container
    this.cardNumber = cardNumber
  }

  createElement(handlerFlip) {
    this.card = document.createElement('div')
    this.card.style.width = `${12}rem`
    this.card.style.height = `${15}rem`
    this.card.style.userSelect = 'none'
    this.card.classList.add('card__custom', 'card', 'bg-dark', 'text-white', 'm-2', 'd-flex', 'justify-content-center', 'align-items-center', 'fs-1')
    this.container.append(this.card)
    this.card.addEventListener('click', handlerFlip)
  }

  set cardNumber(value) {
    this._cardNumber = value
  }
  get cardNumber() {
    return this._cardNumber
  }

  set open(value) {
    if (!this.success) {
      if (value) {
        this.card.classList.add('active')
        setTimeout(() => {
          this.card.textContent = this.cardNumber
        }, Card.flipAnimDuration)
      } else {
        this.card.classList.remove('active')
        setTimeout(() => {
          this.card.textContent = ''
        }, Card.flipAnimDuration)
      }
    }
    this.isOpen = value
  }
  get open() {
    return this.isOpen
  }

  set success(value) {
    this.isSuccess = value
    this.card.classList.add('border', 'border-5', 'border-success')
  }
  get success() {
    return this.isSuccess
  }
}

export class AmazingCard extends Card {
  createElement() {

    super.createElement()
    this.card.style.overflow = 'hidden'

    const img = document.createElement('img')
    img.classList.add('img-fluid', 'd-none')

    img.src = `./img/${this.cardNumber}.png`
    img.onerror = () => {
      try {
        throw new Error('Картинка не загрузилась :(')
      } catch (error) {
        img.src = './img/error.png'
        console.log(error.message)
      }
    }

    this.card.append(img)

  }

  set open(value) {
    if (!this.success) {
      if (value) {
        this.card.classList.add('active')
        setTimeout(() => {
          this.card.children[0].classList.remove('d-none')
        }, Card.flipAnimDuration)
      } else {
        this.card.classList.remove('active')
        setTimeout(() => {
          this.card.children[0].classList.add('d-none')
        }, Card.flipAnimDuration)
      }
    }
    this.isOpen = value
  }
  get open() {
    return this.isOpen
  }



}
