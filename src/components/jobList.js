import React ,{ useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../store/action/jobActions";
import { JobCard } from "./jobcard";

export const JobList = () =>{
    const dispatch = useDispatch();
  const { jobs, totalCount } = useSelector((state) => state.jobs);
  useEffect(() => {
    dispatch(fetchJobs(20, 0));
  }, [dispatch]);
  return (
    <div>
      {jobs && jobs.map((job) => (
        <JobCard key={job.jobs} job={job} />
      ))}
    </div>
  );
}