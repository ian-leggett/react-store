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

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
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

const Reset = ({ token }) => {
  const validationSchema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      token,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      await reset().catch(console.error)
    },
  })

  const [reset, { loading, data }] = useMutation(RESET_MUTATION, {
    variables: formik.values,
  })

  console.log(formik.values)

  const error = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined

  return (
    <FormContainer>
      <StyledHeader variant="h2">Reset your password</StyledHeader>
      {data?.redeemUserPasswordResetToken === null && (
        <p>Success! You can now sign in</p>
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
          <FormLabel component="legend">Reset your password form</FormLabel>

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

          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete="password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            margin="dense"
            required
          />
        </FormControl>
      </Form>
    </FormContainer>
  )
}

export default Reset
