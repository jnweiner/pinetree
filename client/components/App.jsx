import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthNav from './AuthNav.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile.jsx';

const App = () => {

  const { user } = useAuth0();

  const [ currentUser, setCurrentUser ] = useState(null);

  const updateUser = (user) => {
    axios.get('/api/users', { params: { sub: user.sub, email: user.email } })
      .then(data => console.log('successful', data))
      .catch(err => console.log('error', err))

  };

  useEffect(() => {
    if (user) {
      setCurrentUser(user.sub);
    }
  });

  useEffect(() => {
    if (user) {
      updateUser(user);
    }
  }, [currentUser]);

    return (
      <div>
        <AuthNav />
        <span>{ user ? user.name : 'No one' } is logged in</span>
        { user ? <Profile /> : null}
        <br />
        <span>I am a React test</span>
      </div>
    )

};

export default App;