import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { io } from 'socket.io-client';
import CreatePoll from './components/CreatePoll';
import PollList from './components/PollList';
import VotePoll from './components/VotePoll';
import ViewResults from './components/ViewResults';
import AllResults from './components/AllResults';
import Navbar from './components/Navbar';
// import Signin from './components/auth/Signin';
// import Signup from './components/auth/Signup';
// import { AuthProvider, AuthContext } from './context/authContext';

export const socket = io('http://localhost:5000');

function App() {
  return (
    <Router>
    <Navbar />
      <div className="container mx-auto p-4">
       
        <Switch>
          <Route exact path="/" component={CreatePoll} />
          <Route exact path="/polls" component={PollList} />
          <Route path="/vote/:id" component={VotePoll} />
          <Route path="/results/:id" component={ViewResults} />
          <Route path="/results" component={AllResults} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


