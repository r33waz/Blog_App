import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/authentication/login";
import Signup from "./components/authentication/signup";
import HomePage from "./pages/homepage";
import BlogLanding from "./pages/landingpage";
import { store, persistor } from "../store/store";
import NavBar from "./components/common/Navbar";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import CreateBlog from "./pages/Blogs/create_blogs";
import EiditBlog from "./pages/Blogs/eidit_blogs";
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavBar/>
          <Routes>
            <Route index path="/" element={<BlogLanding/>} />
              <Route index path="/blog/home" element={<HomePage />} />
              <Route path="/blog/login" element={<Login />} />
            <Route path="/blog/signup" element={<Signup />} />
            {/* BLog */}
            <Route path="/createblog" element={<CreateBlog />} />
            <Route path="/eiditblog/:id" element={<EiditBlog/>} />
          </Routes>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
