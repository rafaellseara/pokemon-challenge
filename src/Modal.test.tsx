import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './components/Modal';

describe('Modal', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('clicking Next button should update currentPokemonId', async () => {
    render(
      <Modal modalOpen={true} setModalOpen={() => {}} pokemon="bulbasaur" />
    );

    // Mock response for initial pokemon fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ id: 1 }),
    });

    // Mock response for location fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve([{ location_area: { name: 'forest' } }]),
    });

    // Wait for component to finish rendering and useEffect to trigger
    await screen.findByText('Loading Pokémon...');

    // Find and click the Next button
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/2'
    );
  });

  test('clicking Before button should update currentPokemonId', async () => {
    render(
      <Modal
        modalOpen={true}
        setModalOpen={() => {}}
        pokemon="bulbasaur"
        currentPokemonId={2}
      />
    );

    // Wait for component to finish rendering
    await screen.findByText('Loading Pokémon...');

    // Find and click the Before button
    const beforeButton = screen.getByText('Before');
    fireEvent.click(beforeButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/1'
    );
  });
});