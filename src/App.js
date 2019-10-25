import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Dashboard from "./components/Dashboard";
import Season2019 from "./components/Season2019";
import DriversStandings from "./components/DriversStandings";
import ConstructorsStandings from "./components/ConstructorsStandings";
import Teams from "./components/Teams";
import Drivers from "./components/Drivers";

declare var firebase;

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

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        this.fetchEverything();
    }

    fetchEverything = () => {
        this.fetchSeason2019();
    };

    fetchSeason2019() {
        firebase.firestore().collection('season-2019').orderBy("name").onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data());
            });
        }, error => {
            console.log(error.message);
        });
    }

    render() {
        return (
            <>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/season2019" component={Season2019} />
                    <Route path="/drivers-standings" component={DriversStandings} />
                    <Route path="/constructors-standings" component={ConstructorsStandings} />
                    <Route path="/teams" component={Teams} />
                    <Route path="/drivers" component={Drivers} />
                    <Redirect to="/dashboard" />
                </Switch>
                <GlobalStyles />
            </>
        );
    }
}

export default App;
