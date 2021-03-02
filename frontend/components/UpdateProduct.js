import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import {
  TextField,
  FormControl,
  FormLabel,
  Typography,
} from '@material-ui/core'
import styled from 'styled-components'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Router from 'next/router'

import { ALL_PRODUCTS_QUERY } from './Products'
import Form from './Form'
import { InputSharp } from '@material-ui/icons'

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`

const StyledHeader = styled(Typography)`
  font-size: 1.6rem;
  font-weight: 500;
`

const FormContainer = styled('div')`
  margin: ${(props) => props.theme.spacing(4)}px auto;

  ${(props) => props.theme.breakpoints.up('md')} {
    margin: ${(props) => props.theme.spacing(8)}px auto;
    max-width: 600px;
  }

  legend {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`

const UpdateProduct = ({ id }) => {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  })

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION)

  const validationSchema = yup.object({
    name: yup.string('Enter your name').required('Name is required'),
    description: yup
      .string('Enter a description')
      .required('Description is required'),
    price: yup.number('Enter a price').required('Price is required'),
  })

  const formik = useFormik({
    initialValues: {
      name: data?.Product?.name || '',
      description: data?.Product?.description || '',
      price: data?.Product.price || 0,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      const res = await updateProduct({
        variables: {
          id: id,
          name: formik.values.name,
          description: formik.values.description,
          price: formik.values.price,
        },
      })
      Router.push({
        pathname: `/`,
      })
    },
    enableReinitialize: true,
  })

  return (
    <FormContainer>
      <StyledHeader variant="h2">Update product</StyledHeader>
      <Form
        onSubmit={formik.handleSubmit}
        submitLabel="Update"
        error={error || updateError}
        isSubmitting={updateLoading || loading}
      >
        <FormControl
          component="fieldset"
          aria-hidden
          fullWidth
          disabled={updateLoading}
          aria-busy={updateLoading}
        >
          <FormLabel component="legend">Create product form</FormLabel>
          <TextField
            id="name"
            name="name"
            label="Name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            name="description"
            id="description"
            label="Description"
            multiline
            rowsMax={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            id="price"
            name="price"
            label="Price"
            type="number"
            placeholder="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            fullWidth
            margin="dense"
          />
        </FormControl>
      </Form>
    </FormContainer>
  )
}

export default UpdateProduct
