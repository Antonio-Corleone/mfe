import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Router, Redirect, Switch, Route } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history'
import Header from './components/Header';
import Progress from './components/Progress';

const MarketingAppLazy = lazy(() => import('./containers/MarketingApp'));
const AuthAppLazy = lazy(() => import('./containers/AuthApp'));
const DashboardAppLazy = lazy(() => import('./containers/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  useEffect(() => {
    console.log('test');
    if (isSignedIn) {
      history.push('/dashboard');
    }else{
      history.push('/');
    }
  }, [isSignedIn]);
  
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardAppLazy />
              </Route>
              <Route path="/" component={MarketingAppLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>

  );
}