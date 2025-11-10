/**
 * @file useAlbumData.js
 * @brief Hook de React para obtener y procesar los datos de un álbum.
 * 
 * Este hook se encarga de consolidar y presentar la información del álbum
 * que se está reproduciendo actualmente. Si no hay ninguna canción en reproducción,
 * muestra los datos de un álbum predeterminado.
 * Calcula dinámicamente la duración total del álbum y el número de canciones.
 */

import { useMusicPlayerStore } from '../store/useMusicPlayerStore';
import Once from '../assets/once.jpg';
import Nightwish from '../assets/nightwish.jpg';

/**
 * @hook useAlbumData
 * @description Un hook personalizado que provee datos sobre el álbum actual.
 * 
 * Este hook consume el estado del `useMusicPlayerStore` para acceder a la canción
 * y lista de reproducción actuales. Basado en esta información, construye un objeto
 * con los detalles del álbum.
 * 
 * Si hay una canción en reproducción (`currentSong`), el hook extrae los metadatos
 * del álbum de esa canción y de la lista de reproducción (`playlist`).
 * Si no hay ninguna canción, retorna un objeto con datos de un álbum por defecto.
 * 
 * @returns {object} Un objeto con la información del álbum a mostrar.
 * @property {string} name - Nombre del álbum.
 * @property {string} artist - Nombre del artista.
 * @property {string} year - Año de lanzamiento del álbum.
 * @property {string} songCount - Número de canciones en el álbum.
 * @property {string} duration - Duración total del álbum, calculada dinámicamente.
 * @property {string} cover - URL de la imagen de la portada del álbum.
 * @property {string} artistImage - URL de la imagen del artista.
 */
export const useAlbumData = () => {
  const { currentSong, playlist } = useMusicPlayerStore();

  /**
   * @function calculateTotalDuration
   * @description Calcula la duración total de una lista de canciones.
   * Suma la duración de cada canción en la lista de reproducción. El formato de tiempo
   * de cada canción debe ser "mm:ss".
   * 
   * @param {Array<object>} songs - La lista de canciones (playlist).
   * @returns {string} Una cadena de texto formateada que representa la duración total 
   * (ej. "1 hora 20 min", "55 min").
   */
  const calculateTotalDuration = (songs) => {
    if (!songs || songs.length === 0) return "0 min";
    
    const totalSeconds = songs.reduce((total, song) => {
      if (song.time) {
        const [minutes, seconds] = song.time.split(':').map(Number);
        return total + (minutes * 60) + seconds;
      }
      return total;
    }, 0);
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hora' : 'horas'} ${minutes > 0 ? `${minutes} min` : ''}`.trim();
    }
    return `${minutes} min`;
  };

  /**
   * @description Objeto que contiene los datos de un álbum por defecto.
   * Se utiliza cuando no hay ninguna canción seleccionada en el reproductor.
   * @type {object}
   */
  const defaultAlbum = {
    name: "Once",
    artist: "Nightwish", 
    year: "2004",
    songCount: "11 canciones",
    duration: "1 hora",
    cover: Once,
    artistImage: Nightwish
  };

  /**
   * @description Lógica para determinar qué datos de álbum mostrar.
   * Si `currentSong` existe, se construye un objeto con los datos del álbum actual.
   * De lo contrario, se utiliza `defaultAlbum`.
   * @type {object}
   */
  const currentAlbumData = currentSong ? {
    name: currentSong.album || "Álbum Desconocido",
    artist: currentSong.artist || "Artista Desconocido",
    year: currentSong.year || "Año Desconocido",
    songCount: playlist.length > 0 ? `${playlist.length} ${playlist.length === 1 ? 'canción' : 'canciones'}` : "0 canciones",
    duration: calculateTotalDuration(playlist),
    cover: currentSong.cover || Once,
    artistImage: currentSong.artistImage
  } : defaultAlbum;

  return currentAlbumData;
};