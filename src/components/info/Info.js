import { useContext } from 'react'
import AppContext from '../../constext/constext'

const Info = ({ title, image, description }) => {
  const { setIsCartOpened } = useContext(AppContext)

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setIsCartOpened(false)} className="greenButton">
        <img src="/img/arrow.svg" alt="Arrow" />
        Go back
      </button>
    </div>
  )
}

export default Info
