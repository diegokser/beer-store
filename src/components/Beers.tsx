import { SpanishBeer } from "../types"
import type { CartActions } from "../reducers/cart-reducer";
import type { Dispatch } from "react";

type BeersProp = {
    data: SpanishBeer[];
    // addCart:(product:SpanishBeer)=>void
    dispatch: Dispatch<CartActions>
}

export default function Beers({data, dispatch}: BeersProp)  {
  return (
    <div className="py-8 font-sans">
      <h1 className="text-center text-yellow-600 text-3xl md:text-5xl font-bold">Our Selection of Beers</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center py-4 px-8 md:py-12 md:px-20">
        {data.map((beer) => (
          <div key={beer.id} className="py-3 sm:px-3 grid grid-cols-2">
            <img className="w-30 h-60 md:w-50 md:h-80 mb-4 object-cover" src={`../../public/${beer.image}.jpg`} alt="Cerveza" />
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-base sm:text-lg font-semibold mb-2">{beer.name}</h2>
                <p className="text-sm sm:text-base mb-2 justify-center text-justify sm:text-start">{beer.description}</p>
                <h3 className="text-xl text-yellow-600 font-bold mb-2">{beer.price}€</h3>
              </div>
              <button className="w-max mt-2 px-4 py-2 bg-red-700 text-white rounded" onClick={() => dispatch({ type: 'add-to-cart', payload: { item: beer } })}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
