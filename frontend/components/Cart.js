import styled from 'styled-components'
import { Typography } from '@material-ui/core'

import formatMoney from '../lib/formatMoney'
import calcTotalPrice from '../lib/calcTotalPrice'
import { useUser } from './User'
import { useCart } from '../lib/cartState'
import RemoveFromCart from './RemoveFromCart'
import { Checkout } from './Checkout'

const CartStyles = styled.div`
  padding: 20px;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  color: #000;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${(props) => props.open && `transform: translateX(0);`};
  header {
    margin-bottom: 2rem;
  }
  footer {
    border-top: 10px double var(--black);
    margin-top: 2rem;
    padding-top: 2rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }
`

const CartItemStyles = styled('li')`
  padding: 1rem 0;
  border-bottom: 1px solid lightgray;
  display: flex;
  img {
    width: 100px;
    margin-right: 1rem;
  }
`

const Total = styled('p')`
  font-size: 24px;
  font-weight: bold;
`

const CartItem = ({ cartItem }) => {
  const { product } = cartItem
  if (!product) return null
  return (
    <CartItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />

      <div>
        <Typography variant="h5" component="h3">
          {product.name}
        </Typography>
        <p>
          {formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  )
}

const Cart = () => {
  const me = useUser()
  const { cartOpen, closeCart } = useCart()
  if (!me) return null
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Typography variant="h5" component="h2">
          {me.name}'s Cart
        </Typography>
      </header>
      <button onClick={closeCart}>X</button>
      <ul>
        {me.cart.map((cartItem) => {
          return <CartItem key={cartItem.id} cartItem={cartItem} />
        })}
      </ul>

      <Total>{formatMoney(calcTotalPrice(me.cart))}</Total>
      <Checkout />
    </CartStyles>
  )
}

export default Cart
