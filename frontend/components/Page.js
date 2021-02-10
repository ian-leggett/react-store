import { Container, Paper } from '@material-ui/core'

const Page = ({ children }) => (
  <Container>
    <Paper>{children}</Paper>
  </Container>
)

export default Page
