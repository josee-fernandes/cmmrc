import { Content } from './Content'
import { Customizer } from './Customizer'
import { CanvasModel } from './canvas'

interface IMain3D {}

export const Main3D: React.FC<IMain3D> = ({}) => {
  return (
    // <div className="container relative m-[0_auto] border-2 border-red-500 min-h-screen">
    <div className="app transition-all ease-in">
      <Content />
      <CanvasModel />
      <Customizer />
    </div>
  )
}
