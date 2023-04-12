const Drawer = ({ onCloseCart, items = [] }) => {
  return (
    <div className="overlay">
      <div className="drawer d-flex flex-column">
        <h2 className="d-flex justify-between mb-30">
          Cart
          <img
            className="closeBtn cu-p"
            src="/img/btn-close.svg"
            alt="Close"
            onClick={onCloseCart}
          />
        </h2>
        <div className="items flex">
          {items.map((obj) => (
            <div className="cartItem d-flex align-center mb-20">
              <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className="cartItemImg"
              ></div>
              <div className="mr-20 flex">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price} $</b>
              </div>
              <img className="closeBtn" src="/img/btn-close.svg" alt="Close" />
            </div>
          ))}
        </div>

        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Total: </span>
              <div></div>
              <b>1350$</b>
            </li>
            <li>
              <span>Tax 5%</span>
              <div></div>
              <b>67.50$</b>
            </li>
          </ul>
          <button className="greenButton">
            Order <img src="/img/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Drawer
