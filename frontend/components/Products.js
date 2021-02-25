import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import Grid from '@material-ui/core/Grid'

import Product from './Product'

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
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

const Products = () => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY)
  if (loading) return <p>loading....</p>
  if (error) return <p>{error}</p>
  return (
    <Grid container spacing={2}>
      {data.allProducts.map((product) => (
        <Grid item xs={6} md={3} key={product.id}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Products
