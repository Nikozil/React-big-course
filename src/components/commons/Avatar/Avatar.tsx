import userPhoto from '../../../assets/images/images.png';
import { ProfileType, UserType } from '../../../types/Types';

type PropsType = {
  owner: ProfileType | UserType;
  size: 'large' | 'small';
  className: string;
};

const Avatar: React.FC<PropsType> = ({ owner, size, className }) => (
  <img src={owner.photos[size] ?? userPhoto} alt="" className={className} />
);
export default Avatar;
