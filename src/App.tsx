import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";

const App = () => {

  return (
    <div className="bg-gray-900 min-h-screen container">
      <Router>
      <Routes>
        <Route path="/" element={<Home /> } />
      </Routes>
    </Router>
    </div> 
  )
}

export default App
