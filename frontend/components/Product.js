import styled from 'styled-components'
import formatMoney from '../lib/formatMoney'

import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Button,
} from '@material-ui/core'
import Link from 'next/link'

import AddToCart from './AddToCart'
import DeleteProduct from './DeleteProduct'

const StyledCard = styled(Card)`
  .MuiCardMedia-root {
    height: 0;
    padding-top: 56.25%;
  }
`

const StyledHeader = styled(Typography)`
  font-size: 1.4rem;
  font-weight: 500;
`

const Product = ({ product }) => (
  <StyledCard>
    <Link href={`/product/${product.id}`} passHref>
      <CardActionArea>
        <CardMedia
          image={product?.photo?.image?.publicUrlTransformed}
          title={product.name}
        />
        <CardContent>
          <StyledHeader variant="h2" gutterBottom>
            {product.name}
          </StyledHeader>
          <Typography paragraph>{formatMoney(product.price)}</Typography>
          <Typography paragraph>{product.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Link>
    <CardActions>
      <Link href={`/product/${product.id}`} passHref>
        <Button variant="contained" color="primary">
          View
        </Button>
      </Link>
      <AddToCart id={product.id} />
      <Link
        href={{
          pathname: 'update',
          query: {
            id: product.id,
          },
        }}
        passHref
      >
        <Button variant="contained" color="secondary">
          Edit
        </Button>
      </Link>

      <DeleteProduct id={product.id}>Delete</DeleteProduct>
    </CardActions>
  </StyledCard>
)

export default Product
