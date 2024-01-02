import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing/LandingPage";
import User from './pages/User/user';
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuth(!!token);
  }, []);

  return (
    <Routes>
      <Route path="/user" element={(isAuthenticated)?<User></User> : <LoginPage setAuth={setAuth} />}></Route>
      <Route path="/login" element={<LoginPage setAuth={setAuth}/>}></Route>
      <Route path='/signup' element={<SignupPage setAuth={setAuth}></SignupPage>}></Route>      
      <Route path="/*" element={<LandingPage/>}></Route>
    </Routes>
  );
}

export default App;
