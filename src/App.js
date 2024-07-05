import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import {Home} from "./Pages/Home"
import {Login} from "./Pages/Login"
import {Signup} from "./Pages/Signup"
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to = "/">Home</Link>
          <Link to = "/signup">Signup</Link>
          <Link to = "/login">Login</Link>
        </nav>
        <Routes>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/signup" element = {<Signup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
