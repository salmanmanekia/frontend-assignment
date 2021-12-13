import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MagnifyingGlass } from '../images/magnifying-glass.svg';

const LogoAndSearch = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
  border-bottom: 1px solid #c0c4cc;
`;

const Logo = styled.img``;

export const SearchArea = styled.div`
  position: relative;
`;

export const SearchIcon = styled(MagnifyingGlass)`
  position: absolute;
  width: 16px;
  height: 16px;
  fill: var(--colors-lynch);
  margin: 12px;
`;

const Search = styled.input.attrs({ type: 'text' })`
  height: 36px;
  border: 1px solid #c0c4cc;
  border-radius: 2px;
  padding-left: 34px;
`;

const Header = ({ logo, handleSearchChange }) => {
  return (
    <LogoAndSearch>
      <Logo src={logo} alt="Timescale" />
      <SearchArea>
        <SearchIcon />
        <Search onChange={handleSearchChange} placeholder="Search for a movie"></Search>
      </SearchArea>
    </LogoAndSearch>
  );
};

export default Header;
