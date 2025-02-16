import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MarketingApp from './containers/MarketingApp';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <MarketingApp />
      </div>
    </BrowserRouter>

  );
}