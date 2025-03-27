import { useEffect, useState } from "react"
import { CartItem } from "../types"


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


const clearCart = () =>{
  setCart([])
}


return {
  cart,
  clearCart,
}
}
