import Link from 'next/link'
import { Home } from '@material-ui/icons'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'

import Nav from './Nav'

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Link href="/">
        <IconButton edge="start" color="inherit" aria-label="home">
          <Home fontSize="large" />
        </IconButton>
      </Link>
      <Nav />
    </Toolbar>
  </AppBar>
)

export default Header
