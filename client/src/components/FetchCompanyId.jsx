import React from "react";
import { useLazyGetCompanyIdQuery } from "state/api";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Alert, Fade } from "@mui/material";

const FetchCompanyId = ({ id }) => {
  const [company, setCompany] = useState();
  const [warning, setWarning] = useState(false);
  const [getId, results] = useLazyGetCompanyIdQuery();

  useEffect(() => {
    if (results && results.data) {
      setCompany(results.data);
      setWarning(false); // Reset warning if company is found
      localStorage.setItem('company_id', results.data.company_id); // Store company ID in local storage
      console.log("Set company_id:", results.data.company_id);
      console.log(localStorage.getItem('company_id'))
    } else if (results && results.data === null) {
      setWarning(true);
      // Set a timer to clear the warning after 5 seconds
      const timer = setTimeout(() => {
        setWarning(false);
      }, 5000);
      return () => clearTimeout(timer); // Clear the timer if the component unmounts or warning changes
    }
  }, [results]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        getId(id);
        console.log(results)
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [getId, id]);

  return (
    <>
      <Fade in={warning} timeout={{ enter: 500, exit: 500 }}>
        <Alert severity="warning" variant="outlined" sx={{position: "fixed", top: "5%", left: "50%", transform: "translate(-50%, -50%)"}}>
          This company ID does not exist
        </Alert>
      </Fade>
      <Button variant="contained" color="primary" onClick={() => {getId(id)}}>
        Start now
      </Button>
      {company && <Navigate to={`/sign-up/${company.company_id}`} state={{ company }} />}
    </>
  );
};

export default FetchCompanyId;