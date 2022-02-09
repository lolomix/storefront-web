import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import Home from './pages/home';
import Explore from './pages/explore';
import Helpcenter from './pages/helpcenter';
import Ranking from './pages/ranking';
import Colection from './pages/colection';
import ItemDetailRedux from './pages/ItemDetailRedux';
import Author from './pages/Author';
import Login from './pages/login';
import Register from './pages/register';
import Price from './pages/price';
import Works from './pages/works';
import Create from './pages/create';
import Create2 from './pages/create2';
import Create3 from './pages/create3';
import Createoption from './pages/createOptions';
import Activity from './pages/activity';
import Contact from './pages/contact';
import EtlineIcons from './pages/etlineIcons';
import FontAwesomeIcons from './pages/fontAwesomeIcons';
import Minter from './pages/Minter';

import './App.css';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0,0), [location])
  return children
}

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routerhang'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

function App() {
  return (
  <div className="wraper">
    <GlobalStyles />
      <Header/>
        <PosedRouter>
          <ScrollTop path="/">
            <Home exact path="/">
              <Redirect to="/home" />
            </Home>
            <Explore path="/explore" />
            <Helpcenter path="/helpcenter" />
            <Ranking path="/ranking" />
            <Colection path="/colection/:collectionId" />
            <ItemDetailRedux path="/item/:nftId" />
            <Author path="/author/:authorId" />
            <Login path="/login" />
            <Register path="/register" />
            <Price path="/price" />
            <Works path="/works" />
            <Create path="/create" />
            <Create2 path="/createSingle" />
            <Create3 path="/createMulti" />
            <Createoption path="/createOption" />
            <Activity path="/activity" />
            <Contact path="/contact" />
            <EtlineIcons path="/etlineIcons" />
            <FontAwesomeIcons path="/fontAwesomeIcons" />
            <Minter path="/mint" />
          </ScrollTop>
        </PosedRouter>
      <ScrollToTopBtn />
    </div>
  );
}

export default App;
