import { ResultCodeEnum, SuccessRequestType } from '../api/api';
import { UsersAPI } from '../api/users-api';
import { actions, follow, unfollow } from './users-reducer';

jest.mock('../api/users-api');
const dispatchMock = jest.fn();
const getStateMock = jest.fn();
beforeEach(() => {
  dispatchMock.mockClear();
});
beforeEach(() => {
  getStateMock.mockClear();
});

const userAPIMock = UsersAPI as jest.Mocked<typeof UsersAPI>;
const result: SuccessRequestType = {
  resultCode: ResultCodeEnum.Success,
  messages: [],
  data: {},
};

test('success follow thunk ', async () => {
  const thunk = follow(1);

  userAPIMock.follow.mockResolvedValue(result);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingInProgress(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.acceptfollow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingInProgress(false, 1)
  );
});

test('success unfollow thunk ', async () => {
  const thunk = unfollow(1);

  userAPIMock.unfollow.mockResolvedValue(result);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingInProgress(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.acceptunfollow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingInProgress(false, 1)
  );
});
