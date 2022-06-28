import { useContext, useState } from "react"

import Modal from "../UI/Modal"
import CartItem from "./CartItem"
import classes from "./Cart.module.css"
import CartContext from "../../store/cart-context"
import foodPreparationImage from "../../assets/cooking.png"
import CheckoutForm from "./CheckoutForm"

const Cart = (props) => {
  const [checkoutForm, setCheckoutForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const cartCtx = useContext(CartContext)

  const totalAmount = `\u20B9${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item)
  }

  const cartOrderHandler = () => {
    setCheckoutForm(true)
  }

  const submitOrderHandler = (userDetails) => {
    setIsSubmitting(true)
    fetch(
      "https://food-order-app-434dd-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userInfo: userDetails,
          orderedItems: cartCtx.items,
          bill: cartCtx.totalAmount,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    setIsSubmitting(false)
    setDidSubmit(true)

    cartCtx.clearCart()
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  )

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkoutForm && (
        <CheckoutForm onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!checkoutForm && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={cartOrderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  )

  const isSubmittingModalContent = <p>Sending Order Details...</p>

  const didSubmitModalContent = (
    <>
      <div className={classes.imgWrap}>
        <img src={foodPreparationImage} alt="Preparing Food!" />
      </div>
      <p>Order placed successfully! Your food is being prepared...</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  )

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart
