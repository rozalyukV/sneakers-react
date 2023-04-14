import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Header from '../header/Header'
import Drawer from '../drawer/Drawer'
import Home from '../../pages/home/Home'
import Favorites from '../../pages/favorites/Favorites'

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isCartOpened, setIsCartOpened] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/items').then((res) => {
      setItems(res.data)
    })
    axios.get('http://localhost:3001/cart').then((res) => {
      setCartItems(res.data)
    })
    axios.get('http://localhost:3001/favorites').then((res) => {
      setFavorites(res.data)
    })
  }, [])

  const onAddToCart = (obj) => {
    axios.post('http://localhost:3001/cart', obj)
    setCartItems((cartItems) => [...cartItems, obj])
  }

  const onRemoveFromCart = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`)
    setCartItems((cartItems) => cartItems.filter((item) => item.id !== id))
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((item) => item.id === obj.id)) {
        axios.delete(`http://localhost:3001/favorites/${obj.id}`)
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

  return (
    <div className="wrapper clear">
      {isCartOpened && (
        <Drawer
          items={cartItems}
          onCloseCart={() => setIsCartOpened(false)}
          onRemoveFromCart={onRemoveFromCart}
        />
      )}
      <Header onOpenCart={() => setIsCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  )
}

export default App
