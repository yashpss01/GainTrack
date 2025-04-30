import React, { useState, useRef, useEffect } from 'react'

function ExerciseList({ exercises, onDelete }) {
  const [searchText, setSearchText] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const lastExerciseRef = useRef(null)

  useEffect(() => {
    if (lastExerciseRef.current) {
      lastExerciseRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [exercises])

  const calculateProgress = (exercise) => {
    const oldExercises = exercises
      .filter(e => e.name === exercise.name && e.date < exercise.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))

    if (oldExercises.length === 0) return null

    const lastVolume = oldExercises[0].volume
    const difference = exercise.volume - lastVolume
    const percentChange = (difference / lastVolume) * 100

    return {
      difference: difference.toFixed(1),
      percent: percentChange.toFixed(1),
      improved: difference > 0
    }
  }

  const exerciseTypes = ['all', ...new Set(exercises.map(e => e.name))]
  
  const filteredExercises = exercises
    .filter(exercise => 
      exercise.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedType === 'all' || exercise.name === selectedType)
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="exercise-list">
      <div className="list-header">
        <h2>My Workout Log</h2>
        <div className="filter-controls">
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="exercise-select"
          >
            {exerciseTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Exercises' : type}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-box">
          <h3>Total Exercises</h3>
          <p>{filteredExercises.length}</p>
        </div>
        <div className="stat-box">
          <h3>Total Volume</h3>
          <p>{filteredExercises.reduce((sum, ex) => sum + ex.volume, 0).toLocaleString()} lbs</p>
        </div>
        <div className="stat-box">
          <h3>Different Exercises</h3>
          <p>{new Set(filteredExercises.map(e => e.name)).size}</p>
        </div>
      </div>

      <div className="exercise-grid">
        {filteredExercises.map((exercise, index) => {
          const progress = calculateProgress(exercise)
          return (
            <div
              key={exercise.id}
              className="exercise-card"
              ref={index === 0 ? lastExerciseRef : null}
            >
              <div className="card-image">
                <img src={exercise.image} alt={exercise.name} />
                <button
                  onClick={() => onDelete(exercise.id)}
                  className="delete-btn"
                  title="Delete exercise"
                >
                  ×
                </button>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3>{exercise.name}</h3>
                  <span className="date">{exercise.date}</span>
                </div>
                <div className="exercise-info">
                  <div className="info-item">
                    <span>Sets</span>
                    <span>{exercise.sets}</span>
                  </div>
                  <div className="info-item">
                    <span>Reps</span>
                    <span>{exercise.reps}</span>
                  </div>
                  <div className="info-item">
                    <span>Weight</span>
                    <span>{exercise.weight} lbs</span>
                  </div>
                </div>
                <div className="volume-box">
                  <span>Total Volume</span>
                  <span>{exercise.volume.toLocaleString()} lbs</span>
                </div>
                {progress && (
                  <div className={`progress-box ${progress.improved ? 'better' : 'worse'}`}>
                    {progress.improved ? '↑' : '↓'} {progress.percent}%
                    <span>({progress.difference} lbs)</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExerciseList 