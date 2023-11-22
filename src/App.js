import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes,  } from "react-router-dom";
import Header from './components/Header';
import Navbar from './components/navbar';
import CreateFlashCard from './pages/CreateFlashCard';
import MyFlashCard from './pages/MyFlashCard';
import FlashCardDetails from './pages/FlashCardDetails';


function App() {
  const [mode, setMode]=useState('white') 

  const toggleMode=()=>{   //this is to change toggle the background color
    if (mode ==='white'){
      setMode('bg-slate-800')
      document.body.style.backgroundColor = "rgb(15 23 42)"
    } else{
      setMode('white')
      document.body.style.backgroundColor = "rgb(246, 238, 240)"
    }
  }

  return (
    <BrowserRouter>
    <div >
      <Navbar mode={mode} toggleMode={toggleMode} />
      <Header mode={mode}/>
    <Routes>
      <Route path="/" element={<CreateFlashCard mode={mode} />}/> {/*giving defult path to createflashcard  */}
      <Route path='/MyFlashCard' element={<MyFlashCard mode={mode} />}/>
      <Route path="/FlashCardDetails/:groupId" element={<FlashCardDetails mode={mode}/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}
export default App;
