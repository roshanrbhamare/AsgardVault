import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import AllPasswords from "./pages/AllPasswords";
import EditPassword from "./pages/EditPassword";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages without navbar (optional) */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Pages with navbar layout */}
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/passwords"
          element={
            <Layout>
              <AllPasswords />
            </Layout>
          }
        />
        <Route
          path="/passwords/edit/:id"
          element={
            <Layout>
              <EditPassword />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
