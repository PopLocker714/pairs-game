import { AmazingCard } from "./Card.js"
import { StartWindow } from "./StartWindow.js"
import { Timer } from "./Time.js"

export class Game {
  firstCard = undefined
  secondCard = undefined
  isAnim = false
  isFinish = false

  constructor(options) {
    this.container = options.container
    const startWindow = new StartWindow(options.container, (event) => {
      event.preventDefault()
      startWindow.hide()
      this.createGrid(startWindow.getValue())
    })
  }

  createGrid(size) {
    const game = this
    let amountCards = size * 2
    this.isFinish = false
    const timer = new Timer(60, () => {
      game.clearGrid(gridContainer)
      game.createMessage(gridContainer, 'You louse!')
      game.createResetBtn(gridContainer)
    })
    timer.start()

    const gridContainer = document.createElement('div')
    const grid = document.createElement('div')

    gridContainer.classList.add('container', 'py-5', 'd-flex', 'justify-content-center', 'align-items-center', 'flex-column')
    grid.classList.add('d-flex', 'flex-wrap', 'justify-content-between', 'col-8')
    gridContainer.style.minHeight = `${100}vh`

    gridContainer.append(timer.getComponentElement())
    gridContainer.append(grid)
    this.container.append(gridContainer)

    const cardsNumberArray = []
    for (let i = 1; i < size + 1; i++) {
      cardsNumberArray.push(i)
      cardsNumberArray.push(i)
    }

    // Тасуем
    for (let i = cardsNumberArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [cardsNumberArray[i], cardsNumberArray[j]] = [cardsNumberArray[j], cardsNumberArray[i]];
    }

    for (const cardNumber of cardsNumberArray) {
      const card = new AmazingCard(grid, cardNumber)

      card.createElement()

      card.card.addEventListener('click', function () {

        if (game.isFinish) {
          return
        }

        if (game.isAnim) {
          return
        }

        if (!game.firstCard) {
          if (!card.open && !card.success) {
            card.open = true
            game.firstCard = card
          }
        }
        if (!game.secondCard) {
          if (!card.open && !card.success) {
            card.open = true
            game.secondCard = card
          }
        }

        if (game.firstCard && game.secondCard) {

          if (game.firstCard.cardNumber === game.secondCard.cardNumber) {
            setTimeout(() => {
              game.firstCard.success = true
              game.secondCard.success = true
              game.firstCard = undefined
              game.secondCard = undefined
              amountCards -= 2
              if (amountCards === 0) {
                game.finish = true
                timer.pause()
                setTimeout(() => {
                  game.clearGrid(gridContainer)
                  game.createMessage(gridContainer, 'You won!')
                  game.createResetBtn(gridContainer)
                }, AmazingCard.animDuration + 200)
              }
            }, game.animDuration)
          } else {
            game.isAnim = true
            setTimeout(() => {
              game.firstCard.open = false
              game.secondCard.open = false
              game.firstCard = undefined
              game.secondCard = undefined
              game.isAnim = false
            }, AmazingCard.animDuration * 2 + 50)
          }
        }
      })
    }
  }


  set finish(value) {
    this.isFinish = value
  }
  get finish() {
    return this.isFinish
  }

  clearGrid(container) {
    container.innerHTML = ''
  }

  createResetBtn(container) {
    const mainConainer = this.container
    const btn = document.createElement('btn')
    btn.classList.add('btn', 'btn-outline-dark', 'px-4')
    btn.textContent = 'Restart'

    btn.addEventListener('click', () => {
      const startWindow = new StartWindow(this.container, (event) => {
        event.preventDefault()
        this.clearGrid(mainConainer)
        startWindow.hide()
        this.createGrid(startWindow.getValue())
      })
    })

    container.append(btn)
  }

  createMessage(container, titie) {
    const message = document.createElement('h2')
    message.classList.add('fs-1', 'text-white')
    message.textContent = titie
    container.append(message)
  }
}
