import { describe, it, expect } from 'vitest';
import { songsData } from '../songsData';

describe('songsData', () => {
  it('should be an array', () => {
    expect(Array.isArray(songsData)).toBe(true);
  });

  it('should not be an empty array', () => {
    expect(songsData.length).toBeGreaterThan(0);
  });

  it('should contain objects with the correct properties', () => {
    songsData.forEach(song => {
      expect(song).toHaveProperty('id');
      expect(song).toHaveProperty('title');
      expect(song).toHaveProperty('artist');
      expect(song).toHaveProperty('album');
      expect(song).toHaveProperty('year');
      expect(song).toHaveProperty('duration');
      expect(song).toHaveProperty('plays');
      expect(song).toHaveProperty('filePath');
      expect(song).toHaveProperty('cover');
      expect(song).toHaveProperty('artistImage');
      expect(song).toHaveProperty('favorite');
    });
  });

  it('should have properties with the correct data types', () => {
    songsData.forEach(song => {
      expect(typeof song.id).toBe('string');
      expect(typeof song.title).toBe('string');
      expect(typeof song.artist).toBe('string');
      expect(typeof song.album).toBe('string');
      expect(typeof song.year).toBe('string');
      expect(typeof song.duration).toBe('string');
      expect(typeof song.plays).toBe('string');
      expect(typeof song.filePath).toBe('string');
      expect(typeof song.cover).toBe('string');
      expect(typeof song.artistImage).toBe('string');
      expect(typeof song.favorite).toBe('boolean');
    });
  });

  it('should have file paths and cover paths that are not empty', () => {
    songsData.forEach(song => {
      expect(song.filePath.length).toBeGreaterThan(0);
      expect(song.cover.length).toBeGreaterThan(0);
    });
  });
});
