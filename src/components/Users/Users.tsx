import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Preloader from '../../assets/Preloaders/Preloader';
import qs from 'qs';

import {
  FilterType,
  follow,
  requestUsers,
  unfollow,
} from '../../Redax/users-reducer';
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../../Redax/users-selectors';
import Paginator from '../commons/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';

type PropsType = {
  portionSize?: number;
};

export const Users: React.FC<PropsType> = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);
  const isFetching = useSelector(getIsFetching);

  const dispatch = useDispatch();
  const history = useHistory();
  type QuerryType = {
    term?: string;
    friend?: string;
    page?: string;
  };

  useEffect(() => {
    const parsed = qs.parse(history.location.search.substr(1)) as QuerryType;
    let actualPage = currentPage;
    let actualFilter = filter;
    if (parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };
    if (!!parsed.friend)
      actualFilter = {
        ...actualFilter,
        friend:
          parsed.friend === 'null'
            ? null
            : parsed.friend === 'true'
            ? true
            : false,
      };

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: QuerryType = {};
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: '/users',
      // search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
      search: qs.stringify(query),
    });
  }, [filter, currentPage]);

  const onPageChanged = (p: number) => {
    dispatch(requestUsers(p, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };
  const onFollow = (id: number) => {
    dispatch(follow(id));
  };
  const onUnfollow = (id: number) => {
    dispatch(unfollow(id));
  };

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />

      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      {isFetching ? (
        <Preloader />
      ) : (
        users.map((i) => {
          return (
            <User
              user={i}
              key={i.id}
              followingInProgress={followingInProgress}
              follow={onFollow}
              unfollow={onUnfollow}
            />
          );
        })
      )}
    </div>
  );
};
