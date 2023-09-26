import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IUserDetails from '../Shared/IUserDetails';

const UserCard: React.FC<IUserDetails> = (userDetails) => {
  const userJoinedDate = new Date(userDetails.joinedAt);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="user-avatar" src={userDetails.avatar}>
          </Avatar>
        }
        title={userDetails.name}
        subheader={`Team: ${userDetails.team}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Joined at: {userJoinedDate.toDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;