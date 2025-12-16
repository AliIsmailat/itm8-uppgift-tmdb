// browserrouter får tillgång till URL:en

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import ActorDetails from "./pages/ActorDetails";
import Layout from "./components/layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Favorites from "./pages/Favorites";
// import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/actor/:id" element={<ActorDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
