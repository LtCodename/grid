const initState = [];

const SEASONS_FETCH = 'SEASONS_FETCH';

const SeasonsReducer = (state = initState, action) => {
  const copy = [];
  switch (action.type) {
    case SEASONS_FETCH:
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

export default {reducer: SeasonsReducer, actions: {SEASONS_FETCH}};
