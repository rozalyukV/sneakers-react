import { useEffect, useState } from 'react'

import Card from '../card/Card'
import Header from '../header/Header'
import Drawer from '../drawer/Drawer'

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [isCartOpened, setIsCartOpened] = useState(false)

  useEffect(() => {
    fetch('https://64354abc83a30bc9ad5cc1b7.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => setItems(json))
  }, [])

  const onAddToCart = (obj) => {
    setCartItems((cartItems) => [...cartItems, obj])
  }

  return (
    <div className="wrapper clear">
      {isCartOpened && (
        <Drawer items={cartItems} onCloseCart={() => setIsCartOpened(false)} />
      )}
      <Header onOpenCart={() => setIsCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>All sneakers</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Search..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavoriteAdd={() => console.log('Add to favorite')}
              onCartAdd={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
