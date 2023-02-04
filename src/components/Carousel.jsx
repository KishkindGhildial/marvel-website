import { useRef, useState } from 'react';

import prev from '../assets/prev.svg';
import next from '../assets/next.svg';
import check from '../assets/check.svg';

const Carousel = ({ data, selectedItems, handleItemClick }) => {
  const carouselSliderRef = useRef(null);

  const handleCtrlClick = ctrlType => {
    const carouselElem = carouselSliderRef.current;
    const carouselOffsetX = carouselElem.scrollLeft;
    if (ctrlType === 'prv')
      carouselElem.scroll({
        left: carouselOffsetX - 160,
        behavior: 'smooth',
      });
    else
      carouselElem.scroll({
        left: carouselOffsetX + 160,
        behavior: 'smooth',
      });
  };

  return (
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
          {data.map(char => {
            const { path, extension: ext } = char.thumbnail;
            const imgSrc = `${path}.${ext}`;
            return (
              <div
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
          })}
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
    </div>
  );
};

export default Carousel;
