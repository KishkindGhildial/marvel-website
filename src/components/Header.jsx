import { useEffect, useState } from 'react';
import _ from 'lodash';

import logo from '../assets/logo.svg';
import searchIcon from '../assets/search.svg';

const Header = ({ setGlobalSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(
  //   _.debounce(
  //     () => {
  //       setGlobalSearchTerm(searchTerm);
  //     },
  //     1000,
  //     {
  //       leading: false,
  //       trailing: true,
  //     }
  //   ),
  //   [searchTerm]
  // );

  return (
    <div className="header">
      <div className="width-wrapper header-content">
        <img src={logo} alt="Logo" width={130} height={52} />
        <div className="header-search-wrapper">
          <img
            src={searchIcon}
            alt="Search"
            width={16}
            className="search-icon"
          />
          <input
            type="text"
            name="comicName"
            id="comicName"
            className="comic-search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search for comics..."
          />
          <button
            className="searchButton"
            onClick={() => setGlobalSearchTerm(searchTerm)}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
