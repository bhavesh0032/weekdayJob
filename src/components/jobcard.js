import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export const JobCard = ({ job })=> {
    return(
        <Card>
      <CardContent>
        <Typography variant="h5">{job.title}</Typography>
        <Typography>{job.company}</Typography>
        <Typography>{job.location}</Typography>
        <Typography>{job.description}</Typography>
        <Typography>{job.experience}</Typography>
        <Button variant="contained" color="primary">Apply</Button>
      </CardContent>
    </Card>
    )
}