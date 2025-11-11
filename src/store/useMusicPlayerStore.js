/**
 * @file useMusicPlayerStore.js
 * @brief Implementación del store de Zustand para el estado global del reproductor de música.
 *
 * Este archivo define un store de Zustand que centraliza todo el estado relacionado
 * con el reproductor de música. Esto incluye la canción actual, el estado de
 * reproducción, la lista de reproducción, el volumen, y más. También define las
 * acciones que se pueden realizar para modificar dicho estado.
 */

import { create } from 'zustand';

/**
 * @store useMusicPlayerStore
 * @description Store de Zustand para gestionar el estado del reproductor de música.
 *
 * Utiliza `create` de Zustand para definir un hook que los componentes pueden usar
 * para acceder y modificar el estado del reproductor de forma centralizada.
 *
 * @param {function} set - Función para actualizar el estado del store.
 * @param {function} get - Función para obtener el estado actual del store.
 * @returns {object} El objeto del store con el estado y las acciones.
 */
export const useMusicPlayerStore = create((set, get) => ({
  // --- ESTADO ---

  /** @type {object|null} La canción que se está reproduciendo actualmente. */
  currentSong: null,
  /** @type {boolean} Verdadero si la música se está reproduciendo. */
  isPlaying: false,
  /** @type {number} El progreso de la canción actual (0 a 1). */
  progress: 0,
  /** @type {number} El volumen del reproductor (0 a 1). */
  volume: 0.8,
  /** @type {number} El tiempo de reproducción actual en segundos. */
  currentTime: 0,
  /** @type {number} La duración total de la canción actual en segundos. */
  duration: 0,
  /** @type {Array<object>} La lista de canciones actual. */
  playlist: [],
  /** @type {number} El índice de la canción actual en la lista de reproducción. */
  currentIndex: -1,
  /** @type {HTMLAudioElement|null} Referencia al elemento de audio. */
  audioRef: null,
  
  // --- ACCIONES ---

  /**
   * @action setAudioRef
   * @description Almacena la referencia al elemento `<audio>` en el estado.
   * @param {HTMLAudioElement} ref - La referencia al elemento de audio.
   */
  setAudioRef: (ref) => set({ audioRef: ref }),
  
  /**
   * @action setCurrentSong
   * @description Establece la canción actual y comienza la reproducción.
   * @param {object} song - El objeto de la canción a reproducir.
   * @param {number} index - El índice de la canción en la lista de reproducción.
   */
  setCurrentSong: (song, index) => {
    set({ 
      currentSong: song, 
      currentIndex: index,
      isPlaying: true,
      progress: 0,
      currentTime: 0
    });
  },
  
  /**
   * @action setPlaylist
   * @description Establece la lista de reproducción actual.
   * @param {Array<object>} playlist - La nueva lista de reproducción.
   */
  setPlaylist: (playlist) => set({ playlist }),
  
  /**
   * @action togglePlay
   * @description Alterna entre el estado de reproducción y pausa.
   */
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  /**
   * @action play
   * @description Inicia la reproducción.
   */
  play: () => {
    set({ isPlaying: true });
  },
  
  /**
   * @action pause
   * @description Pausa la reproducción.
   */
  pause: () => {
    set({ isPlaying: false });
  },
  
  /**
   * @action setVolume
   * @description Ajusta el volumen del reproductor.
   * @param {number} volume - El nuevo nivel de volumen (0 a 1).
   */
  setVolume: (volume) => set({ volume }),
  
  /**
   * @action setProgress
   * @description Actualiza el progreso de la canción.
   * @param {number} progress - El nuevo progreso (0 a 1).
   */
  setProgress: (progress) => set({ progress }),
  
  /**
   * @action setCurrentTime
   * @description Actualiza el tiempo de reproducción actual.
   * @param {number} currentTime - El nuevo tiempo en segundos.
   */
  setCurrentTime: (currentTime) => set({ currentTime }),
  
  /**
   * @action setDuration
   * @description Establece la duración de la canción actual.
   * @param {number} duration - La duración total en segundos.
   */
  setDuration: (duration) => set({ duration }),
  
  /**
   * @action nextSong
   * @description Cambia a la siguiente canción en la lista de reproducción.
   * Si llega al final, vuelve al principio (loop).
   */
  nextSong: () => {
    const { playlist, currentIndex } = get();
    if (playlist.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextSong = playlist[nextIndex];
    
    set({ 
      currentIndex: nextIndex,
      currentSong: nextSong,
      isPlaying: true,
      progress: 0,
      currentTime: 0
    });
  },

  /**
   * @action toggleFavorite
   * @description Alterna el estado de favorito de la canción actual.
   */
  toggleFavorite: () => {
    const { currentSong, playlist } = get();
    if (!currentSong) return;

    const newPlaylist = playlist.map(song => {
      if (song.id === currentSong.id) {
        return { ...song, favorite: !song.favorite };
      }
      return song;
    });

    set({
      playlist: newPlaylist,
      currentSong: {
        ...currentSong,
        favorite: !currentSong.favorite,
      },
    });
  },

  /**
   * @action previousSong
   * @description Cambia a la canción anterior en la lista de reproducción.
   * Si está en la primera canción, va a la última (loop).
   */
  previousSong: () => {
    const { playlist, currentIndex } = get();
    if (playlist.length === 0) return;
    
    const prevIndex = currentIndex === 0 
      ? playlist.length - 1 
      : currentIndex - 1;
    const prevSong = playlist[prevIndex];
    
    set({ 
      currentIndex: prevIndex,
      currentSong: prevSong,
      isPlaying: true,
      progress: 0,
      currentTime: 0
    });
  }
}));