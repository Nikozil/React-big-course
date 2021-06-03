import userPhoto from '../../../assets/images/images.png';

const Avatar = ({ owner, size, className }) => (
  <img src={owner.photos[size] ?? userPhoto} alt="" className={className} />
);
export default Avatar;
