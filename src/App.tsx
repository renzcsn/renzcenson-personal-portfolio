import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
import NavBar from './components/NavBar'
import Background from './components/Background'
import SciBorder from './components/SciBorder'

import Home from './pages/Home'
import Works from './pages/Works'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <Background />
      <NavBar />
      <SciBorder />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App