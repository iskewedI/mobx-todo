import { Avatar, Tooltip } from '@mui/material';
import { useCallback, useState } from 'react';
import { useStore } from '../../../../startup/getStores';
import RewardStars from '../RewardStars/RewardStars';
import './UserPoints.css';

const UserPoints = () => {
  const userStore = useStore('userStore');
  const [lastPoints, setLastPoints] = useState<number>(userStore.User.points || 0);

  const getBgColor = useCallback(
    (points: number) => `hsl(50deg 98% ${35 * (points / 100)}% / 70%)`,
    [userStore.User.points]
  );

  const { User } = userStore;

  if (User.points === undefined) return <></>;

  return (
    <div className='user-points'>
      <RewardStars
        mountOnlyOnce
        start={User.points > lastPoints}
        onMount={() => setLastPoints(User.points || lastPoints)}
      />

      <Tooltip title='Your points'>
        <Avatar
          sx={{
            bgcolor: getBgColor(User.points),
          }}
        >
          {User.points}
        </Avatar>
      </Tooltip>
    </div>
  );
};

export default UserPoints;
