import React from 'react';

const Profile = () => {
  return (
    <div className="content">
      Main Content
      <div>
        <img
          src="https://home.bt.com/images/in-pictures-standoff-between-fox-and-marmot-wins-top-photography-prize-136440298151802601-191015231058.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          src="https://secure.i.telegraph.co.uk/multimedia/archive/01428/dodo220_1428231f.jpg"
          alt=""
          style={{ width: '100px' }}
        />
        decriptiom
      </div>
      <div>
        My posts
        <div>New post</div>
        <div>
          <div>Post1</div>
          <div>Post2</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
