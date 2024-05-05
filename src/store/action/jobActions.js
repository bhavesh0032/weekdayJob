// src/store/actions/jobActions.js
export const setJobs = (jobs, totalCount) => ({
    type: 'SET_JOBS',
    payload: { jobs, totalCount },
  });
  
  export const fetchJobs = (limit, offset) => async (dispatch) => {
    try {
      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ limit, offset }),
      });
      const data = await response.json();

      dispatch(setJobs(data.jdList, data.totalCount));
    } catch (error) {
      console.error(error);
    }
  };
  