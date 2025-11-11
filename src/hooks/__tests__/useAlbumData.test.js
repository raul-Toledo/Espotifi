import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useAlbumData } from '../useAlbumData';
import { useMusicPlayerStore } from '../../store/useMusicPlayerStore';
import Once from '../../assets/once.jpg';
import Nightwish from '../../assets/nightwish.jpg';

// Mock the store
vi.mock('../../store/useMusicPlayerStore');

describe('useAlbumData', () => {
  it('should return default album data when no song is playing', () => {
    // Mock the store's return value for this test
    useMusicPlayerStore.mockReturnValue({
      currentSong: null,
      playlist: [],
    });

    const { result } = renderHook(() => useAlbumData());

    expect(result.current).toEqual({
      name: "Once",
      artist: "Nightwish",
      year: "2004",
      songCount: "11 canciones",
      duration: "1 hora",
      cover: Once,
      artistImage: Nightwish,
      isFavorite: false
    });
  });

  it('should return current album data when a song is playing', () => {
    const currentSong = {
      id: 1,
      title: 'Dark Chest of Wonders',
      artist: 'Nightwish',
      album: 'Once',
      year: '2004',
      time: '4:28',
      cover: 'once.jpg',
      artistImage: 'nightwish.jpg',
      isFavorite: true,
    };
    const playlist = [
      currentSong,
      { id: 2, title: 'Wish I Had an Angel', time: '4:06' },
      { id: 3, title: 'Nemo', time: '4:36' },
    ];

    // Mock the store's return value for this test
    useMusicPlayerStore.mockReturnValue({
      currentSong,
      playlist,
    });

    const { result } = renderHook(() => useAlbumData());

    expect(result.current.name).toBe('Once');
    expect(result.current.artist).toBe('Nightwish');
    expect(result.current.year).toBe('2004');
    expect(result.current.songCount).toBe('3 canciones');
    expect(result.current.duration).toBe('13 min'); // 4:28 + 4:06 + 4:36 = 13:10
    expect(result.current.cover).toBe('once.jpg');
    expect(result.current.artistImage).toBe('nightwish.jpg');
    expect(result.current.isFavorite).toBe(true);
  });

  it('should handle playlist with songs without time property', () => {
    const currentSong = {
        id: 1,
        title: 'Dark Chest of Wonders',
        artist: 'Nightwish',
        album: 'Once',
        year: '2004',
        time: '4:28',
        cover: 'once.jpg',
        artistImage: 'nightwish.jpg',
        isFavorite: true,
      };
      const playlist = [
        currentSong,
        { id: 2, title: 'Wish I Had an Angel' },
        { id: 3, title: 'Nemo', time: '4:36' },
      ];
  
      useMusicPlayerStore.mockReturnValue({
        currentSong,
        playlist,
      });
  
      const { result } = renderHook(() => useAlbumData());
  
      expect(result.current.duration).toBe('9 min'); // 4:28 + 4:36 = 9:04
  });

  it('should return "0 min" for empty playlist', () => {
    useMusicPlayerStore.mockReturnValue({
        currentSong: { id: 1, title: 'Test' },
        playlist: [],
      });
  
      const { result } = renderHook(() => useAlbumData());
  
      expect(result.current.duration).toBe('0 min');
      expect(result.current.songCount).toBe('0 canciones');
  });
});
