import { Deck } from '@deck.gl/core';
import { onMount } from 'solid-js';
import { css } from 'solid-styled-components';
import { getViewState, setViewState } from './App';
import { DeckGL_IconLayer } from './DeckGL_IconLayer';

export const DeckGLControl = () => {
  onMount(async () => {
    const deckgl = new Deck({
      canvas: 'deck-canvas',
      width: '100%',
      height: '100%',
      initialViewState: getViewState(),
      useDevicePixels: true,
      controller: {
        dragRotate: true,
        inertia: true,
      },
      _pickable: true,

      onViewStateChange: ({ viewState }) => {
        setViewState(viewState);
      },
    });
  });

  return (
    <canvas
      id="deck-canvas"
      class={css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;`}
    />
  );
};
