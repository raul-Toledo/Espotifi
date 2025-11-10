/**
 * @file songsData.js
 * @brief Archivo de datos que contiene la lista de canciones para la aplicación.
 *
 * Este archivo exporta un arreglo de objetos, donde cada objeto representa una canción
 * con sus metadatos correspondientes, como título, artista, álbum, y las rutas
 * a los archivos de audio e imágenes de portada.
 * Funciona como una base de datos estática para la aplicación.
 */

import blahBlahBlah from '../assets/blah-blah-blah.mp3';
import crystals from '../assets/crystals.mp3';
import edgeRunner from '../assets/edge-runner.mp3';
import rasputinRemix from '../assets/rasputin-remix.mp3';
import specialz from '../assets/specialz.mp3';


import balance from '../assets/balance.jpg';
import crystalsCover from '../assets/crystals.jpg';
import thisFffire from '../assets/this-fffire.jpg';
import rasputinCover from '../assets/rasputin.jpg';
import specialzCover from '../assets/maxresdefault.jpg';


import armin from '../assets/Armin-van-Buuren.jpg';
import majestic from '../assets/majestic.jpg';
import franz from '../assets/Franz-Ferdinand.jpg';
import king from '../assets/King-Gnu.jpg';
import david from '../assets/TTG.jpg';

/**
 * @type {Array<object>}
 * @description Un arreglo de objetos que representa la lista de canciones disponibles en la aplicación.
 * Cada objeto en el arreglo es una canción y contiene todos los metadatos necesarios para
 * ser mostrada y reproducida.
 *
 * @property {string} id - Identificador único para la canción.
 * @property {string} title - El título de la canción.
 * @property {string} artist - El nombre del artista o banda.
 * @property {string} album - El nombre del álbum al que pertenece la canción.
 * @property {string} year - El año de lanzamiento de la canción.
 * @property {string} duration - La duración de la canción en formato "mm:ss".
 * @property {string} plays - El número de reproducciones de la canción (como cadena de texto).
 * @property {string} filePath - La ruta al archivo de audio MP3 de la canción, importado localmente.
 * @property {string} cover - La ruta a la imagen de la portada del álbum, importada localmente.
 * @property {string} artistImage - La ruta a la imagen del artista, importada localmente.
 */
export const songsData = [
  {
    id: "1",
    title: "Blah Blah Blah",
    artist: "Armin van Buuren",
    album: "Balance",
    year: "2019",
    duration: "3:45",
    plays: "12345",
    filePath: blahBlahBlah,
    cover: balance,
    artistImage: armin
  },
  {
    id: "2",
    title: "Crystals",
    artist: "Isak Danielson", 
    album: "Yours",
    year: "2018",
    duration: "4:20",
    plays: "62701",
    filePath: crystals,
    cover: crystalsCover,
    artistImage: david
  },
  {
    id: "3",
    title: "Edge Runners",
    artist: "Franz Ferdinand",
    album: "Tonight: Franz Ferdinand",
    year: "2009",
    duration: "4:00", 
    plays: "54321",
    filePath: edgeRunner,
    cover: thisFffire,
    artistImage: franz
  },
  {
    id: "4", 
    title: "Rasputin Remix",
    artist: "Majestic",
    album: "Rasputin",
    year: "2021",
    duration: "4:30",
    plays: "98765",
    filePath: rasputinRemix,
    cover: rasputinCover,
    artistImage: majestic
  },
  {
    id: "5",
    title: "SpecialZ", 
    artist: "King Gnu",
    album: "Ceremony",
    year: "2023",
    duration: "3:50",
    plays: "45678",
    filePath: specialz,
    cover: specialzCover,
    artistImage: king
  }
];