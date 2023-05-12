import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  color: '#ef4444',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: '/cmmrc_logo.png',
  fullDecal: '/cmmrc_logo.png',
})

export default state
