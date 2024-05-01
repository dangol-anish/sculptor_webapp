// App.jsx
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Protected from "./components/Protected";
import Public from "./components/Public";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Public />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<Landing />} />
        </Route>

        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
