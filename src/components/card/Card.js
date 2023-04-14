import { useState } from 'react'
import styles from './card.module.scss'

const Card = ({
  id,
  title,
  imageUrl,
  price,
  onFavoriteAdd,
  onCartAdd,
  favorited = false,
}) => {
  const [isChecked, setIsChecked] = useState(false)
  const [isFavorite, setIsFavorite] = useState(favorited)

  const toggleChecked = () => {
    onCartAdd({ title, imageUrl, price })
    setIsChecked((isChecked) => !isChecked)
  }

  const toggleFavorite = () => {
    onFavoriteAdd({ id, title, imageUrl, price })
    setIsFavorite((isFavorite) => !isFavorite)
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={toggleFavorite}>
        <img
          src={isFavorite ? 'img/liked.svg' : '/img/unliked.svg'}
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
          src={isChecked ? './img/btn-checked.svg' : './img/btn-plus.svg'}
          alt="Plus"
        />
      </div>
    </div>
  )
}

export default Card
