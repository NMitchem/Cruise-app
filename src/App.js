// src/App.js
import React, { useState } from 'react';
import { Router, Route, Switch } from 'wouter';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Preferences from './components/Preferences';
import Itinerary from './components/Itinerary';

function App() {
  const [user, setUser] = useState(null);
  const [itineraryPage, setItineraryPage] = useState(false);

  // Determine the component to show based on the user's state
  const getComponent = () => {
    if (!user) return <Login />;
    // You can add more conditions here as your app grows:
    // e.g., if (!userPreferencesSet) return <Preferences />;
    return <Itinerary />;
  };

  return (
    <Router>
      <div className='App'>
        <Switch>
          {/* Pass the setUser prop to SignUp */}
          <Route path='/signup'>
            <SignUp setUser={setUser} />
          </Route>
          <Route path='/login'>
            <Login setUser={setUser} />
          </Route>
          <Route path='/preferences'>
            <Preferences setItineraryPage={setItineraryPage} />
          </Route>
          <Route path='/itinerary' component={Itinerary} />
          <Route path='/'>{getComponent()}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
