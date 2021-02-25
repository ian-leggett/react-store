import { useMutation } from '@apollo/client'
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

import Form from './Form'

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload!
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
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

const CreateProduct = () => {
  const validationSchema = yup.object({
    name: yup.string('Enter your name').required('name is required'),
    image: yup
      .string('You must include an image')
      .required('Image is required'),
    description: yup
      .string('Enter a description')
      .required('Description is required'),
    price: yup.number('Enter a price').required('Price is required'),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      image: '',
      description: '',
      price: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      await createProduct()
    },
  })

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: formik.values,
    }
  )

  return (
    <FormContainer>
      <StyledHeader variant="h2">Create a product</StyledHeader>
      <Form
        onSubmit={formik.handleSubmit}
        submitLabel="Create product"
        error={error}
        isSubmitting={loading}
      >
        <FormControl
          component="fieldset"
          aria-hidden
          fullWidth
          disabled={loading}
          aria-busy={loading}
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
            id="image"
            name="image"
            label="Image"
            onChange={(e) => (formik.values.image = e.target.files[0])}
            error={formik.touched.image && Boolean(formik.errors.image)}
            helperText={formik.touched.image && formik.errors.image}
            type="file"
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
            required
          />
        </FormControl>
      </Form>
    </FormContainer>
  )
}

export default CreateProduct
