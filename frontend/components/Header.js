import Link from 'next/link'
import { Home } from '@material-ui/icons'
import { AppBar, Toolbar, IconButton, Container } from '@material-ui/core'
import styled from 'styled-components'

import Nav from './Nav'
import Cart from './Cart'
import Search from './Search'

const StyledToolbar = styled(Toolbar)`
  padding-left: 0;
  padding-right: 0;
`

const Header = () => (
  <AppBar position="static">
    <Container>
      <StyledToolbar>
        <Link href="/">
          <IconButton edge="start" color="inherit" aria-label="home">
            <Home fontSize="large" />
          </IconButton>
        </Link>
        <Nav />
      </StyledToolbar>
    </Container>
    <Cart />
    <Search />
  </AppBar>
)

export default Header
