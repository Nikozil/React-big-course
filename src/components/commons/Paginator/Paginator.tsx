import React, { useState } from 'react';
import s from './Paginator.module.css';
import cn from 'classnames';

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (PageNumber: number) => void;
  portionSize?: number;
};

const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let positionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionNumber = portionNumber * portionSize;

  return (
    <div>
      <div className={s.pagesButtons}>
        {portionNumber > 1 && (
          <button
            onClick={() => {
              setPortionNumber(portionNumber - 1);
            }}>
            Preview
          </button>
        )}
        {pages
          .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
          .map((p) => {
            return (
              <span
                key={p}
                className={cn(s.Page, currentPage === p && s.selectedPage)}
                onClick={() => onPageChanged(p)}>
                {p}
              </span>
            );
          })}
        {portionNumber < positionCount && (
          <button
            onClick={() => {
              setPortionNumber(portionNumber + 1);
            }}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Paginator;