import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import UserDetails from "./components/userDetails";
import UpdateUser from "./components/updateUser";

function App() {
  // Check if user is logged in by checking the value of "loggedIn" in localStorage
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            {/* Define routes */}
            <Routes>
              {/* Route for the home page */}
              {/* If user is logged in, show UserDetails component, else show Login component */}
              <Route exact path="/" element={isLoggedIn == "true" ? <UserDetails/> : < Login/>}/>
              {/* Route for the sign-in page */}
              <Route path="/sign-in" element={<Login />} />
              {/* Route for the sign-up page */}
              <Route path="/sign-up" element={<SignUp />} />
              {/* Route for the user details page */}
              <Route path="/userDetails" element={<UserDetails />} />
              {/* Route for the update user page */}
              <Route path="/updateUser" element={<UpdateUser />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
