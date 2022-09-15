import { Component, createSignal, lazy, Suspense } from 'solid-js';
import { DeckGLControl } from './DeckGL_Control';
import { loadPoints } from './LoadSampleData';
import { MapLibre } from './MapLibre';

export const MapTilerAPIKey = '';

export const [getViewState, setViewState] = createSignal({
  longitude: 11,
  latitude: 56,
  zoom: 5,
  pitch: 0,
  bearing: 0,
  transitionDuration: 0,
});

await loadPoints();

const App: Component = () => {
  return (
    <div>
      <MapLibre />
      <DeckGLControl />
    </div>
  );
};

export default App;
