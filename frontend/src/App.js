import "./App.css";
import UserRegistration from "./component/UserRegistration/UserRegistration";
import LoginComponent from "./component/UserLogin/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgetPassword from "./component/ForgetPassword/ForgetPassword";
import ResetPassword from "./component/ResetPassword/ResetPassword";
import VerifyToken from "./component/ForgetPassword/VerifyToken";
import ChatComponent from "./component/ChatComponent/ChatComponent";

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-token/:token" element={<VerifyToken />} />
        <Route path="/chat" element={<ChatComponent/>} />
        <Route path="/Login" element={<LoginComponent />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
