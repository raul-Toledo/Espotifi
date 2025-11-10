import { useState } from 'react';
import './App.css';
import HeadMusic from './components/HeaderMusic/HeaderMusic.jsx';
import PlayerPanel from './components/PlayerPanel/PlayerPanel.jsx';
import LibraryMusic from './components/LibraryMusic/LibraryMusic.jsx';

/**
 * @function App
 * @description Componente principal de la aplicación Espotifi.
 * Este componente funge como el contenedor principal que organiza y muestra las diferentes
 * secciones de la interfaz de usuario, incluyendo la cabecera, el panel de reproducción
 * y la biblioteca de música.
 *
 * @returns {JSX.Element} El elemento JSX que representa la aplicación completa.
 */
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
