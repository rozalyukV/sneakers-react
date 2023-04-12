const Header = (props) => {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" alt="Logotype" />
        <div>
          <h3 className="text-uppercase">Sneakers React</h3>
          <p className="opacity-5">Best sneakers store</p>
        </div>
      </div>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={props.onOpenCart}>
          <img width={18} height={18} src="/img/cart.svg" alt="Cart" />
          <span>100$</span>
        </li>
        <li>
          <img width={18} height={18} src="/img/user.svg" alt="User" />
        </li>
      </ul>
    </header>
  )
}

export default Header
