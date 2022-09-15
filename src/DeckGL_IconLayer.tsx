import { IconLayer } from '@deck.gl/layers';
import { getPoints } from './LoadSampleData';
import { MapboxLayer } from '@deck.gl/mapbox';

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

export const DeckGL_IconLayer = async () => {
  return await new MapboxLayer({
    id: 'icon-layer',
    type: IconLayer,
    data: getPoints(),
    pickable: true,
    // @ts-ignore
    iconAtlas:
      'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: ICON_MAPPING,
    getIcon: (d: any) => 'marker',

    sizeScale: 15,
    getPosition: (d: any) => [d.column3, d.column2],
    getSize: (d: any) => 4,
    getColor: (d: any) => [
      Math.random() * 256,
      Math.random() * 0,
      Math.random() * 256,
    ],
  });
};
