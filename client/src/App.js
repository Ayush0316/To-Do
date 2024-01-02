import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing/LandingPage";
import User from './pages/User/user';
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

function App() {
  return (
    <Routes>
      <Route path="/user" element={<User></User>}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path='/signup' element={<SignupPage></SignupPage>}></Route>      
      <Route path="/*" element={<LandingPage/>}></Route>
    </Routes>
  );
}

export default App;
