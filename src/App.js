import React from 'react';

import Home from './components/Home';
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
            <Routes>
              <Route exact path="/" element={<Home />}/>
              <Route path="/selectquiz" element={<Select />}/>
            </Routes>

        </>
      </Router>
    </div>
  );
}

export default App;
