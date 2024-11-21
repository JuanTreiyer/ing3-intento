import React, { useState } from 'react';
import Login from './Login';
import ChatScreen from './ChatScreen';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      {!authenticated ? (
        <Login setAuthenticated={setAuthenticated} />
      ) : (
        <ChatScreen />
      )}
    </div>
  );
}

export default App;
