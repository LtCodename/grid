const initState = [];

const USER_FETCH = 'USER_FETCH';

const UserReducer = (state = initState, action) => {
    let copy;

    switch (action.type) {
        case USER_FETCH:
            copy = action.snapshot.uid;
            return copy;
        default:
            return state;
    }
};

export default {reducer: UserReducer, actions: {USER_FETCH}};
