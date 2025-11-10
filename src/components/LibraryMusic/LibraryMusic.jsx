/**
 * @file LibraryMusic.jsx
 * @brief Renderiza la biblioteca de canciones del reproductor de música.
 * 
 * Este archivo contiene dos componentes principales: `LibraryMusic` y `RowComponent`.
 * `LibraryMusic` es el contenedor principal que muestra la lista de canciones,
 * utilizando `react-window` para una virtualización eficiente que permite manejar
 * grandes listas de canciones con un rendimiento óptimo.
 * `RowComponent` es el componente que renderiza cada fila individual en la lista,
 * mostrando los detalles de la canción y manejando las interacciones del usuario.
 */

import {React, useState, useEffect} from 'react';
import { getScrollbarSize, List } from "react-window";
import { useMusicPlayerStore } from '../../store/useMusicPlayerStore';
import './LibraryMusic.css';
import { songsData } from '../../data/songsData';

/**
 * @function RowComponent
 * @description Representa una fila individual en la lista de canciones. 
 * Muestra la información de una canción y gestiona la interacción del usuario, 
 * como hacer clic para reproducir. La fila cambia de apariencia si es la canción
 * que se está reproduciendo actualmente.
 *
 * @param {object} props - Propiedades pasadas al componente por `react-window`.
 * @param {Array<object>} props.musicList - La lista completa de canciones de la cual se extrae la canción a renderizar.
 * @param {number} props.index - El índice de la canción actual en la `musicList`. `react-window` provee este prop para cada fila.
 * 
 * @returns {JSX.Element} Un elemento JSX que representa una fila de la tabla de música, listo para ser renderizado por `List` de `react-window`.
 */
function RowComponent(props) {
  const { setCurrentSong, setPlaylist, currentSong } = useMusicPlayerStore();
  const song = props.musicList[props.index];
  
  const rowColorClass = props.index % 2 === 0 ? "bg-zinc-700" : "bg-zinc-800";
  const isActive = currentSong?.id === song.id;

  /**
   * @function handleClick
   * @description Manejador de eventos para el clic en una fila.
   * Cuando un usuario hace clic en una canción de la lista, esta función se encarga de:
   * 1. Actualizar la lista de reproducción global (`playlist`) en el store de Zustand con la lista de canciones actual.
   * 2. Establecer la canción seleccionada (`song`) como la canción actual (`currentSong`) en el store, pasando también su índice.
   * Esto permite que el reproductor de música sepa qué canción reproducir y cuál es su contexto dentro de la lista.
   */
  const handleClick = () => {
    setPlaylist(props.musicList);
    setCurrentSong(song, props.index);
  };

  return (
    <div 
      className={`grow flex flex-row font-bold ${rowColorClass} hover:bg-zinc-600 transition duration-150 ease-in-out cursor-pointer ${isActive ? 'bg-green-900' : ''}`}
      onClick={handleClick}
    >
      <div className="w-5 text-center">
        <p className="font-extralight inline-block align-middle">
          {isActive ? '▶' : song.id}
        </p>
      </div>
      <div className="flex-1 text-left">
        <p className={isActive ? 'text-green-400' : ''}>{song.title}</p> 
        <p className="font-extralight text-shadow-md text-sm">{song.artist}</p>
      </div>
      <div className="flex-1">
        <p className="font-extralight inline-block align-middle">{song.count}</p>
      </div>
      <div className="w-10 text-center">
        <p className="font-extralight inline-block align-middle">{song.time}</p>
      </div>
    </div>
  );
}

/**
 * @function LibraryMusic
 * @description Componente principal que renderiza la biblioteca de música completa.
 * Este componente está diseñado para ser altamente eficiente, mostrando una lista potencialmente
 * muy larga de canciones sin degradar el rendimiento de la aplicación. Para lograrlo,
 * utiliza la técnica de "windowing" o virtualización a través de la librería `react-window`.
 * Esto significa que solo se renderizan en el DOM las filas que son visibles para el usuario,
 * reciclando los nodos a medida que el usuario se desplaza.
 * 
 * El componente consiste en una cabecera de tabla fija y una lista virtualizada de canciones.
 * 
 * @returns {JSX.Element} Un elemento JSX que representa la biblioteca de música completa,
 * incluyendo la cabecera de la tabla y la lista de canciones.
 */
const LibraryMusic = () => {
    const [size, setSize] = useState(getScrollbarSize);
    const musicList = songsData;

    return(
    <div className="h-full w-full flex flex-col grow text-white ">
      <div className="flex flex-row bg-teal-950 rounded-t-md">
        <div className="grow flex flex-row font-bold">
          <div className="w-5 text-center"><p>#</p></div>
          <div className="flex-1 text-left"><p>Titulo</p></div>
          <div className="flex-1"><p>Reproducciones</p></div>
          <div className="w-10 text-center"><p>🕑</p></div>
        </div>
        <div className="shrink" style={{ width: size }} />
      </div>  
      <div className="overflow-hidden">
        <List
          rowComponent={RowComponent}
          rowCount={musicList.length}
          rowHeight={25}
          rowProps={{ musicList }}
        />
      </div>
    </div>
    );
};

export default LibraryMusic;