import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Seasons from "./components/Seasons";
import Teams from "./components/Teams";
import Drivers from "./components/Drivers";
import teamsReducer from './redux/reducers/TeamsReducer';
import driversReducer from "./redux/reducers/DriversReducer";
import seasonsReducer from "./redux/reducers/SeasonsReducer";
import racesReducer from "./redux/reducers/RacesReducer";
import { connect } from 'react-redux'
import TeamPage from "./components/TeamPage";
import DriverPage from "./components/DriverPage";
import SeasonPage from "./components/SeasonPage";
import RacePage from "./components/RacePage";
import fire from "./fire";

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
            driversDataLoaded: false,
            racesDataLoaded: false,
            seasonsDataLoaded: false
        };
    }

    componentDidMount() {
        this.fetchEverything();
    }

    fetchEverything = () => {
        this.fetchTeams();
        this.fetchDrivers();
        this.fetchSeasons();
        this.fetchRaces();
    };

    fetchTeams() {
        fire.firestore().collection('teams').orderBy("name").onSnapshot(snapshot => {
            this.props.fetchTeams(snapshot);
            this.setState({
                teamsDataLoaded: true
            })
        }, error => {
            console.log(error.message);
        });
    }

    fetchDrivers() {
        fire.firestore().collection('drivers').orderBy("wins").onSnapshot(snapshot => {
            this.props.fetchDrivers(snapshot);
            this.setState({
                driversDataLoaded: true
            })
        }, error => {
            console.log(error.message);
        });
    }

    fetchSeasons() {
        fire.firestore().collection('seasons').orderBy("name").onSnapshot(snapshot => {
            this.props.fetchSeasons(snapshot);
            this.setState({
                seasonsDataLoaded: true
            })
        }, error => {
            console.log(error.message);
        });
    }

    fetchRaces() {
        fire.firestore().collection('races').orderBy("date").onSnapshot(snapshot => {
            this.props.fetchRaces(snapshot);
            this.setState({
                racesDataLoaded: true
            })
        }, error => {
            console.log(error.message);
        });
    }

    render() {
        const allContent = (
            <>
                <Switch>
                    <Route exact path="/teams" component={Teams} />
                    <Route path="/teams/:team_id" component={TeamPage} />
                    <Route exact path="/drivers" component={Drivers} />
                    <Route path="/drivers/:driver_id" component={DriverPage} />
                    <Route exact path="/seasons" component={Seasons} />
                    <Route path="/seasons/:season_id" component={SeasonPage} />
                    <Route path="/races/:season_id/:race_id" component={RacePage} />
                    <Redirect to="/seasons" />
                </Switch>
            </>
        );

        return (
            <>
                {(this.state.teamsDataLoaded &&
                    this.state.driversDataLoaded &&
                    this.state.seasonsDataLoaded &&
                    this.state.racesDataLoaded) ? allContent : ""}
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
        },
        fetchSeasons: (snapshot) => {
            dispatch({ type: seasonsReducer.actions.SEASONS_FETCH, snapshot: snapshot });
        },
        fetchRaces: (snapshot) => {
            dispatch({ type: racesReducer.actions.RACES_FETCH, snapshot: snapshot });
        }
    }
};

const AppConnected = connect(null, mapDispatchToProps)(App);

export default AppConnected;
