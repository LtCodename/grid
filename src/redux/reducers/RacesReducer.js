const initState = [];

const RACES_FETCH = 'RACES_FETCH';

const RacesReducer = (state = initState, action) => {
  const copy = [];
  switch (action.type) {
    case RACES_FETCH:
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

export default {reducer: RacesReducer, actions: {RACES_FETCH}};
