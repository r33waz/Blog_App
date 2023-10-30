import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from './components/authentication/login'
import Signup from './components/authentication/signup'


function App() {
  return (
    <>
      <Routes>
        <Route path="/blog/login" element={<Login/>} />
        <Route path="/blog/signup" element={<Signup/>} />
      </Routes>
    </>
  );
}

export default App;
