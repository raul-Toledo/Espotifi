import React from 'react';
import { render, screen, fireEvent, within, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import LibraryMusic from '../LibraryMusic';
import { useMusicPlayerStore } from '../../../store/useMusicPlayerStore';

// Datos de prueba con IDs únicos para evitar conflictos en los tests.
const mockSongs = [
  { id: '1', title: 'Test Song 1', artist: 'Artist 1', count: '100', time: '3:30' },
  { id: '2', title: 'Test Song 2', artist: 'Artist 2', count: '200', time: '4:00' },
];

// Mock de las dependencias externas
vi.mock('../../../store/useMusicPlayerStore');

// Mock del módulo de datos para que el componente use nuestros datos de prueba.
vi.mock('../../../data/songsData', () => ({
  songsData: [
    { id: '1', title: 'Test Song 1', artist: 'Artist 1', count: '100', time: '3:30' },
    { id: '2', title: 'Test Song 2', artist: 'Artist 2', count: '200', time: '4:00' },
  ],
}));

// Mock de react-window para simplificar las pruebas.
// En lugar de renderizar la lista virtualizada, renderizamos directamente
// el componente de fila (RowComponent) para cada item.
vi.mock('react-window', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    List: ({ rowComponent: Row, rowCount, rowProps }) => (
      <div>
        {Array.from({ length: rowCount }, (_, index) => (
          <Row key={index} index={index} {...rowProps} />
        ))}
      </div>
    ),
  };
});

describe('LibraryMusic', () => {
  let mockStoreState;

  beforeEach(() => {
    // Estado base del mock para cada prueba
    mockStoreState = {
      playlist: mockSongs,
      setPlaylist: vi.fn(),
      currentSong: null,
      setCurrentSong: vi.fn(),
    };
    // Aplicar el estado del mock
    useMusicPlayerStore.mockReturnValue(mockStoreState);
  });

  afterEach(() => {
    // Limpiar mocks después de cada prueba
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar la cabecera y la lista de canciones', () => {
    render(<LibraryMusic />);

    // Verificar que la cabecera de la tabla esté presente
    expect(screen.getByText('#')).toBeDefined();
    expect(screen.getByText('Titulo')).toBeDefined();
    expect(screen.getByText('Reproducciones')).toBeDefined();
    expect(screen.getByText('🕑')).toBeDefined();

    // Verificar que se renderice al menos una canción de la lista
    const firstSong = mockSongs[0];
    expect(screen.getByText(firstSong.title)).toBeDefined();
    expect(screen.getByText(firstSong.artist)).toBeDefined();
  });

  it('debe llamar a setPlaylist si la playlist inicial está vacía', () => {
    // Sobrescribir el mock para esta prueba específica
    useMusicPlayerStore.mockReturnValue({
      ...mockStoreState,
      playlist: [],
    });

    render(<LibraryMusic />);

    // Verificar que setPlaylist fue llamado para inicializar el estado
    expect(mockStoreState.setPlaylist).toHaveBeenCalledWith(mockSongs);
  });

  it('NO debe llamar a setPlaylist si la playlist ya tiene datos', () => {
    render(<LibraryMusic />);
    // La playlist ya tiene datos en el beforeEach, por lo que no se debe llamar a la función
    expect(mockStoreState.setPlaylist).not.toHaveBeenCalled();
  });

  it('debe llamar a setCurrentSong con los datos correctos al hacer clic en una canción', () => {
    render(<LibraryMusic />);

    const secondSong = mockSongs[1];
    const songRow = screen.getByTestId(`song-row-${secondSong.id}`);

    // Hacemos clic en la fila de la canción
    fireEvent.click(songRow);

    // Verificar que setCurrentSong fue llamado con la canción y el índice correctos
    expect(mockStoreState.setCurrentSong).toHaveBeenCalledTimes(1);
    expect(mockStoreState.setCurrentSong).toHaveBeenCalledWith(secondSong, 1);
  });

  it('debe mostrar el indicador de reproducción en la canción activa', () => {
    const firstSong = mockSongs[0];

    // Sobrescribir el mock para simular que la primera canción está activa
    useMusicPlayerStore.mockReturnValue({
      ...mockStoreState,
      currentSong: firstSong,
    });

    render(<LibraryMusic />);

    // 1. Encontrar la fila de la canción activa usando su data-testid.
    const activeSongRow = screen.getByTestId(`song-row-${firstSong.id}`);

    // 2. Dentro de esa fila, verificar que el ID de la canción no está presente.
    // `within` limita la búsqueda a un elemento específico del DOM.
    expect(within(activeSongRow).queryByText(firstSong.id.toString())).toBeNull();

    // 3. Verificar que el ícono de reproducción '▶' SÍ está presente en la fila.
    expect(within(activeSongRow).getByText('▶')).toBeDefined();

    // El título de la canción activa debe tener un estilo diferente
    const titleElement = within(activeSongRow).getByText(firstSong.title);
    expect(titleElement.className).toContain('text-green-400');
  });
});