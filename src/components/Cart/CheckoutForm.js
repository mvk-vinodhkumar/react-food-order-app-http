import useInput from "../../hooks/use-input"
import classes from "./CheckoutForm.module.css"

const validNameRex = /^[a-zA-Z' ]+$/
const validAddressRex = /^[a-zA-Z,# ]+$/
const validPhoneNumber = /^\d{10}$/
const validPostalCode = /^\d{6}$/

const CheckoutForm = (props) => {
  //Name
  const {
    value: enteredName,
    hasError: enteredNameHasError,
    isValueValid: enteredNameIsValid,
    onValueChangeHandler: nameChangeHandler,
    onValueBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((val) => {
    return validNameRex.test(val)
  })

  //Address
  const {
    value: enteredAddress,
    hasError: enteredAddressHasError,
    isValueValid: enteredAddressIsValid,
    onValueChangeHandler: addressChangeHandler,
    onValueBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput((val) => {
    return validAddressRex.test(val)
  })

  //Contact Number
  const {
    value: enteredContact,
    hasError: enteredContactHasError,
    isValueValid: enteredContactIsValid,
    onValueChangeHandler: contactChangeHandler,
    onValueBlurHandler: contactBlurHandler,
    reset: resetContact,
  } = useInput((val) => {
    return validPhoneNumber.test(val)
  })

  //Postal Code
  const {
    value: enteredCode,
    hasError: enteredCodeHasError,
    isValueValid: enteredCodeIsValid,
    onValueChangeHandler: codeChangeHandler,
    onValueBlurHandler: codeBlurHandler,
    reset: resetCode,
  } = useInput((val) => {
    return validPostalCode.test(val)
  })

  //City
  const {
    value: enteredCity,
    hasError: enteredCityHasError,
    isValueValid: enteredCityIsValid,
    onValueChangeHandler: cityChangeHandler,
    onValueBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput((val) => {
    return validNameRex.test(val)
  })

  //Overall Form Validity
  let formIsValid = false
  if (
    enteredAddressIsValid &&
    enteredNameIsValid &&
    enteredContactIsValid &&
    enteredCodeIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true
  }

  const confirmHandler = (event) => {
    event.preventDefault()

    if (!formIsValid) {
      return
    }

    //Send user details to cart.js
    props.onConfirm({
      Name: enteredName,
      "Contact Number": enteredContact,
      Address: enteredAddress,
      "Postal Code": enteredCode,
      City: enteredCity,
    })

    resetName()
    resetAddress()
    resetContact()
    resetCode()
    resetCity()
  }

  //name - invalid clases check
  const nameInputClasses = `${classes.control} ${
    enteredNameHasError ? classes.invalid : ""
  }`
  //Address
  const addressInputClasses = `${classes.control} ${
    enteredAddressHasError ? classes.invalid : ""
  }`
  //Contact Number
  const contactInputClasses = `${classes.control} ${
    enteredContactHasError ? classes.invalid : ""
  }`
  //Postal Code
  const pcodeInputClasses = `${classes.control} ${
    enteredCodeHasError ? classes.invalid : ""
  }`
  //City
  const cityInputClasses = `${classes.control} ${
    enteredCityHasError ? classes.invalid : ""
  }`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {enteredNameHasError && <p>Please enter a valid name</p>}
      </div>
      <div className={contactInputClasses}>
        <label htmlFor="contact_num">Contact Number</label>
        <input
          type="text"
          id="contact_num"
          onChange={contactChangeHandler}
          onBlur={contactBlurHandler}
          value={enteredContact}
        />
        {enteredContactHasError && <p>Please enter 10-digit number</p>}
      </div>
      <div className={addressInputClasses}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
          value={enteredAddress}
        />
        {enteredAddressHasError && <p>Please enter a valid address</p>}
      </div>
      <div className={pcodeInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={codeChangeHandler}
          onBlur={codeBlurHandler}
          value={enteredCode}
        />
        {enteredCodeHasError && <p>Please enter 6-digit number</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
        {enteredCityHasError && <p>Please enter a valid name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className={classes.submit}
          disabled={!formIsValid}
        >
          Confirm
        </button>
      </div>
    </form>
  )
}

export default CheckoutForm
