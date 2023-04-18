import { useContext } from 'react'

import Card from '../../components/card/Card'
import AppContext from '../../constext/constext'

const Favorites = () => {
  const { favorites, onAddToFavorite } = useContext(AppContext)

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My bookmarks</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites.map((item) => (
          <Card
            key={item.id}
            favorited={true}
            onFavoriteAdd={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites
