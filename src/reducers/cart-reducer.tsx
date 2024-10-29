import { db } from "../data/db";
import { CartItem, SpanishBeer } from "../types";

export type CartActions = 
{ type : 'add-to-cart', payload:{product: SpanishBeer}} |
{ type : 'remove-From-Cart', payload:{id: SpanishBeer ['id']}} |
{ type : 'decrease-quantity', payload:{id: SpanishBeer ['id']}} |
{ type : 'increase-quantity', payload:{id: SpanishBeer ['id']}} |
{ type : 'clear-cart'}


export type CartState = {
    data: SpanishBeer[]
    cart: CartItem[]
}

export const initialState : CartState = {
    data: db,
    cart: []
}

export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {

}
