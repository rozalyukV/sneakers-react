import Card from '../card/Card'
import Header from '../header/Header'
import Drawer from '../drawer/Drawer'

const arr = [
  {
    title: "Men's Sneakers Nike Blazer Mid Suede",
    price: 200,
    imageUrl: '/img/sneakers/1.jpg',
  },
  {
    title: "Men's Sneakers Nike Air Max 270",
    price: 250,
    imageUrl: '/img/sneakers/2.jpg',
  },
  {
    title: "Men's Sneakers Nike Blazer Mid Suede",
    price: 180,
    imageUrl: '/img/sneakers/3.jpg',
  },
  {
    title: 'Sneakers Puma X Aka Boku Future Rider',
    price: 300,
    imageUrl: '/img/sneakers/4.jpg',
  },
]

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>All sneakers</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Search..." />
          </div>
        </div>
        <div className="d-flex">
          {arr.map((obj) => (
            <Card title={obj.title} price={obj.price} imageUrl={obj.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
