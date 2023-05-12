import { useCallback, useEffect, useState } from 'react'

import { Rubik, Raleway, Playfair_Display, Montserrat } from 'next/font/google'
import Link from 'next/link'

import { Expo, gsap } from 'gsap'
import anime from 'animejs'

import { Customizer } from '../Customizer'
import { Content } from '../Content'
import { Main3D } from '../Main3D'

// Castoro Titling -> times
// Nosifer -> blood
// Abril_Fatface

// If loading a variable font, you don't need to specify the font weight
const rubik_400 = Rubik({
  subsets: ['latin'],
  weight: '900',
})
// const poppins_900 = Poppins({
//   weight: '900',
//   subsets: ['latin'],
// })
const raleway_900 = Raleway({
  subsets: ['latin'],
  display: 'swap',
  weight: '900',
})
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
})
const playfairDisplayItalic = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  style: 'italic',
})
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

interface IHomeTemplate {}

const textLines = new Array<string>(11).fill('')

const HomeTemplate: React.FC<IHomeTemplate> = () => {
  const [accessed, setAccessed] = useState(false)
  const [menusReady, setMenusReady] = useState(false)

  const handleEnter = useCallback(() => {
    gsap.to('.btn', {
      duration: 1,
      opacity: 0,
      y: -40,
      ease: Expo.easeInOut,
    })

    gsap.to('.text-wrapper > div', {
      duration: 1,
      xPercent: 10,
      ease: Expo.easeInOut,
      delay: 1,
      stagger: 0.1,
    })

    gsap.to('.text-wrapper', {
      duration: 3,
      y: -600,
      scale: 4.5,
      rotate: -90,
      ease: Expo.easeInOut,
      delay: 1.5,
    })

    gsap.to('.text', {
      duration: 1,
      opacity: 1,
      ease: Expo.easeInOut,
      delay: 3,
    })

    gsap.to('.text-wrapper > div', {
      duration: 4,
      x: -7000,
      ease: Expo.easeInOut,
      delay: 3.5,
      stagger: 0.05,
    })

    gsap.to('.text-container', {
      duration: 2,
      bottom: '-100%',
      ease: Expo.easeInOut,
      delay: 6,
    })

    let textWrapper = document.querySelector('.header')
    if (textWrapper?.innerHTML) {
      textWrapper.innerHTML =
        textWrapper?.textContent?.replace(
          /\S/g,
          '<span class="letter">$&</span>'
        ) ?? textWrapper.innerHTML
    }

    gsap.to('.main', {
      zIndex: 0,
      delay: 7,
    })

    anime.timeline().add({
      targets: '.header .letter',
      opacity: [0, 1],
      translateY: [200, 0],
      translateZ: 0,
      easing: 'easeOutExpo',
      duration: 2000,
      delay: (element, index) => 7000 + 40 * index,
    })

    gsap.to('.header', {
      duration: 2,
      xPercent: 0,
      top: 0,
      left: 0,
      fontSize: '2vw',
      ease: Expo.easeInOut,
      delay: 8,
      clear: 'fontSize',
      onComplete: () => {
        gsap.set('.text-wrapper > div', {
          clearProps: 'fontSize',
        })
      },
    })
    gsap.to('.header', {
      duration: 1,
      position: 'relative',
      delay: 9,
    })
    gsap
      .to('.navbar', {
        duration: 1,
        justifyContent: 'space-between',
        delay: 9,
      })
      .then(() => setAccessed(true))
  }, [setAccessed])

  const handleMenus = useCallback(() => {
    let elements = document.querySelectorAll('.rolling-text')

    for (const element of elements ?? []) {
      let innerText = (element as HTMLElement)?.innerText

      if (innerText.includes('\n')) return

      console.log({ element, innerText })
      element.innerHTML = ''

      let textContainer = document.createElement('div')
      textContainer.classList.add('block')

      for (let letter of innerText) {
        let span = document.createElement('span')
        span.innerText = letter.trim() === '' ? '\xa0' : letter
        span.classList.add('menu-letter')

        textContainer.appendChild(span)
      }

      element.appendChild(textContainer)
      element.appendChild(textContainer.cloneNode(true))
    }

    for (const element of elements) {
      element.addEventListener('mouseover', () => {
        element.classList.remove('play')
      })
    }

    setMenusReady(true)
  }, [setMenusReady])

  useEffect(() => {
    if (!menusReady) handleMenus()
  }, [menusReady, handleMenus])

  return (
    <div>
      {!accessed && (
        <>
          <button
            className={`btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] bg-none border-none outline-none ${rubik_400.className} font-light underline uppercase text-[2em] cursor-pointer`}
            onClick={handleEnter}
          >
            Enter
          </button>
          <div className="text-container fixed w-full h-screen bg-orange-600 -z-[1]"></div>
          <div className="text-wrapper fixed w-full h-screen -left-1/2 flex flex-col justify-between cursor-default">
            {textLines?.map((_, index) => (
              <div
                key={`line-${index}`}
                className={`text w-[300%] ${rubik_400.className} text-[5vw] uppercase opacity-[0.1] whitespace-nowrap`}
              >
                It is nice to be cool, but it&apos;s more cool to be nice It is
                nice to be cool, but it&apos;s more cool to be nice
              </div>
            ))}
          </div>
        </>
      )}
      <div className="main relative w-full min-h-screen bg-zinc-900 text-white -z-[2]">
        <nav className="navbar fixed w-full h-24 flex justify-end items-center px-4 z-[1]">
          <div
            className={`header absolute top-[40vh] left-1/2 -translate-x-1/2 flex ${raleway_900.className} !sm:text-base text-[8vw]`}
          >
            CMMRC
          </div>
          <div className="justify-self-end flex">
            <ul className="flex items-center gap-4">
              <li>
                <Link
                  href="/"
                  className={`rolling-text inline-block ${montserrat.className} overflow-hidden text-white`}
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`rolling-text inline-block ${montserrat.className} overflow-hidden text-white`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {accessed && <Main3D />}
      </div>
    </div>
  )
}

export default HomeTemplate
