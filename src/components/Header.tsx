import { useMemo, useState, Dispatch } from "react";
import { CartItem, SpanishBeer } from "../types";
import type { CartActions } from "../reducers/cart-reducer";

type HeaderProps = {
  cart: CartItem[],
  dispatch: Dispatch <CartActions>,
  clearCart: () => void,
  decreaseQuantity: (id: SpanishBeer['id']) => void,
}

export default function Header({ cart, dispatch, clearCart, decreaseQuantity }: HeaderProps) {
  
  const isEmpty = useMemo( () => cart.length === 0, [cart])
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const sumTotal = useMemo(() => {
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    return total.toFixed(2);
  }, [cart]);

  return (
    <header className="relative bg-[url('../../public/banner-beer.webp')] bg-no-repeat bg-center bg-cover text-yellow-600 font-bold font-sans text-2xl sm:text-4xl py-12 px-8 sm:px-10 flex justify-between items-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="mt-14 z-10 relative flex justify-between items-center w-full">
        Spanish Beer Store
        <button className="border border-gray-600 px-2 sm:px-3 py-2 rounded flex items-center justify-center hover:border-gray-500" onClick={toggleCart}>
          <i className="fa-solid fa-cart-shopping text-2xl"></i>
          {cart.length > 0 && <p className="text-xs pt-4 ps-1">{cart.length}</p>}
        </button>
      </div>
      {isCartOpen && (
        <div className="w-80 sm:w-96 absolute text-gray-600 top-40 sm:top-40 right-5 sm:right-10 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-3 sm:p-4">
          {isEmpty ? (
            <p className="text-center text-base">Your cart is empty <i className="fa-solid fa-face-sad-cry"></i></p>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4 text-yellow-600">Cart items</h2>
              <table>
                <thead>
                  <tr className="overflow-y-auto max-h-60">
                    <th></th>
                    <th className="text-base ps-2 text-center">Product</th>
                    <th className="text-base ps-2 text-center">Price</th>
                    <th className="text-base ps-2 text-center">Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((beer) => (
                    <tr key={beer.id} className="overflow-y-auto max-h-60 pt-2 align-middle">
                      <td>
                        <img className="w-20 items-center p-0" src={`../../public/${beer.image}.jpg`} alt="Beer image" />
                      </td>
                      <td className="font-normal text-sm sm:text-base text-center align-middle">{beer.name}</td>
                      <td className="font-normal text-sm sm:text-base text-center align-middle">{beer.price}</td>
                      <td className="flex justify-center pt-5">
                        <button className="text-xs text-white" onClick={() => decreaseQuantity(beer.id)}><i className="fa-solid fa-minus bg-gray-800 p-1"></i></button>
                        <span className="font-normal text-base px-2"> {beer.quantity} </span>
                        <button className="text-xs text-white" onClick={() => dispatch ({type: 'increase-quantity', payload: {id: beer.id}})}><i className="fa-solid fa-plus bg-gray-800 p-1"></i></button>
                      </td>
                      <td className="ps-4 pt-3 sm:pt-1">
                        <button className="text-center text-base text-white pb-5 self-center" onClick={() => dispatch({type: 'remove-From-Cart', payload: {id: beer.id}})}><i className="fa-solid fa-trash bg-red-700 rounded-full border-gray-200 p-2"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex p-2 justify-between pt-4">
                <button className="text-white text-base font-medium bg-gray-800 p-2 rounded" onClick={clearCart}>Clear Cart</button>
                <p className="text-base text-center self-center">Total: {sumTotal} €</p>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}
