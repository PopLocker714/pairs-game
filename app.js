(() => {

  let COUNT_FINISH_CARDS = 0
  let COUNT_CLICK = 0
  let TARGET_CARD_1
  let TARGET_CARD_2
  let time

  const buttonStart = document.querySelector('#button-start')
  const input = document.querySelector('.form-control')
  const cardContainer = document.querySelector('.card_container')
  const btnReset = document.querySelector('.btn_again')
  const timeEl = document.querySelector('.badge')

  // Кнопка старт
  buttonStart.addEventListener('click', () => {
    const inputVelue = validSizeGrid(+input.value)
    startGame((inputVelue / 2)**2 *2)
    createGridBoard(inputVelue, document.querySelectorAll('.card_item'))
    setInterval(decreaseTime, 1000)
    timeEl.classList.add('active')
    document.querySelector('.ask_param_game').classList.remove('active')
  })
  // Кнопка рестарт
  btnReset.addEventListener('click', function() {
    COUNT_FINISH_CARDS = 0
    const sizeGrid = +document.querySelector('.card_item').dataset.cards/2
    document.querySelectorAll('.card_item').forEach(el => {
      el.remove()
    })
    startGame(sizeGrid)
    createGridBoard(Math.sqrt(sizeGrid * 2), document.querySelectorAll('.card_item'))
    btnReset.classList.remove('active')
  })

  function startGame(sizeGrid) {
    const arrPair = getArrPairsCard(sizeGrid)
    shuffle(arrPair)
    pushCard(cardContainer, arrPair)
    time = 60
    timeEl.innerHTML = '01:00'
  }

  function createGridBoard(size, cards) {
    const width = 650
    const height = 800
    const fs = 70
    if (size == 2) {
      cardContainer.style.width = `${width / size}px`
      cardContainer.style.height = `${height / size}px`

      cards.forEach(el => {
        el.style.width = `${width / size / size - 20/size}px`
        el.style.height = `${height / size / size - 20/size}px`
        el.style.fontSize = `${fs}px`
      })
    } else if (size == 4) {
      cardContainer.style.width = `${width}px`
      cardContainer.style.height = `${height}px`

      cards.forEach(el => {
        el.style.width = `${width / size - 20/size}px`
        el.style.height = `${height / size - 20/size}px`
        el.style.fontSize = `${fs - (size * 3)}px`
      })
    } else if (size == 6) {
      cardContainer.style.width = `${width}px`
      cardContainer.style.height = `${height}px`

      cards.forEach(el => {
        el.style.width = `${width / size - 20/size}px`
        el.style.height = `${height / size - 20/size}px`
        el.style.fontSize = `${fs - (size * 3)}px`
      })
    } else if (size == 8) {
      cardContainer.style.width = `${width}px`
      cardContainer.style.height = `${height}px`

      cards.forEach(el => {
        el.style.width = `${width / size - 20/size}px`
        el.style.height = `${height / size - 20/size}px`
        el.style.fontSize = `${fs - (size * 3)}px`
      })
    } else if (size == 10) {
      cardContainer.style.width = `${width}px`
      cardContainer.style.height = `${height}px`

      cards.forEach(el => {
        el.style.width = `${width / size - 20/size}px`
        el.style.height = `${height / size - 20/size}px`
        el.style.fontSize = `${fs - (size * 3)}px`
      })
    }
  }

  function getCardClick() {
    if (checkFinishGame(+this.dataset.cards, COUNT_FINISH_CARDS)) {} else {
      if (this.dataset.finish === 'true') {} else {
        switch (COUNT_CLICK) {
          case 0:  // клик 1
            if (this.classList[1] === 'active') {} else {
              COUNT_CLICK++
              TARGET_CARD_1 = this
              addClassActive(this)
            }
            break

          case 1: // клик 2
          if (this.classList[1] === 'active') {} else {
            COUNT_CLICK = 0
            TARGET_CARD_2 = this
            addClassActive(this)

            switch (+TARGET_CARD_1.dataset.count) {
              case +TARGET_CARD_2.dataset.count:
                TARGET_CARD_1.dataset.finish = 'true'
                TARGET_CARD_2.dataset.finish = 'true'
                COUNT_FINISH_CARDS += 2
                if (checkFinishGame(+this.dataset.cards, COUNT_FINISH_CARDS)) {
                  btnReset.classList.add('active')
                }
                break;

              default:
                TARGET_CARD_2.classList.add('active')
                animCloseCard(TARGET_CARD_1, TARGET_CARD_2, 300, 150)
                break;
            }
          }
            break

          default:

            break;
        }
      }
    }
  }
  function decreaseTime() {
    if (btnReset.classList.contains(btnReset.classList[3])) {
      if (time < 10) {
        let curent = `0${time}`
        setTime(curent)
      }
      else setTime(time)
    } else {
      if (time === 0) {
        document.querySelectorAll('.card_item').forEach(el => {
          el.dataset.finish = 'true'
        })
        btnReset.classList.add('active')
      } else {
        --time
        if (time < 10) {
          let curent = time
          curent = `0${curent}`
          setTime(curent)
        } else setTime(time)
      }
    }
  }

  function setTime(value) {
    timeEl.innerHTML = `00:${value}`
  }

  function animCloseCard(targer1, targer2, ms1, ms2) {
    setTimeout(() => {
      targer1.classList.remove('active')
      targer2.classList.remove('active')
      setTimeout(() => {
        targer1.textContent = ''
        targer2.textContent = ''
      }, ms2)
    }, ms1)
  }

  function addClassActive(item) {
    item.classList.add('active')
    setTimeout(() => {
      item.textContent = item.dataset.count
    }, 150)
  }

  function pushCard(where, arrCount) {
    for (let i = 0; i < arrCount.length; i++) {
      const card = createCard(arrCount[i], arrCount.length)
      card.addEventListener('click', getCardClick)
      where.append( card )
    }
  }

  function createCard(valueCard, arrCount) {
    let div = document.createElement('div')
    div.dataset.count = valueCard
    div.dataset.cards = arrCount
    div.dataset.finish = 'false'
    div.classList.add('card_item')
    return div
  }

  function checkFinishGame(correctCountCards, targerCountCards) {
    return correctCountCards === targerCountCards ? true : false
  }

  // Тасование Фишера — Йетса
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function getArrPairsCard(count) {
    let boxCards = []
    for (let i = 1; i < count + 1; i++) {
      boxCards.push(i)
      boxCards.push(i)
    }
    return boxCards
  }

  function validSizeGrid(input, defoalt = 4) {
    if (input === 0) {}
    else if(input > 10) {}
    else if (input < 0) {}
    else if (input % 2 === 0) {defoalt = input}
    return defoalt
  }

})()