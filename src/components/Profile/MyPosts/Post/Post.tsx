import React from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../../Redax/redux-store';
import { PostType } from '../../../../types/Types';
import AvatarComponent from '../../../commons/Avatar/Avatar';
import s from './Post.module.css';

const Post: React.FC<PostType> = (props) => {
  const profile = useSelector(
    (state: AppStateType) => state.profilePage.profile
  );

  return (
    <div className={s.post}>
      <div className={s.item}>
        {profile ? (
          <AvatarComponent owner={profile} size={'small'} className={s.photo} />
        ) : (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnZnbypL5znsAcBxWHA435K4RcahXBINjg9A&usqp=CAU"
            alt=""
          />
        )}
        {props.message}
        <div>
          <span>like</span> {props.likesCount}
        </div>
      </div>
    </div>
  );
};

export default Post;
