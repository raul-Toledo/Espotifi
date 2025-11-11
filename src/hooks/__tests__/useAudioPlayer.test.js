import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAudioPlayer } from '../useAudioPlayer';
import { useMusicPlayerStore } from '../../store/useMusicPlayerStore';

vi.mock('../../store/useMusicPlayerStore');

const mockSong = {
  id: 1,
  filePath: 'music/once/01-dark_chest_of_wonders.mp3',
};

const audioMock = {
  play: vi.fn(() => Promise.resolve()),
  pause: vi.fn(),
  load: vi.fn(),
  addEventListener: vi.fn((event, handler) => {
    if (event === 'loadedmetadata') {
      // Simulate the event firing immediately after load
      setTimeout(() => handler(), 0);
    }
  }),
  removeEventListener: vi.fn(),
  src: '',
  duration: 285, // Mock duration
  currentTime: 0,
};

// A mutable object to simulate the store's state
let storeState;

describe('useAudioPlayer', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    storeState = {
      currentSong: null,
      isPlaying: false,
      setAudioRef: vi.fn(),
      nextSong: vi.fn(),
      setDuration: vi.fn(),
      setCurrentTime: vi.fn(),
    };

    useMusicPlayerStore.mockImplementation((selector) => {
      if (selector) {
        return selector(storeState);
      }
      return storeState;
    });

    // Reset audio mock properties
    audioMock.src = '';
    audioMock.currentTime = 0;
  });

  it('should set the audio ref in the store on mount and subsequent renders', () => {
    const { result, rerender } = renderHook(() => useAudioPlayer());

    // On the initial render, the useEffect runs and calls setAudioRef with null
    expect(storeState.setAudioRef).toHaveBeenCalledWith(null);

    // Simulate the <audio> element being mounted and the ref being attached
    act(() => {
      result.current.audioRef.current = audioMock;
    });

    // Trigger a re-render, which will cause the useEffect to run again
    rerender();

    // After the re-render, the useEffect runs again and calls setAudioRef with the mock audio object
    expect(storeState.setAudioRef).toHaveBeenCalledWith(audioMock);
  });

  it('should set audio src and load when currentSong changes', () => {
    const { result, rerender } = renderHook(() => useAudioPlayer());

    act(() => {
      result.current.audioRef.current = audioMock;
    });

    // Simulate changing the song in the store
    act(() => {
      storeState.currentSong = mockSong;
      rerender();
    });

    expect(audioMock.src).toContain(mockSong.filePath);
    expect(audioMock.load).toHaveBeenCalled();
  });

  it('should play audio when isPlaying becomes true', () => {
    // Start with a song but paused
    storeState.currentSong = mockSong;
    storeState.isPlaying = false;

    const { result, rerender } = renderHook(() => useAudioPlayer());

    act(() => {
      result.current.audioRef.current = audioMock;
    });

    // Simulate pressing play
    act(() => {
      storeState.isPlaying = true;
      rerender();
    });

    expect(audioMock.play).toHaveBeenCalled();
  });

  it('should pause audio when isPlaying becomes false', () => {
    // Start with a song playing
    storeState.currentSong = mockSong;
    storeState.isPlaying = true;

    const { result, rerender } = renderHook(() => useAudioPlayer());

    act(() => {
      result.current.audioRef.current = audioMock;
    });
    
    // Simulate pressing pause
    act(() => {
      storeState.isPlaying = false;
      rerender();
    });

    expect(audioMock.pause).toHaveBeenCalled();
  });
});