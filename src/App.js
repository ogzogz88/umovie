import React from 'react';
import BackToTop from 'react-easy-back-to-top';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Watchlist } from './components/Watchlist';
import { Watched } from './components/Watched';
import { Add } from './components/Add';
import './App.css';
import './lib/font-awesome/css/all.min.css';
import { GlobalProvider } from './context/GlobalState';


function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'><Add /></Route>
          <Route path='/watched'><Watched /></Route>
          <Route path='/watchlist'><Watchlist /></Route>
        </Switch>
        <BackToTop
          backgroundColor='#bcbf0e'
          position={{ right: "2%", bottom: "10%" }}
          hover={{ backgroundColor: '#21d07a', color: "#032541" }}
          transition="all 0.5s"
          showOnDistance={0}
          borderRadius={5}
          opacity="1"
          color="white"
          fontSize="1rem"
          icon="fas fa-arrow-up"
        // Other Props...
        />
        <Footer />
      </Router>
    </GlobalProvider>
  );
}

export default App;
