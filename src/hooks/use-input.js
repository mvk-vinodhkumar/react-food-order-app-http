import { useReducer } from "react"

const defaultInputState = { value: "", isTouched: false }
const inputStateReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    return { value: action.value, isTouched: state.isTouched }
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isTouched: true }
  }

  if (action.type === "INPUT_RESET") {
    return { value: "", isTouched: false }
  }

  return defaultInputState
}

const useInput = (validateValue) => {
  const [inputState, inputDispatch] = useReducer(
    inputStateReducer,
    defaultInputState
  )

  const isEnteredValueValid = validateValue(inputState.value)
  const hasError = inputState.isTouched && !isEnteredValueValid

  const onValueChangeHandler = (event) => {
    inputDispatch({ type: "INPUT_CHANGE", value: event.target.value })
  }
  const onValueBlurHandler = () => {
    inputDispatch({ type: "INPUT_BLUR" })
  }

  const reset = () => {
    inputDispatch({ type: "INPUT_RESET" })
  }

  return {
    value: inputState.value,
    hasError: hasError,
    isValueValid: isEnteredValueValid,
    onValueChangeHandler: onValueChangeHandler,
    onValueBlurHandler: onValueBlurHandler,
    reset: reset,
  }
}

export default useInput
