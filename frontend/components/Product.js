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
    <Link href={`/`} passHref>
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
      <Link href={`/`} passHref>
        <Button>{product.name}</Button>
      </Link>
    </CardActions>
  </StyledCard>
)

export default Product
