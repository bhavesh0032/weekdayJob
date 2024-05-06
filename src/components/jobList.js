import React ,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../store/action/jobActions";
import { JobCard } from "./jobcard";
import { FilterOptions } from "./filter";
export const JobList = () =>{
    
    const dispatch = useDispatch();
  const { jobs, totalCount} = useSelector((state) => state.jobs);
  const [filteredJobs, setFilteredJobs] = useState([])
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchJobs(30, offset));
  }, [dispatch, offset]);
 
  const handleScroll = () => {
    
    if (loading || jobs.length === totalCount) return;

    const scrolledToBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

    if (scrolledToBottom) {
      setLoading(true);
      setOffset((prevOffset) => prevOffset + 30);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (loading) {
      dispatch(fetchJobs(30, offset));
      setLoading(false);
    }
  }, [dispatch, loading, offset]);
  


  const handleFilterChange = (selectedFilters) => {
    const { role, employees, experience, remote, salary, companyName } = selectedFilters;

    const filteredJobs = jobs.filter((job) => {
      // Implement filtering logic here based on selectedFilters
      // For example, filter by role:
      return job.role === selectedFilters.role;
    });
    setFilteredJobs(filteredJobs);
  };
  return (
    <div>
         <FilterOptions onChange={(filters) => handleFilterChange(filters)} />
         {filteredJobs.map((job) => (
        <JobCard key={job.jobs} job={job} />
      ))}
         <div className="job-card-container">
      { jobs.map((job) => (
        <JobCard key={job.jdUid} job={job} />
      ))}
      {loading && <div>Loading...</div>}
      </div>
    </div>
  );
}