import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';

import Upload from './pages/upload/upload.component';
import HomePage from './pages/homepage/homepage.component';
import Browse from './pages/browse/browse.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Dashboard from './pages/dashboard/dashboard.component';
import SubmittedQuestions from './pages/submitted-questions/submitted-questions.component';
import PrivateRoute from './components/routing/PrivateRoute';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './redux/store';

import "bootswatch/dist/sketchy/bootstrap.min.css"; 
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => { 
    store.dispatch(loadUser());
  }, []);

  return (
    <div>
      <Header />
      <Switch> 
        <Route exact path='/' component={HomePage} />
        <Route path='/upload' component={Upload} />
        <Route path='/browse' component={Browse} />
        <Route path='/signin' component={SignInAndSignUpPage} />
        <Route path='/submitted-questions' component={SubmittedQuestions} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;