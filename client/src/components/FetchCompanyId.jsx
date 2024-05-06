import React from "react";
import { useLazyGetCompanyIdQuery } from "state/api";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@mui/material";

const FetchCompanyId = ({ id }) => {
  const [company, setCompany] = useState();
  const [getId, results] = useLazyGetCompanyIdQuery();

  // Pass skip parameter that accepts a boolean
  // console.log(company)

    
    useEffect(() => {
        if(results && results.data) {
          setCompany(results.data);
        }
});
    
return (
    <>
        <Button variant="contained" color="primary" onClick={() => {getId(id)}}>
            Start now
        </Button>
        {company && <Navigate to={`/sign-up/${company.company_id}`} state={{ company }} />}
       
    </>
);
};

export default FetchCompanyId;

// NOW I NEED TO FIX THE REDIRECTS AT SIGN UP SO THAT I CAN CREATE THE USER WITH THE COMPANY ID, IM ONLY GOING TO ALLOW PEOPLE WITH COMPANY ID's TO LOG IN.
