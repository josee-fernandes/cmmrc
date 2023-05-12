import React, { useRef } from 'react'

import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import THREE from 'three'

import state from '~/store'

import { GroupProps } from 'node_modules/@react-three/fiber/dist/declarations/src/three-types'

interface ICameraRig {
  children?: React.ReactNode
}

export const CameraRig: React.FC<
  JSX.IntrinsicElements['group'] & ICameraRig
> = ({ children }) => {
  const snap = useSnapshot(state)
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const isBreakPoint = window.innerWidth <= 1260
    const isMobile = window.innerWidth <= 600

    // set the initial position of the model
    let targetPosition: [x: number, y: number, z: number] = [-0.4, 0, 2]

    if (snap.intro) {
      if (isBreakPoint) targetPosition = [0, 0, 3]
      if (isMobile) targetPosition = [0, 0, 2.5]
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2]
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // set the model rotation smoothly
    if (group?.current) {
      easing.dampE(
        group?.current?.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        delta
      )
    }
  })

  return <group ref={group}>{children}</group>
}
