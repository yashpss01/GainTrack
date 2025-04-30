import { useState, useEffect } from 'react'
import './App.css'
import ExerciseForm from './components/ExerciseForm'
import ExerciseList from './components/ExerciseList'
import Header from './components/Header'
import Footer from './components/Footer'

// Exercise image mapping for better search results
const EXERCISE_IMAGE_QUERIES = {
  'Bench Press': 'barbell bench press gym',
  'Squat': 'barbell back squat gym',
  'Deadlift': 'barbell deadlift gym',
  'Shoulder Press': 'overhead press weightlifting',
  'Pull Up': 'pull up bar gym',
  'Push Up': 'push up exercise',
  'Bicep Curl': 'dumbbell bicep curl',
  'Tricep Extension': 'tricep extension exercise',
  'Lat Pulldown': 'lat pulldown machine',
  'Leg Press': 'leg press machine gym'
}

// Default exercise images as fallback
const DEFAULT_IMAGES = {
  'Bench Press': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80',
  'Squat': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&q=80',
  'Deadlift': 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=500&q=80',
  'Shoulder Press': 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&q=80',
  'Pull Up': 'https://images.unsplash.com/photo-1598971639058-b4e6c81ef562?w=500&q=80',
  'Push Up': 'https://images.unsplash.com/photo-1598971639058-b4e6c81ef562?w=500&q=80',
  'Bicep Curl': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&q=80',
  'default': 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&q=80'
}

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [exercises, setExercises] = useState(() => {
    const saved = localStorage.getItem('exercises')
    if (saved) {
      return JSON.parse(saved)
    }
    return [
      {
        id: 1,
        name: 'Bench Press',
        sets: 3,
        reps: 8,
        weight: 135,
        date: '2024-03-20',
        volume: 3240,
        image: DEFAULT_IMAGES['Bench Press']
      },
      {
        id: 2,
        name: 'Squat',
        sets: 4,
        reps: 6,
        weight: 225,
        date: '2024-03-20',
        volume: 5400,
        image: DEFAULT_IMAGES['Squat']
      }
    ]
  })

  useEffect(() => {
    localStorage.setItem('exercises', JSON.stringify(exercises))
  }, [exercises])

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  const getExerciseImage = async (exerciseName) => {
    return DEFAULT_IMAGES[exerciseName] || DEFAULT_IMAGES.default
  }

  const addExercise = async (exercise) => {
    const image = await getExerciseImage(exercise.name)
    const newExercise = {
      ...exercise,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      volume: exercise.sets * exercise.reps * exercise.weight,
      image
    }
    setExercises(prev => [newExercise, ...prev])
  }

  const deleteExercise = (id) => {
    setExercises(prev => prev.filter(exercise => exercise.id !== id))
  }

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="container">
        <ExerciseForm onSubmit={addExercise} />
        <ExerciseList exercises={exercises} onDelete={deleteExercise} />
      </main>
      <Footer />
    </div>
  )
}

export default App
