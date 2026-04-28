import axios from "axios"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from "./Home"
import Admin from "./Admin"


function App() {
  return ( 
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>  
      </Routes>
    </Router>
  )
}

export default App