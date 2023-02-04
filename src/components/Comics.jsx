import { useState } from 'react';
import prev from '../assets/prev.svg';
import next from '../assets/next.svg';

const Comics = () => {
  const [paginationState, setPaginationState] = useState({
    visiblePageset: 1,
    currentPage: 1,
    ctrlEndReached: false,
  });

  const RenderPageSet = () => {
    let pageCounter;
    // const lastPage =
    return null;
  };

  return (
    <>
      <div className="width-wrapper">
        <div className="comic-books-table">
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
        </div>
      </div>
      <div className="pagination-ctrls">
        <img src={prev} alt="Prev" />
        {RenderPageSet()}
        <span className="page-enddots">...</span>
        <img src={next} alt="Next" />
      </div>
    </>
  );
};

export default Comics;
