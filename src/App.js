import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Dashboard from "./components/Dashboard";
import Season2019 from "./components/Season2019";
import ConstructorsStandings from "./components/ConstructorsStandings";
import Teams from "./components/Teams";
import Drivers from "./components/Drivers";
import teamsReducerActions from './redux/reducers/teamsReducer';
import { connect } from 'react-redux'
import TeamPage from "./components/TeamPage";
import DriversStandings from "./components/DriversStandings";

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
            teamsDataLoaded: false
        };
    }

    componentDidMount() {
        this.fetchEverything();
    }

    fetchEverything = () => {
        this.fetchTeams();
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

    render() {
        const allContent = (
            <>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route exact path="/teams" component={Teams} />
                    <Route path="/drivers-standings" component={DriversStandings} />
                    <Route path="/season-2019" component={Season2019} />
                    <Route path="/constructors-standings" component={ConstructorsStandings} />
                    <Route path="/drivers" component={Drivers} />
                    <Route path="/teams/:team_id" component={TeamPage} />
                    <Redirect to="/dashboard" />
                </Switch>
            </>
        );

        return (
            <>
                {this.state.teamsDataLoaded ? allContent : ""}
                <GlobalStyles />
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTeams: (snapshot) => {
            dispatch({ type: teamsReducerActions.actions.TEAMS_FETCH, snapshot: snapshot });
        }
    }
};

const AppConnected = connect(null, mapDispatchToProps)(App);

export default AppConnected;
