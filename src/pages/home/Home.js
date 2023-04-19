import { useContext } from 'react'

import AppContext from '../../constext/constext'
import Card from '../../components/card/Card'

const Home = ({
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  isLoading,
}) => {
  const { items, onAddToCart, onAddToFavorite } = useContext(AppContext)

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavoriteAdd={(obj) => onAddToFavorite(obj)}
        onCartAdd={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ))
  }

  return (
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
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  )
}

export default Home
