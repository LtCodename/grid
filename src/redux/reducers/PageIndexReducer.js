const initState = "";

const PAGE_CHANGE = 'PAGE_CHANGE';

const PageIndexReducer = (state = initState, action) => {
    let copy = "";
    switch(action.type) {
        case PAGE_CHANGE:
            copy = action.pageIndex;
           console.log("page index is now " + copy);
            return copy;
        default:
            return state;
    }
};

export default {reducer: PageIndexReducer,  actions: { PAGE_CHANGE }};
