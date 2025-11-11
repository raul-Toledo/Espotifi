import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import HeadMusic from '../HeaderMusic';
import { useAlbumData } from '../../../hooks/useAlbumData';

// Mock del hook personalizado para aislar el componente
vi.mock('../../../hooks/useAlbumData');

describe('HeadMusic', () => {
  // Datos de prueba que simulan la respuesta del hook
  const mockAlbumData = {
    cover: 'path/to/album-cover.jpg',
    name: 'Test Album Name',
    artist: 'The Testers',
    artistImage: 'path/to/artist-image.jpg',
    year: 2025,
    songCount: '12 canciones',
    duration: '45 min',
  };

  beforeEach(() => {
    // Antes de cada prueba, configuramos el mock para que devuelva nuestros datos de prueba
    useAlbumData.mockReturnValue(mockAlbumData);
  });

  afterEach(() => {
    // Limpiamos los mocks después de cada prueba para evitar interferencias
    vi.clearAllMocks();
  });

  it('debe renderizar toda la información del álbum correctamente', () => {
    render(<HeadMusic />);

    // 1. Verificar la imagen de la portada del álbum
    const albumCover = screen.getByAltText(`Portada de ${mockAlbumData.name}`);
    expect(albumCover).toBeDefined();
    expect(albumCover.src).toContain(mockAlbumData.cover);

    // 2. Verificar el nombre del álbum
    expect(screen.getByText(mockAlbumData.name)).toBeDefined();

    // 3. Verificar la imagen del artista
    const artistImage = screen.getByAltText(mockAlbumData.artist);
    expect(artistImage).toBeDefined();
    expect(artistImage.src).toContain(mockAlbumData.artistImage);

    // 4. Verificar el nombre del artista
    expect(screen.getByText(mockAlbumData.artist)).toBeDefined();

    // 5. Verificar el año de lanzamiento
    expect(screen.getByText(mockAlbumData.year.toString())).toBeDefined();

    // 6. Verificar el número de canciones y la duración
    const songInfo = screen.getByText(`${mockAlbumData.songCount}, ${mockAlbumData.duration}`);
    expect(songInfo).toBeDefined();
  });
});