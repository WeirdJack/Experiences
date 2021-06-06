import React, { useState, useMemo } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import { SearchContext } from './contexts/searchContext'



function App() {

  const [searchTerm, setSearchTerm] = useState(null);

  const value = useMemo(() => ({searchTerm, setSearchTerm}), [searchTerm, setSearchTerm]);

  return (
  
    <BrowserRouter>
        <SearchContext.Provider value={value}>
          <Navbar />
          <></>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </SearchContext.Provider>
    </BrowserRouter>
  );
} 

export default App;
