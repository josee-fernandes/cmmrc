import React, { useState, useEffect } from 'react'

import config from '~/config/config'

import { motion, AnimatePresence } from 'framer-motion'
import state from '~/store'

import { useSnapshot } from 'valtio'

import { download } from '~/assets'
import { downloadCanvasToImage, reader } from '~/config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '~/config/constants'
import { fadeAnimation, slideAnimation } from '~/config/motion'

import { AIPicker } from './AIPicker'
import { ColorPicker } from './ColorPicker'
import { CustomButton } from './CustomButton'
import { FilePicker } from './FilePicker'
import { Tab } from './Tab'
import { CanvasModel } from './canvas'

export const Customizer: React.FC = () => {
  const snap = useSnapshot(state)

  const [file, setFile] = useState<Blob | null>(null)

  const [prompt, setPrompt] = useState('')
  const [generatingImage, setGeneratingImage] = useState(false)

  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  const handleSubmit = async (type: any) => {
    if (!prompt) return alert('Please enter a prompt')

    try {
      // call backend to generate ai image
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImage(false)
      setActiveEditorTab('')
    }
  }

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case 'aipicker':
        return (
          <AIPicker
            prompt={prompt}
            generatingImage={generatingImage}
            handleSubmit={handleSubmit}
          />
        )
      default:
        return <></>
    }
  }

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        break
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName]
        break
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
    }

    // after setting the state, activeFilterTab is updated
    setActiveFilterTab((oldActiveFilterTab) => {
      return {
        ...oldActiveFilterTab,
        [tabName as 'logoShirt' | 'stylishShirt']:
          !oldActiveFilterTab[tabName as 'logoShirt' | 'stylishShirt'],
      }
    })
  }

  const handleDecals = (type: 'logo' | 'full', result: unknown) => {
    const decalType = DecalTypes[type]

    // @ts-ignore
    state[decalType.stateProperty] = result

    if (!activeFilterTab[decalType.filterTab as 'logoShirt' | 'stylishShirt']) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const readFile = (type: 'logo' | 'full') => {
    if (file)
      reader(file).then((result) => {
        handleDecals(type, result)
        setActiveEditorTab('')
      })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go back"
              handleCLick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={
                  activeFilterTab[tab.name as 'logoShirt' | 'stylishShirt']
                }
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
