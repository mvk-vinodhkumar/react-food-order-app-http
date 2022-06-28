import { useEffect, useState } from "react"
import Card from "../UI/Card"
import MealItem from "./MealItem/MealItem"
import classes from "./AvailableMeals.module.css"

const AvailableMeals = () => {
  const [mealItems, setMealItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchMealItems = async () => {
      setIsLoading(true)
      const response = await fetch(
        "https://food-order-app-434dd-default-rtdb.firebaseio.com/meals.json"
      )

      if (!response.ok) {
        throw new Error("Fetch request failed!")
      }

      const data = await response.json()

      //to iterate received data object and transform that into array of objects.
      let transformedData = []
      for (const [key, value] of Object.entries(data)) {
        transformedData.push({
          id: key,
          name: value.name,
          description: value.description,
          price: value.price,
        })
      }

      //to re-evaluate the conponent because the meal list items will be empty initially
      setMealItems(transformedData)
      setIsLoading(false)
    }

    fetchMealItems().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  if (isLoading) {
    return <p className={classes.mealItemsLoading}>Loading...</p>
  }

  if (httpError) {
    return <p className={classes.mealItemsError}>{httpError}</p>
  }

  const mealsList = mealItems.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
