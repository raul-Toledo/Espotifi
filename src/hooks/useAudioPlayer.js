/**
 * @file useAudioPlayer.js
 * @brief Hook de React para la gestión del elemento de audio HTML5.
 *
 * Este hook es el núcleo de la funcionalidad de reproducción de audio. Se encarga de
 * crear una referencia al elemento `<audio>`, actualizar su fuente (`src`) cuando
 * cambia la canción, controlar la reproducción (play/pause) y sincronizar el estado
 * del reproductor con el store de Zustand.
 */

import { useEffect, useRef } from 'react';
import { useMusicPlayerStore } from '../store/useMusicPlayerStore';

/**
 * @hook useAudioPlayer
 * @description Hook personalizado para manejar la lógica del reproductor de audio.
 *
 * Este hook no renderiza ningún componente visual, sino que encapsula toda la
 * lógica de interacción con el `<audio>` tag de HTML5. Se comunica constantemente
 * con el `useMusicPlayerStore` para reaccionar a los cambios de estado (como
 * `currentSong`, `isPlaying`) y para actualizar el estado (como `duration`, `currentTime`).
 *
 * @returns {{audioRef: React.RefObject<HTMLAudioElement>}} Un objeto que contiene
 * la referencia (`ref`) al elemento de audio. Esta referencia se pasa al componente
 * `PlayerPanel` para que pueda asignarla a su elemento `<audio>`.
 */
export const useAudioPlayer = () => {
  const audioRef = useRef(null);
  const {
    currentSong,
    isPlaying,
    setAudioRef,
    nextSong,
    setDuration,
    setCurrentTime
  } = useMusicPlayerStore();

  /**
   * @effect
   * @description Almacena la referencia del elemento de audio en el store de Zustand.
   * Este efecto se ejecuta una vez que el componente que usa el hook se monta y
   * la referencia `audioRef` se ha creado. Permite que otras partes de la aplicación
   * accedan al elemento de audio a través del store si es necesario.
   */
  useEffect(() => {
    if (audioRef.current) {
      setAudioRef(audioRef.current);
    }
  }, [setAudioRef]);

  /**
   * @effect
   * @description Gestiona el cambio de la canción actual.
   * Este efecto se dispara cada vez que `currentSong` cambia. Se encarga de:
   * 1. Actualizar el atributo `src` del elemento de audio con la ruta del nuevo archivo.
   * 2. Cargar la nueva canción con `audio.load()`.
   * 3. Configurar los event listeners para la nueva canción:
   *    - `loadedmetadata`: para obtener la duración de la canción una vez que se carga.
   *    - `timeupdate`: para actualizar el tiempo de reproducción actual en el store.
   *    - `ended`: para pasar automáticamente a la siguiente canción cuando la actual termina.
   *    - `error`: para manejar posibles errores en la carga o reproducción.
   * 4. Limpiar los event listeners cuando el componente se desmonta o la canción cambia de nuevo.
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (audio.src !== currentSong.filePath) {
      audio.src = currentSong.filePath;
      audio.load();
      
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleEnded = () => {
        nextSong();
      };

      const handleError = (e) => {
        console.error('Error en el elemento de audio:', e);
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [currentSong, setDuration, setCurrentTime, nextSong]);

  /**
   * @effect
   * @description Controla la reproducción y pausa del audio.
   * Este efecto se dispara cuando el estado `isPlaying` o `currentSong` cambian.
   * Si `isPlaying` es verdadero, intenta reproducir el audio. Si es falso, lo pausa.
   * Incluye manejo de errores para la reproducción, ya que los navegadores pueden
   * bloquear la reproducción automática si no hay interacción del usuario.
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error('La reproducción automática falló:', error);
      }
    };

    if (isPlaying) {
      playAudio();
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  return { audioRef };
};