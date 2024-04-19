{/*https://www.youtube.com/watch?v=miUsa5SOXGk 24:42*/}
import {BrowserRouter as Router , Routes,Route} from "react-router-dom";
import {Navbar} from "./components/navbar"
import './App.css'

function App() {
  return (
  <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>}></Route>
        <Route path="/auth" element={<h1>Auth</h1>}></Route>
        <Route path="/rated" element={<h1>Rated Page</h1>}></Route>
      </Routes>
    </Router>  
  </div>
  )
}

export default App
