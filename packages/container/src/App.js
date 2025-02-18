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

  const handleSignIn = () => {
    setIsSignedIn(true);
    localStorage.setItem('isSignedIn', 'true');
  };
  const handleLogout = () => {
    setIsSignedIn(false);
    localStorage.removeItem('isSignedIn');
  }

  useEffect(() => {
    const signedIn = localStorage.getItem('isSignedIn');
    if (signedIn) {
      setIsSignedIn(true);
    }
    if (isSignedIn || signedIn) {
      history.push('/dashboard');
    }

  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={handleLogout} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthAppLazy onSignIn={handleSignIn} />
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