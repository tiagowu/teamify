import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp";
import Team from "./pages/Team";

import PersistLogin from "./components/PersistLogin";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<PublicRoute />}>
            <Route exact path="/" element={<Login />} />
            <Route exact path="signup" element={<SignUp />} />
          </Route>

          <Route
            element={
              <>
                <NavBar />
                <PrivateRoute />
              </>
            }
          >
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/team/:teamId" element={<Team />} />
          </Route>
          <Route exact path="*" element={<Error message="Sorry, this page isn't available." />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
