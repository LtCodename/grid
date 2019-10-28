import { combineReducers } from 'redux';
import teamsReducer from './TeamsReducer';
import driversReducer from "./DriversReducer";
import pageIndexReducer from "./PageIndexReducer";
import seasonsReducer from "./SeasonsReducer";

const RootReducer = combineReducers({
    teams: teamsReducer.reducer,
    drivers: driversReducer.reducer,
    pageIndex: pageIndexReducer.reducer,
    seasons: seasonsReducer.reducer
});

export default RootReducer;
