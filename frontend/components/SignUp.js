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

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
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

const SignUp = () => {
  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
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
      await signup().catch(console.error)
    },
  })

  const [signup, { loading, error, data }] = useMutation(SIGNUP_MUTATION, {
    variables: formik.values,
  })

  return (
    <FormContainer>
      <StyledHeader variant="h2">Sign up</StyledHeader>
      {data?.createUser && (
        <Typography variant="body1">
          Signed up with {data.createUser.email} - Please go ahead and sign in
        </Typography>
      )}
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
          <FormLabel component="legend">Sign up form</FormLabel>
          <TextField
            id="name"
            name="name"
            label="Name"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            autoComplete="name"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            margin="dense"
            required
          />
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

export default SignUp
