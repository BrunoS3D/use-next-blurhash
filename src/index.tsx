import { useMemo } from 'react';
import { decode } from 'blurhash';

function blurhashToDataURL(
  blurhash: string,
  width: number = 160,
  height: number = 120,
  punch?: number
) {
  const w = Math.round(width || 100);
  const h = Math.round(height || 100);

  const pixels = decode(blurhash, w, h, punch);
  const canvas = document.createElement('canvas');

  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    canvas.remove();
    throw Error('Invalid 2D Context');
  }

  const idata = ctx.createImageData(w, h);

  idata.data.set(pixels);

  ctx.putImageData(idata, 0, 0);

  const base64 = canvas.toDataURL();

  canvas.remove();

  return base64;
}

export default function useBlurData(
  blurhash: string,
  width: number = 160,
  height: number = 120,
  punch?: number
) {
  return useMemo(() => {
    if (typeof window === 'undefined') {
      return [undefined];
    }
    return blurhashToDataURL(blurhash, width, height, punch);
  }, []);
}
