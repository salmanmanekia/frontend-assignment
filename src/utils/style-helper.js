export const movieImageWidthCalc = (defaultImage = false) => {
  return defaultImage ? 'calc(240px + (100vw - 1425px) * 0.1 )' : 'calc(282px + (100vw - 1425px) * 0.1 )';
};
