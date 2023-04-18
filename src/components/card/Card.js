import { useState, useContext } from 'react'
import ContentLoader from 'react-content-loader'

import AppContext from '../../constext/constext'

import styles from './card.module.scss'

const Card = ({
  id,
  title,
  imageUrl,
  price,
  onFavoriteAdd,
  onCartAdd,
  loading = false,
}) => {
  const { isItemAdded, isItemFavorite } = useContext(AppContext)

  const toggleChecked = () => {
    onCartAdd({ id, title, imageUrl, price })
  }

  const toggleFavorite = () => {
    onFavoriteAdd({ id, title, imageUrl, price })
  }

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={224}
          viewBox="0 0 150 224"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="240" y="369" rx="0" ry="0" width="1" height="0" />
          <rect x="223" y="390" rx="0" ry="0" width="3" height="3" />
          <rect x="0" y="-1" rx="0" ry="0" width="150" height="110" />
          <rect x="0" y="130" rx="5" ry="5" width="150" height="15" />
          <rect x="118" y="178" rx="10" ry="10" width="32" height="32" />
          <rect x="0" y="150" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="189" rx="5" ry="5" width="80" height="20" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={toggleFavorite}>
            <img
              src={isItemFavorite(id) ? 'img/liked.svg' : '/img/unliked.svg'}
              alt="Unliked"
            />
          </div>
          <img width={133} height={112} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Price:</span>
              <b>{price} $</b>
            </div>
            <img
              className={styles.plus}
              onClick={toggleChecked}
              src={
                isItemAdded(id) ? './img/btn-checked.svg' : './img/btn-plus.svg'
              }
              alt="Plus"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Card
