import { useEffect, useState, memo } from 'react';
import { useQuery } from '@tanstack/react-query';

import prev from '../assets/prev.svg';
import next from '../assets/next.svg';
import loader from '../assets/loader.gif';

import { getMarvelData } from '../utils';

const Comics = ({ currentAction, searchTerm, selectedItems }) => {
  const [paginationState, setPaginationState] = useState({
    visiblePageset: 1,
    currentPage: 1,
    ctrlEndReached: false,
  });

  const setNewPage = page => {
    setPaginationState(prev => ({ ...prev, currentPage: page }));
  };

  const RenderPageSet = data => {
    if (!data || data.total < 20) return null;
    let isStateChanged = false;

    let currentPageCount;
    const renderPageSet = [];
    let totalPages = data.total / 20;
    if (Math.floor(totalPages) !== totalPages)
      totalPages = Math.floor(totalPages) + 1;

    const newState = { ...paginationState };

    // 3 pages visible at a time
    currentPageCount = paginationState.visiblePageset * 3;

    if (totalPages <= currentPageCount) {
      currentPageCount = totalPages;
      newState.ctrlEndReached = true;
      isStateChanged = true;
    }

    console.log(totalPages);
    if (totalPages >= 3) {
      for (let i = currentPageCount - 2; i <= currentPageCount; i++) {
        renderPageSet.push(i);
      }
    } else {
      for (let i = 1; i <= currentPageCount; i++) {
        renderPageSet.push(i);
      }
    }
    console.log(totalPages);
    console.log(renderPageSet);

    return (
      <>
        {totalPages > 3 ? (
          <img
            src={prev}
            alt="Prev"
            className="pagination-endpoint-ctrl"
            onClick={() => handleEndCtrlClick('prv')}
          />
        ) : null}

        <ul className="pagination">
          {renderPageSet.map((num, index) => (
            <li
              key={index + 1}
              className={
                paginationState.currentPage === num
                  ? 'pageNum selected'
                  : 'pageNum'
              }
              onClick={() => setNewPage(num)}
            >
              {num}
            </li>
          ))}
        </ul>
        {totalPages > 3 ? <span className="page-enddots">...</span> : null}
        {totalPages > 3 ? (
          <img
            src={next}
            alt="Next"
            className="pagination-endpoint-ctrl"
            onClick={() => handleEndCtrlClick('nxt')}
          />
        ) : null}
      </>
    );
  };

  const handleEndCtrlClick = ctrlType => {
    const newState = { ...paginationState };

    if (ctrlType === 'prv') {
      if (newState.visiblePageset !== 1) {
        newState.visiblePageset -= 1;
      }
    } else {
      newState.visiblePageset += 1;
    }

    newState.currentPage = newState.visiblePageset * 3 - 2;

    let totalPages = data.total / data.count;
    if (Math.floor(totalPages) !== totalPages)
      totalPages = Math.floor(totalPages) + 1;

    setPaginationState(newState);
  };

  const { isLoading, error, data, fetchStatus } = useQuery({
    queryKey: ['comics', paginationState.currentPage, searchTerm],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: async () => {
      let url = null;

      if (searchTerm !== '') {
        url = `https://gateway.marvel.com:443/v1/public/comics?title=${encodeURIComponent(
          searchTerm
        )}&orderBy=title&apikey=1810d2d7ef7043b15612ca579e577e7e&offset=${
          (paginationState.currentPage - 1) * 20
        }`;
      }

      if (!url) {
        url = `https://gateway.marvel.com:443/v1/public/comics?apikey=1810d2d7ef7043b15612ca579e577e7e&offset=${
          (paginationState.currentPage - 1) * 20
        }`;
      }

      const response = await getMarvelData(url);

      if (response.status === 'Ok' && response.code === 200) {
        return response.data;
      } else {
        throw new Error('Something went wrong!');
      }
    },
  });

  const {
    isLoading: isLoading1,
    error: error1,
    data: data1,
    fetchStatus: fetchStatus1,
  } = useQuery({
    queryKey: ['comics', selectedItems, paginationState.currentPage],
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    queryFn: async () => {
      let url = null;

      if (selectedItems.ids.length > 0) {
        let charIds = '';
        selectedItems.ids.forEach(id => {
          if (charIds === '') charIds += `${id}`;
          else charIds += `, ${id}`;
        });

        url = `https://gateway.marvel.com:443/v1/public/comics?characters=${encodeURIComponent(
          charIds
        )}&orderBy=title&apikey=1810d2d7ef7043b15612ca579e577e7e&offset=${
          (paginationState.currentPage - 1) * 20
        }`;
      } else {
        url = `https://gateway.marvel.com:443/v1/public/comics?apikey=1810d2d7ef7043b15612ca579e577e7e&offset=${
          (paginationState.currentPage - 1) * 20
        }`;
      }

      const response = await getMarvelData(url);

      if (response.status === 'Ok' && response.code === 200) {
        return response.data;
      } else {
        throw new Error('Something went wrong!');
      }
    },
  });

  if (currentAction === 'select' && selectedItems.ids.length > 0)
    return (
      <>
        <div className="width-wrapper">
          <h2 className="content-heading">
            Showing results for:{' '}
            {selectedItems.names.map((name, index) =>
              index === 0 ? <span>{name}</span> : <span>, {name}</span>
            )}
          </h2>
          <div className="comic-books-table">
            {!isLoading1 && fetchStatus1 !== 'fetching' ? (
              !data1.results.length ? (
                <h3 className="content-heading">No comics found</h3>
              ) : (
                data1.results.map((comic, index) => {
                  const { path, extension } = comic.thumbnail;
                  const imgURL = `${path}.${extension}`;
                  return (
                    <div key={index + 1} className="comic-book">
                      <img src={imgURL} alt="Comic Thumbnail" width={200} />
                      <h5 className="comics-name">{comic.title}</h5>
                    </div>
                  );
                })
              )
            ) : (
              <div className="comics-loader">
                <img src={loader} alt="Loader" width={400} />
              </div>
            )}
          </div>
        </div>
        <div className="pagination-ctrls">{RenderPageSet(data1)}</div>
      </>
    );

  return (
    <>
      <div className="width-wrapper">
        {currentAction === 'search' ? (
          <h2 className="content-heading">Showing results for: {searchTerm}</h2>
        ) : (
          <h2 className="content-heading">Showing all comics</h2>
        )}
        <div className="comic-books-table">
          {!isLoading && fetchStatus !== 'fetching' ? (
            !data.results.length ? (
              <h3 className="content-heading">No comics found</h3>
            ) : (
              data.results.map((comic, index) => {
                const { path, extension } = comic.thumbnail;
                const imgURL = `${path}.${extension}`;
                return (
                  <div key={index + 1} className="comic-book">
                    <img src={imgURL} alt="Comic Thumbnail" width={200} />
                    <h5 className="comics-name">{comic.title}</h5>
                  </div>
                );
              })
            )
          ) : (
            <div className="comics-loader">
              <img src={loader} alt="Loader" width={400} />
            </div>
          )}
        </div>
      </div>
      <div className="pagination-ctrls">{RenderPageSet(data)}</div>
    </>
  );
};

export default Comics;
