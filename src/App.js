import React from 'react';

import Home from './components/Home';
import Nav from './components/Nav';
import Quiz from './components/Quiz';
import Select from './components/Select';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Router>
        <>
        <Nav/>

            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/selectquiz" component={Select}/>
              {/* <Route path="/quiz" component={Quiz}/> */}
              <Route path="/quiz" component={Quiz}/>
            </Switch>

        </>
      </Router>
    </div>
  );
}

export default App;
