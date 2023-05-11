import { useCallback, useState } from 'react'

import { Rubik, Poppins, Raleway } from 'next/font/google'

import { Expo, gsap } from 'gsap'
import anime from 'animejs'

// Castoro Titling -> times
// Nosifer -> blood
// Abril_Fatface

// If loading a variable font, you don't need to specify the font weight
const rubik_400 = Rubik({
  subsets: ['latin'],
  weight: '900',
})
const poppins_900 = Poppins({
  weight: '900',
  subsets: ['latin'],
})
const raleway_900 = Raleway({
  subsets: ['latin'],
  display: 'swap',
  weight: '900',
})

interface IHomeTemplate {}

const textLines = new Array<string>(11).fill('')

const HomeTemplate: React.FC<IHomeTemplate> = () => {
  const [accessed, setAccessed] = useState(false)

  const handleEnter = useCallback(() => {
    gsap.to('.btn', {
      duration: 1,
      opacity: 0,
      y: -40,
      ease: Expo.easeInOut,
    })

    gsap.to('.text-wrapper > div', {
      duration: 1,
      x: 500,
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

    gsap
      .to('.text-container', {
        duration: 2,
        bottom: '-100%',
        ease: Expo.easeInOut,
        delay: 6,
      })
      .then(() => setAccessed(true))

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
      // scale: 0.47,
      // transformOrigin: 'top left',
      fontSize: '2vw',
      ease: Expo.easeInOut,
      delay: 8,
    })
    gsap.to('.header', {
      duration: 1,
      position: 'relative',
      delay: 9,
    })
  }, [setAccessed])

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
        <nav className="relative w-full h-24 flex justify-between items-center px-4">
          <div
            className={`header absolute top-[40vh] left-1/2 -translate-x-1/2 flex ${raleway_900.className} text-[8vw]`}
          >
            CMMRC
          </div>
          <div>
            <ul className="flex items-center gap-4">
              <li>Menu</li>
              <li>Menu</li>
              <li>Menu</li>
            </ul>
          </div>
        </nav>

        {accessed && (
          <>
            <div className="h-screen">conteúdo</div>
          </>
        )}
      </div>
      {/* <div
        className={`header relative w-full min-h-screen bg-zinc-900 text-white flex justify-center items-center -z-[2] ${raleway_900.className} text-[8em]`}
      >
        CMMRC
      </div> */}
    </div>
  )
}

export default HomeTemplate
