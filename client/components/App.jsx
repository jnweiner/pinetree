import React from 'react';
import AuthNav from './AuthNav.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile.jsx';

const App = () => {

  const { user } = useAuth0();

    return (
      <div>
        <AuthNav />
        <span>{ user ? user.name : 'No one' } is logged in</span>
        <br />
        <span>I am a React test</span>
      </div>
    )

};

export default App;