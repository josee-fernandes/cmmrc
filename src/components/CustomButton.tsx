import { useSnapshot } from 'valtio'

import state from '~/store'
import { getContrastingColor } from '~/config/helpers'

interface ICustomButton {
  type: string
  title: string
  handleClick?: () => void
  customStyles: string
}

export const CustomButton: React.FC<ICustomButton> = ({
  type,
  title,
  customStyles,
  handleClick,
}) => {
  const snap = useSnapshot(state)

  const generateStyle = (type: string) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      }
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color,
      }
    }
  }

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}
