import React, { useState, useRef } from 'react'

// Predefined exercises grouped by category
const EXERCISE_LIST = {
  'Upper Body - Push': [
    'Bench Press',
    'Shoulder Press',
    'Incline Bench Press',
    'Push Up',
    'Dips',
    'Tricep Extension'
  ],
  'Upper Body - Pull': [
    'Pull Up',
    'Lat Pulldown',
    'Barbell Row',
    'Face Pull',
    'Bicep Curl',
    'Hammer Curl'
  ],
  'Lower Body': [
    'Squat',
    'Deadlift',
    'Leg Press',
    'Romanian Deadlift',
    'Lunges',
    'Calf Raises'
  ],
  'Core': [
    'Plank',
    'Crunches',
    'Russian Twists',
    'Leg Raises',
    'Ab Wheel Rollout'
  ]
}

function ExerciseForm({ onSubmit }) {
  const [exercise, setExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: ''
  })
  const [selectedCategory, setSelectedCategory] = useState('Upper Body - Push')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const nameInputRef = useRef(null)
  const customInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!exercise.name || !exercise.sets || !exercise.reps || !exercise.weight) {
      alert('Please fill in all fields')
      return
    }
    onSubmit({
      ...exercise,
      sets: parseInt(exercise.sets),
      reps: parseInt(exercise.reps),
      weight: parseFloat(exercise.weight)
    })
    setExercise({ name: '', sets: '', reps: '', weight: '' })
    setShowCustomInput(false)
    nameInputRef.current.focus()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setExercise(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleExerciseSelect = (e) => {
    const value = e.target.value
    if (value === 'custom') {
      setShowCustomInput(true)
      setTimeout(() => customInputRef.current?.focus(), 0)
      setExercise(prev => ({ ...prev, name: '' }))
    } else {
      setShowCustomInput(false)
      setExercise(prev => ({ ...prev, name: value }))
    }
  }

  const handleCustomNameChange = (e) => {
    setExercise(prev => ({ ...prev, name: e.target.value }))
  }

  return (
    <form className="exercise-form" onSubmit={handleSubmit}>
      <h2>Add New Exercise</h2>
      
      <div className="form-group">
        <select
          className="form-input"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {Object.keys(EXERCISE_LIST).map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <select
          ref={nameInputRef}
          className="form-input"
          value={showCustomInput ? 'custom' : exercise.name}
          onChange={handleExerciseSelect}
        >
          <option value="">Select Exercise</option>
          {EXERCISE_LIST[selectedCategory].map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
          <option value="custom">Custom Exercise</option>
        </select>

        {showCustomInput && (
          <input
            type="text"
            ref={customInputRef}
            value={exercise.name}
            onChange={handleCustomNameChange}
            placeholder="Enter custom exercise name"
            className="form-input"
          />
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="number"
            name="sets"
            value={exercise.sets}
            onChange={handleChange}
            placeholder="Sets"
            min="1"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="reps"
            value={exercise.reps}
            onChange={handleChange}
            placeholder="Reps"
            min="1"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="weight"
            value={exercise.weight}
            onChange={handleChange}
            placeholder="Weight (lbs)"
            step="0.5"
            min="0"
            className="form-input"
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Add Exercise
      </button>
    </form>
  )
}

export default ExerciseForm 