const initState = [];

const DRIVERS_FETCH = 'DRIVERS_FETCH';

const DriversReducer = (state = initState, action) => {
  const copy = [];
  switch (action.type) {
    case DRIVERS_FETCH:
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

export default {reducer: DriversReducer, actions: {DRIVERS_FETCH}};
