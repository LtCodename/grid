import { combineReducers } from 'redux';
import teamsReducer from './teamsReducer';

const rootReducer = combineReducers({
    teams: teamsReducer.reducer,
});

export default rootReducer;
