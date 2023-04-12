import { useEffect, useState } from 'react'

import Card from '../card/Card'
import Header from '../header/Header'
import Drawer from '../drawer/Drawer'

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isCartOpened, setIsCartOpened] = useState(false)

  useEffect(() => {
    fetch('https://64354abc83a30bc9ad5cc1b7.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => setItems(json))
  }, [])

  const onAddToCart = (obj) => {
    setCartItems((cartItems) => [...cartItems, obj])
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="wrapper clear">
      {isCartOpened && (
        <Drawer items={cartItems} onCloseCart={() => setIsCartOpened(false)} />
      )}
      <Header onOpenCart={() => setIsCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue
              ? `Searching by request: ${searchValue}`
              : 'All sneakers'}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue('')}
                className="clear cu-p"
                src="/img/btn-close.svg"
                alt="Clear"
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
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
