import logo from './logo.svg';
import './App.css';

import { Home } from './Home';
import { Rooms } from './Rooms/Rooms';
import { Teachers } from './Teachers/Teachers';
import { Groups } from './Groups/Groups';
import { Subjects } from './Subjects/Subjects';
import { Navigation } from './Navigation';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
    
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
        School Planner
      </h3>
        <Navigation />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/rooms' component={Rooms} />
          <Route path='/teachers' component={Teachers} />
          <Route path='/groups' component={Groups} />
          <Route path='/subjects' component={Subjects} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
