export type SpanishBeer = {
    id : number
    name : string
    image : string
    description : string
    price : number
}

export type CartItem = SpanishBeer & {
    quantity: number
}