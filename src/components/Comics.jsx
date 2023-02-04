import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import prev from '../assets/prev.svg';
import next from '../assets/next.svg';

import { getMarvelData } from '../utils';

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

  const { isLoading, error, data } = useQuery({
    queryKey: ['comics'],
    queryFn: async () => {
      const response = await getMarvelData(
        'https://gateway.marvel.com:443/v1/public/comics?orderBy=title&apikey=1810d2d7ef7043b15612ca579e577e7e'
      );

      if (response.status === 'Ok' && response.code === 200) {
        return response.data;
      } else {
        throw new Error('Something went wrong!');
      }
    },
  });

  return (
    <>
      <div className="width-wrapper">
        <div className="comic-books-table">
          {!isLoading
            ? data.results.map((comic, index) => {
                const { path, extension } = comic.thumbnail;
                const imgURL = `${path}.${extension}`;
                return (
                  <div className="comic-book">
                    <img src={imgURL} alt="Comic Thumbnail" width={200} />
                  </div>
                );
              })
            : null}
          {/* <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div>
          <div className="comic-book"></div> */}
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
