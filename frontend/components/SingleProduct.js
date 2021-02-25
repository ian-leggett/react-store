import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import DisplayError from './ErrorMessage'
import Head from 'next/head'
import { Paper, Grid, Typography } from '@material-ui/core'
import styled from 'styled-components'

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

const StyledPaper = styled(Paper)`
  img {
    width: 100%;
  }
`

const Content = styled('div')`
  padding: ${(props) => props.theme.spacing(2)}px;
`

const SingleProduct = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <DisplayError error={error} />
  const { Product } = data
  return (
    <>
      <Head>
        <title>Store | {Product.name}</title>
      </Head>
      <Typography variant="h2" component="h1" gutterBottom>
        {Product.name}
      </Typography>
      <StyledPaper>
        <Grid container>
          <Grid item xs={12} sm={7}>
            <img
              src={Product.photo.image.publicUrlTransformed}
              alt={Product.photo.altText}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Content>
              <Typography variant="h4" component="h2" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" gutterBottom>
                {Product.description}
              </Typography>
            </Content>
          </Grid>
        </Grid>
      </StyledPaper>
    </>
  )
}

export default SingleProduct
