import { useContext, useState } from 'react'
import axios from 'axios'

import AppContext from '../../constext/constext'
import Info from '../info/Info'
import { useCart } from '../../hooks/useCart/useCart'

import styles from './drawer.module.scss'

const Drawer = ({ onRemoveFromCart, opened }) => {
  const { setIsCartOpened } = useContext(AppContext)
  const { cartItems, setCartItems, totalPrice } = useCart()
  const [orderId, setOrderId] = useState(null)
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getCartItemsIds = (cartItems) => {
    return cartItems.map((item) => item.id)
  }

  const deleteCartItems = async (cartItems) => {
    const ids = getCartItemsIds(cartItems)
    const promises = []
    for (let id of ids) {
      const promise = axios.delete(`http://localhost:3001/cart/${id}`)
      promises.push(promise)
    }
    return await Promise.all(promises)
  }

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('http://localhost:3001/orders', {
        cartItems,
      })
      setOrderId(data.id)
      await deleteCartItems(cartItems)
      setIsOrderComplete(true)
      setCartItems([])
    } catch (error) {
      alert('Failed to create order!')
    }
    setIsLoading(false)
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={`${styles.drawer} d-flex flex-column`}>
        <h2 className="d-flex justify-between mb-30">
          Cart
          <img
            className="closeBtn cu-p"
            src="img/btn-close.svg"
            alt="Close"
            onClick={() => setIsCartOpened(false)}
          />
        </h2>

        {cartItems.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {cartItems.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} $</b>
                  </div>
                  <img
                    onClick={() => onRemoveFromCart(obj.id)}
                    className="closeBtn"
                    src="img/btn-close.svg"
                    alt="Close"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Total: </span>
                  <div></div>
                  <b>{totalPrice}$</b>
                </li>
                <li>
                  <span>Tax 5%</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5}$</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Order <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? 'Order is processed!' : 'Cart is empty'}
            description={
              isOrderComplete
                ? `Your order #${orderId} will soon be delivered by courier`
                : 'Add at least one pair of sneakers to place an order'
            }
            image={
              isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'
            }
          />
        )}
      </div>
    </div>
  )
}

export default Drawer
