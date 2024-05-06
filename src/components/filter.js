import React,{ useState } from "react";

export const FilterOptions = ({ onChange}) => {
    const [selectedFilters, setSelectedFilters] = useState({
        role: "",
        numberOfEmployees: "",
        experience: "",
        remote: "",
        minimumBasePay: "",
        companyName: "",
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedFilters({ ...selectedFilters, [name]: value });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        onChange(selectedFilters);
      };
return(
    <div className="filter-options">
    <form onSubmit={handleSubmit}>
        <select name="role" value={selectedFilters.role} onChange={handleInputChange}>
          <option value="">Select Role</option>
          {/* Add options for roles */}
        </select>
        <select name="numberOfEmployees" value={selectedFilters.numberOfEmployees} onChange={handleInputChange}>
          <option value="">Select Number of Employees</option>
          {/* Add options for number of employees */}
        </select>
        <select name="experience" value={selectedFilters.experience} onChange={handleInputChange}>
          <option value="">Select Experience</option>
          {/* Add options for experience */}
        </select>
        <select name="remote" value={selectedFilters.remote} onChange={handleInputChange}>
          <option value="">Select Remote</option>
          {/* Add options for remote */}
        </select>
        <select name="minimumBasePay" value={selectedFilters.minimumBasePay} onChange={handleInputChange}>
          <option value="">Select Minimum Base Pay</option>
          {/* Add options for minimum base pay */}
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
)
}