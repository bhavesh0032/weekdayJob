import React,{ useState } from "react";

export const FilterOptions = ({ jdList ,onChange}) => {
    const [selectedFilters, setSelectedFilters] = useState({
        role: '',
        numberOfEmployees: '',
        experience: '',
        remote: '',
        minimumBasePay: '',
        companyName: '',
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedFilters({ ...selectedFilters, [name]: value });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        onChange(selectedFilters);
      };
     // Extract unique values for each filter option
  const uniqueRoles = Array.from(new Set(jdList.map((job) => job.jobRole)));
  const uniqueExperience = Array.from(new Set(jdList.map((job) => `${job.minExp} years`)));
  const uniqueRemoteOptions = Array.from(new Set(jdList.map((job) => job.remote)));
  const uniqueMinimumBasePay = Array.from(new Set(jdList.map((job) => `${job.minJdSalary}`)));

  return (
    <div className="filter-options">
      <form onSubmit={handleSubmit}>
        <select
          name="role"
          value={selectedFilters.role}
          onChange={handleInputChange}
        >
          <option value="">Select Role</option>
          {uniqueRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <select
          name="experience"
          value={selectedFilters.experience}
          onChange={handleInputChange}
        >
          <option value="">Select Experience</option>
          {uniqueExperience.map((experience) => (
            <option key={experience} value={experience}>
              {experience} 
            </option>
          ))}
        </select>
        <select
          name="remote"
          value={selectedFilters.remote}
          onChange={handleInputChange}
        >
          <option value="">Select Remote</option>
          {uniqueRemoteOptions.map((remote) => (
            <option key={remote} value={remote}>
              {remote}
            </option>
          ))}
        </select>
        <select
          name="minimumBasePay"
          value={selectedFilters.minimumBasePay}
          onChange={handleInputChange}
        >
          <option value="">Select Minimum Base Pay</option>
          {uniqueMinimumBasePay.map((minimumBasePay) => (
            <option key={minimumBasePay} value={minimumBasePay}>
              {minimumBasePay}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="companyName"
          value={selectedFilters.companyName}
          placeholder="Search by Company Name"
          onChange={handleInputChange}
        />
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
}