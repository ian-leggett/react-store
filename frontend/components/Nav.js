import Link from 'next/link'
import styled from 'styled-components'

import { useUser } from '../components/User'
import SignOut from '../components/SignOut'

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

const Nav = () => {
  const user = useUser()

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
              <SignOut>Sign out</SignOut>
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
    </StyledNav>
  )
}

export default Nav
