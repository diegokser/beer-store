import { useEffect, useState } from "react"
import { CartItem, SpanishBeer } from "../types"


export const useCart = () => {

  // ahora ponemos esto para que en el useState de cart no se inicie como [] vacío, ya que esto hara que nuestro localStorage este vacío. Por lo que comprobamos primero si hay algo en el localStorage y si no lo hay ponemos el arreglo vacío.
  const inicialLocalStorage = () : CartItem[]=> {
    const localStorageCart = localStorage.getItem('cart')
    // .parse es lo opuesto a stringify, convierte un string en objeto 
    return localStorageCart ? JSON.parse(localStorageCart) : [] 
  }
  
   const [cart, setCart] = useState(inicialLocalStorage)
  
  // Para crear un localStorage y que al recargar no se borren las cosas. El JSON es porque el localstorage no almacena objetos, solo string asi que lo convertimos todo a un string. 
  // Se pone en useEffect es para que vaya actualizando el carrito cuando el componente esté listo. 
  useEffect (()=> {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]) 

  const addCart = (product:SpanishBeer) => {
    const productExist = cart.findIndex(item => item.id === product.id)
    if (productExist>=0){
        if (cart[productExist].quantity >= 5) return 
        const updatedCart = [...cart]
        updatedCart[productExist].quantity++     
        setCart(updatedCart)
    }else {
        const newProduct : CartItem = {...product, quantity: 1}
        setCart([...cart, newProduct])
    }
}

const increaseQuantity = (id: SpanishBeer ['id']) =>{
  const updateCart = cart.map((item)=>{
    if (item.id === id && item.quantity < 5){
    return{
        ...item,
        quantity: item.quantity+1
    }
    }
    return item
})
setCart(updateCart)
}

const decreaseQuantity = (id: SpanishBeer['id']) =>{
  const updateCart = cart.map((item)=>{
    if (item.id === id && item.quantity > 0){
      return {
        ...item,
        quantity: item.quantity-1
      }
    }
    return item
  }).filter((item)=> item.quantity > 0)
  setCart(updateCart)
}

const clearCart = () =>{
  setCart([])
}

const removeFromCart = (id: SpanishBeer ['id']) => {
  setCart(prevCart => prevCart.filter(beer => beer.id !== id))
  }

return {
  cart,
  addCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  removeFromCart
}
}
