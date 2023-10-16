import { RandomColorGenerator } from './RandomColorGenerator'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

const getNumberRange = (start: number, end: number): number[] => {
  const numbersArray: number[] = []

  for (let i = start; i <= end; i++) {
    numbersArray.push(i)
  }
  return numbersArray
}

describe('RandomColorGenerator', () => {
  let colorGenerator: RandomColorGenerator

  beforeEach(() => {
    const mockElement = document.createElement('div')
    mockElement.innerHTML = `
      <button class="color-button">Pick a Color</button>
      <button class="mystery-button">Mystery Color</button>
    `

    document.body.appendChild(mockElement)
    colorGenerator = new RandomColorGenerator(mockElement)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('throw', () => {
    it('should throw an error for an invalid selector', () => {
      const invalidSelector = '.noElement'
      expect(() => colorGenerator.throw(invalidSelector)).toThrowError(
        `Element with selector ${invalidSelector} is missing`
      )
    })
  })

  describe('color generation', () => {
    const dispatchEventAndExpect = (
      button: HTMLButtonElement,
      eventType: string
    ) => {
      const spy = vi.fn()
      button.addEventListener(eventType, spy)
      button.dispatchEvent(new Event(eventType))
      expect(spy).toHaveBeenCalledOnce()
    }

    it('should generate a random color on color button click', () => {
      const colorButton = colorGenerator.getColorButton()
      dispatchEventAndExpect(colorButton, 'click')
    })

    it('should generate a random color on mystery button wheel event', () => {
      const mysteryButton = colorGenerator.getMysteryButton()
      dispatchEventAndExpect(mysteryButton, 'wheel')
    })
  })

  describe('colorChange', () => {
    it('should change the button color and text content', () => {
      const colorButton = colorGenerator.getColorButton()
      const initialColor = colorButton.style.backgroundColor
      colorButton.dispatchEvent(new MouseEvent('click'))
      expect(colorButton.style.backgroundColor).not.toBe(initialColor)
      expect(colorButton.textContent).toContain('Your color is')
    })

    it('should update text color based on background color', () => {
      const getRGBSum = (rgbValue: string): number => {
        // Get number values from rgb(0, 120, 120)-string
        const [r, g, b] = rgbValue.match(/\d+/g)!.map(Number)
        return r + g + b
      }

      const colorButton = colorGenerator.getColorButton()
      const blackColor = 'rgb(0, 0, 0)'
      const whiteColor = 'rgb(255, 255, 255)'

      colorButton.dispatchEvent(new MouseEvent('click'))

      // Get the computed styles after the color change
      const computedStyles = window.getComputedStyle(colorButton)

      const rgbSum = getRGBSum(computedStyles.backgroundColor)

      // Check if the text color matches the expected color based on the background color
      if (rgbSum < 381) {
        expect(computedStyles.color).toBe(whiteColor)
      } else {
        expect(computedStyles.color).toBe(blackColor)
      }
    })
  })

  describe('randomColorValue', () => {
    it('should return a number between 0 and 255', () => {
      const numberRange = getNumberRange(0, 255)
      const randomNumber = colorGenerator.getRandomColorValue()
      expect(numberRange.includes(randomNumber)).toBe(true)
    })

    it('should return 0 when colorValue returns 0', () => {
      vi.spyOn(colorGenerator as any, 'colorValue').mockReturnValueOnce(0)
      expect(colorGenerator.getRandomColorValue()).toBe(0)
    })

    it('should return 255 when colorValue returns 255', () => {
      vi.spyOn(colorGenerator as any, 'colorValue').mockReturnValueOnce(255)
      expect(colorGenerator.getRandomColorValue()).toBe(255)
    })
  })
})
