import './App.css';
import { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPags';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">LandingPage</Link>
          </li>
          <li>
            <Link to="/login">LoginPage</Link>
          </li>
          <li>
            <Link to="/register">RegisterPage</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Fragment>
          <Routes>
            <Route exact path="/" element={<LandingPage />}>
            </Route>
            <Route path="/login" element={<LoginPage />}>
            </Route>
            <Route path="/register" element={<RegisterPage />}>
            </Route>
          </Routes>
        </Fragment>
      </div>
    </Router>
  );
}

export default App;
