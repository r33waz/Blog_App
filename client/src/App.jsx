import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from './components/authentication/login'
import Signup from './components/authentication/signup'
import HomePage from "./pages/homepage";
import BlogLanding from "./pages/landingpage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BlogLanding/>} />
        <Route path="/blog/login" element={<Login/>} />
        <Route path="/blog/signup" element={<Signup />} />
        <Route path="/blog/home" element={<HomePage/> } />
      </Routes>
    </>
  );
}

export default App;
