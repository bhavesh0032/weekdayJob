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
    console.log("🚀 ~ handleFilterChange ~ selectedFilters:", selectedFilters)
    const { role, numberOfEmployees, experience, remote, minimumBasePay, companyName } = selectedFilters;

    
  
    let allfilteredJobs = [];
  

  
    if (role) {
      allfilteredJobs = jobs.filter((job) => job.jobRole === role);
      setFilterApplied(true);
    }
    if (numberOfEmployees) {
      allfilteredJobs = jobs.filter((job) => job.numberOfEmployees === numberOfEmployees);
      setFilterApplied(true);
    }
    if (experience) {
      allfilteredJobs = jobs.filter((job) =>  `${job.minExp} years`  === experience);
      setFilterApplied(true);
    }
    if (remote) {
      allfilteredJobs = jobs.filter((job) => job.remote === remote);
      setFilterApplied(true);
    }
    if (minimumBasePay) {
      allfilteredJobs = jobs.filter((job) => `${job.minJdSalary}`  === minimumBasePay);
      setFilterApplied(true);
    }
    if (companyName) {
     allfilteredJobs = jobs.filter((job) => job.companyName.toLowerCase().includes(companyName.toLowerCase()));
     setFilterApplied(true);
    }
    
   
  const filtersEmpty = Object.values(selectedFilters).every((value) => !value);
  if (filtersEmpty) {
    
    setFilterApplied(false);
  } else {
    // setFilteredJobsCount(12); // Reset to display the first 12 filtered jobs
    setFilteredJobs(allfilteredJobs);
    setFilterApplied(true);
  }


  };
    console.log("🚀 ~ handleFilterChange ~ filteredJobs:", filteredJobs)

//   useEffect(() => {
//     setJobCards((prevJobCards) => [...prevJobCards, ...jobs]);
//   }, [jobs]);

useEffect(() => {
    setVisibleJobs(jobs.slice(0, 12)); // Initially, render the first 30 jobs
  }, [jobs]);
 
  const handleScroll = () => {
    
    if (loading ||  (filterApplied ? filteredJobs.length : jobs.length) <= (filterApplied ? filteredJobs.length : setVisibleJobs.length)) return;

    const container = containerRef.current;
    if (!container) return;
    

    const { bottom } = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (bottom <= windowHeight + 100) {
      setLoading(true);
      setTimeout(() => {
        const endIndex = Math.min(visibleJobs.length + 12, jobs.length);
        const filterIndex = Math.min(filteredJobs.length + 12, jobs.length);
        setVisibleJobs((prevJobs) => [...prevJobs, ...jobs.slice(prevJobs.length, endIndex)]);
        setFilteredJobs((prevJobs) => [...prevJobs, ...jobs.slice(prevJobs.length, filterIndex)])
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
  


 
    // console.log("🚀 ~ handleFilterChange ~ filteredJobs:", filteredJobs
  const renderJobs = filterApplied ? filteredJobs : visibleJobs;
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
{/* <div className="job-card-container" ref={containerRef} style={{  overflowY: "auto" }} ></div> */}