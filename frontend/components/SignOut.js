import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import { CURRENT_USER_QUERY } from './User'

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`

const SignOut = ({ children }) => {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  return <button onClick={signout}>{children}</button>
}

export default SignOut
