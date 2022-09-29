import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Map from './Map'
import Questionnaire from './Questionnaire'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/map' element={<Map />} />
        <Route path='/questionnaire' element={<Questionnaire />} />
      </Routes>
    </>
  )
}

export default App
