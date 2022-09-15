import { CSVLoader, CSVLoaderOptions } from '@loaders.gl/csv';
import { parse } from '@loaders.gl/core';
import { createSignal } from 'solid-js';

export type PointCSV = {
  column1: string;
  column2: number;
  column3: number;
  column4: number;
  column5: number;
};

export const [getPoints, setPoints] = createSignal<PointCSV[]>([]);

export const loadPoints = async () => {
  const options: CSVLoaderOptions = { worker: false };

  const result: PointCSV[] = await parse(
    fetch(
      `https://storage.googleapis.com/dk-chr-archive/generated/2022_07_01/summaries/bes_short.csv`
    ),
    CSVLoader,
    options
  );

  setPoints(result.sort((a, b) => b.column5 - a.column5));
};
