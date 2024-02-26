import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

export function CartProvider({ children }) {
  const initialState = {
    checkoutIdsInCart: [],
  };
  const [cartContext, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={cartContext}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within an CartProvider");
  }
  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error("useCartDispatch must be used within an CartProvider");
  }
  return context;
}

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_CHECKOUT_IDS_IN_CART":
      return {
        ...state,
        checkoutIdsInCart: action.payload.checkoutIdsInCart,
      };
    case "ADD_CHECKOUT_ID_TO_CART":
      return {
        ...state,
        checkoutIdsInCart: [
          ...state.checkoutIdsInCart,
          action.payload.checkoutId,
        ],
      };
    case "REMOVE_CHECKOUT_ID_FROM_CART":
      return {
        ...state,
        checkoutIdsInCart: state.checkoutIdsInCart.filter(
          (id) => id !== action.payload.checkoutId
        ),
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
