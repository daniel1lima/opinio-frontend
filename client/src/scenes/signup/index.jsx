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
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '110vw' }}>
<Box sx={{ maxWidth: '600px', width: '100%', mx: 'auto' }}> {/* Center horizontally */}
  <FlexBetween> {/* Ensure FlexBetween does not have default margins or paddings affecting alignment */}
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
    </div>
  )}

export default SignUpPage
