import { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { getMovies } from '../api/api';
import { device } from '../utils/device';
import Header from './Header';
import ListMovies from './ListMovies';

import logo from '../images/logo.svg';
import close_icon from '../images/close-icon.svg';

const Container = styled.div`
  margin: 0px 5% 4%;
`;

const Modal = styled.div`
  ${(props) => {
    if (props.isMovieDetailsOpen) {
      return `
	  position: fixed;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	  border: 1px solid grey;
	  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
	  background: #ffffff;
	`;
    }
    return ``;
  }}
`;

const ModalBox = styled.div`
  display: grid;
  grid-template-columns: [start image-column] 50% [details-column] 50% [end];
  grid-template-rows: [start title-row] 48px [details-row] auto [end];
  height: 480px;
  width: 320px;

  @media ${device.mobileL} {
    width: 540px;
  }
  padding: 10px 10px 30px 30px;
`;

const ModalHeader = styled.div`
  grid-column: start / end;
  grid-row: start / details-row;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  align-self: center;
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
`;

const CloseIcon = styled.img`
  transform: scale(0.5);
  cursor: pointer;
`;

const Image = styled.img`
  grid-column: start / details-column;
  grid-row: details-row / end;
  zoom: 0.25;

  @media ${device.mobileL} {
    zoom: 0.5;
  }
`;

const Details = styled.div``;

const ReleaseInfo = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const ReleaseDate = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  &:before {
    content: ' ';
    white-space: pre;
  }
`;

const ReleaseDateText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`;

const Overview = styled.div`
  margin-bottom: 12px;
`;

const Vote = styled.div`
  display: flex;
  align-items: center;
`;

const Rating = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`;

const TotalRating = styled.div`
  &:before {
    content: ' / ';
    white-space: pre;
  }
  &:after {
    content: ' ';
    white-space: pre;
  }
`;

const TotalCount = styled.div``;

const TODAY = moment().format('YYYY-MM-DD');

const handleMovieSearch = (e) => {
  console.log(e.target.value);
};

const formatDate = (date) => {
  return moment(date).format('MMM D, YYYY');
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieDetailsOpen, setMovieDetailsOpen] = useState(null);

  useEffect(() => {
    const listMovies = async () => {
      const queryParam = {
        'primary_release_date.lte': TODAY,
        sort_by: 'primary_release_date.desc',
        page: 1,
      };
      const response = await getMovies(queryParam);
      setMovies(response);
    };
    return listMovies();
  }, []);

  const openMovieDetails = (movie) => {
    setMovieDetailsOpen(movie);
  };
  const handleModalClose = () => {
    setMovieDetailsOpen(null);
  };
  return (
    <>
      <Container>
        <Header logo={logo} handleSearchChange={handleMovieSearch} />
        <ListMovies openMovieDetails={openMovieDetails} movies={movies} />
      </Container>
      {movieDetailsOpen && (
        <Modal isMovieDetailsOpen={movieDetailsOpen !== null}>
          <ModalBox>
            <ModalHeader>
              <Title>{movieDetailsOpen.title}</Title>
              <CloseIcon src={close_icon} onClick={handleModalClose} />
            </ModalHeader>
            <Image src={movieDetailsOpen.imageURL} />
            <Details>
              <ReleaseInfo>
                <ReleaseDateText>Release date: </ReleaseDateText>
                <ReleaseDate>{formatDate(movieDetailsOpen.release_date)}</ReleaseDate>
              </ReleaseInfo>
              <Overview>{movieDetailsOpen.overview}</Overview>
              <Vote>
                <Rating>{Math.round(movieDetailsOpen.popularity) / 10}</Rating>
                <TotalRating>10</TotalRating>
                <TotalCount> ({movieDetailsOpen.vote_count} total votes) </TotalCount>
              </Vote>
            </Details>
          </ModalBox>
        </Modal>
      )}
    </>
  );
};

export default App;
