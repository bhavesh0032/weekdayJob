const initialState = {
    jobs: [],
    totalCount: 0
}
export const jobReducer = (state = initialState, action) => { 
    switch (action.type) {
        case 'SET_JOBS':
          return {
            ...state,
            jobs: action.payload.jobs,
            totalCount: action.payload.totalCount,
          };
        default:
          return state;
      }
}