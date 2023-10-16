export class RandomColorGenerator {
  private el: HTMLElement
  private colorButton: HTMLButtonElement
  private mysteryButton: HTMLButtonElement

  constructor(el: HTMLElement) {
    this.el = el
    this.colorButton = this.getColorButton()
    this.mysteryButton = this.getMysteryButton()

    this.colorChange = this.colorChange.bind(this)
    this.init()
  }

  public throw(selector: string): never {
    throw new Error(`Element with selector ${selector} is missing`)
  }

  public getColorButton() {
    return (
      this.el.querySelector<HTMLButtonElement>('.color-button') ??
      this.throw('.color-button')
    )
  }

  public getMysteryButton() {
    return (
      this.el.querySelector<HTMLButtonElement>('.mystery-button') ??
      this.throw('.mystery-button')
    )
  }

  public getRandomColorValue(): number {
    return this.colorValue()
  }

  private colorValue(): number {
    return Math.floor(Math.random() * 256)
  }

  public colorChange(e: MouseEvent | WheelEvent): void {
    const target = e.target as HTMLElement

    const blackColor = 'rgb(0, 0, 0)'
    const whiteColor = 'rgb(255, 255, 255)'
    const [colorValue1, colorValue2, colorValue3] = Array.from(
      { length: 3 },
      this.colorValue
    )

    const randomColor = `rgb(${colorValue1}, ${colorValue2}, ${colorValue3})`

    target.style.backgroundColor = randomColor
    target.textContent = `Your color is ${randomColor}`

    const rgbSum = colorValue1 + colorValue2 + colorValue3
    target.style.color = rgbSum < 381 ? whiteColor : blackColor
  }

  private init(): void {
    this.colorButton.addEventListener('click', this.colorChange)
    this.mysteryButton.addEventListener('wheel', this.colorChange)
  }
}
