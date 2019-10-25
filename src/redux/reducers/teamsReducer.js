const initState = [];

const TEAMS_FETCH = 'TEAMS_FETCH';

const teamsReducer = (state = initState, action) => {
    const copy = [];
    switch(action.type) {
        case TEAMS_FETCH:
            action.snapshot.forEach(doc => {
                let otherData = doc.data();
                copy.push({
                    id: doc.id,
                    ...otherData
                });
            });
            return copy;
        default:
            return state;
    }
};

export default {reducer: teamsReducer,  actions: { TEAMS_FETCH }};
