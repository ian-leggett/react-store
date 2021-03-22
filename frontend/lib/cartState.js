import { createContext, useContext, useState } from 'react'

const LocalStateContext = createContext()
const LocaStateProvider = LocalStateContext.Provider

const CartStateProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false)

  const toggleCart = () => {
    setCartOpen(!cartOpen)
  }

  const openCart = () => {
    setCartOpen(true)
  }

  const closeCart = () => {
    setCartOpen(false)
  }

  return (
    <LocaStateProvider
      value={{ cartOpen, setCartOpen, openCart, closeCart, toggleCart }}
    >
      {children}
    </LocaStateProvider>
  )
}

const useCart = () => {
  const all = useContext(LocalStateContext)
  return all
}

export { CartStateProvider, useCart }
