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
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">Lorem, ipsum.</h1>
            </motion.div>
            <motion.div
              className="flex flex-col gap-5 items-center xl:items-start"
              {...headContentAnimation}
            >
              <p className="max-w-md font-normal text-base">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
                dolores aliquid dolor <strong>blanditiis labore veniam</strong>{' '}
                ea atque in commodi nisi?
              </p>

              <CustomButton
                type="filled"
                title="Customizar"
                handleClick={() => (state.intro = false)}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
