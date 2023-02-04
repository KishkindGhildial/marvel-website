import { useState } from 'react';
import logo from '../assets/logo.svg';
import searchIcon from '../assets/search.svg';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
