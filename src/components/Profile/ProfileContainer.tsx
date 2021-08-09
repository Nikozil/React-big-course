import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getUsersProfile, getUserStatus } from '../../Redax/profile-reducer';
import { AppStateType } from '../../Redax/redux-store';
import Profile from './Profile';

// type PathParamsType = {
//   userId: string;
// };

// type PropsType = MapStatePropsType &
//   MapDispatchPropsType &
//   RouteComponentProps<PathParamsType>;

export const ProfilePage: React.FC = (props) => {
  const authUserId = useSelector((state: AppStateType) => state.auth.userId);
  const dispatch = useDispatch();
  const getUsersProfileHandler = (userId: number) =>
    dispatch(getUsersProfile(userId));
  const getUserStatusHandler = (userId: number) =>
    dispatch(getUserStatus(userId));

  let history = useHistory();

  let { userId } = useParams<{ userId?: string }>();
  if (userId === undefined) userId = '';
  let userIdNumber: number = +userId;

  const RefreshProfile = () => {
    if (!userIdNumber) {
      if (authUserId) {
        userIdNumber = +authUserId;
      } else {
        history.push('/login');
      }
    }
    getUsersProfileHandler(userIdNumber);
    getUserStatusHandler(userIdNumber);
  };
  useEffect(() => {
    RefreshProfile();
  }, [userId]);

  return <Profile />;
};

export default compose<React.ComponentType>(withAuthRedirect)(ProfilePage);
