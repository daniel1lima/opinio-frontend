import React from 'react'
import { SignIn } from "@clerk/clerk-react"
import { Box } from '@mui/material'
import FlexBetween from 'components/FlexBetween'

const SignInPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '110vw' }}>
<Box sx={{ maxWidth: '600px', width: '100%', mx: 'auto' }}> {/* Center horizontally */}
  <FlexBetween> {/* Ensure FlexBetween does not have default margins or paddings affecting alignment */}
    <SignIn redirectUrl={"/dashboard"}/>
  </FlexBetween>
</Box>
    </div>
  )
}

export default SignInPage