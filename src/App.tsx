import {useEffect, useReducer } from "react"
import Beers from "./components/Beers"
import Header from "./components/Header"
// import { db } from "./data/db"
// import { useCart } from "./hooks/useCart"
import { cartReducer, initialState } from "./reducers/cart-reducer"

function App() {
  // const {clearCart } =  useCart()
 // const [data] = useState(db)
  const [state, dispatch] = useReducer(cartReducer, initialState)
  // console.log(state)

    // Para crear un localStorage y que al recargar no se borren las cosas. El JSON es porque el localstorage no almacena objetos, solo string asi que lo convertimos todo a un string. 
  // Se pone en useEffect es para que vaya actualizando el carrito cuando el componente esté listo. 
  useEffect (()=> {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]) 
  return (
    <>
      <Header cart={state.cart} dispatch={dispatch}/>
      <Beers data={state.data} dispatch={dispatch} />
    </>
  )
}

export default App
