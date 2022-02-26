import { useState } from "react"
import { initialWorkouts, generateWorkout } from "./Workouts.js"
import "./App.css"
let test = []
function App () {
  const [workouts, setWorkouts] = useState(initialWorkouts)


  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    const arr1 = [...workouts, newWorkout]
    test = arr1
    setWorkouts(arr1)
    console.log("addNewWorkout:", newWorkout)
  }

  const deleteWorkout = (workout) => {
    setWorkouts((x) => {
      const arr1 = x.filter(c => c !== workout)
      test = arr1
      return arr1
    })
    console.log("deleteWorkout:", workout)
  }

  const completeWorkout = (workout) => {
    setWorkouts((x) => {
      const arr1 = x.map(c => c === workout ? { ...workout, done: !workout.done } : c)
      test = arr1
      return arr1
    })
    console.log("completeWorkout:", workout, test)
  }

  const showDone = (e) => {
    console.log(e.target.checked)
    setWorkouts((x) => {
      if (e.target.checked) {
        console.log(test)
        return x.filter(c => c.done === true)
      }
      else {
        return test
      }

    })
  }

  const replace = (workout) => {
    addNewWorkout()
    deleteWorkout(workout)
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={ addNewWorkout }>Add New Workout</button>
      <label><input type='checkbox' id="done" onChange={ showDone } /> show completed only</label>
      <ul>
        { workouts.map((workout, index) => (
          <li key={ index }>
            <p>
              { workout.sets }x sets of <strong>{ workout.reps }x{ workout.exercise }</strong> with { workout.rest } seconds rest
            </p>
            { !workout.done &&
              <button onClick={ () => completeWorkout(workout) }>Done</button> }
            { workout.done &&
              <p>✅</p> }
            <button onClick={ e => deleteWorkout(workout) }>Delete</button>
            <button onClick={ e => replace(workout) }>replace me</button>
          </li>
        )) }
      </ul>
    </div>
  )
}

export default App
