import { SignUp } from '@clerk/clerk-react'
import React from 'react'
import { Box } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCompanyId, setUser } from 'state/userCompanySlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const SignUpPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  

  const { user, companyId } = useSelector(state => state.userCompany);

  // console.log("Company ID:", companyId);
  // console.log("Company user:", user);

  
  
  useEffect(() => {
    if (location.state) {
      // Replace this with your own code to create a user

      // Set company ID
      dispatch(setCompanyId(location.state.company.company_id));
    }
  }, [location.state]);

  
  



  return (
    <Box 
      width="100%" 
      height="100%" 
      display="flex" // Added to enable flexbox
      alignItems="center" // Centers content vertically
      justifyContent="center" // Centers content horizontally
    >
      <FlexBetween m="34%">
        {location.state || companyId ? (
          <SignUp
            redirectUrl="/addUser"
            createdUserId={(created) => {
              dispatch(setUser(created));
            }}
          />
        ) : (
          <Navigate to="/onboarding" />
        )}
      </FlexBetween>
    </Box>
  )}

export default SignUpPage
