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

  
    const handleFilterChange = (selectedFilters) => {
      console.log(" ~ handleFilterChange ~ selectedFilters:", selectedFilters);
  
      const filteredData = jobs.filter((job) => {
        const { role, numberOfEmployees, experience, remote, minimumBasePay, companyName } = selectedFilters;
  
        let isMatch = true; // Start with assuming a match
  
        if (role) {
          isMatch = isMatch && job.jobRole === role;
        }
        if (numberOfEmployees) {
          isMatch = isMatch && job.numberOfEmployees === numberOfEmployees;
        }
        if (experience) {
          isMatch = isMatch && `${job.minExp} years` === experience;
        }
        if (remote) {
          isMatch = isMatch && job.remote === remote;
        }
        if (minimumBasePay) {
          isMatch = isMatch && `${job.minJdSalary}` === minimumBasePay;
        }
        if (companyName) {
          isMatch = isMatch && job.companyName.toLowerCase().includes(companyName.toLowerCase());
        }
  
        return isMatch;
      });
  
      setFilteredJobs(filteredData);
      setFilterApplied(true);
    }
 console.log("🚀 ~ handleFilterChange ~ filteredJobs:", filteredJobs)
   // Set initial visible jobs based on filter state
   useEffect(() => {
    const initialVisibleJobs = filterApplied ? filteredJobs.slice(0, 12) : jobs.slice(0, 12);
    setVisibleJobs(initialVisibleJobs);
  }, [jobs, filteredJobs, filterApplied]);
;
 
  const handleScroll = () => {
    
    if (loading || (filterApplied ? filteredJobs.length : jobs.length) <= visibleJobs.length) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;
    

    const { bottom } = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (bottom <= windowHeight + 100) {
      setLoading(true);
      setTimeout(() => {
        const endIndex = Math.min(visibleJobs.length + 12, (filterApplied ? filteredJobs.length : jobs.length));
        const newVisibleJobs = (filterApplied ? filteredJobs : jobs).slice(visibleJobs.length, endIndex);
        setVisibleJobs((prevJobs) => [...prevJobs, ...newVisibleJobs]);
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
  const renderJobs =  visibleJobs;
  return (
    <div>
        <div className="job-card-container" ref={containerRef} style={{  overflowY: "auto" }}>
      <FilterOptions jdList={jobs} onChange={handleFilterChange} />
      {renderJobs.map((job) => (
        <JobCard key={job.jdUid} job={job} />
      ))}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
  }

