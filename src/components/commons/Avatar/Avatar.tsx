import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { ProfileType, UserType } from '../../../types/Types';

type PropsType = {
  owner: ProfileType | UserType;
  size: 'large' | 'small';
  className: string;
};

const AvatarComponent: React.FC<PropsType> = ({ owner, size, className }) => {
  const ownerAva = owner.photos[size];
  return ownerAva ? (
    <img src={ownerAva} alt="" className={className} />
  ) : (
    <Avatar size={64} icon={<UserOutlined />} />
  );
};
export default AvatarComponent;
