import React ,{ useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../store/action/jobActions";
import { JobCard } from "./jobcard";
import { FilterOptions } from "./filter";
export const JobList = () =>{
    
    const dispatch = useDispatch();
  const { jobs, totalCount} = useSelector((state) => state.jobs);
//   const [jobCards, setJobCards] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([])
  const [visibleJobs, setVisibleJobs] = useState([]);
//   const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const containerRef = useRef(null);

  

  useEffect(() => {
    dispatch(fetchJobs(totalCount, 0));
  }, [dispatch, totalCount]);

//   useEffect(() => {
//     setJobCards((prevJobCards) => [...prevJobCards, ...jobs]);
//   }, [jobs]);

useEffect(() => {
    setVisibleJobs(jobs.slice(0, 30)); // Initially, render the first 30 jobs
  }, [jobs]);
 
  const handleScroll = () => {
    
    if (loading || jobs.length <= setVisibleJobs.length) return;

    const container = containerRef.current;
    if (!container) return;
    

    const { bottom } = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (bottom <= windowHeight + 100) {
      setLoading(true);
      setTimeout(() => {
        const endIndex = Math.min(visibleJobs.length + 12, jobs.length);
        setVisibleJobs((prevJobs) => [...prevJobs, ...jobs.slice(prevJobs.length, endIndex)]);
        setFilteredJobs((prevJobs) => [...prevJobs, ...jobs.slice(prevJobs.length, endIndex)]);
        setLoading(false);
      }, 500); // Simulate loading delay
  };
}

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

//   useEffect(() => {
//     if (loading) {
//         dispatch(fetchJobs(12, offset)).finally(() => {
//             setLoading(false);
//           });
//       }
//   }, [dispatch, loading, offset]);
  


  const handleFilterChange = (selectedFilters) => {
    const { role, numberOfEmployees, experience, remote, minimumBasePay, companyName } = selectedFilters;

    
  
    let filteredJobs = [...jobs];

    if (role) {
      filteredJobs = filteredJobs.filter((job) => job.jobRole === role);
    }
    if (numberOfEmployees) {
      filteredJobs = filteredJobs.filter((job) => job.numberOfEmployees === numberOfEmployees);
    }
    if (experience) {
      filteredJobs = filteredJobs.filter((job) => job.minExp - job.maxExp === experience);
    }
    if (remote) {
      filteredJobs = filteredJobs.filter((job) => job.remote === remote);
    }
    if (minimumBasePay) {
      filteredJobs = filteredJobs.filter((job) => job.minJdSalary - job.maxJdSalary === minimumBasePay);
    }
    if (companyName) {
      filteredJobs = filteredJobs.filter((job) => job.companyName.toLowerCase().includes(companyName.toLowerCase()));
    }
  
    setFilteredJobs(filteredJobs.slice(0, 30)); // Reset to display the first 30 filtered jobs
    setFilterApplied(true);
  };
  const renderJobs = filterApplied ? filteredJobs : jobs;
  return (
    <div>
         <FilterOptions jdList={jobs} onChange={handleFilterChange} />
         {filteredJobs.map((job) => (
        <JobCard key={job.jdUid} job={job}  />
      ))}
         <div className="job-card-container" ref={containerRef} style={{  overflowY: "auto" }} >
      { visibleJobs.map((job) => (
        <JobCard key={job.jdUid} job={job}  />
      ))}
      {loading && <div>Loading...</div>}
      </div>
    </div>
  );
}