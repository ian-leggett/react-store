import styled from 'styled-components'
import { Button, LinearProgress } from '@material-ui/core'

import DisplayError from './ErrorMessage'

const FormActions = styled('div')`
  margin: ${(props) => props.theme.spacing(4)}px 0;
`

const Form = ({ children, onSubmit, submitLabel, isSubmitting, error }) => {
  return (
    <form onSubmit={onSubmit} noValidate>
      <DisplayError error={error}></DisplayError>
      {isSubmitting && <LinearProgress />}
      {children}
      <FormActions>
        <Button variant="contained" color="primary" type="submit">
          {submitLabel}
        </Button>
      </FormActions>
    </form>
  )
}

export default Form
