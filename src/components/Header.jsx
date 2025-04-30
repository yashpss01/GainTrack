import React from 'react'

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div className="brand">
        <h1>GainTrack</h1>
        <p className="tagline">Track Your Progress, Maximize Your Gains</p>
      </div>
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </header>
  )
}

export default Header 