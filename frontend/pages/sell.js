import CreateProduct from '../components/CreateProduct'
import PleaseSignIn from '../components/PleaseSignIn'

const SellPage = () => {
  return (
    <div>
      <PleaseSignIn>
        <CreateProduct />
      </PleaseSignIn>
    </div>
  )
}

export default SellPage
