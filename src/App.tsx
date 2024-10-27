import { useState } from "react"
import Beers from "./components/Beers"
import Header from "./components/Header"
import { db } from "./data/db"
import { useCart } from "./hooks/useCart"

function App() {
  const { cart, addCart, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } =  useCart()
  const [data] = useState(db)
  return (
    <>
      <Header cart={cart} clearCart={clearCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart}/>
      <Beers data={data} addCart={addCart} />
    </>
  )
}

export default App
