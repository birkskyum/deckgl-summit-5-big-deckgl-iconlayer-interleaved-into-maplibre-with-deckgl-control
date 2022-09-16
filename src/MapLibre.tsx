import { onMount, Component, on, createEffect } from 'solid-js';
import maplibregl, { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { css } from 'solid-styled-components';
import { getViewState } from './App';
import { DeckGL_IconLayer } from './DeckGL_IconLayer';
import { getPoints } from './LoadSampleData';
import { MapTilerAPIKey } from './MapTilerAPIKey';

export const MapLibre: Component = () => {
  let maplibreContainer: HTMLElement;
  let map: Map;

  createEffect(
    on(getViewState, () => {
      console.log(getViewState());
      map?.jumpTo({
        center: [getViewState().longitude, getViewState().latitude],
        zoom: getViewState().zoom,
        bearing: getViewState().bearing,
        pitch: getViewState().pitch,
      });
    })
  );

  onMount(async () => {
    const mayStyle = (map = new maplibregl.Map({
      center: [getViewState().longitude, getViewState().latitude],
      zoom: getViewState().zoom,
      bearing: getViewState().bearing,
      pitch: getViewState().pitch,
      container: maplibreContainer,
      style:
        MapTilerAPIKey.length > 0
          ? 'https://api.maptiler.com/maps/7f6a9f46-d4d3-4ba7-8e18-ae73917f1a7b/style.json?key=' +
            MapTilerAPIKey
          : { version: 8, sources: {}, layers: [] },

      interactive: true,
    }));
    map.on('load', async () => {
      console.log(getPoints());
      map.addLayer(
        await DeckGL_IconLayer(),
        MapTilerAPIKey.length > 0 ? 'road_pier' : ''
      );
    });
  });

  return (
    <div>
      <div
        ref={(r) => {
          maplibreContainer = r;
        }}
        class={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        `}
      />
    </div>
  );
};
