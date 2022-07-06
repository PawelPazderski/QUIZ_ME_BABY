import React from 'react';

import Home from './components/Home';
import Nav from './components/Nav';
import Quiz from './components/Quiz';
import Select from './components/Select';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Router>
        <>
        {/* <Nav/> */}
        {/* <Quiz/> */}

            <Routes>
              <Route exact path="/" element={<Home />}/>
              <Route path="/selectquiz" element={<Select />}/>
              {/* <Route path="/quiz" component={Quiz}/> */}
              {/* <Route path="/quiz" component={Quiz}/> */}
            </Routes>

        </>
      </Router>
    </div>
  );
}

export default App;
