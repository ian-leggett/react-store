import React, { useEffect } from 'react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline'
import NProgress from 'nprogress'
import Router from 'next/router'

import withData from '../lib/withData'
import theme from '../theme'
import '../components/styles/nprogress.css'
import Header from '../components/Header'
import Page from '../components/Page'
import { CartStateProvider } from '../lib/cartState'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyApp = ({ Component, pageProps, apollo }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <ThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <Header />
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Page>
              <Component {...pageProps} />
            </Page>
          </StyledThemeProvider>
        </ThemeProvider>
      </CartStateProvider>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  pageProps.query = ctx.query
  return { pageProps }
}

export default withData(MyApp)
