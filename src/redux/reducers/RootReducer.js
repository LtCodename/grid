import { combineReducers } from 'redux';
import teamsReducer from './TeamsReducer';
import driversReducer from "./DriversReducer";
import seasonsReducer from "./SeasonsReducer";
import racesReducer from "./RacesReducer";

const RootReducer = combineReducers({
    teams: teamsReducer.reducer,
    drivers: driversReducer.reducer,
    seasons: seasonsReducer.reducer,
    races: racesReducer.reducer
});

export default RootReducer;
