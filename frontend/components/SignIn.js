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
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }

      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
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

const SignIn = () => {
  const validationSchema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      const res = await signin()
      console.log(res)
    },
  })

  const [signin, { loading, data }] = useMutation(SIGNIN_MUTATION, {
    variables: formik.values,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined

  return (
    <FormContainer>
      <StyledHeader variant="h2">Sign in</StyledHeader>
      <Form
        method="POST"
        onSubmit={formik.handleSubmit}
        submitLabel="Sign in"
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
          <FormLabel component="legend">Sign in form</FormLabel>
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

export default SignIn
