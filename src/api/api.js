import axios from 'axios';

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;
const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;
const IMAGE_DOMAIN = process.env.REACT_APP_IMAGE_DOMAIN;
const NETFLIX_POSTER_PATH = process.env.REACT_APP_NETFLIX_POSTER_PATH;

const api = async (domain, queryParamObj) => {
  queryParamObj = { ...queryParamObj, api_key: API_KEY };
  const queryParams = new URLSearchParams(queryParamObj).toString();
  try {
    const resp = await axios.get(`${domain}?${queryParams}`);
    const moviePageResultWithPosterURL = resp.data.results.map((movie) => {
      const posterPath = movie.poster_path;
      const imageURL = posterPath ? `${IMAGE_DOMAIN}${posterPath}` : `${IMAGE_DOMAIN}${NETFLIX_POSTER_PATH}`;
      const defaultImage = posterPath ? false : true;
      return { defaultImage, imageURL, ...movie };
    });
    return moviePageResultWithPosterURL;
  } catch (err) {
    return err.response;
  }
};

const getMovies = (queryParam) => api(`${API_DOMAIN}/discover/movie`, queryParam);

export { getMovies };
