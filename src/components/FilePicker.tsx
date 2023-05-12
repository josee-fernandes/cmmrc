import { CustomButton } from './CustomButton'

interface IFilePicker {
  file: Blob | null
  setFile: React.Dispatch<React.SetStateAction<Blob | null>>
  readFile: (type: 'logo' | 'full') => void
}

export const FilePicker: React.FC<IFilePicker> = ({
  file,
  setFile,
  readFile,
}) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(event) => {
            if (event?.target?.files?.[0]) setFile(event.target.files[0])
          }}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Enviar imagem
        </label>
        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === null ? 'Imagem não selecionada.' : file.name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile('logo')}
          customStyles="text-xs"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile('full')}
          customStyles="text-xs"
        />
      </div>
    </div>
  )
}
