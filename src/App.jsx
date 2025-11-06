import { useState } from 'react';
import './App.css';
import HeadMusic from './components/HeaderMusic/HeaderMusic.jsx';
import PlayerPanel from './components/PlayerPanel/PlayerPanel.jsx';
import LibraryMusic from './components/LibraryMusic/LibraryMusic.jsx';

function App() {

  return (
    <div style={{display:"flex", width:"100%", flexDirection:"column", alignItems:"center"}}>
      <HeadMusic />
      <PlayerPanel />
      <LibraryMusic />
    </div>
  )
}

export default App
