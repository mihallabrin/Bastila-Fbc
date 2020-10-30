import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react'

import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>Header</header>
    </div>
  );
}

export default withAuthenticator(App);
