import { combineReducers } from 'redux';
import teamsReducer from './TeamsReducer';
import driversReducer from "./DriversReducer";
import pageIndexReducer from "./PageIndexReducer";
import seasonsReducer from "./SeasonsReducer";
import racesReducer from "./RacesReducer";

const RootReducer = combineReducers({
    teams: teamsReducer.reducer,
    drivers: driversReducer.reducer,
    pageIndex: pageIndexReducer.reducer,
    seasons: seasonsReducer.reducer,
    races: racesReducer.reducer
});

export default RootReducer;
