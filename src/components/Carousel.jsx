import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import prev from '../assets/prev.svg';
import next from '../assets/next.svg';
import check from '../assets/check.svg';
import loader from '../assets/loader.gif';

import { getMarvelData } from '../utils';

const Carousel = ({ selectedItems, handleItemClick }) => {
  const carouselSliderRef = useRef(null);

  const handleCtrlClick = ctrlType => {
    const carouselElem = carouselSliderRef.current;
    const carouselOffsetX = carouselElem.scrollLeft;
    if (ctrlType === 'prv')
      carouselElem.scroll({
        left: carouselOffsetX - 820,
        behavior: 'smooth',
      });
    else
      carouselElem.scroll({
        left: carouselOffsetX + 820,
        behavior: 'smooth',
      });
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['characters'],
    queryFn: async () => {
      const response = await getMarvelData(
        'https://gateway.marvel.com:443/v1/public/characters?orderBy=name&apikey=1810d2d7ef7043b15612ca579e577e7e'
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
      {!isLoading ? (
        <div className="carousel">
          <img
            id="left-ctrl"
            className="carousel-ctrl"
            src={prev}
            alt="Previous"
            width={30}
            onClick={() => handleCtrlClick('prv')}
          />
          <div className="carousel-width-wrapper">
            <div ref={carouselSliderRef} className="carousel-content">
              {!isLoading ? (
                data.results.map((char, index) => {
                  const { path, extension: ext } = char.thumbnail;
                  const imgSrc = `${path}.${ext}`;
                  return (
                    <div
                      key={index + 1}
                      className={
                        selectedItems.ids.indexOf(char.id) !== -1
                          ? 'carousel-item selected'
                          : 'carousel-item'
                      }
                      onClick={() => handleItemClick(char.id, char.name)}
                    >
                      <span className="selection-wrap" />
                      <img
                        className="selection-check"
                        src={check}
                        alt="Check Icon"
                        width={50}
                      />
                      <img
                        className="carousel-img"
                        src={imgSrc}
                        alt="Character Image"
                        width={120}
                        height={120}
                      />
                    </div>
                  );
                })
              ) : (
                <img src={loader} alt="Loader" width={50} />
              )}
            </div>
          </div>
          <img
            id="right-ctrl"
            className="carousel-ctrl"
            src={next}
            alt="Next"
            width={30}
            onClick={() => handleCtrlClick('nxt')}
          />
          <button
            className="reset-btn"
            onClick={() => window.location.reload()}
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="carousel">
          <div className="loader">
            <img src={loader} alt="Loader" width={200} />
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
