import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Grid from '@material-ui/core/Grid'

import { perPage } from '../config'
import Product from './Product'

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

const Products = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  })
  if (loading) return <p>loading....</p>
  if (error) return <p>{error}</p>
  return (
    <Grid container spacing={2}>
      {data?.allProducts.map((product) => (
        <Grid item xs={6} md={3} key={product.id}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Products
