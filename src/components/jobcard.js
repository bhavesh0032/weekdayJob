import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export const JobCard = ({ job })=> {
    return(
        <Card>
      <CardContent>
        <Typography variant="h5">{job.companyName}</Typography>
        <Typography>{job.jobRole}</Typography>
        <Typography>{job.location}</Typography>
        <Typography>{job.jobDetailsFromCompany}</Typography>
        <Typography>{`Experience: ${job.minExp} - ${job.maxExp}`}</Typography>
        <Button variant="contained" color="primary">Apply</Button>
      </CardContent>
    </Card>
    )
}