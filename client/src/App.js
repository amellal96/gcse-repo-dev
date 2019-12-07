import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';

import Upload from './pages/upload/upload.component';
import HomePage from './pages/homepage/homepage.component';
import Browse from './pages/browse/browse.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import "bootswatch/dist/sketchy/bootstrap.min.css"; 
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/upload' component={Upload} />
          <Route path='/browse' component={Browse} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;