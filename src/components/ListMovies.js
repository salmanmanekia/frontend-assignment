import React from 'react';
import styled from 'styled-components';

import { device } from '../utils/device';
import { movieImageWidthCalc } from '../utils/style-helper';

const MostRecentMoviesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MostRecentMoviesHeading = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  margin: 20px 0 10px;
`;
const MovieGrid = styled.ul`
  display: grid;
  align-items: center;
  column-gap: 10px;
  list-style-type: none;
  padding: 0px;
  @media ${device.mobileM} {
    grid-template-columns: repeat(1, auto);
  }
  @media ${device.mobileL} {
    grid-template-columns: repeat(2, auto);
  }
  @media ${device.tablet} {
    grid-template-columns: repeat(3, auto);
  }
  @media ${device.laptop} {
    grid-template-columns: repeat(4, auto);
  }
`;

const Movie = styled.li`
  display: flex;
  flex-direction: column;
  width: ${movieImageWidthCalc()};
  height: 348px;
  justify-content: space-between;

  background: #ffffff;
  border: 1px solid #e1e3e6;
  box-sizing: border-box;
  box-shadow: 1px 2px 8px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const MoviePoster = styled.div`
  position: relative;
`;

const MovieImage = styled.img`
  padding: ${({ defaultImage }) => defaultImage && '20px'};
  height: auto;
  width: ${({ defaultImage }) => movieImageWidthCalc(defaultImage)};
  max-width: calc(282px + (100vw - 1425px) * 0.1);
  max-height: 302px;
  border-radius: 7px 7px 0px 0px;
`;

const MovieTitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 300%;
  /* display: flex; */
  /* align-items: center; */
  text-align: center;
  letter-spacing: -0.01em;
  color: #000000;
  flex-basis: 5%;
`;

const MoviePopularity = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #000000;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 32px;

  text-align: center;
  letter-spacing: -0.01em;

  color: #000000;
`;

const ListMovies = ({ movies, openMovieDetails }) => {
  const handleMovieClick = (movie) => {
    openMovieDetails(movie);
  };
  return (
    <MostRecentMoviesContainer>
      <MostRecentMoviesHeading>Most Recent Movies</MostRecentMoviesHeading>
      <MovieGrid>
        {movies.map((movie) => {
          return (
            <Movie onClick={() => handleMovieClick(movie)} key={movie.id}>
              <MoviePoster>
                <MovieImage src={movie.imageURL} defaultImage={movie.defaultImage} />
                <MoviePopularity>{Math.round(movie.popularity) / 10}</MoviePopularity>
              </MoviePoster>
              <MovieTitle>{movie.title}</MovieTitle>
            </Movie>
          );
        })}
      </MovieGrid>
    </MostRecentMoviesContainer>
  );
};

export default ListMovies;
