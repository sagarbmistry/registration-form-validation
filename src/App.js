import React, { Suspense, lazy, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
  withRouter,
} from "react-router-dom";
import './App.css';
import {history} from './Utils/history';
const RegisterForm = lazy(() => import("./webpages/registerform"));
const ShowDetails = lazy(() => import("./webpages/showdetails"));
const Congrats = lazy(() => import("./webpages/congrats"));


const App = () => {

  return (
    <div className="App">
      <Suspense fallback={<div className="loader">...</div>}>
        <Router history={history}>
          <Routes>
              <Route path="/" element={<RegisterForm />} />
              <Route path="showdetails" element={<ShowDetails />} />
              <Route path="congrats" element={<Congrats />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;