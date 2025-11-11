import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useMusicPlayerStore } from '../useMusicPlayerStore';

describe('useMusicPlayerStore', () => {
  const initialState = useMusicPlayerStore.getState();
  beforeEach(() => {
    act(() => {
      useMusicPlayerStore.setState(initialState, true);
    });
  });

  it('should have the correct initial state', () => {
    const { result } = renderHook(() => useMusicPlayerStore());

    expect(result.current.currentSong).toBeNull();
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.progress).toBe(0);
    expect(result.current.volume).toBe(0.8);
    expect(result.current.currentTime).toBe(0);
    expect(result.current.duration).toBe(0);
    expect(result.current.playlist).toEqual([]);
    expect(result.current.currentIndex).toBe(-1);
    expect(result.current.audioRef).toBeNull();
  });

  it('should set the audio ref', () => {
    const { result } = renderHook(() => useMusicPlayerStore());
    const audioRef = { current: document.createElement('audio') };

    act(() => {
      result.current.setAudioRef(audioRef);
    });

    expect(result.current.audioRef).toBe(audioRef);
  });

  it('should set the current song', () => {
    const { result } = renderHook(() => useMusicPlayerStore());
    const song = { id: 1, title: 'Test Song' };

    act(() => {
      result.current.setCurrentSong(song, 0);
    });

    expect(result.current.currentSong).toBe(song);
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.isPlaying).toBe(true);
    expect(result.current.progress).toBe(0);
    expect(result.current.currentTime).toBe(0);
  });

  it('should set the playlist', () => {
    const { result } = renderHook(() => useMusicPlayerStore());
    const playlist = [{ id: 1, title: 'Test Song' }];

    act(() => {
      result.current.setPlaylist(playlist);
    });

    expect(result.current.playlist).toBe(playlist);
  });

  it('should toggle play', () => {
    const { result } = renderHook(() => useMusicPlayerStore());

    act(() => {
      result.current.togglePlay();
    });

    expect(result.current.isPlaying).toBe(true);

    act(() => {
      result.current.togglePlay();
    });

    expect(result.current.isPlaying).toBe(false);
  });

  it('should play and pause', () => {
    const { result } = renderHook(() => useMusicPlayerStore());

    act(() => {
      result.current.play();
    });

    expect(result.current.isPlaying).toBe(true);

    act(() => {
      result.current.pause();
    });

    expect(result.current.isPlaying).toBe(false);
  });

  it('should set the volume', () => {
    const { result } = renderHook(() => useMusicPlayerStore());

    act(() => {
      result.current.setVolume(0.5);
    });

    expect(result.current.volume).toBe(0.5);
  });

  it('should set the progress', () => {
    const { result } = renderHook(() => useMusicPlayerStore());

    act(() => {
      result.current.setProgress(0.5);
    });

    expect(result.current.progress).toBe(0.5);
  });

  it('should set the current time', () => {
    const { result } = renderHook(() => useMusicPlayerStore());

    act(() => {
      result.current.setCurrentTime(10);
    });

    expect(result.current.currentTime).toBe(10);
  });

  it('should set the duration', () => {
    const { result } = renderHook(() => useMusicPlayerStore());

    act(() => {
      result.current.setDuration(100);
    });

    expect(result.current.duration).toBe(100);
  });

  it('should play the next song', () => {
    const { result } = renderHook(() => useMusicPlayerStore());
    const playlist = [
      { id: 1, title: 'Song 1' },
      { id: 2, title: 'Song 2' },
    ];

    act(() => {
      result.current.setPlaylist(playlist);
      result.current.setCurrentSong(playlist[0], 0);
    });

    act(() => {
      result.current.nextSong();
    });

    expect(result.current.currentSong).toBe(playlist[1]);
    expect(result.current.currentIndex).toBe(1);
  });

  it('should play the previous song', () => {
    const { result } = renderHook(() => useMusicPlayerStore());
    const playlist = [
      { id: 1, title: 'Song 1' },
      { id: 2, title: 'Song 2' },
    ];

    act(() => {
      result.current.setPlaylist(playlist);
      result.current.setCurrentSong(playlist[1], 1);
    });

    act(() => {
      result.current.previousSong();
    });

    expect(result.current.currentSong).toBe(playlist[0]);
    expect(result.current.currentIndex).toBe(0);
  });

  it('should loop to the first song when nextSong is called on the last song', () => {
    const { result } = renderHook(() => useMusicPlayerStore());
    const playlist = [
      { id: 1, title: 'Song 1' },
      { id: 2, title: 'Song 2' },
    ];

    act(() => {
      result.current.setPlaylist(playlist);
      result.current.setCurrentSong(playlist[1], 1);
    });

    act(() => {
      result.current.nextSong();
    });

    expect(result.current.currentSong).toBe(playlist[0]);
    expect(result.current.currentIndex).toBe(0);
  });

  it('should loop to the last song when previousSong is called on the first song', () => {
    const { result } = renderHook(() => useMusicPlayerStore());
    const playlist = [
      { id: 1, title: 'Song 1' },
      { id: 2, title: 'Song 2' },
    ];

    act(() => {
      result.current.setPlaylist(playlist);
      result.current.setCurrentSong(playlist[0], 0);
    });

    act(() => {
      result.current.previousSong();
    });

    expect(result.current.currentSong).toBe(playlist[1]);
    expect(result.current.currentIndex).toBe(1);
  });

  it('should toggle the favorite status of the current song', () => {
    const { result } = renderHook(() => useMusicPlayerStore());
    const playlist = [
      { id: 1, title: 'Song 1', favorite: false },
      { id: 2, title: 'Song 2', favorite: true },
    ];

    act(() => {
      result.current.setPlaylist(playlist);
      result.current.setCurrentSong(playlist[0], 0);
    });

    act(() => {
      result.current.toggleFavorite();
    });

    expect(result.current.currentSong.favorite).toBe(true);
    expect(result.current.playlist[0].favorite).toBe(true);

    act(() => {
      result.current.toggleFavorite();
    });

    expect(result.current.currentSong.favorite).toBe(false);
    expect(result.current.playlist[0].favorite).toBe(false);
  });
});
