import { combineReducers } from 'redux';
import teamsReducer from './TeamsReducer';
import driversReducer from "./DriversReducer";
import pageIndexReducer from "./PageIndexReducer";

const RootReducer = combineReducers({
    teams: teamsReducer.reducer,
    drivers: driversReducer.reducer,
    pageIndex: pageIndexReducer.reducer
});

export default RootReducer;
