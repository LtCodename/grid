const initState = [];

const USER_FETCH = 'USER_FETCH';
const USER_CLEAR = 'USER_CLEAR';

const UserReducer = (state = initState, action) => {
    let copy;

    switch (action.type) {
        case USER_FETCH:
            copy = action.snapshot.uid;
            return copy;
        case USER_CLEAR:
            return [];
        default:
            return state;
    }
};

export default {reducer: UserReducer, actions: {USER_FETCH, USER_CLEAR}};
