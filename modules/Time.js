export class Timer {
  constructor(seconds, finishCollback) {
    if (typeof seconds !== 'number' || seconds < 1) {
      throw new TypeError('Колличество секунд должно быть числом больше 1')
    }
    this.startMinutes = Math.floor(seconds / 60)
    this.startSeconds = seconds % 60
    this.minutes = Math.floor(seconds / 60)
    this.seconds = seconds % 60
    this.isDone = false
    this.finishCollback = finishCollback
  }

  start() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  pause() {
    clearInterval(this.interval)
  }

  reset() {
    this.pause()
    this.refresh(true)
  }

  tick() {
    if (this.seconds < 1) {
      if (this.minutes !== 0) {
        --this.minutes
        this.seconds = 59
        this.refresh()
      }

      if (this.minutes === 0 && this.seconds === 0) {
        this.isDone = true
      }
      return
    }
    --this.seconds
    this.refresh()
  }

  refresh(isStart = false) {
    let stringMinutes = (isStart ? this.startMinutes: this.minutes).toString()
    let stringSeconds = (isStart ? this.startSeconds: this.seconds).toString()

    if (this.minutes < 10) {
      stringMinutes = '0' + stringMinutes
    }
    if (this.seconds < 10) {
      stringSeconds = '0' + stringSeconds
    }

    this.rootElement.textContent = `${stringMinutes}:${stringSeconds}`

  }

  getComponentElement() {
    if (this.rootElement) return this.rootElement
    const root = document.createElement('div')
    root.classList.add('fs-3', 'border', 'card', 'px-4')
    this.rootElement = root
    this.refresh()
    return root
  }

  set isDone(value) {
    this.pause()
    this._isDone = value
    if (value) this.finishCollback()
  }

  get isDone() {
    return this._isDone
  }
}
