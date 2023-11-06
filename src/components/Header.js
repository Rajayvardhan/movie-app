import React, { useContext } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from "react-router-dom";
import { appstate } from "../App";
export default function Header() {
  const appState = useContext(appstate)
  return (
    <div className="text-3xl header sticky z-10 font-bold p-3 border-b-2 border-gray-500 flex justify-between items-center  ">
      <Link to={"/"}>  <span className="text-red-500 ">Filmy <span>Verse</span></span></Link >
      {appState.login ?
        <Link to="/addmovie" > <h1 className="text-lg cursor-pointer"> <AddCircleIcon className="mr-2" />Add new</h1></Link>
        :
        <Link to="/login" className="text-lg bg-green-600 cursor-pointer border"><button><span className="text-white font-medium " >Login</span> </button></Link>

      }
    </div>
  );
}
