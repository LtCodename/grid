import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Seasons from "./components/Seasons";
import Teams from "./components/Teams";
import Drivers from "./components/Drivers";
import teamsReducer from './redux/reducers/TeamsReducer';
import driversReducer from "./redux/reducers/DriversReducer";
import seasonsReducer from "./redux/reducers/SeasonsReducer";
import racesReducer from "./redux/reducers/RacesReducer";
import userReducer from "./redux/reducers/UserReducer";
import TeamPage from "./components/TeamPage";
import DriverPage from "./components/DriverPage";
import SeasonPage from "./components/SeasonPage";
import RacePage from "./components/RacePage";
import fire from "./fire";
import { useDispatch } from 'react-redux';
import LoginPage from "./components/LoginPage";

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

const App = () => {
  const [teamsDataLoaded, changeTeamsDataLoaded] = useState(false);
  const [driversDataLoaded, changeDriversDataLoaded] = useState(false);
  const [racesDataLoaded, changeRacesDataLoaded] = useState(false);
  const [seasonsDataLoaded, changeSeasonsDataLoaded] = useState(false);
  const [userDataLoaded, changeUserDataLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchEverything();
    // eslint-disable-next-line
  },[]);

  const fetchEverything = () => {
    fetchTeams();
    fetchDrivers();
    fetchSeasons();
    fetchRaces();
    fetchUser();
  };

  const fetchUser = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user !== null) {
        //console.log(user);
        dispatch({type: userReducer.actions.USER_FETCH, snapshot: user});
        changeUserDataLoaded(true);
      }else {
        console.log(user);
        changeUserDataLoaded(true);
      }
    })
  };

  const fetchTeams = () => {
    fire.firestore().collection('teams').orderBy("name").onSnapshot(snapshot => {
      dispatch({type: teamsReducer.actions.TEAMS_FETCH, snapshot: snapshot});
      changeTeamsDataLoaded(true);
    }, error => {
      console.log(error.message);
    });
  };

  const fetchDrivers = () => {
    fire.firestore().collection('drivers').orderBy("wins").onSnapshot(snapshot => {
      dispatch({type: driversReducer.actions.DRIVERS_FETCH, snapshot: snapshot});
      changeDriversDataLoaded(true);
    }, error => {
      console.log(error.message);
    });
  };

  const fetchSeasons = () => {
    fire.firestore().collection('seasons').orderBy("name").onSnapshot(snapshot => {
      dispatch({type: seasonsReducer.actions.SEASONS_FETCH, snapshot: snapshot});
      changeRacesDataLoaded(true);
    }, error => {
      console.log(error.message);
    });
  };

  const fetchRaces = () => {
    fire.firestore().collection('races').orderBy("date").onSnapshot(snapshot => {
      dispatch({type: racesReducer.actions.RACES_FETCH, snapshot: snapshot});
      changeSeasonsDataLoaded(true);
    }, error => {
      console.log(error.message);
    });
  };

  const allContent = (
    <>
      <Switch>
        <Route exact path="/teams" component={Teams}/>
        <Route exact path="/admin" component={LoginPage}/>
        <Route path="/teams/:team_id" component={TeamPage}/>
        <Route exact path="/drivers" component={Drivers}/>
        <Route path="/drivers/:driver_id" component={DriverPage}/>
        <Route exact path="/seasons" component={Seasons}/>
        <Route path="/seasons/:season_id" component={SeasonPage}/>
        <Route path="/races/:season_id/:race_id" component={RacePage}/>
        <Redirect to="/seasons"/>
      </Switch>
    </>
  );

  return (
    <>
      {(teamsDataLoaded && driversDataLoaded && seasonsDataLoaded && racesDataLoaded && userDataLoaded) ? allContent : ""}
      <GlobalStyles/>
    </>
  );
};

export default App;
