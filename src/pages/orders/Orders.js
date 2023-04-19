import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import AppContext from '../../constext/constext'
import Card from '../../components/card/Card'

const Orders = () => {
  const { onAddToFavorite, onAddToCart } = useContext(AppContext)
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/orders')
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.cartItems], []))
        setIsLoading(false)
      } catch (error) {
        alert('Error while orders requesting')
      }
    }
    fetchData()
  }, [])

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My orders</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(12)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Orders
