import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="sign-in" element={<SignIn />}></Route>
        <Route path="/" element={<Landing />}></Route>
      </Routes>
    </>
  );
}

export default App;
