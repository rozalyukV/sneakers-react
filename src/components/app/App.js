import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppContext from '../../constext/constext'
import axios from 'axios'

import Header from '../header/Header'
import Drawer from '../drawer/Drawer'
import Home from '../../pages/home/Home'
import Favorites from '../../pages/favorites/Favorites'
import Orders from '../../pages/orders/Orders'

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isCartOpened, setIsCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get('http://localhost:3001/cart'),
            axios.get('http://localhost:3001/favorites'),
            axios.get('http://localhost:3001/items'),
          ])

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Error while data requesting')
      }
    }

    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => item.id === obj.id)) {
        setCartItems((cartItems) =>
          cartItems.filter((item) => item.id !== obj.id)
        )
        await axios.delete(`http://localhost:3001/cart/${obj.id}`)
      } else {
        setCartItems((cartItems) => [...cartItems, obj])
        await axios.post('http://localhost:3001/cart', obj)
      }
    } catch {
      alert('Failed to add to cart')
    }
  }

  const onRemoveFromCart = async (id) => {
    try {
      setCartItems((cartItems) => cartItems.filter((item) => item.id !== id))
      await axios.delete(`http://localhost:3001/cart/${id}`)
    } catch {
      alert('Failed to remove from cart')
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((item) => item.id === obj.id)) {
        axios.delete(`http://localhost:3001/favorites/${obj.id}`)
        setFavorites((favorites) =>
          favorites.filter((item) => item.id !== obj.id)
        )
      } else {
        const { data } = await axios.post(
          'http://localhost:3001/favorites',
          obj
        )
        setFavorites((cartItems) => [...cartItems, data])
      }
    } catch (error) {
      alert('Failed to add to favorites')
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.id === id)
  }

  const isItemFavorite = (id) => {
    return favorites.some((obj) => obj.id === id)
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        isItemFavorite,
        onAddToFavorite,
        onAddToCart,
        setIsCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer onRemoveFromCart={onRemoveFromCart} opened={isCartOpened} />
        <Header onOpenCart={() => setIsCartOpened(true)} />
        <Routes>
          <Route
            path=""
            element={
              <Home
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                isLoading={isLoading}
              />
            }
          />
          <Route path="favorites" element={<Favorites />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
