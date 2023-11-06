
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cards from './components/Cards';
import Header from './components/Header';
import Addmovie from './components/Addmovie';
import Details from './components/Details';
import { createContext, useState } from 'react';
import Login from "./components/Login";
import Signup from "./components/Signup";

const appstate = createContext();
function App() {
  const [login, setlogin] = useState(false)
  const [username, setusername] = useState("")
  return (
    <appstate.Provider value={{ login, username, setusername, setlogin }}>

      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Cards />} />
          <Route exact path="/addmovie" element={<Addmovie />} />
          <Route exact path="/details/:id" element={<Details />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />



        </Routes>

      </div>
    </appstate.Provider>
  );
}

export default App;
export { appstate };
