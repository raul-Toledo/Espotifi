import React from 'react';
import { useAlbumData } from '../../hooks/useAlbumData';
import './HeaderMusic.css';

/**
 * @file HeadMusic.jsx
 * @brief Componente para mostrar la cabecera de la información de un álbum de música.
 * 
 * Este componente renderiza la portada del álbum, el nombre del álbum, el artista,
 * el año de lanzamiento, el número de canciones y la duración total.
 * Utiliza el hook personalizado `useAlbumData` para obtener los datos del álbum.
 */

/**
 * @component HeadMusic
 * @description Un componente funcional de React que muestra la información principal de un álbum.
 * 
 * @returns {JSX.Element} El elemento JSX que representa la cabecera del álbum.
 * 
 * @example
 * //Uso del componente
 * <HeadMusic />
 */
const HeadMusic = () => {
  /**
   * @description Hook personalizado que provee los datos del álbum.
   * @type {object}
   * @property {string} cover - URL de la imagen de la portada del álbum.
   * @property {string} name - Nombre del álbum.
   * @property {string} artist - Nombre del artista.
   * @property {string} artistImage - URL de la imagen del artista.
   * @property {number} year - Año de lanzamiento del álbum.
   * @property {string} songCount - Número de canciones en el álbum.
   * @property {string} duration - Duración total del álbum.
   */
  const albumData = useAlbumData();

  return (
    <div className='header-music'>
      <div>
        <img 
          className="album-cover" 
          src={albumData.cover} 
          alt={`Portada de ${albumData.name}`}
        />
      </div>
      <div className='album-info'>
        <p className='album-text'>Álbum</p>
        <p className='album-TextAlbum'>{albumData.name}</p>
        <div className='album-song'>
          <img 
            className="artist-image" 
            src={albumData.artistImage} 
            alt={albumData.artist}
          /> 
          <p>{albumData.artist}</p>
          <p>♪</p> 
          <p>{albumData.year}</p>
          <p>♪</p> 
          <p>{albumData.songCount}, {albumData.duration}</p>
        </div>
      </div>
    </div>
  );
};

export default HeadMusic;