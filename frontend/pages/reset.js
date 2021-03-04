import { isPunctuatorToken } from 'graphql/language/lexer'
import RequestReset from '../components/RequestReset'
import Reset from '../components/Reset'

const ResetPage = ({ query: { token } }) => {
  if (!token) {
    return (
      <>
        <h2>Sorry you must supply a token</h2>
        <RequestReset />
      </>
    )
  }
  return (
    <div>
      <Reset token={token} />
    </div>
  )
}

export default ResetPage
