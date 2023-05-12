import React, { useCallback, useEffect, useState } from 'react'

import { Rubik, Raleway, Montserrat } from 'next/font/google'
import Link from 'next/link'

import { Expo, gsap } from 'gsap'
import anime from 'animejs'

import { useSnapshot } from 'valtio'
import state from '~/store'

import { Main3D } from '../Main3D'

const rubik_400 = Rubik({
  subsets: ['latin'],
  weight: '900',
})
const raleway_900 = Raleway({
  subsets: ['latin'],
  display: 'swap',
  weight: '900',
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
  const [screenView, setScreenView] = useState('desktop')

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleEnter = useCallback(() => {
    gsap.to('.btn', {
      duration: 1,
      opacity: 0,
      y: -40,
      ease: Expo.easeInOut,
    })
    gsap.to('.btn', {
      duration: 1,
      display: 'none',
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
      yPercent: -50,
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
      xPercent: -200,
      ease: Expo.easeInOut,
      delay: 3.5,
      stagger: 0.1,
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
    gsap.to('.nav-menus', {
      duration: 3,
      top: 0,
      opacity: 1,
      ease: Expo.easeInOut,
      delay: 9,
      stagger: 0.1,
    })
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

      const clone = textContainer.cloneNode(true)

      textContainer.classList.add('!text-black')

      element.appendChild(textContainer)
      element.appendChild(clone)
    }

    for (const element of elements) {
      element.addEventListener('mouseover', () => {
        element.classList.remove('play')
      })
    }

    setMenusReady(true)
  }, [setMenusReady])

  const handleScreenWidth = useCallback(() => {
    setScreenView((oldScreenView) => {
      const newScreenView =
        window.innerWidth <= 600
          ? 'mobile'
          : window.innerWidth <= 1260
          ? 'tablet'
          : 'desktop'

      return oldScreenView !== newScreenView ? newScreenView : oldScreenView
    })
  }, [setScreenView])

  const handleToggleMenu = () => {
    console.log('toggle', isMenuOpen ? '-100%' : '-50%')

    gsap.to('.mobile-menu', {
      duration: 1,
      right: isMenuOpen ? '-100%' : '-50%',
      ease: Expo.easeInOut,
    })
    setIsMenuOpen((oldIsMenuOpen) => !oldIsMenuOpen)
  }

  useEffect(() => {
    setMenusReady(false)

    console.log('screenView', screenView)
  }, [screenView, setMenusReady])

  useEffect(() => {
    if (!menusReady) handleMenus()
  }, [menusReady, handleMenus])

  useEffect(() => {
    window.addEventListener('resize', handleScreenWidth)

    return () => window.removeEventListener('resize', handleScreenWidth)
  }, [handleScreenWidth])

  return (
    <div>
      {!accessed && (
        <>
          <button
            className={`btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] bg-none border-none outline-none ${rubik_400.className} font-light underline uppercase text-[2em] cursor-pointer`}
            onClick={handleEnter}
          >
            Entrar
          </button>
          <div
            className="text-container fixed w-full h-screen -z-[1]"
            style={{ backgroundColor: state.color }}
          ></div>
          <div className="text-wrapper fixed w-full h-screen -left-1/2 flex flex-col justify-between cursor-default">
            {textLines?.map((_, index) => (
              <div
                key={`line-${index}`}
                className={`text w-[300%] ${rubik_400.className} text-[10vw] xl:text-[5vw] leading-[10vw] xl:leading-[5vw] h-[10vw] xl:h-[5vw] uppercase opacity-[0.1] whitespace-nowrap`}
              >
                {/* It is nice to be cool, but it&apos;s more cool to be nice It is
                nice to be cool, but it&apos;s more cool to be nice */}
                CMMRC CMMRC CMMRC CMMRC CMMRC CMMRC CMMRC CMMRC CMMRC CMMRC
              </div>
            ))}
          </div>
        </>
      )}
      <div className="main relative w-full min-h-screen bg-zinc-50 text-black -z-[2]">
        <nav className="navbar fixed w-full h-24 flex justify-end items-center px-4 z-[1]">
          <div
            className={`header absolute top-[40vh] left-1/2 -translate-x-1/2 flex ${raleway_900.className} !sm:text-base text-[8vw]`}
            style={
              screenView === 'mobile'
                ? { fontSize: '1.5rem' }
                : screenView === 'tablet'
                ? { fontSize: '4vw' }
                : { fontSize: '2vw' }
            }
          >
            CMMRC.
          </div>
          <div className="justify-self-end flex">
            <ul
              className="relative flex items-center gap-4 overflow-hidden"
              style={
                screenView === 'mobile'
                  ? { fontSize: '1.5rem' }
                  : screenView === 'tablet'
                  ? { fontSize: '3.5vw' }
                  : { fontSize: '2vw' }
              }
            >
              <li
                className="nav-menus top-[10vh] opacity-0 relative"
                // style={{ display: screenView === 'mobile' ? 'none' : 'block' }}
              >
                <Link
                  href="https://github.com/josee-fernandes/cmmrc"
                  target="_blank"
                  rel="noopener,noreferrer"
                  className={`rolling-text inline-block ${montserrat.className} overflow-hidden`}
                  style={{
                    color: state.color,
                  }}
                >
                  GitHub
                </Link>
              </li>
              <li
                className="nav-menus top-[10vh] opacity-0 relative"
                // style={{ display: screenView === 'mobile' ? 'none' : 'block' }}
              >
                <Link
                  href="#contact"
                  className={`rolling-text inline-block ${montserrat.className} overflow-hidden`}
                  style={{ color: state.color }}
                >
                  Contato
                </Link>
              </li>
              {/* <li className="nav-menus top-[10vh] opacity-0 relative">
                <div
                  className={`${montserrat.className} overflow-hidden cursor-pointer`}
                  onClick={handleToggleMenu}
                >
                  <div className="rounded-full shadow-md w-6 h-6 md:w-[2vw] md:h-[2vw] bg-black flex justify-center items-center gap-1">
                    <div
                      className="rounded-full w-1.5 h-1.5 md:w-[0.4vw] md:h-[0.4vw]"
                      style={{ backgroundColor: state.color }}
                    ></div>
                    <div
                      className="rounded-full w-1.5 h-1.5 md:w-[0.4vw] md:h-[0.4vw]"
                      style={{ backgroundColor: state.color }}
                    ></div>
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </nav>

        {accessed && <Main3D />}
      </div>
    </div>
  )
}

export default HomeTemplate
