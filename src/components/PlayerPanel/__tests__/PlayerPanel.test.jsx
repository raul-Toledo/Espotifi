import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import PlayerPanel from '../PlayerPanel';
import { useMusicPlayerStore } from '../../../store/useMusicPlayerStore';
import { useAudioPlayer } from '../../../hooks/useAudioPlayer';
import Unlove from '../assets/like.png';
// Mock the hooks
vi.mock('../../../store/useMusicPlayerStore');
vi.mock('../../../hooks/useAudioPlayer');

describe('PlayerPanel', () => {
  let mockAudioRef;
  let mockStoreState;

  beforeEach(() => {
    // Crea mocks frescos para cada prueba, asegurando el aislamiento.
    mockAudioRef = {
      current: {
        play: vi.fn(),
        pause: vi.fn(),
        currentTime: 0,
      },
    };

    mockStoreState = {
      currentSong: {
        id: '1',
        title: 'Test Song',
        artist: 'Test Artist',
        favorite: false,
      },
      isPlaying: false,
      togglePlay: vi.fn(),
      nextSong: vi.fn(),
      previousSong: vi.fn(),
      pause: vi.fn(),
      toggleFavorite: vi.fn(),
      setAudioRef: vi.fn(),
    };

    // Configura los mocks antes de cada prueba
    useAudioPlayer.mockReturnValue({ audioRef: mockAudioRef });
    useMusicPlayerStore.mockReturnValue(mockStoreState);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders disabled panel when no song is selected', () => {
    // Sobrescribe el estado para esta prueba, asegurando que todas las propiedades
    // del mock estén presentes, pero con currentSong como null.
    useMusicPlayerStore.mockReturnValue({ ...mockStoreState, currentSong: null });
    render(<PlayerPanel />);
    expect(screen.getByAltText('Anterior')).toBeDefined();
    expect(screen.getByAltText('Reproducir')).toBeDefined();
    expect(screen.getByAltText('Detener')).toBeDefined();
    expect(screen.getByAltText('Siguiente')).toBeDefined();
    expect(screen.getByAltText('Me gusta')).toBeDefined();
  });

  it('renders enabled panel when a song is selected', () => {
    render(<PlayerPanel />); // Usa el estado por defecto de beforeEach
    expect(screen.getByAltText('Anterior')).toBeDefined();
    expect(screen.getByAltText('Reproducir')).toBeDefined();
    expect(screen.getByAltText('Detener')).toBeDefined();
    expect(screen.getByAltText('Siguiente')).toBeDefined();
    expect(screen.getByAltText('Me gusta')).toBeDefined();
  });

  it('calls togglePlay when play/pause button is clicked', () => {
    render(<PlayerPanel />);
    fireEvent.click(screen.getByAltText('Reproducir'));
    expect(mockStoreState.togglePlay).toHaveBeenCalledTimes(1);
  });

  it('shows pause button when isPlaying is true', () => {
    // Sobrescribe el estado solo para esta prueba
    useMusicPlayerStore.mockReturnValue({ ...mockStoreState, isPlaying: true });
    render(<PlayerPanel />);
    expect(screen.getByAltText('Pausar')).toBeDefined();
  });

  it('calls nextSong when next button is clicked', () => {
    render(<PlayerPanel />);
    fireEvent.click(screen.getByAltText('Siguiente'));
    expect(mockStoreState.nextSong).toHaveBeenCalledTimes(1);
  });

  it('calls previousSong when previous button is clicked', () => {
    render(<PlayerPanel />);
    fireEvent.click(screen.getByAltText('Anterior'));
    expect(mockStoreState.previousSong).toHaveBeenCalledTimes(1);
  });

  it('calls pause and resets currentTime when stop button is clicked', () => {
    render(<PlayerPanel />);
    fireEvent.click(screen.getByAltText('Detener'));
    expect(mockStoreState.pause).toHaveBeenCalledTimes(1);
    expect(mockAudioRef.current.currentTime).toBe(0);
  });

  it('calls toggleFavorite when favorite button is clicked', () => {
    render(<PlayerPanel />);
    fireEvent.click(screen.getByAltText('Me gusta'));
    expect(mockStoreState.toggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('shows filled heart when song is favorite', () => {
    useMusicPlayerStore.mockReturnValue({
      ...mockStoreState,
      currentSong: {
        ...mockStoreState.currentSong,
        favorite: true,
      },
    });
    render(<PlayerPanel />);
    expect(screen.getByAltText('Me gusta').getAttribute('src')).toContain('love.png');
  });

  it('shows unfilled heart when song is not favorite', () => {
    render(<PlayerPanel />);
    expect(screen.getByAltText('Me gusta').getAttribute('src')).toBe(Unlove);
  });
});
