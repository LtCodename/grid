import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Dashboard from "./components/Dashboard";
import Seasons from "./components/Seasons";
import ConstructorsStandings from "./components/ConstructorsStandings";
import Teams from "./components/Teams";
import Drivers from "./components/Drivers";
import teamsReducer from './redux/reducers/TeamsReducer';
import driversReducer from "./redux/reducers/DriversReducer";
import { connect } from 'react-redux'
import TeamPage from "./components/TeamPage";
import DriversStandings from "./components/DriversStandings";
import DriverPage from "./components/DriverPage";

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
            teamsDataLoaded: false,
            driversDataLoaded: false
        };
    }

    componentDidMount() {
        this.fetchEverything();
    }

    fetchEverything = () => {
        this.fetchTeams();
        this.fetchDrivers();
    };

    fetchTeams() {
        firebase.firestore().collection('teams').orderBy("name").onSnapshot(snapshot => {
            this.props.fetchTeams(snapshot);
            this.setState({
                teamsDataLoaded: true
            })
        }, error => {
            console.log(error.message);
        });
    }

    fetchDrivers() {
        firebase.firestore().collection('drivers').orderBy("wins").onSnapshot(snapshot => {
            this.props.fetchDrivers(snapshot);
            this.setState({
                driversDataLoaded: true
            })
        }, error => {
            console.log(error.message);
        });
    }

    render() {
        const allContent = (
            <>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route exact path="/teams" component={Teams} />
                    <Route path="/teams/:team_id" component={TeamPage} />
                    <Route exact path="/drivers" component={Drivers} />
                    <Route path="/drivers/:driver_id" component={DriverPage} />
                    <Route path="/drivers-standings" component={DriversStandings} />
                    <Route path="/seasons" component={Seasons} />
                    <Route path="/constructors-standings" component={ConstructorsStandings} />
                    <Redirect to="/dashboard" />
                </Switch>
            </>
        );

        return (
            <>
                {(this.state.teamsDataLoaded && this.state.driversDataLoaded) ? allContent : ""}
                <GlobalStyles />
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTeams: (snapshot) => {
            dispatch({ type: teamsReducer.actions.TEAMS_FETCH, snapshot: snapshot });
        },
        fetchDrivers: (snapshot) => {
            dispatch({ type: driversReducer.actions.DRIVERS_FETCH, snapshot: snapshot });
        }
    }
};

const AppConnected = connect(null, mapDispatchToProps)(App);

export default AppConnected;
