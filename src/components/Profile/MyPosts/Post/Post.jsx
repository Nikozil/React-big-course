import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div>
      <div className={s.item}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnZnbypL5znsAcBxWHA435K4RcahXBINjg9A&usqp=CAU"
          alt=""
        />
        {props.message}
        <div>
          <span>like</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
