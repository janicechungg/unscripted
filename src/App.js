import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { YourPosts } from "./Pages/YourPosts";
import { Post } from "./Pages/Post";
import { Profile } from "./Pages/Profile";
import { SinglePost } from "./Pages/SinglePost";  // Import the SinglePost component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const user = localStorage.getItem("token");
  return (
    <div className="App">
      <Router>
        <Routes>
          {user && <Route path="/" exact element={<Home />} />}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/your-posts" element={<YourPosts />} />
          <Route path="/post" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:id" element={<SinglePost />} />  // Add route for SinglePost
          <Route path="/" exact element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
