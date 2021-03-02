import { useMutation } from '@apollo/client'
import { Button } from '@material-ui/core'
import gql from 'graphql-tag'

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct))
}

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`

const DeleteProduct = ({ id }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update: update,
  })
  return (
    <Button
      variant="contained"
      color="secondary"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item')) {
          deleteProduct(id).catch((err) => alert(err))
        }
      }}
    >
      Delete
    </Button>
  )
}

export default DeleteProduct
