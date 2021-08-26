import React, { useState } from 'react';
import s from './Paginator.module.css';
import cn from 'classnames';
import { Pagination } from 'antd';
import { setPageSize } from '../../../Redax/users-reducer';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const changePaginatorHandler = (
    page: number,
    pageSize?: number | undefined
  ): void | undefined => {
    if (pageSize) dispatch(setPageSize(pageSize));

    onPageChanged(page);
  };
  console.log(pageSize);

  return (
    <div>
      {/* <div className={s.pagesButtons}>
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
      </div> */}
      <Pagination
        defaultCurrent={currentPage}
        total={totalItemsCount}
        onChange={changePaginatorHandler}
        pageSize={pageSize}
      />
    </div>
  );
};

export default Paginator;
