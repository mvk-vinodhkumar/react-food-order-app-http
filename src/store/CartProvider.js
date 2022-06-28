import React, { useReducer } from "react"
import CartContext from "./cart-context"

const defaultCartState = {
  items: [],
  totalAmount: 0,
}
const cartReducer = (state, action) => {
  if (action.type === "ADD_CART_ITEM") {
    let updatedTotalAmount
    if (action.item.amount < 5) {
      updatedTotalAmount = state.totalAmount + action.item.price //* action.item.amount
    } else {
      updatedTotalAmount = state.totalAmount
    }

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIndex]

    let updatedItem
    let updatedItems
    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount:
          existingCartItem.amount < 5
            ? existingCartItem.amount + 1
            : existingCartItem.amount,
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItem = { ...action.item }
      updatedItems = state.items.concat(updatedItem)
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === "REMOVE_CART_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    )
    const existingCartItem = state.items[existingCartItemIndex]
    const updatedTotalAmount = state.totalAmount - existingCartItem.price

    let updatedItems
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id)
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === "CLEAR_CART") {
    return defaultCartState
  }

  return defaultCartState
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const addItemtoCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_CART_ITEM", item: item })
  }
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_CART_ITEM", id: id })
  }
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemtoCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
