import { useState } from 'react'

export default function () {
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ selectedItem, setSelectedItem ] = useState({})

  const openModal = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  return [ selectedItem, isModalOpen, openModal, closeModal ]
}
