// src/App.js
import React, { useState } from 'react';
import { Router, Route, Switch } from 'wouter';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Preferences from './components/Preferences';
import Itinerary from './components/Itinerary1';
import Home from './components/Home';

function App() {
  const [user, setUser] = useState(null);
  const [itineraryPage, setItineraryPage] = useState(false);

  // Determine the component to show based on the user's state
  const getComponent = () => {
    if (!user) return <Home />;
    return <Itinerary />;
  };
  console.log("setUser in App.js:", setUser);

  return (
    <Router>
      <div className='App'>
        <Switch>
          {/* Pass setUser prop to SignUp and Login */}
          <Route path='/login'>
            <Login setUser={setUser} />
          </Route>
          <Route path='/signup'>
            <SignUp setUser={setUser} />
          </Route>
          <Route path='/preferences'>
            <Preferences setItineraryPage={setItineraryPage} />
          </Route>
          <Route path='/itinerary' component={Itinerary} />
          <Route path='/home'>  
            <Home /> 
          </Route>
          <Route path='/'>{getComponent()}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
