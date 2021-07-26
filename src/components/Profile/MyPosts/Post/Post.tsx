import React from 'react';
import { PostType } from '../../../../types/Types';
import s from './Post.module.css';

const Post: React.FC<PostType> = (props) => {
  return (
    <div className={s.post}>
      <div className={s.item}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnZnbypL5znsAcBxWHA435K4RcahXBINjg9A&usqp=CAU"
          alt=""
        />
        {props.message}
        <div>
          <span>like</span> {props.likesCount}
        </div>
      </div>
    </div>
  );
};

export default Post;
