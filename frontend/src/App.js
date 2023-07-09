import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import SignUp from "./pages/SignUp";

import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route exact path="/" element={<Login />} />
          <Route exact path="signup" element={<SignUp />} />
        </Route>

        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="*" element={<Missing />} />
      </Routes>
    </Router>
  );
};

export default App;
