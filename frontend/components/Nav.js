import Link from 'next/link'
import styled from 'styled-components'
import { AddShoppingCart } from '@material-ui/icons'

import { useUser } from '../components/User'
import { useCart } from '../lib/cartState'
import CartCount from './CartCount'

const StyledNav = styled('nav')`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  a {
    display: inline-block;
    padding: ${(props) => props.theme.spacing(2)}px;
    color: ${(props) => props.theme.palette.common.white};
    &:hover {
      opacity: 0.8;
    }
  }
`

const StyledButton = styled('button')`
  padding: 16px;
  background: none;
  border: none;
  color: #fff;
  text-decoration: underline;
  line-height: 1.43;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

const CartButton = styled('button')`
  padding: 16px;
  background: none;
  border: none;
  line-height: 1.43;
  cursor: pointer;
`

const Nav = () => {
  const user = useUser()
  const { openCart } = useCart()

  return (
    <StyledNav>
      <ul>
        <li>
          <Link href="/products" color="inherit">
            Products
          </Link>
        </li>
        {user && (
          <>
            <li>
              <Link href="/sell">Sell</Link>
            </li>
            <li>
              <Link href="/orders">Orders</Link>
            </li>
            <li>
              <Link href="/account">Account</Link>
            </li>
            <li>
              <StyledButton>Sign out</StyledButton>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <Link href="/signin">Sign in</Link>
            </li>
          </>
        )}
      </ul>

      <CartButton type="button" onClick={openCart}>
        <AddShoppingCart />
      </CartButton>
      {user && (
        <CartCount
          count={user.cart.reduce(
            (tally, cartItem) =>
              tally + (cartItem.product ? cartItem.quantity : 0),
            0
          )}
        />
      )}
    </StyledNav>
  )
}

export default Nav
