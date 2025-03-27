import { db } from "../data/db";
import { CartItem, SpanishBeer } from "../types";

export type CartActions = 
{ type : 'add-to-cart', payload:{item: SpanishBeer}} |
{ type : 'remove-From-Cart', payload:{id: SpanishBeer ['id']}} |
{ type : 'decrease-quantity', payload:{id: SpanishBeer ['id']}} |
{ type : 'increase-quantity', payload:{id: SpanishBeer ['id']}} |
{ type : 'clear-cart'}


export type CartState = {
    data: SpanishBeer[]
    cart: CartItem[]
}

  // ahora ponemos esto para que en el useState de cart no se inicie como [] vacío, ya que esto hara que nuestro localStorage este vacío. Por lo que comprobamos primero si hay algo en el localStorage y si no lo hay ponemos el arreglo vacío.
  const inicialLocalStorage = () : CartItem[]=> {
    const localStorageCart = localStorage.getItem('cart')
    // .parse es lo opuesto a stringify, convierte un string en objeto 
    return localStorageCart ? JSON.parse(localStorageCart) : [] 
  }

export const initialState : CartState = {
    data: db,
    cart: inicialLocalStorage()
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5

export const cartReducer = ( // esto es para el autocompletado
    state: CartState = initialState,
    action: CartActions
) => {
    if (action.type === 'add-to-cart'){
        const itemExists = state.cart.find(item => item.id === action.payload.item.id)
        let updatedCart : CartItem[] = [] 
        if (itemExists){
            updatedCart = state.cart.map(item =>{
                if (item.id === action.payload.item.id){
                    if (item.quantity<= MAX_ITEMS){
                        return { ...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                }else return item
            })
    }else {
        const newitem : CartItem = {...action.payload.item, quantity: 1}
        updatedCart= [...state.cart, newitem]
    }
        return{
            ...state,
            cart: updatedCart
        }
    }
    if (action.type === 'remove-From-Cart'){
        const cart = state.cart.filter(item => item.id !== action.payload.id)
        return{
            ...state,
            cart
        }
    }
    if (action.type === 'decrease-quantity'){
        const cart = state.cart.map((item)=>{
            if (item.id === action.payload.id && item.quantity >= MIN_ITEMS){
              return {
                ...item,
                quantity: item.quantity-1
              }
            }
            return item
          }).filter((item)=> item.quantity >= MIN_ITEMS)
        return{
            ...state,
            cart
        }
    }
    if (action.type === 'increase-quantity'){
        const cart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity < MAX_ITEMS){
            return{
                ...item,
                quantity: item.quantity+1
            }
            }
            return item
        })
        return{
            ...state,
            cart
        }
    }
    if (action.type === 'clear-cart'){
        return{
            ...state,
            cart: []
        }
    }
    return state
}
