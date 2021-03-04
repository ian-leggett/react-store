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
import Router from 'next/router'

import Form from './Form'

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
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

const RequestReset = () => {
  const validationSchema = yup.object({
    email: yup.string().email().required('Email is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      await resetLink().catch(console.error)
    },
  })

  const [resetLink, { loading, error, data }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: formik.values,
    }
  )

  return (
    <FormContainer>
      <StyledHeader variant="h2">Request a password reset</StyledHeader>
      {data?.sendUserPasswordResetLink === null && (
        <p>Success! check your email for a link</p>
      )}
      <Form
        method="POST"
        onSubmit={formik.handleSubmit}
        submitLabel="Request reset"
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
          <FormLabel component="legend">Reset link form</FormLabel>

          <TextField
            id="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            autoComplete="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
            margin="dense"
            required
          />
        </FormControl>
      </Form>
    </FormContainer>
  )
}

export default RequestReset
