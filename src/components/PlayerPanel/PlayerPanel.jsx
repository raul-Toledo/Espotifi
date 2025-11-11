/**
 * @file PlayerPanel.jsx
 * @brief Componente que renderiza el panel de control del reproductor de música.
 * 
 * Este archivo define el componente `PlayerPanel`, que proporciona los controles
 * de reproducción de música como reproducir, pausar, detener, y cambiar de canción.
 * Utiliza el estado global manejado por `useMusicPlayerStore` para controlar la
 * reproducción y el hook `useAudioPlayer` para interactuar con el elemento de audio HTML5.
 */

import './PlayerPanel.css';
import React from 'react';
import { useMusicPlayerStore } from '../../store/useMusicPlayerStore';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import Left from './assets/left.png';
import Right from './assets/right.png';
import Play from './assets/play.png';
import Pause from './assets/pause.png';
import Stop from './assets/stop.png';
import Love from './assets/love.png';
import Unlove from './assets/like.png';

/**
 * @component PlayerPanel
 * @description Un componente funcional de React que renderiza los controles del reproductor de música.
 * 
 * El panel incluye botones para:
 * - Canción anterior
 * - Reproducir/Pausar
 * - Detener
 * - Siguiente canción
 * - Marcar como "me gusta" (funcionalidad visual)
 * 
 * El estado de la reproducción (canción actual, si se está reproduciendo, etc.) se
 * obtiene del store de Zustand `useMusicPlayerStore`. Las acciones de control de
 * audio (como `play`, `pause`) se delegan al hook `useAudioPlayer` que maneja
 * el elemento `<audio>`.
 * 
 * @returns {JSX.Element} El elemento JSX que representa el panel de control.
 */
const PlayerPanel = () => {
    /**
     * @description Hook que proporciona una referencia al elemento `<audio>`.
     * @type {{audioRef: React.RefObject<HTMLAudioElement>}}
     */
    const { audioRef } = useAudioPlayer();

    /**
     * @description Hook que conecta el componente al store de Zustand para el estado del reproductor.
     * @type {object}
     * @property {object|null} currentSong - La canción que se está reproduciendo actualmente o null si no hay ninguna.
     * @property {boolean} isPlaying - Verdadero si una canción se está reproduciendo.
     * @property {function} togglePlay - Función para alternar entre reproducir y pausar.
     * @property {function} nextSong - Función para pasar a la siguiente canción de la lista.
     * @property {function} previousSong - Función para volver a la canción anterior.
     * @property {function} pause - Función para pausar la reproducción.
     * @property {boolean} isFavorite - Verdadero si la canción actual es marcada como favorita.
     * @property {function} toggleFavorite - Función para alternar entre marcar y desmarcar como favorita.
     */
    const {
        currentSong,
        isPlaying,
        togglePlay,
        nextSong,
        previousSong,
        pause,
        toggleFavorite
    } = useMusicPlayerStore();

    /**
     * @function handleStop
     * @description Maneja el evento de clic en el botón de detener.
     * Pausa la reproducción y reinicia el tiempo de la canción actual a 0.
     */
    const handleStop = () => {
        pause();
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    };

    // Si no hay una canción seleccionada, se muestra un panel de control deshabilitado/vacío.
    // Esto previene errores y proporciona una retroalimentación visual al usuario.
    if (!currentSong) {
        return (
            <div className="panel-button">
                <img src={Left} alt="Anterior" className="button-image" />
                <img src={Play} alt="Reproducir" className="button-image" />
                <img src={Stop} alt="Detener" className="button-image" />
                <img src={Right} alt="Siguiente" className="button-image" />
                <img src={Unlove} alt="Me gusta" className="button-image" />
            </div>
        );
    }

    return (
        <div className="panel-button">
            {/* El elemento <audio> es el núcleo del reproductor. Está oculto a la vista
                pero es controlado programáticamente a través de su referencia (audioRef). */}
            <audio 
                ref={audioRef} 
                preload="metadata"
            />
            
            {/* Botón para la canción anterior */}
            <img 
                src={Left} 
                alt="Anterior" 
                className="button-image" 
                onClick={previousSong}
                style={{ cursor: 'pointer' }}
            />
            
            {/* Botón de Reproducir/Pausar: cambia su ícono dependiendo del estado 'isPlaying' */}
            {isPlaying ? 
                <img 
                    src={Pause} 
                    alt="Pausar" 
                    className="button-image" 
                    onClick={togglePlay}
                    style={{ cursor: 'pointer' }}
                /> : 
                <img 
                    src={Play} 
                    alt="Reproducir" 
                    className="button-image" 
                    onClick={togglePlay}
                    style={{ cursor: 'pointer' }}
                />
            }
            
            {/* Botón para detener la canción */}
            <img 
                src={Stop} 
                alt="Detener" 
                className="button-image" 
                onClick={handleStop}
                style={{ cursor: 'pointer' }}
            />
            
            {/* Botón para la siguiente canción */}
            <img 
                src={Right} 
                alt="Siguiente" 
                className="button-image" 
                onClick={nextSong}
                style={{ cursor: 'pointer' }}
            />
            
            {/* Botón de "Me gusta" */}
            <img 
                src={currentSong.favorite ? Love : Unlove} 
                alt="Me gusta" 
                className="button-image" 
                onClick={toggleFavorite}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

export default PlayerPanel;