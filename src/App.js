import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import {Home} from "./Pages/Home"
import {Login} from "./Pages/Login"
import {Signup} from "./Pages/Signup"
import {Featured} from "./Pages/Featured"
import {Post} from "./Pages/Post"
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/signup" element = {<Signup/>}/>
          <Route path = "/featured" element = {<Featured/>}/>
          <Route path = "/post" element = {<Post/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
