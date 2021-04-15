import React from 'react';
import s from './Paginator.module.css';

const Paginator = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div className={s.pagesButtons}>
        {pages.map((p) => {
          return (
            <span
              key={p}
              className={s.Page + ' ' + (currentPage === p && s.selectedPage)}
              onClick={() => onPageChanged(p)}>
              {p}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Paginator;
