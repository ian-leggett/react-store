import { Container, Grid } from '@material-ui/core'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  margin-top: ${(props) => props.theme.spacing(3)}px;
  margin-bottom: ${(props) => props.theme.spacing(3)}px;
`

const Page = ({ children }) => <StyledContainer>{children}</StyledContainer>

export default Page
