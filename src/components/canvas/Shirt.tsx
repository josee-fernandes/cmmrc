import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '~/store'

import THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

interface IShirt {}

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh
  }
  materials: {
    ['default']: THREE.MeshStandardMaterial
    lambert1: THREE.MeshLambertMaterial
  }
}

export const Shirt: React.FC<JSX.IntrinsicElements['group']> = ({}) => {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF(
    '/shirt_baked.glb'
  ) as unknown as GLTFResult

  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  )

  const stateString = JSON.stringify(snap)

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}
