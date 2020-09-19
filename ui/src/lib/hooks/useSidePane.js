import { useState } from 'react'

export default function () {
  const [ isSidePaneOpen, setIsSidePaneOpen ] = useState(false)
  const [ selectedItem, setSelectedItem ] = useState({})

  const openSidePane = (item) => {
    setSelectedItem(item)
    setIsSidePaneOpen(true)
  }

  const closeSidePane = () => setIsSidePaneOpen(false)

  return [ selectedItem, isSidePaneOpen, openSidePane, closeSidePane ]
}
