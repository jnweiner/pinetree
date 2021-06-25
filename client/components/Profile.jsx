import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user } = useAuth0();
  const { name, email } = user;

  return (
    <span>{JSON.stringify(user, null, 2)}</span>
  )

};

// note: sub property will be unique identifier for user we can grab and user in db

export default Profile;