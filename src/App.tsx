import {useReducer } from "react"
import Beers from "./components/Beers"
import Header from "./components/Header"
// import { db } from "./data/db"
import { useCart } from "./hooks/useCart"
import { cartReducer, initialState } from "./reducers/cart-reducer"

function App() {
  const {clearCart, decreaseQuantity } =  useCart()
 // const [data] = useState(db)
  const [state, dispatch] = useReducer(cartReducer, initialState)
  // console.log(state)
  return (
    <>
      <Header cart={state.cart} clearCart={clearCart} decreaseQuantity={decreaseQuantity} dispatch={dispatch}/>
      <Beers data={state.data} dispatch={dispatch} />
    </>
  )
}

export default App
