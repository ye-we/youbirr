import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import GetStarted from "./pages/getStarted/GetStarted";
import Home from "./pages/home/Home"; //must be uppercase
import { AuthContext } from "./context/AuthContext";
import Balance from "./pages/balance/Balance";

const App = () => {
  const { user } = useContext(AuthContext);
  // const user = "user";
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Landing />} />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/getStarted"
          element={user ? <Navigate to="/" /> : <GetStarted />}
        />
        <Route
          exact
          path="/balance"
          element={
            !user ? <Navigate to="/" /> : <Balance creator={user.isCreator} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
