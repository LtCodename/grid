import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Dashboard from "./components/Dashboard";
import Season2019 from "./components/Season2019";
import DriverStandings from "./components/DriverStandings";
import ConstructorsStandings from "./components/ConstructorsStandings";
import Teams from "./components/Teams";
import Drivers from "./components/Drivers";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: #fff9de;
  }
`;

function App() {
  return (
      <>
          <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/season2019" component={Season2019} />
              <Route path="/driver-standings" component={DriverStandings} />
              <Route path="/constructors-standings" component={ConstructorsStandings} />
              <Route path="/teams" component={Teams} />
              <Route path="/drivers" component={Drivers} />
              <Redirect to="/dashboard" />
          </Switch>
          <GlobalStyles />
      </>
  );
}

export default App;
