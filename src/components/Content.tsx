import Image from 'next/image'

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '~/config/motion'

import { motion, AnimatePresence } from 'framer-motion'
import state from '~/store'

import { useSnapshot } from 'valtio'

import { CustomButton } from './CustomButton'

import threeJSLogo from 'public/threejs.png'

export const Content: React.FC = () => {
  const snap = useSnapshot(state)

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation('down')}>
            <Image
              src={threeJSLogo}
              alt="ThreeJS"
              className="w-8 h-8 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headTextAnimation}>
            <h1 className="head-text">
              LET&apos;S <br className="hidden xl:block" /> DO IT.
            </h1>
          </motion.div>
          <motion.div className="flex flex-col gap-5" {...headContentAnimation}>
            <p className="max-w-md font-normal text-base">
              Create your unique and exclusive shirt with our brand-new 3D
              customization tool. <strong>Unleash your imagination</strong> and
              define your own style.
            </p>

            <CustomButton
              type="filled"
              title="Customize It"
              handleClick={() => (state.intro = false)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
