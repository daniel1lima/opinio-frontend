import React from 'react'
import { SignIn } from "@clerk/clerk-react"
import { Box } from '@mui/material'
import FlexBetween from 'components/FlexBetween'

const SignInPage = () => {
  return (
    
      <Box width="100%" height="100%" alignContent="center">
        <FlexBetween m="34%">
          <SignIn redirectUrl={"/dashboard"}/>
        </FlexBetween>
    </Box>
    
      

    
  )
}

export default SignInPage
