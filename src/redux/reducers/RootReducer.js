import { combineReducers } from 'redux';
import teamsReducer from './TeamsReducer';
import driversReducer from "./DriversReducer";

const RootReducer = combineReducers({
    teams: teamsReducer.reducer,
    drivers: driversReducer.reducer
});

export default RootReducer;
