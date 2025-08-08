import { useState } from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

function App() {
  const [searchText, setSearchText] = useState("");
     const[isOpen,setIsOpen] = useState(false)   
  return (
    <>
      <Header searchText={searchText} onSearchChange={setSearchText} isOpen={isOpen} setIsOpen={setIsOpen} />
      <Outlet context={{ searchText,isOpen }} />
    </>
  );
}

export default App;
