import { RandomColorGenerator } from './RandomColorGenerator'

const bootstrapper = (): void => {
  new RandomColorGenerator(
    document.querySelector('.random-color-generator') as HTMLElement
  )
}
window.addEventListener('load', bootstrapper)
