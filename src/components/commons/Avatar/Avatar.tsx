import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { DialogType } from '../../../Redax/messages-reducer';
import { ProfileType, UserType } from '../../../types/Types';

type PropsType = {
  owner: ProfileType | UserType | DialogType;
  size: 'large' | 'small';
  className: string;
  defaultSize?: number;
};

const AvatarComponent: React.FC<PropsType> = ({
  owner,
  size,
  className,
  defaultSize = 64,
}) => {
  const ownerAva = owner.photos[size];
  return ownerAva ? (
    <img src={ownerAva} alt="" className={className} />
  ) : (
    <Avatar
      shape="square"
      size={defaultSize}
      className={className}
      icon={<UserOutlined />}
    />
  );
};
export default AvatarComponent;
