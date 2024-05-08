

import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";

import HourglassTopIcon from "@mui/icons-material/HourglassTop";

// import "./components.css";
import "./components2.css"
import defaultImage from "../logo.svg";

export const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const truncatedJobDetails = job.jobDetailsFromCompany
  ? job.jobDetailsFromCompany.split(" ").slice(0, 90).join(" ")
  : '';
  const showMoreButton = job.jobDetailsFromCompany && job.jobDetailsFromCompany.split(" ").length > 50;

  return (
    <Card
      className="job-card"
    
    >
      <Box
      className="posted-ago"
       
      >
        <Typography
          color="textSecondary"
          sx={{
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HourglassTopIcon style={{ color: "#9a633f" }} />
          Posted 10 days ago
        </Typography>
      </Box>
      <CardContent>
        <div className="company_logo_details">
          <div className="company_logo">
            <img
              src={job.logoUrl || defaultImage}
              alt="Job"
              className="job-image"

            />
          </div>
          <div>
            <Typography
              sx={{
                color: "gray",
                fontSize: "17px",
                fontWeight: "550",
                marginBottom: "2px",
              }}
            >
              {job.companyName || ''}
            </Typography>
            <Typography
              sx={{
                fontSize: "17px",
                marginBottom: "3px",
              }}
            >
              {job.jobRole || ''}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              {job.location || ''}
            </Typography>
          </div>
        </div>
        <Typography
          sx={{
            color: "gray",
            fontWeight: "500",
            fontSize: "15px",
            marginY: "7px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Estimated Salary: {job.salaryCurrencyCode} {job.maxJdSalary ? `${job.minJdSalary}` : "5 - 10 LPA"}
          {/* <CheckBoxIcon style={{ color: "#5dc632", marginLeft: "5px" }} /> */}
        </Typography>
        <Typography>
          {expanded
            ? job.jobDetailsFromCompany
            : truncatedJobDetails + (showMoreButton ? " ..." : "")}
          {showMoreButton && (
            <Button
              onClick={toggleExpand}
              sx={{
                position: "absolute",
                textTransform: "none",
                paddingTop: "15px",
                width: "100%",
                background:
                  "linear-gradient(to top, rgba(255, 255, 255, 4) 55%, rgba(255, 255, 255, 0))",
                zIndex: "1",
                height: "50px",
                right: 0,
                "&:hover": {
                  background:
                    "linear-gradient(to top, rgba(255, 255, 255, 1) 55%, rgba(255, 255, 255, 0))",
                },
              }}
              color="primary"
            >
              {expanded ? "See less" : "See more"}
            </Button>
          )}
        </Typography>
        {job.minExp && (
        <Typography
          sx={{
            marginTop: "23px",
          }}
        >
          <p className="min_exp">Minimum Experience </p>
          {`${job.minExp}  years`}
        </Typography>
        )}
        <Button
          href="https://weekday.works"
          className="Apply_btn"
          variant="contained"
          color="primary"
          sx={{
            marginY: "10px",
            width: "100%",
            backgroundColor: "#6cf0c3",
            color: "black",
            textTransform: "none",
            borderRadius: "11px",

            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#4ca880",
            },
          }}
        >
          <BoltIcon style={{ color: "gold" }} />
          
          Easy Apply 
        </Button>
        <Button
          className="Unlock_ref_btn"
          variant="contained"
          color="secondary"
          sx={{
            width: "100%",
            backgroundColor: "#4943da",
            gap: "10px",
            borderRadius: "11px",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#3c36aa",
            },
          }}
        >
          <div className="circular-container">
            <img
              src={job.referrerImage || defaultImage}
              alt="Referrer"
              className="circular-image"
            />
          </div>
          Unlock referral asks
        </Button>
      </CardContent>
    </Card>
  );
};