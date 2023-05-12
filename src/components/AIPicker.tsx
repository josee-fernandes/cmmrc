import { SetStateAction } from 'react'
import { CustomButton } from './CustomButton'

interface IAIPicker {
  prompt: string
  setPrompt: React.Dispatch<SetStateAction<string>>
  generatingImage: boolean
  handleSubmit: (type: 'logo' | 'full') => Promise<void>
}

export const AIPicker: React.FC<IAIPicker> = ({
  prompt,
  setPrompt,
  generatingImage,
  handleSubmit,
}) => {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        {generatingImage ? (
          <CustomButton
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit('logo')}
              customStyles="text-xs"
            />
            <CustomButton
              type="outline"
              title="AI Full"
              handleClick={() => handleSubmit('full')}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  )
}
