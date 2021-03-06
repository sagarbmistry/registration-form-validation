import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
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
        <Router history={history} basename='/'>
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